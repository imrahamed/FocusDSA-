import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown, CheckCircle, XCircle } from "lucide-react";
import { TOPICS } from "../data/topicsData";
import type { Topic, QuizQuestion } from "../data/topicsData";

type FeedItem =
  | { type: "teaching"; topic: Topic; title: string; content: string; color: string }
  | { type: "quiz"; topic: Topic; question: QuizQuestion; color: string };

function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

function generateFeed(): FeedItem[] {
  let items: FeedItem[] = [];
  TOPICS.forEach((topic) => {
    // Add layman teaching
    items.push({
      type: "teaching",
      topic,
      title: "The Layman's Explanation",
      content: topic.layman,
      color: topic.color,
    });
    // Add technical teaching
    items.push({
      type: "teaching",
      topic,
      title: "Technical Insight",
      content: topic.technical,
      color: topic.color,
    });
    // Add random key insights
    if (topic.keyInsights.length > 0) {
      items.push({
        type: "teaching",
        topic,
        title: "Key Insight",
        content: topic.keyInsights[Math.floor(Math.random() * topic.keyInsights.length)],
        color: topic.color,
      });
    }
    // Add all quiz questions
    topic.quiz.forEach((q) => {
      items.push({ type: "quiz", topic, question: q, color: topic.color });
    });
  });
  return shuffleArray(items);
}

export default function AntiDoomScroll() {
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Load feed once on mount
  useEffect(() => {
    setFeed(generateFeed());
  }, []);

  const handleNext = () => {
    if (currentIndex < feed.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") handleNext();
      if (e.key === "ArrowUp") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, feed.length]);

  if (feed.length === 0) return <div className="p-8 text-center text-slate-400">Loading feed...</div>;

  return (
    <div className="h-full w-full bg-ink-900 flex justify-center relative overflow-hidden">
      {/* Scroll hints */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white disabled:opacity-30 transition-colors"
        >
          <ChevronUp size={24} />
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === feed.length - 1}
          className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white disabled:opacity-30 transition-colors"
        >
          <ChevronDown size={24} />
        </button>
      </div>

      <div className="w-full max-w-md h-full relative">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute inset-0 flex flex-col p-4 md:p-8"
          >
            <FeedCard item={feed[currentIndex]} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function FeedCard({ item }: { item: FeedItem }) {
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);

  if (item.type === "teaching") {
    return (
      <div className="flex-1 flex flex-col justify-center">
        <div
          className="rounded-2xl p-8 border"
          style={{
            backgroundColor: `${item.color}10`,
            borderColor: `${item.color}30`,
            boxShadow: `0 10px 40px -10px ${item.color}30`,
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">{item.topic.emoji}</span>
            <div>
              <div className="text-sm font-semibold tracking-wider uppercase opacity-80" style={{ color: item.color }}>
                {item.topic.title}
              </div>
              <div className="text-white font-bold text-xl">{item.title}</div>
            </div>
          </div>
          <p className="text-slate-200 text-lg leading-relaxed md:text-xl font-medium">
            {item.content}
          </p>
        </div>
      </div>
    );
  }

  // Quiz type
  const q = item.question;
  return (
    <div className="flex-1 flex flex-col justify-center">
      <div
        className="rounded-2xl p-6 md:p-8 border bg-ink-800/80"
        style={{
          borderColor: `${item.color}30`,
          boxShadow: `0 10px 40px -10px ${item.color}20`,
        }}
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">{item.topic.emoji}</span>
          <span className="text-sm font-semibold tracking-wider uppercase opacity-80" style={{ color: item.color }}>
            Pop Quiz: {item.topic.title}
          </span>
        </div>
        <h3 className="text-white text-xl md:text-2xl font-bold mb-8 leading-snug">
          {q.question}
        </h3>

        <div className="space-y-3">
          {q.options.map((opt, i) => {
            const isSelected = selectedOpt === i;
            const isCorrect = i === q.correct;
            const showResult = selectedOpt !== null;

            let btnClass = "border-white/10 hover:border-white/20 bg-white/5 text-slate-300";
            if (showResult) {
              if (isCorrect) btnClass = "border-jade-500/50 bg-jade-500/10 text-jade-300";
              else if (isSelected) btnClass = "border-rose-500/50 bg-rose-500/10 text-rose-300";
              else btnClass = "border-white/5 bg-transparent text-slate-500 opacity-50";
            } else if (isSelected) {
              btnClass = "border-ocean-500/50 bg-ocean-500/10 text-ocean-300";
            }

            return (
              <button
                key={i}
                onClick={() => {
                  if (selectedOpt === null) setSelectedOpt(i);
                }}
                disabled={showResult}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all font-medium flex justify-between items-center ${btnClass}`}
              >
                <span>{opt}</span>
                {showResult && isCorrect && <CheckCircle className="text-jade-400" size={20} />}
                {showResult && isSelected && !isCorrect && <XCircle className="text-rose-400" size={20} />}
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {selectedOpt !== null && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 24 }}
              className="overflow-hidden"
            >
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-300 leading-relaxed">
                <span className="font-bold text-white block mb-1">Explanation</span>
                {q.explanation}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
