import { Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AdminDashboardLayout from './components/layouts/AdminDashboardLayout';
import Parkings from './pages/admin/Parkings';
import AttendantDashboard from './pages/attendant/AttendantDashboard';
import { ProtectedRoute } from './components/security/ProtectedRoute';
import CarEntry from './pages/admin/CarEntry';
import CarExit from './pages/admin/CarExit';
import AttendantDashboardLayout from './components/layouts/AttendantDashboardLayout';
import NotFound from './pages/not-found/NoteFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboardLayout>
              <Parkings />
            </AdminDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/carentry"
        element={
          <ProtectedRoute>
            <AdminDashboardLayout>
              <CarEntry />
            </AdminDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/carexit"
        element={
          <ProtectedRoute>
            <AdminDashboardLayout>
              <CarExit />
            </AdminDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/attendant"
        element={
          <ProtectedRoute>
            <AttendantDashboardLayout>
              <AttendantDashboard />
            </AttendantDashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
