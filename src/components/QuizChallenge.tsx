// src/components/QuizChallenge.tsx
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDSAStore } from '../store/useDSAStore'
import type { Topic } from '../data/topicsData'
import { Clock, CheckCircle, XCircle, Trophy, RotateCcw, ChevronRight } from 'lucide-react'

export default function QuizChallenge({ topic }: { topic: Topic }) {
  const [started, setStarted] = useState(false)
  const [qIdx, setQIdx] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answers, setAnswers] = useState<(number | null)[]>([])
  const [finished, setFinished] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)
  const { setTopicQuizScore } = useDSAStore()
  const timerRef = useRef<ReturnType<typeof setInterval>>()

  const questions = topic.quiz

  useEffect(() => {
    if (!started || finished) return
    timerRef.current = setInterval(() => {
      setTimeLeft((t: number) => {
        if (t <= 1) { handleNext(selected); return 60 }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [started, qIdx, finished])

  const handleAnswer = (idx: number) => {
    if (selected !== null) return
    setSelected(idx)
  }

  const handleNext = (ans: number | null) => {
    clearInterval(timerRef.current)
    const newAnswers = [...answers, ans]
    setAnswers(newAnswers)
    if (qIdx >= questions.length - 1) {
      setFinished(true)
      const score = newAnswers.filter((a: number | null, i: number) => a === questions[i].correct).length
      setTopicQuizScore(topic.id, score)
    } else {
      setQIdx((i: number) => i + 1)
      setSelected(null)
      setTimeLeft(60)
    }
  }

  const score = answers.filter((a: number | null, i: number) => a === questions[i]?.correct).length
  const pct = Math.round((score / questions.length) * 100)

  if (!started) {
    return (
      <div className="max-w-xl mx-auto text-center py-12">
        <div className="text-5xl mb-4">🧠</div>
        <h2 className="font-display text-2xl font-bold text-white mb-2">Quiz Challenge</h2>
        <p className="text-slate-400 mb-2">{questions.length} questions • 60 seconds each</p>
        <p className="text-slate-500 text-sm mb-8">Test your understanding of {topic.title}</p>
        <button onClick={() => setStarted(true)}
          className="px-8 py-3 bg-violet-500/20 hover:bg-violet-500/30 text-violet-300 rounded-xl font-display font-bold text-lg transition-colors">
          Start Quiz
        </button>
      </div>
    )
  }

  if (finished) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl mx-auto text-center py-8">
        <div className="text-6xl mb-4">{pct >= 70 ? '🏆' : pct >= 50 ? '🎯' : '💪'}</div>
        <h2 className="font-display text-3xl font-bold text-white mb-1">
          {pct >= 70 ? 'Excellent!' : pct >= 50 ? 'Good Work!' : 'Keep Practicing!'}
        </h2>
        <p className="text-slate-400 mb-6">{score}/{questions.length} correct ({pct}%)</p>

        <div className="h-3 bg-white/5 rounded-full overflow-hidden mb-8 max-w-xs mx-auto">
          <motion.div className="h-full rounded-full" style={{ background: pct >= 70 ? '#22c55e' : pct >= 50 ? '#fbbf24' : '#f43f5e' }}
            initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8 }} />
        </div>

        <div className="space-y-3 text-left mb-8 max-w-md mx-auto">
          {questions.map((q, i) => (
            <div key={q.id} className={`p-4 rounded-xl border text-sm ${
              answers[i] === q.correct ? 'border-jade-500/20 bg-jade-500/5' : 'border-rose-500/20 bg-rose-500/5'
            }`}>
              <div className="flex items-start gap-2">
                {answers[i] === q.correct
                  ? <CheckCircle size={14} className="text-jade-400 flex-shrink-0 mt-0.5" />
                  : <XCircle size={14} className="text-rose-400 flex-shrink-0 mt-0.5" />}
                <div>
                  <p className="text-slate-300 font-medium mb-1">{q.question}</p>
                  {answers[i] !== q.correct && (
                    <p className="text-rose-400 text-xs mb-1">Your answer: {q.options[answers[i]!]}</p>
                  )}
                  <p className="text-jade-400 text-xs">✓ {q.options[q.correct]}</p>
                  <p className="text-slate-500 text-xs mt-1">{q.explanation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button onClick={() => { setStarted(false); setQIdx(0); setSelected(null); setAnswers([]); setFinished(false); setTimeLeft(60) }}
          className="flex items-center gap-2 mx-auto px-6 py-2.5 bg-white/10 hover:bg-white/15 text-white rounded-lg transition-colors">
          <RotateCcw size={14} />Retake Quiz
        </button>
      </motion.div>
    )
  }

  const q = questions[qIdx]
  const timerPct = (timeLeft / 60) * 100

  return (
    <div className="max-w-xl mx-auto">
      {/* Progress bar */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
          <motion.div className="h-full bg-violet-500 rounded-full" style={{ width: `${((qIdx) / questions.length) * 100}%` }} />
        </div>
        <span className="text-xs text-slate-500 w-16 text-right">{qIdx + 1}/{questions.length}</span>
      </div>

      {/* Timer */}
      <div className="flex items-center gap-2 mb-5">
        <Clock size={14} className={timeLeft <= 10 ? 'text-rose-400' : 'text-slate-500'} />
        <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div className={`h-full rounded-full transition-colors ${timeLeft <= 10 ? 'bg-rose-500' : timeLeft <= 20 ? 'bg-amber-500' : 'bg-ocean-500'}`}
            style={{ width: `${timerPct}%` }} transition={{ duration: 0.5 }} />
        </div>
        <span className={`text-xs font-mono w-6 ${timeLeft <= 10 ? 'text-rose-400' : 'text-slate-500'}`}>{timeLeft}s</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={qIdx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
          <h3 className="font-display font-bold text-white text-lg mb-5 leading-relaxed">{q.question}</h3>

          <div className="space-y-2.5 mb-6">
            {q.options.map((opt, i) => {
              const isSelected = selected === i
              const isCorrect = i === q.correct
              const showResult = selected !== null

              return (
                <button key={i} onClick={() => handleAnswer(i)}
                  className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                    showResult
                      ? isCorrect
                        ? 'border-jade-500/40 bg-jade-500/10 text-jade-300'
                        : isSelected
                          ? 'border-rose-500/40 bg-rose-500/10 text-rose-300'
                          : 'border-white/5 text-slate-500'
                      : isSelected
                        ? 'border-violet-500/40 bg-violet-500/10 text-violet-300'
                        : 'border-white/5 hover:border-white/15 hover:bg-white/5 text-slate-300'
                  }`}>
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full text-xs flex items-center justify-center flex-shrink-0 ${
                      showResult
                        ? isCorrect ? 'bg-jade-500/30 text-jade-300' : isSelected ? 'bg-rose-500/30 text-rose-300' : 'bg-white/5 text-slate-500'
                        : 'bg-white/10 text-slate-400'
                    }`}>{String.fromCharCode(65 + i)}</span>
                    {opt}
                    {showResult && isCorrect && <CheckCircle size={14} className="ml-auto text-jade-400 flex-shrink-0" />}
                    {showResult && isSelected && !isCorrect && <XCircle size={14} className="ml-auto text-rose-400 flex-shrink-0" />}
                  </div>
                </button>
              )
            })}
          </div>

          {selected !== null && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className="mb-5 p-4 bg-white/5 rounded-xl border border-white/5 text-sm text-slate-400">
              <span className="text-white font-semibold">Explanation: </span>{q.explanation}
            </motion.div>
          )}

          {selected !== null && (
            <button onClick={() => handleNext(selected)}
              className="flex items-center gap-2 px-6 py-2.5 bg-violet-500/20 hover:bg-violet-500/30 text-violet-300 rounded-lg font-semibold text-sm transition-colors">
              {qIdx >= questions.length - 1 ? 'See Results' : 'Next Question'}
              <ChevronRight size={15} />
            </button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
