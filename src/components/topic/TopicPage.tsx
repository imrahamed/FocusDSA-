import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, BarChart3, Code2, Brain } from "lucide-react";

import { useDSAStore } from "../../store/useDSAStore";
import { getTopicById } from "../../data/topicsData";

import LearnTab from "./LearnTab";
import VisualizeTab from "./VisualizeTab";
import PracticeTab from "./PracticeTab";
import QuizTab from "./QuizTab";

interface Props {
  topicId: string;
}

const TABS = [
  { id: "learn", label: "Learn", icon: <BookOpen size={14} /> },
  { id: "visualize", label: "Visualize", icon: <BarChart3 size={14} /> },
  { id: "practice", label: "Practice", icon: <Code2 size={14} /> },
  { id: "quiz", label: "Quiz", icon: <Brain size={14} /> },
];

export default function TopicPage({ topicId }: Props) {
  const [tab, setTab] = useState("learn");
  const { setCurrentTopic, solvedQuestions } = useDSAStore();

  const topic = getTopicById(topicId);

  useEffect(() => {
    setCurrentTopic(topicId);
  }, [topicId, setCurrentTopic]);

  if (!topic) return <div className="p-8 text-slate-400">Topic not found</div>;

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
          {tab === "learn" && (
            <LearnTab
              key="learn"
              topic={topic}
              downloadCheatSheet={downloadCheatSheet}
            />
          )}

          {tab === "visualize" && (
            <VisualizeTab key="visualize" topic={topic} />
          )}

          {tab === "practice" && (
            <PracticeTab key="practice" topic={topic} />
          )}

          {tab === "quiz" && (
            <QuizTab key="quiz" topic={topic} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
