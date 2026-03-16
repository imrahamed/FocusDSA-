// src/store/useDSAStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface SolvedQuestion {
  topicId: string
  questionId: string
  solvedAt: number
  timeTakenMs: number
  language: string
}

export interface DailySession {
  date: string
  minutesFocused: number
  questionsAnswered: number
  visualizationsWatched: number
}

export interface Reflection {
  topicId: string
  questionId?: string
  text: string
  createdAt: number
}

export interface DSAState {
  focusActive: boolean
  pomodoroRunning: boolean
  pomodoroSecondsLeft: number
  pomodoroPhase: 'work' | 'break'
  totalFocusMinutesToday: number
  solvedQuestions: SolvedQuestion[]
  streak: number
  lastStudyDate: string
  sessionsHistory: DailySession[]
  reflections: Reflection[]
  topicProgress: Record<string, { visualizationsWatched: number; quizScore?: number; completed: boolean }>
  currentTopic: string | null
  sidebarOpen: boolean
  startPomodoro: () => void
  pausePomodoro: () => void
  tickPomodoro: () => void
  resetPomodoro: () => void
  setFocusActive: (v: boolean) => void
  markQuestionSolved: (q: SolvedQuestion) => void
  addReflection: (r: Reflection) => void
  markVisualizationWatched: (topicId: string) => void
  setTopicQuizScore: (topicId: string, score: number) => void
  setCurrentTopic: (id: string | null) => void
  setSidebarOpen: (v: boolean) => void
  updateStreak: () => void
  addFocusMinutes: (mins: number) => void
}

const todayStr = () => new Date().toISOString().split('T')[0]

export const useDSAStore = create<DSAState>()(
  persist(
    (set: (partial: Partial<DSAState> | ((state: DSAState) => Partial<DSAState>)) => void, get: () => DSAState) => ({
      focusActive: false,
      pomodoroRunning: false,
      pomodoroSecondsLeft: 25 * 60,
      pomodoroPhase: 'work' as const,
      totalFocusMinutesToday: 0,
      solvedQuestions: [],
      streak: 0,
      lastStudyDate: '',
      sessionsHistory: [],
      reflections: [],
      topicProgress: {},
      currentTopic: null,
      sidebarOpen: true,

      startPomodoro: () => set({ pomodoroRunning: true }),
      pausePomodoro: () => set({ pomodoroRunning: false }),
      resetPomodoro: () => set({ pomodoroSecondsLeft: 25 * 60, pomodoroPhase: 'work', pomodoroRunning: false }),

      tickPomodoro: () => {
        const { pomodoroSecondsLeft, pomodoroPhase, totalFocusMinutesToday } = get()
        if (pomodoroSecondsLeft <= 1) {
          if (pomodoroPhase === 'work') {
            set({ pomodoroPhase: 'break', pomodoroSecondsLeft: 5 * 60, pomodoroRunning: true, totalFocusMinutesToday: totalFocusMinutesToday + 25 })
          } else {
            set({ pomodoroPhase: 'work', pomodoroSecondsLeft: 25 * 60, pomodoroRunning: false })
          }
        } else {
          set({ pomodoroSecondsLeft: pomodoroSecondsLeft - 1 })
        }
      },

      setFocusActive: (v: boolean) => set({ focusActive: v }),

      markQuestionSolved: (q: SolvedQuestion) => {
        const { solvedQuestions } = get()
        const exists = solvedQuestions.find((s: SolvedQuestion) => s.topicId === q.topicId && s.questionId === q.questionId)
        if (!exists) {
          set({ solvedQuestions: [...solvedQuestions, q] })
          get().updateStreak()
          get().addFocusMinutes(Math.max(1, Math.round(q.timeTakenMs / 60000)))
        }
      },

      addReflection: (r: Reflection) => set((s: DSAState) => ({ reflections: [...s.reflections, r] })),

      markVisualizationWatched: (topicId: string) => set((s: DSAState) => ({
        topicProgress: {
          ...s.topicProgress,
          [topicId]: {
            ...s.topicProgress[topicId],
            visualizationsWatched: (s.topicProgress[topicId]?.visualizationsWatched || 0) + 1,
            completed: s.topicProgress[topicId]?.completed || false,
          }
        }
      })),

      setTopicQuizScore: (topicId: string, score: number) => set((s: DSAState) => ({
        topicProgress: {
          ...s.topicProgress,
          [topicId]: { ...s.topicProgress[topicId], quizScore: score, completed: score >= 7 }
        }
      })),

      setCurrentTopic: (id: string | null) => set({ currentTopic: id }),
      setSidebarOpen: (v: boolean) => set({ sidebarOpen: v }),

      updateStreak: () => {
        const { lastStudyDate, streak } = get()
        const today = todayStr()
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
        if (lastStudyDate === today) return
        set({ streak: lastStudyDate === yesterday ? streak + 1 : 1, lastStudyDate: today })
      },

      addFocusMinutes: (mins: number) => set((s: DSAState) => {
        const today = todayStr()
        const newTotal = s.totalFocusMinutesToday + mins
        const hist = [...s.sessionsHistory]
        const idx = hist.findIndex((h: DailySession) => h.date === today)
        if (idx >= 0) hist[idx] = { ...hist[idx], minutesFocused: hist[idx].minutesFocused + mins }
        else hist.push({ date: today, minutesFocused: mins, questionsAnswered: 0, visualizationsWatched: 0 })
        return { totalFocusMinutesToday: newTotal, sessionsHistory: hist }
      })
    }),
    { name: 'focus-dsa-v1' }
  )
)
