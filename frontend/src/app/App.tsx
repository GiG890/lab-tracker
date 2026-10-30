import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from '@/layouts/AppLayout'; 
import { SubjectsPage } from '@/pages/subjects/ui/SubjectsPage';
import { TasksPage } from '@/pages/tasks/ui/TasksPage';
import { ProfilePage } from '@/pages/profile/ui/ProfilePage';
import { LoginPage } from '@/pages/login/ui/LoginPage';
import { NotFoundPage } from '@/pages/not-found/ui/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<SubjectsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/subjects/:id" element={<TasksPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;