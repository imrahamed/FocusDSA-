// src/components/SolutionWalkthrough.tsx
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Play, Pause, SkipBack, SkipForward, RotateCcw,
  ChevronRight, Lightbulb, Code2, CheckCircle2
} from 'lucide-react'
import type { WalkthroughStep } from '../data/topicsData'

interface Props {
  steps: WalkthroughStep[]
  title: string
}

type CellState = 'default' | 'active' | 'comparing' | 'found' | 'eliminated' | 'pointer' | 'result' | 'visited'

// ─── Array row renderer ────────────────────────────────────────────────────────
function ArrayRow({
  values, labels, states, pointers, mapEntries, title, subtitle
}: {
  values: (string | number)[]
  labels?: string[]
  states?: CellState[]
  pointers?: Record<number, string>
  mapEntries?: { key: string | number; value: string | number }[]
  title?: string
  subtitle?: string
}) {
  const colorMap: Record<CellState, string> = {
    default:    'bg-ink-700/80 border-white/10 text-slate-300',
    active:     'bg-ocean-500/25 border-ocean-400 text-ocean-200',
    comparing:  'bg-amber-500/25 border-amber-400 text-amber-200',
    found:      'bg-jade-500/25 border-jade-400 text-jade-200',
    eliminated: 'bg-white/5 border-white/5 text-slate-600 line-through',
    pointer:    'bg-violet-500/25 border-violet-400 text-violet-200',
    result:     'bg-rose-500/25 border-rose-400 text-rose-200',
    visited:    'bg-slate-700/50 border-slate-600 text-slate-400',
  }

  return (
    <div className="mb-2">
      {(title || subtitle) && (
        <div className="flex items-baseline gap-2 mb-1.5">
          {title && <span className="text-xs font-semibold text-slate-400">{title}</span>}
          {subtitle && <span className="text-[10px] text-slate-600">{subtitle}</span>}
        </div>
      )}
      <div className="flex gap-1.5 flex-wrap">
        {values.map((val, i) => {
          const state = states?.[i] ?? 'default'
          return (
            <div key={i} className="flex flex-col items-center gap-0.5">
              {pointers?.[i] && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                  className="text-[9px] font-mono text-violet-400 font-bold leading-none"
                >
                  {pointers[i]}
                </motion.div>
              )}
              <motion.div
                layout
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 28, delay: i * 0.03 }}
                className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center font-mono text-sm font-bold transition-all duration-300 ${colorMap[state]}`}
              >
                {val}
              </motion.div>
              {labels?.[i] !== undefined && (
                <div className="text-[9px] text-slate-600 font-mono">{labels[i]}</div>
              )}
            </div>
          )
        })}
      </div>

      {/* HashMap overlay */}
      {mapEntries && mapEntries.length > 0 && (
        <div className="mt-3 p-3 bg-ink-800/60 rounded-lg border border-white/5">
          <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-2">HashMap</div>
          <div className="flex flex-wrap gap-2">
            {mapEntries.map((entry, i) => (
              <motion.div
                key={`${entry.key}-${i}`}
                initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.04 }}
                className="flex items-center gap-1 bg-ocean-500/10 border border-ocean-500/20 rounded px-2 py-1"
              >
                <span className="font-mono text-xs text-ocean-300">{entry.key}</span>
                <ChevronRight size={9} className="text-slate-600" />
                <span className="font-mono text-xs text-jade-300">{entry.value}</span>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Tree node renderer ────────────────────────────────────────────────────────
function TreeViz({ nodes, edges, highlighted }: {
  nodes: { id: string; label: string; x: number; y: number; state?: CellState }[]
  edges: [string, string][]
  highlighted?: string[]
}) {
  const stateColor: Record<CellState, string> = {
    default: '#1e293b', active: 'rgba(14,165,233,0.4)', comparing: 'rgba(251,191,36,0.4)',
    found: 'rgba(34,197,94,0.4)', eliminated: 'rgba(255,255,255,0.05)', pointer: 'rgba(139,92,246,0.4)',
    result: 'rgba(244,63,94,0.4)', visited: 'rgba(100,116,139,0.3)',
  }
  const borderColor: Record<CellState, string> = {
    default: 'rgba(255,255,255,0.1)', active: '#0ea5e9', comparing: '#fbbf24',
    found: '#22c55e', eliminated: 'rgba(255,255,255,0.05)', pointer: '#8b5cf6',
    result: '#f43f5e', visited: '#64748b',
  }

  const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]))

  return (
    <div className="relative w-full overflow-x-auto">
      <svg width="100%" height="220" viewBox="0 0 500 220" className="min-w-[320px]">
        {edges.map(([a, b], i) => {
          const na = nodeMap[a], nb = nodeMap[b]
          if (!na || !nb) return null
          return (
            <motion.line key={i}
              x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
              stroke="rgba(255,255,255,0.08)" strokeWidth="1.5"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            />
          )
        })}
        {nodes.map(node => {
          const state = node.state ?? 'default'
          const isHighlighted = highlighted?.includes(node.id)
          return (
            <g key={node.id}>
              <motion.circle
                cx={node.x} cy={node.y} r={20}
                fill={stateColor[state]}
                stroke={isHighlighted ? '#fbbf24' : borderColor[state]}
                strokeWidth={isHighlighted ? 2.5 : 1.5}
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              />
              <text x={node.x} y={node.y + 4} textAnchor="middle"
                fill={state === 'eliminated' ? '#475569' : '#e2e8f0'}
                fontSize="12" fontFamily="JetBrains Mono, monospace" fontWeight="600">
                {node.label}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

// ─── Grid renderer (for DP tables) ────────────────────────────────────────────
function GridViz({ rows, colHeaders, rowHeaders, highlighted }: {
  rows: (string | number)[][]
  colHeaders?: string[]
  rowHeaders?: string[]
  highlighted?: [number, number][]
}) {
  const isHighlighted = (r: number, c: number) =>
    highlighted?.some(([hr, hc]) => hr === r && hc === c) ?? false

  return (
    <div className="overflow-x-auto">
      <table className="border-collapse text-xs font-mono">
        {colHeaders && (
          <thead>
            <tr>
              {rowHeaders && <th className="w-8" />}
              {colHeaders.map((h, i) => (
                <th key={i} className="w-10 h-8 text-slate-500 font-normal text-center px-1">{h}</th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {rowHeaders?.[ri] !== undefined && (
                <td className="text-slate-500 pr-2 text-right w-8">{rowHeaders[ri]}</td>
              )}
              {row.map((cell, ci) => (
                <motion.td key={ci}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: (ri * row.length + ci) * 0.02 }}
                  className={`w-10 h-9 text-center border transition-all duration-300 ${
                    isHighlighted(ri, ci)
                      ? 'border-ocean-400 bg-ocean-500/25 text-ocean-200 font-bold'
                      : 'border-white/5 bg-ink-800/60 text-slate-400'
                  }`}
                >
                  {cell}
                </motion.td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ─── Bar chart renderer ────────────────────────────────────────────────────────
function BarViz({ values, states, pointers, labels }: {
  values: number[]
  states?: CellState[]
  pointers?: Record<number, string>
  labels?: string[]
}) {
  const maxVal = Math.max(...values, 1)
  const colorMap: Record<CellState, { bg: string; border: string }> = {
    default:    { bg: 'rgba(30,41,59,0.8)',   border: 'rgba(255,255,255,0.08)' },
    active:     { bg: 'rgba(14,165,233,0.35)', border: '#0ea5e9' },
    comparing:  { bg: 'rgba(251,191,36,0.35)', border: '#fbbf24' },
    found:      { bg: 'rgba(34,197,94,0.3)',   border: '#22c55e' },
    eliminated: { bg: 'rgba(255,255,255,0.03)', border: 'rgba(255,255,255,0.05)' },
    pointer:    { bg: 'rgba(139,92,246,0.35)', border: '#8b5cf6' },
    result:     { bg: 'rgba(244,63,94,0.35)',  border: '#f43f5e' },
    visited:    { bg: 'rgba(100,116,139,0.3)', border: '#64748b' },
  }

  return (
    <div className="flex items-end gap-1.5 h-32">
      {values.map((val, i) => {
        const state = states?.[i] ?? 'default'
        const { bg, border } = colorMap[state]
        const heightPct = Math.max(8, (val / maxVal) * 100)
        return (
          <div key={i} className="flex flex-col items-center gap-0.5 flex-1" style={{ minWidth: 0 }}>
            {pointers?.[i] && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-[9px] font-mono text-violet-400 font-bold">{pointers[i]}</motion.span>
            )}
            <div className="text-[9px] text-slate-500 font-mono">{val}</div>
            <motion.div
              className="w-full rounded-t-md border-2"
              style={{ background: bg, borderColor: border }}
              animate={{ height: `${heightPct}%` }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            />
            {labels?.[i] && <div className="text-[9px] text-slate-600 font-mono">{labels[i]}</div>}
          </div>
        )
      })}
    </div>
  )
}

// ─── Linked list renderer ──────────────────────────────────────────────────────
function LinkedListViz({ nodes, highlighted }: {
  nodes: { val: string | number; state?: CellState }[]
  highlighted?: number[]
}) {
  const colorMap: Record<CellState, string> = {
    default:   'border-white/10 bg-ink-700/80 text-slate-300',
    active:    'border-ocean-400 bg-ocean-500/25 text-ocean-200',
    comparing: 'border-amber-400 bg-amber-500/25 text-amber-200',
    found:     'border-jade-400 bg-jade-500/25 text-jade-200',
    eliminated:'border-white/5 bg-white/3 text-slate-600',
    pointer:   'border-violet-400 bg-violet-500/25 text-violet-200',
    result:    'border-rose-400 bg-rose-500/25 text-rose-200',
    visited:   'border-slate-600 bg-slate-700/40 text-slate-400',
  }
  return (
    <div className="flex items-center gap-1 flex-wrap">
      {nodes.map((node, i) => {
        const state = node.state ?? 'default'
        const isHL = highlighted?.includes(i)
        return (
          <div key={i} className="flex items-center gap-1">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className={`w-11 h-11 rounded-lg border-2 flex items-center justify-center font-mono text-sm font-bold transition-all ${colorMap[state]} ${isHL ? 'ring-2 ring-amber-400/50' : ''}`}
            >
              {node.val}
            </motion.div>
            {i < nodes.length - 1 && (
              <span className="text-slate-600 text-sm font-mono">→</span>
            )}
          </div>
        )
      })}
      <span className="text-slate-600 text-sm font-mono ml-1">∅</span>
    </div>
  )
}

// ─── Code snippet with highlight ──────────────────────────────────────────────
function CodeSnippet({ code, highlightLines }: { code: string; highlightLines?: number[] }) {
  const lines = code.split('\n')
  return (
    <div className="rounded-lg overflow-hidden border border-white/5 text-xs font-mono bg-ink-950/70">
      {lines.map((line, i) => {
        const lineNum = i + 1
        const isHL = highlightLines?.includes(lineNum)
        return (
          <div key={i}
            className={`flex items-start transition-colors duration-300 ${isHL ? 'bg-ocean-500/15 border-l-2 border-ocean-400' : 'border-l-2 border-transparent'}`}
          >
            <span className="w-8 flex-shrink-0 text-slate-700 select-none text-right pr-3 py-0.5 text-[10px] leading-5">{lineNum}</span>
            <pre className={`py-0.5 leading-5 whitespace-pre ${isHL ? 'text-ocean-200' : 'text-slate-400'}`}>{line}</pre>
          </div>
        )
      })}
    </div>
  )
}

// ─── Visual frame renderer ─────────────────────────────────────────────────────
function VisualFrame({ step }: { step: WalkthroughStep }) {
  const v = step.visual
  if (!v) return null

  return (
    <div className="mb-4">
      {v.type === 'array' && v.array && (
        <ArrayRow
          values={v.array}
          labels={v.labels}
          states={v.states as CellState[]}
          pointers={v.pointers}
          mapEntries={v.mapEntries}
        />
      )}
      {v.type === 'bars' && v.array && (
        <BarViz
          values={v.array as number[]}
          states={v.states as CellState[]}
          pointers={v.pointers}
          labels={v.labels}
        />
      )}
      {v.type === 'tree' && v.treeNodes && (
        <TreeViz nodes={v.treeNodes as { id: string; label: string; x: number; y: number; state?: CellState }[]} edges={v.treeEdges ?? []} highlighted={v.treeHighlighted} />
      )}
      {v.type === 'grid' && v.grid && (
        <GridViz rows={v.grid} colHeaders={v.colHeaders} rowHeaders={v.rowHeaders} highlighted={v.gridHighlighted} />
      )}
      {v.type === 'linkedlist' && v.llNodes && (
        <LinkedListViz nodes={v.llNodes as { val: string | number; state?: CellState }[]} highlighted={v.llHighlighted} />
      )}
      {v.type === 'split' && (
        <div className="flex gap-4 flex-wrap">
          {v.left && <div className="flex-1 min-w-0">
            <div className="text-[10px] text-slate-500 mb-1.5">{v.leftLabel}</div>
            <ArrayRow values={v.left} states={v.leftStates as CellState[]} />
          </div>}
          {v.right && <div className="flex-1 min-w-0">
            <div className="text-[10px] text-slate-500 mb-1.5">{v.rightLabel}</div>
            <ArrayRow values={v.right} states={v.rightStates as CellState[]} />
          </div>}
        </div>
      )}
    </div>
  )
}

// ─── Main walkthrough component ────────────────────────────────────────────────
export default function SolutionWalkthrough({ steps, title }: Props) {
  const [idx, setIdx] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [speed, setSpeed] = useState(1800)

  useEffect(() => { setIdx(0); setPlaying(false) }, [steps])

  useEffect(() => {
    if (!playing) return
    if (idx >= steps.length - 1) { setPlaying(false); return }
    const id = setTimeout(() => setIdx((i: number) => i + 1), speed)
    return () => clearTimeout(id)
  }, [playing, idx, steps.length, speed])

  const step = steps[idx]
  if (!step) return null

  const phaseColors: Record<string, string> = {
    init:      'text-slate-400 bg-white/5',
    scan:      'text-ocean-400 bg-ocean-500/10',
    compare:   'text-amber-400 bg-amber-500/10',
    update:    'text-violet-400 bg-violet-500/10',
    found:     'text-jade-400 bg-jade-500/10',
    backtrack: 'text-rose-400 bg-rose-500/10',
    done:      'text-jade-400 bg-jade-500/10',
  }
  const phaseColor = phaseColors[step.phase ?? 'init'] ?? 'text-slate-400 bg-white/5'

  return (
    <div className="glass rounded-xl border border-white/5 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-3.5 border-b border-white/5 bg-white/[0.02]">
        <div className="w-8 h-8 rounded-lg bg-ocean-500/15 flex items-center justify-center flex-shrink-0">
          <BarChart3Icon />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-display font-bold text-white text-sm">Step-by-Step Solution</div>
          <div className="text-[10px] text-slate-500">{title}</div>
        </div>
        {/* Speed */}
        <select value={speed} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSpeed(Number(e.target.value))}
          className="bg-ink-800/80 border border-white/10 rounded text-xs text-slate-400 px-2 py-1 focus:outline-none">
          <option value={3000}>0.5×</option>
          <option value={1800}>1×</option>
          <option value={900}>2×</option>
          <option value={400}>4×</option>
        </select>
      </div>

      {/* Step content */}
      <div className="p-5">
        {/* Progress dots */}
        <div className="flex gap-1 mb-5 flex-wrap">
          {steps.map((s, i) => (
            <button key={i} onClick={() => { setIdx(i); setPlaying(false) }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === idx ? 'w-6 bg-ocean-400' : i < idx ? 'w-2 bg-jade-500/60' : 'w-2 bg-white/10'
              }`}
            />
          ))}
        </div>

        {/* Step header */}
        <AnimatePresence mode="wait">
          <motion.div key={idx} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}>

            <div className="flex items-start gap-3 mb-4">
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-ocean-500/20 border border-ocean-500/30 flex items-center justify-center">
                <span className="font-mono text-xs font-bold text-ocean-300">{idx + 1}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h4 className="font-display font-bold text-white text-sm">{step.title}</h4>
                  {step.phase && (
                    <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${phaseColor}`}>
                      {step.phase}
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">{step.explanation}</p>
              </div>
            </div>

            {/* Visual */}
            <VisualFrame step={step} />

            {/* Key insight callout */}
            {step.insight && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
                className="flex items-start gap-2 p-3 bg-amber-500/8 border border-amber-500/20 rounded-lg mb-4">
                <Lightbulb size={13} className="text-amber-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-amber-200/80 leading-relaxed">{step.insight}</p>
              </motion.div>
            )}

            {/* Code snippet */}
            {step.code && (
              <div className="mb-4">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Code2 size={11} className="text-slate-500" />
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider">Relevant code</span>
                </div>
                <CodeSnippet code={step.code} highlightLines={step.codeHighlight} />
              </div>
            )}

            {/* Variables state */}
            {step.variables && Object.keys(step.variables).length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {Object.entries(step.variables).map(([k, v]) => (
                  <motion.div key={k} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    className="flex items-center gap-1.5 bg-ink-800/60 border border-white/8 rounded px-2.5 py-1.5">
                    <span className="text-xs text-slate-500 font-mono">{k}</span>
                    <span className="text-xs text-white/30">=</span>
                    <span className="text-xs text-jade-300 font-mono font-bold">{String(v)}</span>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Complexity note */}
            {step.complexity && (
              <div className="text-[10px] text-slate-600 mt-3 flex items-center gap-1">
                <CheckCircle2 size={10} className="text-jade-600" />
                {step.complexity}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="px-5 py-3.5 border-t border-white/5 bg-white/[0.02] flex items-center gap-3">
        <button onClick={() => { setIdx(0); setPlaying(false) }}
          className="p-1.5 text-slate-600 hover:text-slate-400 transition-colors">
          <RotateCcw size={13} />
        </button>
        <button onClick={() => { setIdx((i: number) => Math.max(0, i - 1)); setPlaying(false) }}
          className="p-1.5 text-slate-500 hover:text-white transition-colors disabled:opacity-30"
          disabled={idx === 0}>
          <SkipBack size={15} />
        </button>
        <button onClick={() => setPlaying((p: boolean) => !p)}
          className="w-9 h-9 rounded-full bg-ocean-500/20 hover:bg-ocean-500/30 text-ocean-300 flex items-center justify-center transition-colors">
          {playing ? <Pause size={15} /> : <Play size={15} />}
        </button>
        <button onClick={() => { setIdx((i: number) => Math.min(steps.length - 1, i + 1)); setPlaying(false) }}
          className="p-1.5 text-slate-500 hover:text-white transition-colors disabled:opacity-30"
          disabled={idx === steps.length - 1}>
          <SkipForward size={15} />
        </button>

        <div className="flex-1 mx-2">
          <input type="range" min={0} max={steps.length - 1} value={idx}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setIdx(Number(e.target.value)); setPlaying(false) }}
            className="w-full accent-ocean-500 h-1 cursor-pointer" />
        </div>
        <span className="text-xs text-slate-600 font-mono w-12 text-right">{idx + 1} / {steps.length}</span>
      </div>
    </div>
  )
}

function BarChart3Icon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
  )
}
