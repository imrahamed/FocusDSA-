// src/components/ProgressDashboard.tsx
import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useDSAStore } from '../store/useDSAStore'
import { TOPICS } from '../data/topicsData'
import type { DailySession, SolvedQuestion } from '../store/useDSAStore'
import { Flame, Trophy, Zap, BookOpen, Calendar, Star, Play } from 'lucide-react'

export default function ProgressDashboard() {
  const { streak, solvedQuestions, topicProgress, sessionsHistory } = useDSAStore()

  const totalSolved = solvedQuestions.length
  const totalQuestions = TOPICS.reduce((a: number, t) => a + t.questions.length, 0)
  const completedTopics = Object.values(topicProgress).filter((p: unknown) => (p as { completed: boolean }).completed).length

  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000)
  const potdTopic = TOPICS[dayOfYear % TOPICS.length]
  const potdQuestion = potdTopic.questions[dayOfYear % potdTopic.questions.length]

  const difficultyColors: Record<string, string> = {
    Easy: 'text-jade-400', Medium: 'text-amber-400', Hard: 'text-rose-400', Advanced: 'text-violet-400'
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">Welcome back <span className="grad-ocean">to the lab.</span></h1>
          <p className="text-slate-500 mt-1.5 text-sm">Keep the streak alive. One problem at a time.</p>
        </div>
        <Link to="/anti-doom" className="flex items-center gap-2 px-6 py-2.5 bg-violet-500/20 hover:bg-violet-500/30 text-violet-300 rounded-xl font-display font-bold text-sm transition-all transform hover:scale-105 border border-violet-500/30 shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)]">
          <Play size={16} fill="currentColor" /> Enter Anti-Doom Scroll
        </Link>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {[
          { icon: <Flame className="text-amber-400" size={20} />, label: 'Day Streak', value: streak, sub: 'days', color: 'border-amber-500/20' },
          { icon: <Trophy className="text-jade-400" size={20} />, label: 'Solved', value: `${totalSolved}/${totalQuestions}`, sub: 'questions', color: 'border-jade-500/20' },
          { icon: <Star className="text-violet-400" size={20} />, label: 'Topics', value: `${completedTopics}/${TOPICS.length}`, sub: 'completed', color: 'border-violet-500/20' },
        ].map((stat, i: number) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className={`glass rounded-xl p-4 border ${stat.color}`}>
            <div className="flex items-center gap-2 mb-2">{stat.icon}<span className="text-xs text-slate-500">{stat.label}</span></div>
            <div className="font-display font-bold text-2xl text-white">{stat.value}</div>
            <div className="text-xs text-slate-600 mt-0.5">{stat.sub}</div>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="glass rounded-xl p-5 border border-amber-500/20 mb-8">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center">
              <Calendar size={17} className="text-amber-400" />
            </div>
            <div>
              <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider">Problem of the Day</div>
              <div className="font-display font-bold text-white">{potdQuestion.title}</div>
            </div>
          </div>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full bg-white/5 ${difficultyColors[potdQuestion.difficulty]}`}>
            {potdQuestion.difficulty}
          </span>
        </div>
        <p className="text-slate-400 text-sm line-clamp-2 mb-4">{potdQuestion.description.slice(0, 120)}...</p>
        <div className="flex items-center gap-3">
          <Link to={`/topic/${potdTopic.slug}`}
            className="px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2">
            <Zap size={14} />Solve Now
          </Link>
          <span className="text-xs text-slate-600">in {potdTopic.title}</span>
        </div>
      </motion.div>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <BookOpen size={16} className="text-ocean-400" />
          <h2 className="font-display font-semibold text-white">All Topics</h2>
          <span className="text-xs text-slate-600">{TOPICS.length} modules</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {TOPICS.map((topic, i: number) => {
            const solved = solvedQuestions.filter((q: SolvedQuestion) => q.topicId === topic.id).length
            const pct = Math.round((solved / topic.questions.length) * 100)
            return (
              <motion.div key={topic.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 + i * 0.02 }}>
                <Link to={`/topic/${topic.slug}`}
                  className="topic-card glass rounded-xl p-4 border border-white/5 hover:border-white/10 flex flex-col gap-3 block">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{topic.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-display font-semibold text-white text-sm truncate">{topic.title}</div>
                      <div className="text-[10px] text-slate-600">{topic.questions.length} questions</div>
                    </div>
                    {topicProgress[topic.id]?.completed && <span className="text-jade-400 text-xs">✓</span>}
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] text-slate-600 mb-1">
                      <span>{solved} solved</span><span>{pct}%</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div className="h-full rounded-full" style={{ background: topic.color }}
                        initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ delay: 0.1 + i * 0.02, duration: 0.6 }} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
