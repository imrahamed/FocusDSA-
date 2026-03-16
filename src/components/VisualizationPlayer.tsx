// src/components/VisualizationPlayer.tsx
import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, SkipForward, SkipBack, RotateCcw, Gauge } from 'lucide-react'
import { useDSAStore } from '../store/useDSAStore'
import type { Topic } from '../data/topicsData'

interface Step {
  array: number[]
  highlighted: number[]
  comparing: number[]
  sorted: number[]
  pivot: number[]
  swapping: number[]
  message: string
  pointers?: Record<string, number>
}

function generateBubbleSortSteps(arr: number[]): Step[] {
  const a = [...arr], steps: Step[] = [], sorted: number[] = []
  steps.push({ array: [...a], highlighted: [], comparing: [], sorted: [], pivot: [], swapping: [], message: 'Initial array — ready to sort.' })
  for (let i = 0; i < a.length - 1; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {
      steps.push({ array: [...a], highlighted: [], comparing: [j, j+1], sorted: [...sorted], pivot: [], swapping: [], message: `Comparing a[${j}]=${a[j]} and a[${j+1}]=${a[j+1]}` })
      if (a[j] > a[j+1]) {
        steps.push({ array: [...a], highlighted: [], comparing: [], sorted: [...sorted], pivot: [], swapping: [j, j+1], message: `Swapping ${a[j]} and ${a[j+1]}` });
        [a[j], a[j+1]] = [a[j+1], a[j]]
        steps.push({ array: [...a], highlighted: [], comparing: [], sorted: [...sorted], pivot: [], swapping: [], message: `Swapped! Array updated.` })
      }
    }
    sorted.unshift(a.length - 1 - i)
    steps.push({ array: [...a], highlighted: [], comparing: [], sorted: [...sorted], pivot: [], swapping: [], message: `Element ${a[a.length-1-i]} is now in its correct position.` })
  }
  steps.push({ array: [...a], highlighted: [], comparing: [], sorted: a.map((_,i)=>i), pivot: [], swapping: [], message: '✅ Array fully sorted!' })
  return steps
}

function generateQuickSortSteps(arr: number[]): Step[] {
  const a = [...arr], steps: Step[] = [], sorted: number[] = []
  steps.push({ array: [...a], highlighted: [], comparing: [], sorted: [], pivot: [], swapping: [], message: 'QuickSort: choose a pivot, partition around it.' })

  function partition(lo: number, hi: number) {
    const pivotIdx = hi
    steps.push({ array: [...a], highlighted: [], comparing: [], sorted: [...sorted], pivot: [pivotIdx], swapping: [], message: `Pivot = ${a[pivotIdx]} at index ${pivotIdx}`, pointers: { lo, hi } })
    let p = lo
    for (let i = lo; i < hi; i++) {
      steps.push({ array: [...a], highlighted: [i], comparing: [i, pivotIdx], sorted: [...sorted], pivot: [pivotIdx], swapping: [], message: `Compare a[${i}]=${a[i]} with pivot=${a[pivotIdx]}` })
      if (a[i] <= a[pivotIdx]) {
        if (i !== p) { steps.push({ array: [...a], highlighted: [], comparing: [], sorted: [...sorted], pivot: [pivotIdx], swapping: [i, p], message: `Swap a[${i}]=${a[i]} and a[${p}]=${a[p]}` }); [a[i], a[p]] = [a[p], a[i]] }
        p++
      }
    }
    steps.push({ array: [...a], highlighted: [], comparing: [], sorted: [...sorted], pivot: [pivotIdx], swapping: [p, hi], message: `Place pivot ${a[hi]} at position ${p}` });
    [a[p], a[hi]] = [a[hi], a[p]]
    sorted.push(p)
    steps.push({ array: [...a], highlighted: [], comparing: [], sorted: [...sorted], pivot: [], swapping: [], message: `Pivot ${a[p]} is in its final position!` })
    return p
  }

  function qs(lo: number, hi: number) {
    if (lo >= hi) { if (lo === hi) sorted.push(lo); return }
    const p = partition(lo, hi)
    qs(lo, p - 1)
    qs(p + 1, hi)
  }
  qs(0, a.length - 1)
  steps.push({ array: [...a], highlighted: [], comparing: [], sorted: a.map((_,i)=>i), pivot: [], swapping: [], message: '✅ QuickSort complete!' })
  return steps
}

