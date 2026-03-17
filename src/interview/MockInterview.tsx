// src/interview/MockInterview.tsx
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDSAStore } from '../store/useDSAStore'
import { TOPICS } from '../data/topicsData'
import type { Question } from '../data/topicsData'
import CodeEditor from '../components/CodeEditor'
import { Timer, Play, Square, ChevronRight, SkipForward, Brain, Mic, Volume2, AlertCircle } from 'lucide-react'

interface InterviewQuestion extends Question { topicTitle: string; topicEmoji: string }

const HINTS = [
  "Think about the data structure that gives O(1) lookup.",
  "Can you reduce the problem to a known pattern?",
  "What's the brute force? Can you optimize it?",
  "Consider the sorted order — does that help?",
  "Draw an example. What pattern do you see?",
  "Think about which algorithm's time complexity matches the constraints.",
  "Base case first, then the recursive step.",
  "Can you solve a simpler version of this problem first?",
]

const FOLLOWUPS = [
  "What's the time and space complexity of your solution?",
  "Can you optimize further?",
  "What if the input array was already sorted?",
  "How would you handle edge cases like empty input or duplicates?",
  "Walk me through your solution step by step.",
  "What's the tradeoff between your approach and an alternative?",
]

export default function MockInterview() {
  const [phase, setPhase] = useState<'setup' | 'active' | 'results'>('setup')
  const [duration, setDuration] = useState(45)
  const [questions, setQuestions] = useState<InterviewQuestion[]>([])
  const [qIdx, setQIdx] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [hint, setHint] = useState<string | null>(null)
  const [followup, setFollowup] = useState<string | null>(null)
  const [scores, setScores] = useState<boolean[]>([])
  const [speaking, setSpeaking] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval>>()

  useEffect(() => {
    if (phase !== 'active') return
    intervalRef.current = setInterval(() => {
      setTimeLeft((t: number) => {
        if (t <= 1) { clearInterval(intervalRef.current); setPhase('results'); return 0 }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [phase])

  const startInterview = () => {
    // Pick 6 random questions from different topics
    const pool: InterviewQuestion[] = []
    const shuffled = [...TOPICS].sort(() => Math.random() - 0.5)
    for (const topic of shuffled) {
      if (pool.length >= 6) break
      const q = topic.questions[Math.floor(Math.random() * topic.questions.length)]
      if (q) pool.push({ ...q, topicTitle: topic.title, topicEmoji: topic.emoji })
    }
    setQuestions(pool)
    setQIdx(0)
    setTimeLeft(duration * 60)
    setScores([])
    setHint(null)
    setFollowup(null)
    setPhase('active')
  }

  const getHint = () => {
    const h = HINTS[Math.floor(Math.random() * HINTS.length)]
    setHint(h)
    speak(h)
  }

  const getFollowup = () => {
    const f = FOLLOWUPS[Math.floor(Math.random() * FOLLOWUPS.length)]
    setFollowup(f)
    speak(f)
  }

  const speak = (text: string) => {
    if (!window.speechSynthesis) return
    window.speechSynthesis.cancel()
    const utt = new SpeechSynthesisUtterance(text)
    utt.rate = 0.95; utt.pitch = 1
    setSpeaking(true)
    utt.onend = () => setSpeaking(false)
    window.speechSynthesis.speak(utt)
  }

  const markAndNext = (passed: boolean) => {
    const newScores = [...scores, passed]
    setScores(newScores)
    setHint(null)
    setFollowup(null)
    if (qIdx >= questions.length - 1) {
      clearInterval(intervalRef.current)
      setPhase('results')
    } else {
      setQIdx((i: number) => i + 1)
    }
  }

  const mins = String(Math.floor(timeLeft / 60)).padStart(2, '0')
  const secs = String(timeLeft % 60).padStart(2, '0')
  const totalSecs = duration * 60
  const timerPct = timeLeft / totalSecs
  const urgency = timeLeft < 300

  if (phase === 'setup') {
    return (
      <div className="max-w-2xl mx-auto p-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-10">
            <div className="text-6xl mb-4">🎤</div>
            <h1 className="font-display text-3xl font-bold text-white">Mock Interview</h1>
            <p className="text-slate-400 mt-2">Simulates a real FAANG-style technical interview session</p>
          </div>

          <div className="glass rounded-2xl p-6 border border-white/5 mb-6 space-y-4">
            <h3 className="font-display font-semibold text-white">Session Settings</h3>

            <div>
              <label className="text-sm text-slate-400 block mb-2">Interview Duration</label>
              <div className="flex gap-2">
                {[30, 45, 60].map(d => (
                  <button key={d} onClick={() => setDuration(d)}
                    className={`flex-1 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                      duration === d ? 'bg-ocean-500/20 text-ocean-300 border border-ocean-500/30' : 'bg-white/5 text-slate-400 border border-transparent hover:bg-white/10'
                    }`}>
                    {d} min
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 space-y-2 text-sm text-slate-500">
              <div className="flex items-start gap-2"><span className="text-jade-400">✓</span><span>6 random questions from all 18 topics</span></div>
              <div className="flex items-start gap-2"><span className="text-jade-400">✓</span><span>Hint button available (–5 min penalty conceptually)</span></div>
              <div className="flex items-start gap-2"><span className="text-jade-400">✓</span><span>Follow-up questions from AI interviewer (voice enabled)</span></div>
              <div className="flex items-start gap-2"><span className="text-jade-400">✓</span><span>Performance score and feedback at the end</span></div>
            </div>
          </div>

          <button onClick={startInterview}
            className="w-full py-4 bg-gradient-to-r from-ocean-500/20 to-violet-500/20 hover:from-ocean-500/30 hover:to-violet-500/30 border border-ocean-500/20 text-white rounded-xl font-display font-bold text-lg transition-all flex items-center justify-center gap-3">
            <Play size={20} />Start Interview
          </button>
        </motion.div>
      </div>
    )
  }

  if (phase === 'results') {
    const passed = scores.filter(Boolean).length
    const pct = Math.round((passed / questions.length) * 100)

    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto p-8">
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">{pct >= 70 ? '🏆' : pct >= 50 ? '🎯' : '💪'}</div>
          <h1 className="font-display text-3xl font-bold text-white">Interview Complete</h1>
          <p className="text-slate-400 mt-1">{passed}/{questions.length} questions solved ({pct}%)</p>
          <div className="mt-4 inline-block px-4 py-2 rounded-lg text-sm font-semibold" style={{
            background: pct >= 70 ? 'rgba(34,197,94,0.15)' : pct >= 50 ? 'rgba(251,191,36,0.15)' : 'rgba(244,63,94,0.15)',
            color: pct >= 70 ? '#4ade80' : pct >= 50 ? '#fbbf24' : '#fb7185',
          }}>
            {pct >= 70 ? '✅ Strong Hire' : pct >= 50 ? '🤔 Borderline Hire' : '❌ No Hire — Keep Practicing'}
          </div>
        </div>

        <div className="space-y-3 mb-8">
          {questions.map((q: InterviewQuestion, i: number) => (
            <div key={i} className={`glass rounded-xl p-4 border ${scores[i] ? 'border-jade-500/20' : 'border-rose-500/20'}`}>
              <div className="flex items-center gap-3">
                <span className="text-xl">{q.topicEmoji}</span>
                <div className="flex-1">
                  <div className="font-semibold text-white text-sm">{q.title}</div>
                  <div className="text-xs text-slate-500">{q.topicTitle} • {q.difficulty}</div>
                </div>
                {scores[i] !== undefined && (
                  <span className={`text-sm font-bold ${scores[i] ? 'text-jade-400' : 'text-rose-400'}`}>
                    {scores[i] ? '✓' : '✗'}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <button onClick={() => setPhase('setup')}
            className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-semibold transition-colors">
            New Interview
          </button>
        </div>
      </motion.div>
    )
  }

  const curQ = questions[qIdx]

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Timer header */}
      <div className={`glass rounded-xl p-4 border mb-6 flex items-center gap-4 ${urgency ? 'border-rose-500/30' : 'border-white/5'}`}>
        <div className="relative w-14 h-14 flex-shrink-0">
          <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
            <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
            <motion.circle cx="28" cy="28" r="24" fill="none"
              stroke={urgency ? '#f43f5e' : '#0ea5e9'} strokeWidth="4" strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 24}
              strokeDashoffset={2 * Math.PI * 24 * (1 - timerPct)} />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`font-mono text-xs font-bold ${urgency ? 'text-rose-400' : 'text-white'}`}>{mins}:{secs}</span>
          </div>
        </div>

        <div className="flex-1">
          <div className="font-display font-bold text-white">Question {qIdx + 1} of {questions.length}</div>
          <div className="text-xs text-slate-500">{curQ.topicEmoji} {curQ.topicTitle} • {curQ.difficulty}</div>
        </div>

        {urgency && <div className="flex items-center gap-1.5 text-rose-400 text-xs"><AlertCircle size={13} />Time running out!</div>}

        <button onClick={() => { clearInterval(intervalRef.current); setPhase('results') }}
          className="p-2 text-slate-600 hover:text-slate-400 transition-colors"><Square size={16} /></button>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div key={qIdx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
          <div className="glass rounded-xl p-6 border border-white/5 mb-5">
            <h2 className="font-display text-xl font-bold text-white mb-3">{curQ.title}</h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">{curQ.description}</p>
            {((curQ.examples || []) || []).map((ex: { input: string; output: string }, i: number) => (
              <div key={i} className="code-block mb-2 text-xs">
                <div><span className="text-slate-500">Input: </span><span className="text-ocean-300">{ex.input}</span></div>
                <div><span className="text-slate-500">Output: </span><span className="text-jade-300">{ex.output}</span></div>
              </div>
            ))}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {((curQ.constraints || []) || []).map((c: string, i: number) => <span key={i} className="text-[10px] text-slate-600 bg-white/5 rounded px-2 py-0.5 font-mono">{c}</span>)}
            </div>
          </div>

          {/* AI Followup */}
          {followup && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-4 bg-violet-500/10 rounded-xl border border-violet-500/20 flex items-start gap-3">
              <Brain size={16} className="text-violet-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-xs text-violet-400 font-semibold mb-1">Interviewer Follow-up</div>
                <p className="text-sm text-slate-300">{followup}</p>
              </div>
            </motion.div>
          )}

          {/* Hint */}
          {hint && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-4 bg-amber-500/10 rounded-xl border border-amber-500/20 flex items-start gap-3">
              <span className="text-lg flex-shrink-0">💡</span>
              <div>
                <div className="text-xs text-amber-400 font-semibold mb-1">Hint</div>
                <p className="text-sm text-slate-300">{hint}</p>
              </div>
            </motion.div>
          )}

          <CodeEditor question={curQ} />

          {/* Action bar */}
          <div className="flex flex-wrap gap-3 mt-5">
            <button onClick={getHint}
              className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 rounded-lg text-sm font-semibold transition-colors">
              💡 Get Hint
            </button>
            <button onClick={getFollowup}
              className="flex items-center gap-2 px-4 py-2 bg-violet-500/10 hover:bg-violet-500/20 text-violet-400 rounded-lg text-sm font-semibold transition-colors">
              <Brain size={14} />Follow-up Q
            </button>
            {window.speechSynthesis && (
              <button onClick={() => speak(curQ.description)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${speaking ? 'bg-ocean-500/20 text-ocean-300' : 'bg-white/5 text-slate-400 hover:text-white'}`}>
                <Volume2 size={14} />Read Aloud
              </button>
            )}
            <div className="flex-1" />
            <button onClick={() => markAndNext(false)}
              className="flex items-center gap-2 px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg text-sm font-semibold transition-colors">
              <SkipForward size={14} />Skip
            </button>
            <button onClick={() => markAndNext(true)}
              className="flex items-center gap-2 px-5 py-2 bg-jade-500/20 hover:bg-jade-500/30 text-jade-300 rounded-lg text-sm font-semibold transition-colors">
              <ChevronRight size={14} />Solved → Next
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
