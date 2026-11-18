"""
PowerPoint generation router.

Generates editable .pptx lecture decks using python-pptx.
Slides are text-editable; diagrams are drawn with pptx shapes, not images.

IMPORTANT:
- Generated content is ALWAYS draft status.
- Faculty review and approval required before student release.
- No real patient data included; clinical examples are synthetic.
"""
from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import Optional
import os, tempfile

try:
    from pptx import Presentation
    from pptx.util import Inches, Pt, Emu
    from pptx.dml.color import RGBColor
    from pptx.enum.text import PP_ALIGN
    PPTX_AVAILABLE = True
except ImportError:
    PPTX_AVAILABLE = False

router = APIRouter()

# Polche Academia brand colours
NAVY = RGBColor(0x10, 0x1D, 0x35) if PPTX_AVAILABLE else None
TEAL = RGBColor(0x00, 0xA6, 0xA6) if PPTX_AVAILABLE else None
BLUE = RGBColor(0x3B, 0x82, 0xF6) if PPTX_AVAILABLE else None
WHITE = RGBColor(0xFF, 0xFF, 0xFF) if PPTX_AVAILABLE else None
GREY = RGBColor(0x64, 0x74, 0x8B) if PPTX_AVAILABLE else None

SLIDE_CONTENT = {
    1: {
        "title": "Foundations of Molecular Oncology",
        "faculty": "Dr. Suresh",
        "slides": [
            {
                "title": "Learning Objectives",
                "bullets": [
                    "Define driver and passenger mutations with molecular examples",
                    "Explain the hallmarks of cancer and their molecular basis",
                    "Describe oncogenes and tumour suppressor genes",
                    "Apply basic oncogenomics concepts to clinical scenarios",
                ],
                "speaker_note": "Start with a brief poll: how many students have encountered molecular reports in clinical practice?",
            },
            {
                "title": "What is a Driver Mutation?",
                "bullets": [
                    "Confers selective growth advantage on a cell",
                    "Undergoes positive clonal selection during tumourigenesis",
                    "Examples: KRAS G12C, EGFR L858R, BRAF V600E",
                    "Distinguished from passenger mutations by elevated dN/dS ratios",
                ],
                "speaker_note": "Stratton MR et al. Nature 2009. PMID 19360079. Emphasise that driver status is functional, not positional.",
            },
            {
                "title": "The RAS-MAPK Signalling Cascade",
                "bullets": [
                    "RTK → RAS → RAF → MEK → ERK → Transcription factors",
                    "KRAS: most commonly mutated oncogene (~25% of human cancers)",
                    "G12C substitution: blocks GAP-mediated GTP hydrolysis",
                    "Result: constitutive RAS-GTP activation → uncontrolled proliferation",
                ],
                "speaker_note": "Show animated diagram. Simanshu DK et al. Cell 2017. PMID 28666118.",
            },
            {
                "title": "Oncogenes vs Tumour Suppressor Genes",
                "bullets": [
                    "Oncogenes: gain-of-function mutations (dominant) — KRAS, EGFR, BRAF, MYC",
                    "TSGs: loss-of-function (recessive) — TP53, APC, BRCA1/2, RB1",
                    "Two-hit hypothesis (Knudson 1971): both alleles must be inactivated",
                    "Haploinsufficiency: some TSGs may show effects with one hit",
                ],
                "speaker_note": "Knudson AG. PNAS 1971. PMID 5279523. Connect to hereditary cancer syndromes.",
            },
            {
                "title": "Hallmarks of Cancer — Molecular Basis",
                "bullets": [
                    "Sustaining proliferative signalling: oncogene activation (KRAS, EGFR)",
                    "Evading growth suppressors: TSG loss (TP53, RB1)",
                    "Resisting cell death: BCL2 overexpression, TP53 loss",
                    "Enabling replicative immortality: TERT promoter mutations",
                    "Inducing angiogenesis: VEGF pathway activation",
                    "Activating invasion and metastasis: EMT, MMP upregulation",
                ],
                "speaker_note": "Hanahan D & Weinberg RA. Cell 2011. PMID 21376230. This framework underpins all therapeutic targeting.",
            },
            {
                "title": "Clinical Application: Targeted Therapy",
                "bullets": [
                    "KRAS G12C → Sotorasib (CodeBreaK 100; ORR 37.1% NSCLC)",
                    "BRAF V600E → Vemurafenib / Dabrafenib + Trametinib",
                    "EGFR L858R / exon 19 del → Osimertinib (FLAURA; mPFS 18.9 mo)",
                    "ALK fusions → Alectinib, Lorlatinib",
                ],
                "speaker_note": "Skoulidis F et al. NEJM 2021. PMID 34096690. Ramalingam SS et al. NEJM 2020. PMID 31751011.",
            },
            {
                "title": "Synthetic Case Study — DISCLAIMER",
                "bullets": [
                    "⚠️ SYNTHETIC CASE — no real patient data",
                    "Patient: Fictitious 58-year-old with Stage IV NSCLC",
                    "NGS panel: KRAS G12C (VAF 42%), TP53 R175H (VAF 65%)",
                    "MSI-S, TMB 6 mut/Mb, PD-L1 TPS 15%",
                    "Question: What is the first-line treatment strategy?",
                ],
                "speaker_note": "Completely synthetic case. Answer: Sotorasib monotherapy not approved first-line; consider platinum doublet + sotorasib in clinical trial, or carboplatin/pemetrexed/pembrolizumab.",
            },
            {
                "title": "Take-Home Messages",
                "bullets": [
                    "Driver mutations are defined by function (selective advantage), not position",
                    "KRAS is the most commonly mutated oncogene — G12C is now targetable",
                    "Cancer hallmarks map molecular alterations to biological capabilities",
                    "Targeted therapy requires accurate companion diagnostic identification",
                ],
                "speaker_note": "Assign reading: Stratton 2009 (PMID 19360079) and Hanahan 2011 (PMID 21376230).",
            },
            {
                "title": "References",
                "bullets": [
                    "Stratton MR et al. The cancer genome. Nature. 2009. PMID: 19360079",
                    "Hanahan D & Weinberg RA. Hallmarks of Cancer. Cell. 2011. PMID: 21376230",
                    "Skoulidis F et al. Sotorasib NSCLC. NEJM. 2021. PMID: 34096690",
                    "Simanshu DK et al. RAS proteins. Cell. 2017. PMID: 28666118",
                    "Ramalingam SS et al. FLAURA. NEJM. 2020. PMID: 31751011",
                    "CIViC database (CC0): civicdb.org",
                ],
                "speaker_note": "All references verified. Faculty: check currency of guideline-based recommendations before each delivery.",
            },
        ]
    }
}


