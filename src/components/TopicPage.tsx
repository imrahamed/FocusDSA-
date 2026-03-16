// src/components/TopicPage.tsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDSAStore } from "../store/useDSAStore";
import { getTopicById } from "../data/topicsData";
import type { Question } from "../data/topicsData";
import CodeEditor from "./CodeEditor";
import VisualizationPlayer from "./VisualizationPlayer";
import QuizChallenge from "./QuizChallenge";
import SolutionWalkthrough from "./SolutionWalkthrough";
import {
  BookOpen,
  BarChart3,
  Code2,
  Brain,
  Download,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Clock,
  Zap,
  Eye,
  EyeOff,
  ListOrdered,
} from "lucide-react";

interface Props {
  topicId: string;
}

const TABS = [
  { id: "learn", label: "Learn", icon: <BookOpen size={14} /> },
  { id: "visualize", label: "Visualize", icon: <BarChart3 size={14} /> },
  { id: "practice", label: "Practice", icon: <Code2 size={14} /> },
  { id: "quiz", label: "Quiz", icon: <Brain size={14} /> },
];

const DIFF_COLORS: Record<string, string> = {
  Easy: "text-jade-400 bg-jade-500/10 border-jade-500/20",
  Medium: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  Hard: "text-rose-400 bg-rose-500/10 border-rose-500/20",
  Advanced: "text-violet-400 bg-violet-500/10 border-violet-500/20",
};

