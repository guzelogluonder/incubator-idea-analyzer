import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import IdeaFormPage from './pages/IdeaFormPage'
import ResultPage from './pages/ResultPage'
import MentorDashboardPage from './pages/MentorDashboardPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IdeaFormPage />} />
        <Route path="/result/:id" element={<ResultPage />} />
        <Route path="/mentor" element={<MentorDashboardPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
