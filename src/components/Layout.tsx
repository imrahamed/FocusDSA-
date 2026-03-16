// src/components/Layout.tsx
import React from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useDSAStore } from '../store/useDSAStore'
import { TOPICS } from '../data/topicsData'
import PomodoroTimer from './PomodoroTimer'
import { LayoutDashboard, FlaskConical, ChevronLeft, Menu, Flame, Trophy } from 'lucide-react'

export default function Layout() {
  const location = useLocation()
  const { sidebarOpen, setSidebarOpen, streak, solvedQuestions } = useDSAStore()

  return (
    <div className="flex h-screen overflow-hidden focus-bg font-body">
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="w-72 flex-shrink-0 glass border-r border-white/5 flex flex-col z-30 overflow-hidden"
          >
            <div className="p-5 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-ocean-500 to-jade-500 flex items-center justify-center text-lg">⚡</div>
                <div>
                  <div className="font-display font-bold text-white text-sm leading-none">FocusDSA</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Academy 2026</div>
                </div>
                <button onClick={() => setSidebarOpen(false)} className="ml-auto text-slate-600 hover:text-slate-400 transition-colors">
                  <ChevronLeft size={18} />
                </button>
              </div>
            </div>

            <div className="px-4 py-3 flex gap-2">
              <div className="flex-1 glass-bright rounded-lg px-3 py-2 text-center">
                <div className="flex items-center justify-center gap-1 text-amber-400">
                  <Flame size={14} /><span className="font-display font-bold text-sm">{streak}</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">Day Streak</div>
              </div>
              <div className="flex-1 glass-bright rounded-lg px-3 py-2 text-center">
                <div className="flex items-center justify-center gap-1 text-jade-400">
                  <Trophy size={14} /><span className="font-display font-bold text-sm">{solvedQuestions.length}</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">Solved</div>
              </div>
            </div>

            <nav className="flex-1 overflow-y-auto px-3 pb-4">
              <NavItem to="/" icon={<LayoutDashboard size={15} />} label="Dashboard" active={location.pathname === '/'} />
              <NavItem to="/interview" icon={<FlaskConical size={15} />} label="Mock Interview" active={location.pathname === '/interview'} />
              <div className="mt-4 mb-2 px-2 text-[10px] uppercase tracking-widest text-slate-600 font-display">
                Topics ({TOPICS.length})
              </div>
              {TOPICS.map((t) => (
                <NavItem
                  key={t.id}
                  to={`/topic/${t.slug}`}
                  icon={<span className="text-sm">{t.emoji}</span>}
                  label={t.title}
                  active={location.pathname === `/topic/${t.slug}`}
                />
              ))}
            </nav>
            <PomodoroTimer compact />
          </motion.aside>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-12 glass border-b border-white/5 flex items-center px-4 gap-3 flex-shrink-0 z-20">
          {!sidebarOpen && (
            <button onClick={() => setSidebarOpen(true)} className="text-slate-500 hover:text-slate-300 transition-colors">
              <Menu size={18} />
            </button>
          )}
          <div className="flex-1" />
          {!sidebarOpen && <PomodoroTimer micro />}
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Flame size={13} className="text-amber-400" />
            <span>{streak}d</span>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

interface NavItemProps {
  to: string
  icon: React.ReactNode
  label: string
  active: boolean
  key?: string
}

function NavItem({ to, icon, label, active }: NavItemProps) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg mb-0.5 transition-all text-sm group ${
        active ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
      }`}
    >
      <span className={`flex-shrink-0 ${active ? 'opacity-100' : 'opacity-60 group-hover:opacity-80'}`}>{icon}</span>
      <span className="truncate font-medium">{label}</span>
      {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-ocean-400 flex-shrink-0" />}
    </Link>
  )
}
