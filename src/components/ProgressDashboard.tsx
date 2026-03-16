// src/components/ProgressDashboard.tsx
import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useDSAStore } from '../store/useDSAStore'
import { TOPICS } from '../data/topicsData'
import type { DailySession, SolvedQuestion } from '../store/useDSAStore'
import PomodoroTimer from './PomodoroTimer'
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { Flame, Trophy, Clock, TrendingUp, Zap, BookOpen, Calendar, Star } from 'lucide-react'

export default function ProgressDashboard() {
  const { streak, solvedQuestions, totalFocusMinutesToday, topicProgress, sessionsHistory } = useDSAStore()

  const totalSolved = solvedQuestions.length
  const totalQuestions = TOPICS.reduce((a: number, t) => a + t.questions.length, 0)
  const completedTopics = Object.values(topicProgress).filter((p: unknown) => (p as { completed: boolean }).completed).length

  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000)
  const potdTopic = TOPICS[dayOfYear % TOPICS.length]
  const potdQuestion = potdTopic.questions[dayOfYear % potdTopic.questions.length]

  const last7 = Array.from({ length: 7 }, (_: unknown, i: number) => {
    const d = new Date(Date.now() - (6 - i) * 86400000)
    const dateStr = d.toISOString().split('T')[0]
    const session = sessionsHistory.find((s: DailySession) => s.date === dateStr)
    return { day: d.toLocaleDateString('en', { weekday: 'short' }), minutes: session?.minutesFocused || 0 }
  })

  const difficultyColors: Record<string, string> = {
    Easy: 'text-jade-400', Medium: 'text-amber-400', Hard: 'text-rose-400', Advanced: 'text-violet-400'
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="font-display text-3xl font-bold text-white">Welcome back <span className="grad-ocean">to the lab.</span></h1>
        <p className="text-slate-500 mt-1.5 text-sm">Keep the streak alive. One problem at a time.</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { icon: <Flame className="text-amber-400" size={20} />, label: 'Day Streak', value: streak, sub: 'days', color: 'border-amber-500/20' },
          { icon: <Trophy className="text-jade-400" size={20} />, label: 'Solved', value: `${totalSolved}/${totalQuestions}`, sub: 'questions', color: 'border-jade-500/20' },
          { icon: <Clock className="text-ocean-400" size={20} />, label: 'Today', value: `${totalFocusMinutesToday}m`, sub: 'focused', color: 'border-ocean-500/20' },
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="lg:col-span-2 glass rounded-xl p-5 border border-white/5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={16} className="text-ocean-400" />
            <h3 className="font-display font-semibold text-white text-sm">Focus Minutes — Last 7 Days</h3>
          </div>
          <ResponsiveContainer width="100%" height={140}>
            <AreaChart data={last7} margin={{ top: 5, right: 10, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '12px', color: '#e2e8f0' }} />
              <Area type="monotone" dataKey="minutes" stroke="#0ea5e9" fill="url(#grad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
          <PomodoroTimer />
        </motion.div>
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
