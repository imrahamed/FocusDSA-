// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './components/ProgressDashboard'
import TopicPage from './components/TopicPage'
import MockInterview from './interview/MockInterview'
import { TOPICS } from './data/topicsData'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          {TOPICS.map(t => (
            <Route key={t.id} path={`/topic/${t.slug}`} element={<TopicPage topicId={t.id} />} />
          ))}
          <Route path="/interview" element={<MockInterview />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