function generateMergeSortSteps(arr: number[]): Step[] {
  const a = [...arr], steps: Step[] = []
  steps.push({ array: [...a], highlighted: [], comparing: [], sorted: [], pivot: [], swapping: [], message: 'MergeSort: divide in halves, merge sorted halves.' })

  function merge(l: number, m: number, r: number) {
    const left = a.slice(l, m+1), right = a.slice(m+1, r+1)
    let i = 0, j = 0, k = l
    steps.push({ array: [...a], highlighted: Array.from({length: r-l+1},(_,x)=>l+x), comparing: [], sorted: [], pivot: [], swapping: [], message: `Merging [${l}..${m}] and [${m+1}..${r}]` })
    while (i < left.length && j < right.length) {
      steps.push({ array: [...a], highlighted: [l+i, m+1+j], comparing: [l+i, m+1+j], sorted: [], pivot: [], swapping: [], message: `Compare ${left[i]} and ${right[j]}` })
      if (left[i] <= right[j]) { a[k++] = left[i++] } else { a[k++] = right[j++] }
      steps.push({ array: [...a], highlighted: [k-1], comparing: [], sorted: [], pivot: [], swapping: [], message: `Placed ${a[k-1]} at position ${k-1}` })
    }
    while (i < left.length) { a[k++] = left[i++] }
    while (j < right.length) { a[k++] = right[j++] }
    steps.push({ array: [...a], highlighted: Array.from({length: r-l+1},(_,x)=>l+x), comparing: [], sorted: Array.from({length: r-l+1},(_,x)=>l+x), pivot: [], swapping: [], message: `Merged segment [${l}..${r}]` })
  }

  function ms(l: number, r: number) {
    if (l >= r) return
    const m = Math.floor((l + r) / 2)
    ms(l, m); ms(m+1, r); merge(l, m, r)
  }
  ms(0, a.length - 1)
  steps.push({ array: [...a], highlighted: [], comparing: [], sorted: a.map((_,i)=>i), pivot: [], swapping: [], message: '✅ MergeSort complete!' })
  return steps
}

function generateBinarySearchSteps(arr: number[], target: number): Step[] {
  const sorted = [...arr].sort((a,b)=>a-b)
  const steps: Step[] = []
  steps.push({ array: sorted, highlighted: [], comparing: [], sorted: sorted.map((_,i)=>i), pivot: [], swapping: [], message: `Binary search for ${target} in sorted array.` })
  let lo = 0, hi = sorted.length - 1
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2)
    steps.push({ array: sorted, highlighted: [mid], comparing: [lo, hi], sorted: sorted.map((_,i)=>i), pivot: [mid], swapping: [], message: `lo=${lo}, hi=${hi}, mid=${mid} → value=${sorted[mid]}`, pointers: { lo, hi, mid } })
    if (sorted[mid] === target) {
      steps.push({ array: sorted, highlighted: [mid], comparing: [], sorted: sorted.map((_,i)=>i), pivot: [], swapping: [], message: `✅ Found ${target} at index ${mid}!` })
      return steps
    } else if (sorted[mid] < target) {
      steps.push({ array: sorted, highlighted: [], comparing: [mid+1, hi], sorted: sorted.map((_,i)=>i), pivot: [], swapping: [], message: `${sorted[mid]} < ${target}, search right half.` })
      lo = mid + 1
    } else {
      steps.push({ array: sorted, highlighted: [], comparing: [lo, mid-1], sorted: sorted.map((_,i)=>i), pivot: [], swapping: [], message: `${sorted[mid]} > ${target}, search left half.` })
      hi = mid - 1
    }
  }
  steps.push({ array: sorted, highlighted: [], comparing: [], sorted: sorted.map((_,i)=>i), pivot: [], swapping: [], message: `❌ ${target} not found in array.` })
  return steps
}

function generateTwoSumSteps(arr: number[], target: number): Step[] {
  const steps: Step[] = []
  const map = new Map()
  steps.push({ array: arr, highlighted: [], comparing: [], sorted: [], pivot: [], swapping: [], message: `Two Sum: find pair summing to ${target}. HashMap approach.` })
  for (let i = 0; i < arr.length; i++) {
    const comp = target - arr[i]
    steps.push({ array: arr, highlighted: [i], comparing: [], sorted: [], pivot: [], swapping: [], message: `i=${i}, arr[i]=${arr[i]}, looking for complement=${comp} in HashMap` })
    if (map.has(comp)) {
      const j = map.get(comp)
      steps.push({ array: arr, highlighted: [j, i], comparing: [j, i], sorted: [], pivot: [], swapping: [], message: `✅ Found! arr[${j}]=${arr[j]} + arr[${i}]=${arr[i]} = ${target}` })
      return steps
    }
    map.set(arr[i], i)
    steps.push({ array: arr, highlighted: [i], comparing: [], sorted: [], pivot: [], swapping: [], message: `Stored ${arr[i]}→${i} in HashMap. HashMap size: ${map.size}` })
  }
  steps.push({ array: arr, highlighted: [], comparing: [], sorted: [], pivot: [], swapping: [], message: 'No pair found.' })
  return steps
}

