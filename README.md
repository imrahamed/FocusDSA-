# ⚡ FocusDSA Academy — 2026 Edition

> Advanced Algorithms & Data Structures Mastery Lab — Anti doom-scrolling, start mastering DSA.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## 📦 Build for Production

```bash
npm run build
npm run preview
```

## ✨ Features

### 🎯 18 DSA Topics
Arrays & Hashing, Two Pointers, Sliding Window, Linked Lists, Stacks & Queues, Binary Trees & BST, Heaps, Graphs BFS/DFS, Shortest Path, Sorting, Binary Search, Greedy, Backtracking, Dynamic Programming, Bit Manipulation, Trie, Union-Find, Advanced Trees (Segment & Fenwick).

### 💻 For Each Topic
- **Layman's Explanation** — intuitive analogy
- **Technical Deep Dive** — complexity proofs, edge cases
- **Step-by-Step Visualizer** — fully animated (play/pause/step/speed control)
- **15–25 Practice Questions** — Easy → Advanced, with Monaco editor + JS test runner
- **10-Question Quiz** — timed, with explanations
- **Cheat Sheet** — downloadable Markdown

### ⏰ Focus System
- Pomodoro timer (25min work / 5min break)
- Daily deep-work cap (120 min) with walk suggestion
- Reflection gate — write 1–2 sentences to unlock next challenge
- Streak tracker + progress dashboard

### 🎤 Mock Interview Simulator
- 45-min timer, 6 random questions from all topics
- Voice hints via Web Speech API
- AI follow-up questions
- Performance scoring with hire/no-hire verdict

### 📊 Analytics Dashboard
- Weekly focus chart
- Problem of the day
- Topic progress bars
- Streak calendar

## 🛠 Tech Stack

| Library | Purpose |
|---------|---------|
| React 18 + TypeScript | UI framework |
| Vite | Build tool |
| TailwindCSS | Styling |
| Zustand | Global state |
| Framer Motion | Animations |
| Monaco Editor | Code editor (JS/TS/Python) |
| Recharts | Progress charts |
| React Router v6 | Navigation |
| Vite PWA | Progressive Web App |

## 📁 Project Structure

```
src/
├── store/useDSAStore.ts    # Zustand global state
├── data/topicsData.ts      # All 18 topics, questions, quizzes
├── components/
│   ├── Layout.tsx          # Sidebar + topbar layout
│   ├── TopicPage.tsx       # Learn/Visualize/Practice/Quiz tabs
│   ├── CodeEditor.tsx      # Monaco editor + JS test runner
│   ├── VisualizationPlayer.tsx  # Sorting, BFS, Binary search animations
│   ├── QuizChallenge.tsx   # Timed quiz with scoring
│   ├── PomodoroTimer.tsx   # Focus timer
│   ├── ReflectionGate.tsx  # Post-solve reflection prompt
│   └── ProgressDashboard.tsx    # Home dashboard
├── interview/
│   └── MockInterview.tsx   # Full mock interview simulator
└── App.tsx                 # Routes
```

## 🎨 Design Philosophy

- **Calm deep-work aesthetic**: dark blues/greens, glassmorphism
- **Distraction-free**: no social features, no notifications, focus mode
- **Progressive disclosure**: layman → technical → hands-on

## 📝 Extending

To add questions to any topic, edit `src/data/topicsData.ts`:

```typescript
{
  id: 'my-question',
  title: 'My New Question',
  difficulty: 'Medium',
  description: '...',
  starterCode: { js: '// starter', python: '# starter' },
  solution: { js: '// solution', python: '# solution' },
  testCases: [{ input: '...', expected: '...' }],
  // ...
}
```

## 🏆 Cracking FAANG Interviews

The goal is **deep intuition**, not memorization:
1. Understand the **pattern**, not just the answer
2. Use visualizations until the algorithm feels **obvious**
3. Write reflections — they cement understanding
4. Do mock interviews under **time pressure**
5. Track your streak — consistency beats intensity

---

Built with ❤️ for engineers who want to truly understand DSA.
