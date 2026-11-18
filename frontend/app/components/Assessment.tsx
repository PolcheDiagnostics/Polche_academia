"use client";
import { useState } from "react";
import { ASSESSMENT_QUESTIONS, getQuestionsByWeek, getRandomQuestions, type AssessmentQuestion } from "../data/assessments";

type AssessmentState = "menu" | "quiz" | "results";

interface QuizState {
  questions: AssessmentQuestion[];
  currentIdx: number;
  selected: Record<number, string>;
  revealed: Record<number, boolean>;
  score: number;
  finished: boolean;
}

export default function Assessment() {
  const [state, setState] = useState<AssessmentState>("menu");
  const [quiz, setQuiz] = useState<QuizState | null>(null);
  const [filterWeek, setFilterWeek] = useState<number | null>(null);

  const startQuiz = (questions: AssessmentQuestion[]) => {
    setQuiz({
      questions,
      currentIdx: 0,
      selected: {},
      revealed: {},
      score: 0,
      finished: false,
    });
    setState("quiz");
  };

  const selectAnswer = (qIdx: number, optionId: string) => {
    if (!quiz || quiz.selected[qIdx] !== undefined) return;
    const q = quiz.questions[qIdx];
    const correct = optionId === q.correctOptionId;
    setQuiz(prev => prev ? {
      ...prev,
      selected: { ...prev.selected, [qIdx]: optionId },
      revealed: { ...prev.revealed, [qIdx]: true },
      score: correct ? prev.score + 1 : prev.score,
    } : prev);
  };

  const nextQuestion = () => {
    if (!quiz) return;
    if (quiz.currentIdx + 1 >= quiz.questions.length) {
      setQuiz(prev => prev ? { ...prev, finished: true } : prev);
      setState("results");
    } else {
      setQuiz(prev => prev ? { ...prev, currentIdx: prev.currentIdx + 1 } : prev);
    }
  };

  if (state === "menu") {
    return (
      <div className="max-w-4xl mx-auto animate-fade-in">
        <div className="mb-4">
          <h2 className="text-white font-bold text-lg">📝 Assessments</h2>
          <p className="text-slate-400 text-sm">MCQs, clinical vignettes and molecular interpretation exercises</p>
        </div>

        <div className="grid gap-4">
          {/* Quick quiz */}
          <div className="glass p-5 rounded-xl">
            <h3 className="text-teal-400 font-semibold mb-2">🎲 Random Quiz (5 Questions)</h3>
            <p className="text-slate-400 text-sm mb-4">Mixed questions from across all modules and difficulty levels</p>
            <div className="flex gap-2 mb-4">
              {["All Weeks", "Week 1", "Week 2", "Week 7", "Week 10"].map((label, i) => (
                <button
                  key={label}
                  onClick={() => setFilterWeek(i === 0 ? null : i === 1 ? 1 : i === 2 ? 2 : i === 3 ? 7 : 10)}
                  className={`px-3 py-1 rounded-lg text-xs transition-colors ${
                    (i === 0 && !filterWeek) || (filterWeek === (i === 1 ? 1 : i === 2 ? 2 : i === 3 ? 7 : 10))
                      ? "bg-teal-500/20 text-teal-400 border border-teal-500/30"
                      : "glass text-slate-500 hover:text-white"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <button
              onClick={() => {
                startQuiz(filterWeek ? getRandomQuestions(5, filterWeek) : getRandomQuestions(5));
              }}
              className="px-5 py-2 bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 rounded-lg text-teal-400 text-sm transition-colors"
            >
              Start Quiz →
            </button>
          </div>

          {/* Week-specific assessments */}
          <div className="glass p-5 rounded-xl">
            <h3 className="text-blue-400 font-semibold mb-3">📅 Week-Specific Assessments</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[1, 2, 7, 10].map(week => {
                const qs = getQuestionsByWeek(week);
                return (
                  <button
                    key={week}
                    onClick={() => startQuiz(qs)}
                    className="glass glass-hover p-4 rounded-xl text-left"
                  >
                    <div className="text-white font-semibold text-lg mb-1">W{week}</div>
                    <div className="text-slate-500 text-xs">{qs.length} questions</div>
                    <div className="flex gap-1 flex-wrap mt-2">
                      {["basic", "intermediate", "advanced"].map(d => {
                        const count = qs.filter(q => q.difficulty === d).length;
                        return count > 0 ? (
                          <span key={d} className={`text-[9px] px-1.5 py-0.5 rounded border ${
                            d === "basic" ? "text-green-400 border-green-400/20" :
                            d === "intermediate" ? "text-amber-400 border-amber-400/20" :
                            "text-red-400 border-red-400/20"
                          }`}>
                            {count} {d.slice(0, 3)}
                          </span>
                        ) : null;
                      })}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question bank overview */}
          <div className="glass p-5 rounded-xl">
            <h3 className="text-violet-400 font-semibold mb-3">📊 Question Bank</h3>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{ASSESSMENT_QUESTIONS.length}</div>
                <div className="text-slate-500 text-xs">Total Questions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {ASSESSMENT_QUESTIONS.filter(q => q.type === "mcq").length}
                </div>
                <div className="text-slate-500 text-xs">MCQs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">
                  {ASSESSMENT_QUESTIONS.filter(q => q.type === "clinical-vignette").length}
                </div>
                <div className="text-slate-500 text-xs">Vignettes</div>
              </div>
            </div>
            <div className="text-[10px] text-slate-600 text-center">
              Full question bank expansion in progress · Questions reviewed by faculty before student release
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (state === "results" && quiz) {
    const pct = Math.round((quiz.score / quiz.questions.length) * 100);
    const grade = pct >= 80 ? "Excellent" : pct >= 60 ? "Good" : pct >= 40 ? "Needs Review" : "Revise Material";
    const gradeColor = pct >= 80 ? "text-green-400" : pct >= 60 ? "text-teal-400" : pct >= 40 ? "text-amber-400" : "text-red-400";

    return (
      <div className="max-w-3xl mx-auto animate-fade-in space-y-4">
        <div className="glass p-6 rounded-xl text-center">
          <div className="text-5xl mb-3">{pct >= 80 ? "🎉" : pct >= 60 ? "👍" : pct >= 40 ? "📚" : "💪"}</div>
          <h2 className="text-white font-bold text-xl mb-1">Quiz Complete</h2>
          <div className={`text-3xl font-bold ${gradeColor} mb-1`}>{quiz.score}/{quiz.questions.length}</div>
          <div className={`text-lg ${gradeColor}`}>{grade} · {pct}%</div>
        </div>

        <div className="space-y-3">
          {quiz.questions.map((q, i) => {
            const selected = quiz.selected[i];
            const correct = selected === q.correctOptionId;
            return (
              <div key={i} className={`glass p-4 rounded-xl border ${correct ? "border-green-500/20" : "border-red-500/20"}`}>
                <div className="flex items-start gap-2 mb-2">
                  <span className={correct ? "text-green-400" : "text-red-400"}>{correct ? "✓" : "✗"}</span>
                  <div className="text-white text-sm font-medium">{q.question}</div>
                </div>
                <div className="ml-5 space-y-1 mb-3">
                  {q.options.map(opt => (
                    <div
                      key={opt.id}
                      className={`text-xs px-2 py-1 rounded ${
                        opt.id === q.correctOptionId
                          ? "bg-green-500/10 text-green-400 border border-green-500/20"
                          : opt.id === selected
                          ? "bg-red-500/10 text-red-400 border border-red-500/20"
                          : "text-slate-600"
                      }`}
                    >
                      {opt.id.toUpperCase()}. {opt.text}
                    </div>
                  ))}
                </div>
                <div className="ml-5 text-slate-400 text-xs bg-white/5 rounded-lg p-2">
                  <strong className="text-teal-400">Explanation: </strong>{q.explanation}
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => setState("menu")}
          className="w-full py-2 glass hover:bg-white/5 border border-teal-500/20 rounded-xl text-teal-400 text-sm transition-colors"
        >
          Back to Assessments
        </button>
      </div>
    );
  }

  if (state === "quiz" && quiz) {
    const q = quiz.questions[quiz.currentIdx];
    const answered = quiz.selected[quiz.currentIdx] !== undefined;
    const selectedOpt = quiz.selected[quiz.currentIdx];

    return (
      <div className="max-w-3xl mx-auto animate-fade-in">
        {/* Progress */}
        <div className="glass p-3 rounded-xl mb-4">
          <div className="flex items-center justify-between mb-2 text-xs text-slate-500">
            <span>Question {quiz.currentIdx + 1} of {quiz.questions.length}</span>
            <span>Score: {quiz.score}/{quiz.currentIdx + (answered ? 1 : 0)}</span>
          </div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal-500 to-blue-500 rounded-full transition-all"
              style={{ width: `${((quiz.currentIdx + 1) / quiz.questions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="glass p-5 rounded-xl">
          <div className="flex gap-2 mb-4">
            <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
              q.difficulty === "basic" ? "text-green-400 border-green-400/30" :
              q.difficulty === "intermediate" ? "text-amber-400 border-amber-400/30" :
              "text-red-400 border-red-400/30"
            }`}>{q.difficulty}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full border text-blue-400 border-blue-400/30">
              Week {q.week}
            </span>
            {q.type === "clinical-vignette" && (
              <span className="text-[10px] px-2 py-0.5 rounded-full border text-violet-400 border-violet-400/30">
                Clinical Vignette
              </span>
            )}
          </div>

          <h3 className="text-white font-semibold text-base mb-5 leading-relaxed">{q.question}</h3>

          <div className="space-y-2 mb-5">
            {q.options.map(opt => {
              let classes = "w-full text-left glass p-3 rounded-xl transition-all text-sm ";
              if (answered) {
                if (opt.id === q.correctOptionId) classes += "border border-green-500/50 bg-green-500/10 text-green-300";
                else if (opt.id === selectedOpt) classes += "border border-red-500/40 bg-red-500/5 text-red-300";
                else classes += "text-slate-600";
              } else {
                classes += "text-white hover:border-teal-500/40 hover:bg-teal-500/5";
              }
              return (
                <button
                  key={opt.id}
                  onClick={() => selectAnswer(quiz.currentIdx, opt.id)}
                  disabled={answered}
                  className={classes}
                >
                  <span className="font-mono font-bold text-xs mr-2">{opt.id.toUpperCase()}.</span>
                  {opt.text}
                </button>
              );
            })}
          </div>

          {answered && (
            <div className="glass p-4 rounded-xl border border-teal-500/20 mb-4">
              <div className={`font-semibold text-sm mb-1 ${selectedOpt === q.correctOptionId ? "text-green-400" : "text-red-400"}`}>
                {selectedOpt === q.correctOptionId ? "✓ Correct!" : "✗ Incorrect"}
              </div>
              <div className="text-slate-300 text-sm">{q.explanation}</div>
              {q.reference && (
                <div className="mt-2 text-slate-600 text-[11px]">
                  Reference: {q.reference}
                </div>
              )}
            </div>
          )}

          {answered && (
            <button
              onClick={nextQuestion}
              className="w-full py-2 bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 rounded-xl text-teal-400 text-sm transition-colors"
            >
              {quiz.currentIdx + 1 < quiz.questions.length ? "Next Question →" : "View Results →"}
            </button>
          )}
        </div>
      </div>
    );
  }

  return null;
}
