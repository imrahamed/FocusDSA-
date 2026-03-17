export type CellState = "default" | "active" | "comparing" | "found" | "eliminated" | "pointer" | "result" | "visited";
export interface WalkthroughVisual {
  colHeaders?: string[];
  rowHeaders?: string[];
  gridHighlighted?: any[];
  llNodes?: { id?: string; label?: string; x?: number; y?: number; state?: string; val?: number | string; next?: string | null; random?: string | null }[];
  llHighlighted?: any[];
  left?: any[];
  leftLabel?: string;
  leftStates?: any[];
  right?: any[];
  rightLabel?: string;
  rightStates?: any[]; type: "array" | "bars" | "tree" | "grid" | "linkedlist" | "split"; array?: (string | number)[]; labels?: string[]; states?: string[]; pointers?: Record<number | string, string>; mapEntries?: { key: string | number; value: string | number }[]; treeNodes?: { id: string; label: string; x: number; y: number; state?: string; }[]; treeEdges?: [string, string][]; treeHighlighted?: any[]; grid?: string[][]; gridStates?: string[][]; gridPointers?: { r: number; c: number; label: string }[]; head?: string; targetNode?: string; leftArray?: number[]; rightArray?: number[]; mergedArray?: number[]; }
export interface WalkthroughStep { title: string; explanation: string; phase: "init" | "search" | "compare" | "swap" | "split" | "merge" | "update" | "scan" | "backtrack" | "done" | "process" | "end" | "found"; visual?: WalkthroughVisual; code?: string; codeHighlight?: number[]; variables?: Record<string, string | number>; insight?: string; complexity?: string; }
export interface QuizQuestion { id: string; question: string; options: string[]; correct: number; explanation: string; }
export interface TestCase { input: string; expected: string; hidden?: boolean; title?: string; explanation?: string; phase?: string; insight?: string; }
export interface Question { id: string; title: string; difficulty: "Easy" | "Medium" | "Hard"; description: string; examples?: { input: string; output: string; explanation?: string; img?: string }[]; constraints?: string[]; starterCode?: { js: string; python: string }; solution?: { js: string; python: string }; testCases?: TestCase[]; timeComplexity?: string; spaceComplexity?: string; tags?: string[]; hints?: string[]; walkthrough?: WalkthroughStep[]; }
export interface Topic {
  usefulLinks?: string[] | { title: string; url: string }[]; id: string; slug: string; title: string; emoji: string; color: string; gradient: string; layman: string; technical: string; keyInsights: string[]; timeComplexities: { operation: string; best: string; avg: string; worst: string; space: string; }[]; questions: Question[]; quiz: QuizQuestion[]; cheatSheet: string; proTips: string[]; faangQuotes: string[]; visualizationType: "array" | "grid" | "tree" | "graph" | "linkedlist" | "stack" | string; usage: string; dsInvolved: string; sampleProblems: string[]; }