def add_slide(prs: "Presentation", slide_data: dict, slide_num: int) -> None:
    """Add a single formatted slide to the presentation."""
    slide_layout = prs.slide_layouts[1]  # title + content
    slide = prs.slides.add_slide(slide_layout)

    # Background
    background = slide.background
    fill = background.fill
    fill.solid()
    fill.fore_color.rgb = NAVY

    # Title
    title_shape = slide.shapes.title
    title_shape.text = slide_data["title"]
    tf = title_shape.text_frame
    tf.paragraphs[0].font.color.rgb = TEAL
    tf.paragraphs[0].font.size = Pt(28)
    tf.paragraphs[0].font.bold = True

    # Content
    body = slide.placeholders[1]
    tf2 = body.text_frame
    tf2.clear()
    for i, bullet in enumerate(slide_data.get("bullets", [])):
        if i == 0:
            p = tf2.paragraphs[0]
        else:
            p = tf2.add_paragraph()
        p.text = bullet
        p.font.color.rgb = WHITE
        p.font.size = Pt(16)
        p.level = 0

    # Slide number footer
    txBox = slide.shapes.add_textbox(Inches(8), Inches(6.8), Inches(1), Inches(0.3))
    tf3 = txBox.text_frame
    tf3.text = str(slide_num)
    tf3.paragraphs[0].font.color.rgb = GREY
    tf3.paragraphs[0].font.size = Pt(10)

    # Speaker notes
    if note := slide_data.get("speaker_note"):
        notes_slide = slide.notes_slide
        notes_slide.notes_text_frame.text = (
            f"[AI-GENERATED DRAFT — Faculty review required before delivery]\n\n{note}"
        )


class PPTXRequest(BaseModel):
    week: int
    facultyName: Optional[str] = None
    includeSpeakerNotes: bool = True


@router.post("/generate")
def generate_pptx(req: PPTXRequest):
    if not PPTX_AVAILABLE:
        raise HTTPException(status_code=503, detail="python-pptx not installed")

    week_data = SLIDE_CONTENT.get(req.week)
    if not week_data:
        raise HTTPException(status_code=404, detail=f"Week {req.week} content not yet generated")

    prs = Presentation()
    prs.slide_width = Inches(10)
    prs.slide_height = Inches(7.5)

    # Title slide
    title_layout = prs.slide_layouts[0]
    title_slide = prs.slides.add_slide(title_layout)
    bg = title_slide.background
    bg.fill.solid()
    bg.fill.fore_color.rgb = NAVY

    t = title_slide.shapes.title
    t.text = f"Week {req.week}: {week_data['title']}"
    t.text_frame.paragraphs[0].font.color.rgb = TEAL
    t.text_frame.paragraphs[0].font.size = Pt(32)
    t.text_frame.paragraphs[0].font.bold = True

    sub = title_slide.placeholders[1]
    sub.text = (
        f"Faculty: {req.facultyName or week_data.get('faculty', 'TBC')}\n"
        "Certificate in Molecular Diagnostics & Precision Oncology\n"
        "Polche Academia Learning Hub\n\n"
        "⚠️ AI-GENERATED DRAFT — Faculty review and approval required before student release."
    )
    sub.text_frame.paragraphs[0].font.color.rgb = WHITE
    sub.text_frame.paragraphs[0].font.size = Pt(14)

    # Content slides
    for i, slide_data in enumerate(week_data["slides"], start=2):
        add_slide(prs, slide_data, i)

    # Save to temp file
    with tempfile.NamedTemporaryFile(
        suffix=f"_week{req.week}_lecture_DRAFT.pptx", delete=False, dir="/tmp"
    ) as f:
        prs.save(f.name)
        path = f.name

    return FileResponse(
        path,
        media_type="application/vnd.openxmlformats-officedocument.presentationml.presentation",
        filename=f"polche_week{req.week}_lecture_DRAFT.pptx",
        headers={"X-Draft-Status": "ai-generated-draft-requires-faculty-approval"},
    )


@router.get("/available-weeks")
def available_weeks():
    return {
        "weeks_with_content": list(SLIDE_CONTENT.keys()),
        "total_weeks": 24,
        "note": "Content for remaining weeks will be generated as faculty assignments are confirmed.",
    }