export default function TopicPage({ topicId }: Props) {
  const [tab, setTab] = useState("learn");
  const [expandedQ, setExpandedQ] = useState<string | null>(null);
  const [showSolution, setShowSolution] = useState<Record<string, boolean>>({});
  const [showWalkthrough, setShowWalkthrough] = useState<
    Record<string, boolean>
  >({});
  const { setCurrentTopic, markQuestionSolved, solvedQuestions } =
    useDSAStore();

  const topic = getTopicById(topicId);
  useEffect(() => {
    setCurrentTopic(topicId);
  }, [topicId, setCurrentTopic]);

  if (!topic) return <div className="p-8 text-slate-400">Topic not found</div>;

  const isSolved = (qid: string) =>
    solvedQuestions.some(
      (s: { topicId: string; questionId: string }) =>
        s.topicId === topicId && s.questionId === qid,
    );

  const handleSolve = (q: Question, ms: number) => {
    markQuestionSolved({
      topicId,
      questionId: q.id,
      solvedAt: Date.now(),
      timeTakenMs: ms,
      language: "javascript",
    });
  };

  const toggleWalkthrough = (qid: string) => {
    setShowWalkthrough((prev: Record<string, boolean>) => ({
      ...prev,
      [qid]: !prev[qid],
    }));
  };

  const toggleSolution = (qid: string) => {
    setShowSolution((prev: Record<string, boolean>) => ({
      ...prev,
      [qid]: !prev[qid],
    }));
  };

  const downloadCheatSheet = () => {
    const blob = new Blob([topic.cheatSheet], { type: "text/markdown" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${topic.slug}-cheatsheet.md`;
    a.click();
  };

  return (
    <div className="min-h-full">
      {/* Hero */}
      <div
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${topic.color}15 0%, transparent 60%)`,
        }}
      >
        <div className="px-6 pt-8 pb-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-4 mb-6"
          >
            <span className="text-5xl">{topic.emoji}</span>
            <div>
              <h1 className="font-display text-3xl font-bold text-white">
                {topic.title}
              </h1>
              <div className="flex items-center gap-3 mt-2 text-sm text-slate-500">
                <span>{topic.questions.length} questions</span>
                <span>•</span>
                <span>{topic.quiz.length} quiz questions</span>
                <span>•</span>
                <span style={{ color: topic.color }}>
                  {
                    solvedQuestions.filter(
                      (s: { topicId: string }) => s.topicId === topicId,
                    ).length
                  }
                  /{topic.questions.length} solved
                </span>
              </div>
            </div>
          </motion.div>

          {/* Tabs */}
          <div className="flex gap-1 bg-ink-800/60 rounded-xl p-1 w-fit">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  tab === t.id
                    ? "bg-white/10 text-white"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                {t.icon}
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 pb-12">
        <AnimatePresence mode="wait">
          {/* ── LEARN TAB ───────────────────────────────────────────── */}
          {tab === "learn" && (
            <motion.div
              key="learn"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6 mt-6"
            >
              <div className="glass rounded-xl p-6 border border-white/5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">🧠</span>
                  <h3 className="font-display font-bold text-white">
                    Layman's Explanation
                  </h3>
                </div>
                {topic.visualizationType && (
                  <div className="mb-4 rounded-lg overflow-hidden border border-white/10">
                    <img
                      src={topic.visualizationType}
                      alt={topic.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}
                <p className="text-slate-300 leading-relaxed">{topic.layman}</p>
              </div>

              <div className="glass rounded-xl p-6 border border-white/5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">⚙️</span>
                  <h3 className="font-display font-bold text-white">
                    Technical Deep Dive
                  </h3>
                </div>
                <p className="text-slate-300 leading-relaxed mb-4">
                  {topic.technical}
                </p>
                <div className="space-y-2">
                  {topic.keyInsights.map((insight, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-ocean-400 mt-0.5 flex-shrink-0">
                        ▸
                      </span>
                      <span className="text-slate-400">{insight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Complexity Table */}
              <div className="glass rounded-xl p-6 border border-white/5">
                <div className="flex items-center gap-2 mb-4">
                  <Clock size={16} className="text-amber-400" />
                  <h3 className="font-display font-bold text-white">
                    Time & Space Complexity
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-slate-500 border-b border-white/5">
                        {["Operation", "Best", "Average", "Worst", "Space"].map(
                          (h) => (
                            <th
                              key={h}
                              className="text-left py-2 pr-4 font-semibold text-xs uppercase tracking-wider"
                            >
                              {h}
                            </th>
                          ),
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {topic.timeComplexities.map((row, i) => (
                        <tr
                          key={i}
                          className="border-b border-white/5 last:border-0"
                        >
                          <td className="py-2.5 pr-4 text-white font-medium">
                            {row.operation}
                          </td>
                          <td className="py-2.5 pr-4 text-jade-400 font-mono text-xs">
                            {row.best}
                          </td>
                          <td className="py-2.5 pr-4 text-amber-400 font-mono text-xs">
                            {row.avg}
                          </td>
                          <td className="py-2.5 pr-4 text-rose-400 font-mono text-xs">
                            {row.worst}
                          </td>
                          <td className="py-2.5 pr-4 text-violet-400 font-mono text-xs">
                            {row.space}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="glass rounded-xl p-5 border border-amber-500/15">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb size={15} className="text-amber-400" />
                    <h3 className="font-display font-semibold text-white text-sm">
                      Pro Tips
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {topic.proTips.map((tip, i) => (
                      <li
                        key={i}
                        className="text-sm text-slate-400 flex items-start gap-2"
                      >
                        <span className="text-amber-400 flex-shrink-0">✦</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="glass rounded-xl p-5 border border-ocean-500/15">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap size={15} className="text-ocean-400" />
                    <h3 className="font-display font-semibold text-white text-sm">
                      FAANG Insights
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {topic.faangQuotes.map((q, i) => (
                      <li
                        key={i}
                        className="text-sm text-slate-400 italic border-l-2 border-ocean-500/30 pl-3"
                      >
                        {q}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={downloadCheatSheet}
                className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-slate-400 hover:text-white transition-colors border border-white/5"
              >
                <Download size={14} />
                Download Cheat Sheet (.md)
              </button>

              <div className="glass rounded-xl p-6 border border-white/5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">🔗</span>
                  <h3 className="font-display font-bold text-white">
                    Useful Links
                  </h3>
                </div>
                {topic.usefulLinks && topic.usefulLinks.length > 0 ? (
                  <ul className="space-y-2">
                    {topic.usefulLinks.map((link, i) => (
                      <li key={i}>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-ocean-400 hover:text-ocean-300 underline"
                        >
                          {link.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-400">
                    No links available for this topic.
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {/* ── VISUALIZE TAB ────────────────────────────────────────── */}
          {tab === "visualize" && (
            <motion.div
              key="visualize"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-6"
            >
              <VisualizationPlayer topic={topic} />
            </motion.div>
          )}

          {/* ── PRACTICE TAB ─────────────────────────────────────────── */}
          {tab === "practice" && (
            <motion.div
              key="practice"
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
                      className={`text-xs font-semibold uppercase tracking-widest mb-2 px-1 ${DIFF_COLORS[diff].split(" ")[0]}`}
                    >
                      {diff}
                    </div>
                    <div className="space-y-2">
                      {qs.map((q) => (
                        <div
                          key={q.id}
                          className="glass rounded-xl border border-white/5 overflow-hidden"
                        >
                          {/* Question header */}
                          <button
                            onClick={() =>
                              setExpandedQ(expandedQ === q.id ? null : q.id)
                            }
                            className="w-full px-5 py-4 flex items-center gap-3 text-left hover:bg-white/5 transition-colors"
                          >
                            <div
                              className={`w-2 h-2 rounded-full flex-shrink-0 ${isSolved(q.id) ? "bg-jade-400" : "bg-white/10"}`}
                            />
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-white text-sm">
                                {q.title}
                              </div>
                              <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                                <span
                                  className={`font-mono ${DIFF_COLORS[diff].split(" ")[0]}`}
                                >
                                  {diff}
                                </span>
                                <span>•</span>
                                <span>{q.timeComplexity}</span>
                                <span>•</span>
                                <span>{q.tags.join(", ")}</span>
                              </div>
                            </div>
                            {isSolved(q.id) && (
                              <span className="text-jade-400 text-xs">
                                ✓ Solved
                              </span>
                            )}
                            {expandedQ === q.id ? (
                              <ChevronUp size={16} className="text-slate-500" />
                            ) : (
                              <ChevronDown
                                size={16}
                                className="text-slate-500"
                              />
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
                                  {/* Problem statement */}
                                  <div>
                                    <p className="text-slate-300 text-sm leading-relaxed">
                                      {q.description}
                                    </p>
                                    <div className="mt-3 space-y-2">
                                      {q.examples.map((ex, i) => (
                                        <div
                                          key={i}
                                          className="code-block text-xs"
                                        >
                                          <div>
                                            <span className="text-slate-500">
                                              Input:{" "}
                                            </span>
                                            <span className="text-ocean-300">
                                              {ex.input}
                                            </span>
                                          </div>
                                          <div>
                                            <span className="text-slate-500">
                                              Output:{" "}
                                            </span>
                                            <span className="text-jade-300">
                                              {ex.output}
                                            </span>
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
                                      {q.constraints.map((c, i) => (
                                        <span
                                          key={i}
                                          className="text-[10px] text-slate-600 bg-white/5 rounded px-2 py-0.5 font-mono"
                                        >
                                          {c}
                                        </span>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Hints */}
                                  <div className="space-y-1">
                                    {q.hints.map((hint, i) => (
                                      <div
                                        key={i}
                                        className="text-xs text-slate-500 flex items-start gap-2"
                                      >
                                        <span className="text-amber-400 flex-shrink-0">
                                          💡
                                        </span>
                                        {hint}
                                      </div>
                                    ))}
                                  </div>

                                  {/* Code editor */}
                                  <CodeEditor
                                    question={q}
                                    onSolve={(ms) => handleSolve(q, ms)}
                                  />

                                  {/* ── Step-by-Step Walkthrough ── */}
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
                                      {showWalkthrough[q.id]
                                        ? "Hide"
                                        : "Show"}{" "}
                                      Step-by-Step Solution
                                    </button>

                                    <AnimatePresence>
                                      {showWalkthrough[q.id] &&
                                        q.walkthrough &&
                                        q.walkthrough.length > 0 && (
                                          <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{
                                              opacity: 1,
                                              height: "auto",
                                            }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="mt-4 overflow-hidden"
                                          >
                                            <SolutionWalkthrough
                                              steps={q.walkthrough}
                                              title={q.title}
                                            />
                                          </motion.div>
                                        )}
                                    </AnimatePresence>
                                  </div>

                                  {/* Official solution code */}
                                  <div>
                                    <button
                                      onClick={() => toggleSolution(q.id)}
                                      className="flex items-center gap-2 text-xs text-slate-500 hover:text-slate-300 transition-colors"
                                    >
                                      {showSolution[q.id] ? (
                                        <EyeOff size={12} />
                                      ) : (
                                        <Eye size={12} />
                                      )}
                                      {showSolution[q.id] ? "Hide" : "Show"}{" "}
                                      Official Solution Code
                                    </button>

                                    {showSolution[q.id] && (
                                      <div className="mt-3 space-y-3">
                                        <div className="code-block">
                                          <div className="text-[10px] text-slate-500 mb-2 uppercase tracking-wider">
                                            JavaScript Solution
                                          </div>
                                          <pre className="text-sm text-slate-300 whitespace-pre-wrap">
                                            {q.solution.js}
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
          )}

          {/* ── QUIZ TAB ─────────────────────────────────────────────── */}
          {tab === "quiz" && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-6"
            >
              <QuizChallenge topic={topic} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