const DEFAULT_ARRAYS: Record<string, number[]> = {
  sorting: [64, 34, 25, 12, 22, 11, 90],
  array: [2, 7, 11, 15, 3, 6, 4],
  'binary-search': [11, 12, 22, 25, 34, 64, 90],
  default: [5, 3, 8, 1, 9, 2, 7, 4, 6],
}

export default function VisualizationPlayer({ topic }: { topic: Topic }) {
  const [algo, setAlgo] = useState<string>('bubble')
  const [inputArr, setInputArr] = useState(DEFAULT_ARRAYS[topic.visualizationType] || DEFAULT_ARRAYS.default)
  const [inputStr, setInputStr] = useState(inputArr.join(', '))
  const [target, setTarget] = useState(25)
  const [steps, setSteps] = useState<Step[]>([])
  const [stepIdx, setStepIdx] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [speed, setSpeed] = useState(600)
  const { markVisualizationWatched } = useDSAStore()

  const algos = topic.visualizationType === 'sorting'
    ? [{ id: 'bubble', label: 'Bubble Sort' }, { id: 'quick', label: 'Quick Sort' }, { id: 'merge', label: 'Merge Sort' }]
    : topic.visualizationType === 'array'
    ? [{ id: 'twopsum', label: 'Two Sum' }, { id: 'bsearch', label: 'Binary Search' }]
    : [{ id: 'dfs', label: 'DFS Traversal' }, { id: 'bfs', label: 'BFS Traversal' }]

  const buildSteps = useCallback((algoId: string, arr: number[]) => {
    if (algoId === 'bubble') return generateBubbleSortSteps(arr)
    if (algoId === 'quick') return generateQuickSortSteps(arr)
    if (algoId === 'merge') return generateMergeSortSteps(arr)
    if (algoId === 'bsearch') return generateBinarySearchSteps(arr, target)
    if (algoId === 'twopsum') return generateTwoSumSteps(arr, target)
    return generateBubbleSortSteps(arr)
  }, [target])

  useEffect(() => {
    const s = buildSteps(algo, inputArr)
    setSteps(s)
    setStepIdx(0)
    setPlaying(false)
  }, [algo, inputArr, target, buildSteps])

  useEffect(() => {
    if (!playing) return
    if (stepIdx >= steps.length - 1) { setPlaying(false); markVisualizationWatched(topic.id); return }
    const id = setTimeout(() => setStepIdx((i: number) => i + 1), speed)
    return () => clearTimeout(id)
  }, [playing, stepIdx, steps, speed, topic.id, markVisualizationWatched])

  const parseInput = () => {
    try {
      const arr = inputStr.split(',').map((s: string) => parseInt(s.trim())).filter((n: number) => !isNaN(n)).slice(0, 12)
      if (arr.length >= 2) setInputArr(arr)
    } catch {}
  }

  const cur = steps[stepIdx]
  const maxVal = cur ? Math.max(...cur.array, 1) : 1

  const getCellClass = (idx: number) => {
    if (!cur) return 'default'
    if (cur.swapping.includes(idx)) return 'swapping'
    if (cur.pivot.includes(idx)) return 'pivot'
    if (cur.comparing.includes(idx)) return 'comparing'
    if (cur.sorted.includes(idx)) return 'sorted'
    if (cur.highlighted.includes(idx)) return 'active'
    return 'default'
  }

  return (
    <div className="space-y-5">
      {/* Algo selector */}
      <div className="flex flex-wrap gap-2">
        {algos.map(a => (
          <button key={a.id} onClick={() => setAlgo(a.id)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              algo === a.id ? 'bg-ocean-500/20 text-ocean-300 border border-ocean-500/30' : 'bg-white/5 text-slate-400 hover:text-white border border-transparent'
            }`}>
            {a.label}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-2 flex-wrap">
        <input value={inputStr} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputStr(e.target.value)} onBlur={parseInput}
          className="flex-1 min-w-0 bg-ink-800/80 border border-white/10 rounded-lg px-3 py-2 text-sm font-mono text-slate-300 focus:outline-none focus:border-ocean-500/50" placeholder="e.g. 5, 3, 8, 1, 9" />
        {(algo === 'bsearch' || algo === 'twopsum') && (
          <input type="number" value={target} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTarget(Number(e.target.value))}
            className="w-24 bg-ink-800/80 border border-white/10 rounded-lg px-3 py-2 text-sm font-mono text-slate-300 focus:outline-none" placeholder="target" />
        )}
        <button onClick={parseInput} className="px-4 py-2 bg-ocean-500/20 hover:bg-ocean-500/30 text-ocean-300 rounded-lg text-sm font-semibold transition-colors">Apply</button>
      </div>

      {/* Visualization */}
      <div className="glass rounded-xl p-6 border border-white/5 min-h-64">
        {cur && (
          <>
            {/* Bar chart */}
            <div className="flex items-end gap-1.5 h-40 mb-4">
              {cur.array.map((val: number, i: number) => (
                <motion.div key={`${i}-${val}`} layout className="flex-1 flex flex-col items-center gap-1" style={{ minWidth: 0 }}>
                  <span className="text-[9px] text-slate-500 font-mono">{val}</span>
                  <motion.div
                    className={`vis-cell w-full rounded-t-md`}
                    style={{
                      height: `${Math.max(8, (val / maxVal) * 120)}px`,
                      background: cur.swapping.includes(i) ? 'rgba(244,63,94,0.4)' :
                        cur.pivot.includes(i) ? 'rgba(139,92,246,0.4)' :
                        cur.comparing.includes(i) ? 'rgba(251,191,36,0.4)' :
                        cur.sorted.includes(i) ? 'rgba(34,197,94,0.25)' :
                        cur.highlighted.includes(i) ? 'rgba(14,165,233,0.4)' :
                        'rgba(30,41,59,0.8)',
                      borderColor: cur.swapping.includes(i) ? '#f43f5e' :
                        cur.pivot.includes(i) ? '#8b5cf6' :
                        cur.comparing.includes(i) ? '#fbbf24' :
                        cur.sorted.includes(i) ? '#22c55e' :
                        cur.highlighted.includes(i) ? '#0ea5e9' :
                        'rgba(255,255,255,0.08)',
                      borderWidth: 1.5,
                      borderStyle: 'solid',
                    }}
                    animate={{ height: `${Math.max(8, (val / maxVal) * 120)}px` }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Pointer labels */}
            {cur.pointers && (
              <div className="flex gap-4 mb-3 text-xs font-mono">
                {Object.entries(cur.pointers).map(([k, v]) => (
                  <span key={k} className="text-slate-400">{k}=<span className="text-ocean-400">{v}</span></span>
                ))}
              </div>
            )}

            {/* Message */}
            <AnimatePresence mode="wait">
              <motion.div key={stepIdx} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                className="text-sm text-slate-300 bg-ink-800/50 rounded-lg px-4 py-2.5 font-mono border border-white/5">
                {cur.message}
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 text-xs text-slate-500">
        {[
          ['active', 'Highlighted', '#0ea5e9'],
          ['comparing', 'Comparing', '#fbbf24'],
          ['sorted', 'Sorted', '#22c55e'],
          ['pivot', 'Pivot', '#8b5cf6'],
          ['swapping', 'Swapping', '#f43f5e'],
        ].map(([_, label, color]) => (
          <div key={label} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm" style={{ background: `${color}40`, border: `1.5px solid ${color}` }} />
            <span>{label}</span>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <button onClick={() => setStepIdx(0)} className="p-2 text-slate-500 hover:text-white transition-colors"><RotateCcw size={15} /></button>
        <button onClick={() => setStepIdx((i: number) => Math.max(0, i - 1))} className="p-2 text-slate-500 hover:text-white transition-colors"><SkipBack size={15} /></button>
        <button onClick={() => setPlaying(!playing)}
          className="w-10 h-10 rounded-full bg-ocean-500/20 hover:bg-ocean-500/30 text-ocean-300 flex items-center justify-center transition-colors">
          {playing ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <button onClick={() => setStepIdx((i: number) => Math.min(steps.length - 1, i + 1))} className="p-2 text-slate-500 hover:text-white transition-colors"><SkipForward size={15} /></button>

        <div className="flex-1 mx-2">
          <input type="range" min={0} max={Math.max(0, steps.length - 1)} value={stepIdx}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setStepIdx(Number(e.target.value)); setPlaying(false) }}
            className="w-full accent-ocean-500 cursor-pointer" />
        </div>
        <span className="text-xs text-slate-500 w-20 text-right font-mono">{stepIdx + 1} / {steps.length}</span>

        <div className="flex items-center gap-1.5 ml-2">
          <Gauge size={13} className="text-slate-500" />
          <select value={speed} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSpeed(Number(e.target.value))}
            className="bg-ink-800/80 border border-white/10 rounded text-xs text-slate-400 px-2 py-1 focus:outline-none">
            <option value={1200}>0.5x</option>
            <option value={600}>1x</option>
            <option value={300}>2x</option>
            <option value={100}>5x</option>
          </select>
        </div>
      </div>
    </div>
  )
}
