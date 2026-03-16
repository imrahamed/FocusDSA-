// src/components/CodeEditor.tsx
import React, { useState, useRef } from 'react'
import Editor from '@monaco-editor/react'
import { motion } from 'framer-motion'
import { Play, CheckCircle, XCircle, RotateCcw, Loader2, Terminal } from 'lucide-react'
import type { Question } from '../data/topicsData'

interface TestResult { passed: boolean; input: string; expected: string; actual: string; error?: string }
interface Props { question: Question; onSolve?: (timeTakenMs: number) => void }

export default function CodeEditor({ question, onSolve }: Props) {
  const [language, setLanguage] = useState<'javascript' | 'python'>('javascript')
  const [code, setCode] = useState(question.starterCode.js)
  const [results, setResults] = useState<TestResult[]>([])
  const [running, setRunning] = useState(false)
  const [allPassed, setAllPassed] = useState(false)
  const startTime = useRef(Date.now())

  const runCode = async () => {
    setRunning(true)
    setResults([])
    await new Promise((r) => setTimeout(r, 400))
    const testResults: TestResult[] = []
    for (const tc of question.testCases.filter((t: { hidden?: boolean }) => !t.hidden)) {
      try {
        let actual = ''
        if (language === 'javascript') {
          const fnMatch = code.match(/function\s+(\w+)\s*\(/)
          const arrowMatch = code.match(/(?:const|let|var)\s+(\w+)\s*=\s*(?:\([^)]*\)|[^=])\s*=>/)
          const fnName = fnMatch?.[1] || arrowMatch?.[1]
          if (fnName) {
            const wrappedCode = `${code}\nconst __r=(${fnName})(...${JSON.stringify(tc.input.split('\n'))}.map((i)=>{try{return JSON.parse(i);}catch(e){return i;}}));String(__r);`
            try { actual = String(eval(wrappedCode)) } catch (e: unknown) { actual = `Error: ${(e as Error).message}` }
          }
        } else {
          actual = '(Python runs server-side in production)'
        }
        const passed = normalizeOutput(actual) === normalizeOutput(tc.expected)
        testResults.push({ passed, input: tc.input, expected: tc.expected, actual })
      } catch (e: unknown) {
        testResults.push({ passed: false, input: tc.input, expected: tc.expected, actual: '', error: (e as Error).message })
      }
    }
    setResults(testResults)
    const passed = testResults.every((r: TestResult) => r.passed)
    setAllPassed(passed)
    setRunning(false)
    if (passed && onSolve) onSolve(Date.now() - startTime.current)
  }

  const resetCode = () => {
    setCode(language === 'javascript' ? question.starterCode.js : question.starterCode.python)
    setResults([]); setAllPassed(false); startTime.current = Date.now()
  }

  const switchLang = (lang: 'javascript' | 'python') => {
    setLanguage(lang)
    setCode(lang === 'javascript' ? question.starterCode.js : question.starterCode.python)
    setResults([])
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <div className="flex gap-1 bg-ink-800/80 rounded-lg p-1">
          {(['javascript', 'python'] as const).map((l) => (
            <button key={l} onClick={() => switchLang(l)}
              className={`px-3 py-1.5 rounded-md text-xs font-mono font-semibold transition-all ${language === l ? 'bg-ocean-500/20 text-ocean-300' : 'text-slate-500 hover:text-slate-300'}`}>
              {l === 'javascript' ? 'JS / TS' : 'Python'}
            </button>
          ))}
        </div>
        <div className="flex-1" />
        <button onClick={resetCode} className="p-2 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-colors"><RotateCcw size={14} /></button>
        <button onClick={runCode} disabled={running}
          className="flex items-center gap-2 px-4 py-2 bg-jade-500/20 hover:bg-jade-500/30 text-jade-300 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50">
          {running ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} />}Run Tests
        </button>
      </div>

      <div className="rounded-xl overflow-hidden border border-white/5" style={{ height: '320px' }}>
        <Editor height="320px" language={language} value={code} onChange={(v: string | undefined) => setCode(v || '')}
          theme="vs-dark"
          options={{ fontSize: 13, fontFamily: '"JetBrains Mono", monospace', minimap: { enabled: false }, scrollBeyondLastLine: false, lineNumbers: 'on' as const, padding: { top: 12, bottom: 12 }, tabSize: 2 }} />
      </div>

      {results.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
          <div className={`flex items-center gap-2 p-3 rounded-xl border ${allPassed ? 'bg-jade-500/10 border-jade-500/20' : 'bg-rose-500/10 border-rose-500/20'}`}>
            {allPassed ? <CheckCircle size={16} className="text-jade-400" /> : <XCircle size={16} className="text-rose-400" />}
            <span className={`font-semibold text-sm ${allPassed ? 'text-jade-300' : 'text-rose-300'}`}>
              {results.filter((r: TestResult) => r.passed).length}/{results.length} tests passed{allPassed && ' 🎉'}
            </span>
          </div>
          {results.map((r: TestResult, i: number) => (
            <div key={i} className={`rounded-lg border p-3 text-xs font-mono ${r.passed ? 'border-jade-500/10 bg-jade-500/5' : 'border-rose-500/10 bg-rose-500/5'}`}>
              <div className="flex items-center gap-1.5 mb-1.5">
                {r.passed ? <CheckCircle size={12} className="text-jade-400" /> : <XCircle size={12} className="text-rose-400" />}
                <span className={r.passed ? 'text-jade-400' : 'text-rose-400'}>Test {i + 1}</span>
              </div>
              <div className="text-slate-500"><span className="text-slate-400">Input:</span> {r.input}</div>
              <div className="text-slate-500"><span className="text-slate-400">Expected:</span> {r.expected}</div>
              {!r.passed && <div className="text-rose-400"><span className="text-slate-400">Got:</span> {r.actual || r.error}</div>}
            </div>
          ))}
        </motion.div>
      )}
      <div className="text-[11px] text-slate-600 flex items-center gap-1.5"><Terminal size={10} /><span>Tip: Ctrl/Cmd+Enter to run</span></div>
    </div>
  )
}

function normalizeOutput(s: string): string {
  return s.replace(/\s+/g, '').toLowerCase().replace(/"/g, "'")
}
