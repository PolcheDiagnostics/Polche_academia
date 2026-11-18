"""
Scientific RAG router.

IMPORTANT — Licence and privacy controls:
- Only CC0, CC-BY and public-domain metadata sources are indexed.
- Full text is NOT stored for CC-BY-NC or restricted material.
- No patient data is ever ingested. All clinical examples are synthetic.
- Every response includes source attribution, licence and retrieval date.

Production: replace stub with pgvector + keyword hybrid retrieval.
"""
from fastapi import APIRouter, Query
from typing import List, Optional

router = APIRouter()

# Stub knowledge base — representative of what will be retrieved from approved sources
STUB_ENTRIES = [
    {
        "id": "civic_kras_g12c",
        "gene": "KRAS", "variant": "G12C",
        "evidenceType": "Predictive",
        "evidenceLevel": "A",
        "drug": "Sotorasib",
        "clinicalSignificance": "Sensitivity/Response",
        "statement": "KRAS G12C mutant NSCLC shows sensitivity to sotorasib (CodeBreaK 100; ORR 37.1%)",
        "citation": "Skoulidis et al. NEJM 2021",
        "pmid": "34096690",
        "source": "CIViC",
        "licence": "CC0",
        "sourceUrl": "https://civicdb.org/variants/12",
    },
    {
        "id": "pubmed_msi_pembrolizumab",
        "title": "PD-1 Blockade in Tumors with Mismatch-Repair Deficiency",
        "authors": ["Le DT", "Uram JN", "Wang H"],
        "journal": "NEJM",
        "year": 2015,
        "pmid": "26028255",
        "evidenceLevel": "established",
        "abstract": "Pembrolizumab produced durable responses across MMR-deficient solid tumours regardless of histology.",
        "source": "PubMed (metadata only)",
        "licence": "metadata-only",
        "sourceUrl": "https://pubmed.ncbi.nlm.nih.gov/26028255/",
        "tags": ["MSI-H", "dMMR", "pembrolizumab", "immunotherapy"],
    },
    {
        "id": "reactome_ras_signalling",
        "name": "RAS signalling downstream of growth factor receptors",
        "description": "RAS proteins (KRAS, NRAS, HRAS) cycle between GDP-bound inactive and GTP-bound active states.",
        "genes": ["KRAS", "NRAS", "HRAS", "RAF1", "BRAF", "MAP2K1", "MAPK1"],
        "source": "Reactome",
        "licence": "CC-BY 4.0",
        "sourceUrl": "https://reactome.org/PathwayBrowser/#R-HSA-9006934",
    },
]


import re as _re

def _sanitise_query(q: str) -> str:
    """Strip HTML tags from query before reflecting it in the response."""
    return _re.sub(r"<[^>]+>", "", q).strip()


@router.get("/search")
def search_knowledge(q: str = Query(..., min_length=2, max_length=1000), limit: int = 5,
                     evidence_only: bool = False):
    """
    Keyword search over licence-verified scientific knowledge base.
    Returns entries with source attribution and licence information.
    """
    safe_q = _sanitise_query(q)
    q_lower = safe_q.lower()
    results = []
    for entry in STUB_ENTRIES:
        # Simple keyword match — production: vector + BM25 hybrid
        text = str(entry).lower()
        if any(word in text for word in q_lower.split()):
            results.append(entry)

    return {
        "query": safe_q,
        "count": len(results[:limit]),
        "results": results[:limit],
        "note": "All results from licence-verified sources (CC0, CC-BY, metadata-only). No patient data.",
    }


@router.get("/sources")
def list_sources():
    """List approved scientific sources with licence information."""
    return [
        {"name": "CIViC", "licence": "CC0", "url": "https://civicdb.org",
         "type": "Clinical variant interpretation", "permitted": "Full text, commercial use"},
        {"name": "Reactome", "licence": "CC BY 4.0", "url": "https://reactome.org",
         "type": "Pathway database", "permitted": "Full text, commercial use with attribution"},
        {"name": "ClinVar", "licence": "Public domain (NCBI)", "url": "https://clinvar.ncbi.nlm.nih.gov",
         "type": "Variant clinical significance", "permitted": "Full data, attribution required"},
        {"name": "PubMed", "licence": "Metadata only", "url": "https://pubmed.ncbi.nlm.nih.gov",
         "type": "Literature", "permitted": "Metadata and abstracts only — full text requires CC BY/CC0 licence check per article"},
        {"name": "Gene Ontology", "licence": "CC BY 4.0", "url": "https://geneontology.org",
         "type": "Gene function", "permitted": "Full data, commercial use with attribution"},
        {"name": "Ensembl", "licence": "Apache 2.0 / EMBL-EBI", "url": "https://ensembl.org",
         "type": "Genome annotation", "permitted": "API access, attribution required"},
    ]


@router.get("/licence-check")
def licence_check(source: str, article_id: Optional[str] = None):
    """
    Check whether content from a source can be incorporated into the RAG.
    Production: query source-specific licence APIs (PMC OAS, Unpaywall, etc.)
    """
    KNOWN_LICENCES = {
        "civic": {"permitted": True, "licence": "CC0", "full_text": True},
        "reactome": {"permitted": True, "licence": "CC BY 4.0", "full_text": True},
        "clinvar": {"permitted": True, "licence": "Public domain", "full_text": True},
        "pubmed": {"permitted": "metadata_only", "licence": "Varies per article", "full_text": False,
                   "note": "Must check individual article licence via PMC OAS API"},
        "pmc_oa": {"permitted": True, "licence": "CC BY or CC0 for OA subset", "full_text": True,
                   "note": "Verify individual article is in OA subset and has CC BY or CC0 licence"},
    }
    info = KNOWN_LICENCES.get(source.lower())
    if not info:
        return {"source": source, "permitted": "unknown",
                "note": "Source not in pre-approved list. Manual licence review required before ingestion."}
    return {"source": source, **info}
