import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Lightbulb, Eye, EyeOff, ListOrdered } from "lucide-react";
import type { Topic, Question } from "../../data/topicsData";
import CodeEditor from "../CodeEditor";
import SolutionWalkthrough from "../SolutionWalkthrough";
import { useDSAStore } from "../../store/useDSAStore";

interface PracticeTabProps {
  topic: Topic;
}

const DIFF_COLORS: Record<string, string> = {
  Easy: "text-jade-400 bg-jade-500/10 border-jade-500/20",
  Medium: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  Hard: "text-rose-400 bg-rose-500/10 border-rose-500/20",
  Advanced: "text-violet-400 bg-violet-500/10 border-violet-500/20",
};

export default function PracticeTab({ topic }: PracticeTabProps) {
  const [expandedQ, setExpandedQ] = useState<string | null>(null);
  const [showSolution, setShowSolution] = useState<Record<string, boolean>>({});
  const [showWalkthrough, setShowWalkthrough] = useState<Record<string, boolean>>({});

  const { markQuestionSolved, solvedQuestions } = useDSAStore();

  const isSolved = (qid: string) =>
    solvedQuestions.some(
      (s: { topicId: string; questionId: string }) =>
        s.topicId === topic.id && s.questionId === qid,
    );

  const handleSolve = (q: Question, ms: number) => {
    markQuestionSolved({
      topicId: topic.id,
      questionId: q.id,
      solvedAt: Date.now(),
      timeTakenMs: ms,
      language: "javascript",
    });
  };

  const toggleWalkthrough = (qid: string) => {
    setShowWalkthrough((prev) => ({ ...prev, [qid]: !prev[qid] }));
  };

  const toggleSolution = (qid: string) => {
    setShowSolution((prev) => ({ ...prev, [qid]: !prev[qid] }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="mt-6 space-y-4"
    >
      {(["Easy", "Medium", "Hard", "Advanced"] as const).map((diff) => {
        const qs = topic.questions.filter((q) => q.difficulty === diff);
        if (!qs.length) return null;
        return (
          <div key={diff}>
            <div
              className={`text-xs font-semibold uppercase tracking-widest mb-2 px-1 ${
                DIFF_COLORS[diff].split(" ")[0]
              }`}
            >
              {diff}
            </div>
            <div className="space-y-2">
              {qs.map((q) => (
                <div
                  key={q.id}
                  className="glass rounded-xl border border-white/5 overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedQ(expandedQ === q.id ? null : q.id)}
                    className="w-full px-5 py-4 flex items-center gap-3 text-left hover:bg-white/5 transition-colors"
                  >
                    <div
                      className={`w-2 h-2 rounded-full flex-shrink-0 ${
                        isSolved(q.id) ? "bg-jade-400" : "bg-white/10"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-white text-sm">
                        {q.title}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                        <span className={`font-mono ${DIFF_COLORS[diff].split(" ")[0]}`}>
                          {diff}
                        </span>
                        <span>•</span>
                        <span>{q.timeComplexity}</span>
                        <span>•</span>
                        <span>{(q.tags || []).join(", ")}</span>
                      </div>
                    </div>
                    {isSolved(q.id) && (
                      <span className="text-jade-400 text-xs">✓ Solved</span>
                    )}
                    {expandedQ === q.id ? (
                      <ChevronUp size={16} className="text-slate-500" />
                    ) : (
                      <ChevronDown size={16} className="text-slate-500" />
                    )}
                  </button>

                  <AnimatePresence>
                    {expandedQ === q.id && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        className="overflow-hidden border-t border-white/5"
                      >
                        <div className="p-5 space-y-5">
                          <div>
                            <p className="text-slate-300 text-sm leading-relaxed">
                              {q.description}
                            </p>
                            <div className="mt-3 space-y-2">
                              {((q.examples || []) || []).map((ex, i) => (
                                <div key={i} className="code-block text-xs">
                                  <div>
                                    <span className="text-slate-500">Input: </span>
                                    <span className="text-ocean-300">{ex.input}</span>
                                  </div>
                                  <div>
                                    <span className="text-slate-500">Output: </span>
                                    <span className="text-jade-300">{ex.output}</span>
                                  </div>
                                  {ex.explanation && (
                                    <div className="text-slate-500 mt-1">
                                      {ex.explanation}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                            <div className="mt-3 flex flex-wrap gap-1.5">
                              {((q.constraints || []) || []).map((c, i) => (
                                <span
                                  key={i}
                                  className="text-[10px] text-slate-600 bg-white/5 rounded px-2 py-0.5 font-mono"
                                >
                                  {c}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-1">
                            {(q.hints || []).map((hint, i) => (
                              <div
                                key={i}
                                className="text-xs text-slate-500 flex items-start gap-2"
                              >
                                <span className="text-amber-400 flex-shrink-0">💡</span>
                                {hint}
                              </div>
                            ))}
                          </div>

                          <CodeEditor question={q} onSolve={(ms) => handleSolve(q, ms)} />

                          <div>
                            <button
                              onClick={() => toggleWalkthrough(q.id)}
                              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all border ${
                                showWalkthrough[q.id]
                                  ? "bg-ocean-500/20 text-ocean-300 border-ocean-500/30"
                                  : "bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border-white/5"
                              }`}
                            >
                              <ListOrdered size={14} />
                              {showWalkthrough[q.id] ? "Hide" : "Show"} Step-by-Step Solution
                            </button>

                            <AnimatePresence>
                              {showWalkthrough[q.id] && q.walkthrough && q.walkthrough.length > 0 && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="mt-4 overflow-hidden"
                                >
                                  <SolutionWalkthrough steps={q.walkthrough} title={q.title} />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>

                          <div>
                            <button
                              onClick={() => toggleSolution(q.id)}
                              className="flex items-center gap-2 text-xs text-slate-500 hover:text-slate-300 transition-colors"
                            >
                              {showSolution[q.id] ? <EyeOff size={12} /> : <Eye size={12} />}
                              {showSolution[q.id] ? "Hide" : "Show"} Official Solution Code
                            </button>

                            {showSolution[q.id] && (
                              <div className="mt-3 space-y-3">
                                <div className="code-block">
                                  <div className="text-[10px] text-slate-500 mb-2 uppercase tracking-wider">
                                    JavaScript Solution
                                  </div>
                                  <pre className="text-sm text-slate-300 whitespace-pre-wrap">
                                    {(q.solution?.js)}
                                  </pre>
                                </div>
                                <div className="flex gap-4 text-xs">
                                  <span className="text-slate-500">
                                    Time:{" "}
                                    <span className="text-jade-400 font-mono">
                                      {q.timeComplexity}
                                    </span>
                                  </span>
                                  <span className="text-slate-500">
                                    Space:{" "}
                                    <span className="text-violet-400 font-mono">
                                      {q.spaceComplexity}
                                    </span>
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </motion.div>
  );
}
