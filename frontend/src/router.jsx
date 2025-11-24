import { createBrowserRouter } from 'react-router-dom'
import DashboardLayout from './layouts/DashboardLayout'
import LandingPage from './pages/LandingPage'
import IdeaWizardPage from './pages/IdeaWizardPage'
import ResultPage from './pages/ResultPage'
import MentorDashboardPage from './pages/MentorDashboardPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />
      },
      {
        path: 'founder/idea',
        element: <IdeaWizardPage />
      },
      {
        path: 'result/:id',
        element: <ResultPage />
      },
      {
        path: 'mentor',
        element: <MentorDashboardPage />
      }
    ]
  }
])

export default router

