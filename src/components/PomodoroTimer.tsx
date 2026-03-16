// src/components/PomodoroTimer.tsx
import { useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useDSAStore } from '../store/useDSAStore'
import { Play, Pause, RotateCcw, Timer } from 'lucide-react'

interface Props { compact?: boolean; micro?: boolean }

export default function PomodoroTimer({ compact, micro }: Props) {
  const { pomodoroRunning, pomodoroSecondsLeft, pomodoroPhase, startPomodoro, pausePomodoro, resetPomodoro, tickPomodoro, totalFocusMinutesToday } = useDSAStore()

  useEffect(() => {
    if (!pomodoroRunning) return
    const id = setInterval(tickPomodoro, 1000)
    return () => clearInterval(id)
  }, [pomodoroRunning, tickPomodoro])

  const mins = String(Math.floor(pomodoroSecondsLeft / 60)).padStart(2, '0')
  const secs = String(pomodoroSecondsLeft % 60).padStart(2, '0')
  const totalSecs = pomodoroPhase === 'work' ? 25 * 60 : 5 * 60
  const progress = 1 - pomodoroSecondsLeft / totalSecs
  const circumference = 2 * Math.PI * 28

  if (micro) {
    return (
      <button
        onClick={pomodoroRunning ? pausePomodoro : startPomodoro}
        className={`flex items-center gap-1.5 text-xs px-2 py-1 rounded-md transition-colors ${
          pomodoroPhase === 'work' ? 'text-ocean-400 hover:bg-ocean-500/10' : 'text-jade-400 hover:bg-jade-500/10'
        }`}
      >
        <Timer size={12} />
        <span className="font-mono">{mins}:{secs}</span>
        {pomodoroRunning ? <Pause size={10} /> : <Play size={10} />}
      </button>
    )
  }

  if (compact) {
    return (
      <div className={`m-3 p-3 rounded-xl glass-bright border ${pomodoroPhase === 'work' ? 'border-ocean-500/20' : 'border-jade-500/20'}`}>
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 flex-shrink-0">
            <svg className="w-12 h-12 -rotate-90" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
              <motion.circle
                cx="32" cy="32" r="28" fill="none"
                stroke={pomodoroPhase === 'work' ? '#0ea5e9' : '#22c55e'}
                strokeWidth="4" strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * (1 - progress)}
                transition={{ duration: 0.5 }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-[10px] text-white font-bold">{mins}:{secs}</span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className={`text-xs font-display font-semibold ${pomodoroPhase === 'work' ? 'text-ocean-400' : 'text-jade-400'}`}>
              {pomodoroPhase === 'work' ? '🎯 Focus' : '☕ Break'}
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">{totalFocusMinutesToday}min today</div>
          </div>
          <div className="flex gap-1">
            <button onClick={pomodoroRunning ? pausePomodoro : startPomodoro}
              className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                pomodoroPhase === 'work' ? 'bg-ocean-500/20 hover:bg-ocean-500/30 text-ocean-400' : 'bg-jade-500/20 hover:bg-jade-500/30 text-jade-400'
              }`}>
              {pomodoroRunning ? <Pause size={12} /> : <Play size={12} />}
            </button>
            <button onClick={resetPomodoro} className="w-7 h-7 rounded-lg flex items-center justify-center bg-white/5 hover:bg-white/10 text-slate-500 transition-colors">
              <RotateCcw size={11} />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`p-6 rounded-2xl glass border ${pomodoroPhase === 'work' ? 'border-ocean-500/20' : 'border-jade-500/20'} text-center`}>
      <div className="relative w-32 h-32 mx-auto mb-4">
        <svg className="w-32 h-32 -rotate-90" viewBox="0 0 128 128">
          <circle cx="64" cy="64" r="56" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
          <motion.circle cx="64" cy="64" r="56" fill="none"
            stroke={pomodoroPhase === 'work' ? '#0ea5e9' : '#22c55e'}
            strokeWidth="8" strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 56}
            strokeDashoffset={2 * Math.PI * 56 * (1 - progress)}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-3xl font-bold text-white">{mins}:{secs}</span>
          <span className={`text-xs mt-1 ${pomodoroPhase === 'work' ? 'text-ocean-400' : 'text-jade-400'}`}>
            {pomodoroPhase === 'work' ? 'FOCUS' : 'BREAK'}
          </span>
        </div>
      </div>
      <div className="flex justify-center gap-3">
        <button onClick={pomodoroRunning ? pausePomodoro : startPomodoro}
          className={`px-6 py-2 rounded-lg font-semibold text-sm flex items-center gap-2 transition-colors ${
            pomodoroPhase === 'work' ? 'bg-ocean-500/20 hover:bg-ocean-500/30 text-ocean-400' : 'bg-jade-500/20 hover:bg-jade-500/30 text-jade-400'
          }`}>
          {pomodoroRunning ? <><Pause size={14} /> Pause</> : <><Play size={14} /> Start</>}
        </button>
        <button onClick={resetPomodoro} className="px-4 py-2 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-colors">
          <RotateCcw size={14} />
        </button>
      </div>
      <div className="mt-3 text-xs text-slate-500">{totalFocusMinutesToday} min focused today</div>
    </div>
  )
}
