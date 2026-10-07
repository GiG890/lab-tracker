import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import LoginPage from './pages/LoginPage'
import SubjectsPage from './pages/SubjectsPage'
import TasksPage from './pages/TasksPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<SubjectsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/subjects/:id" element={<TasksPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App