
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
    const token = localStorage.getItem('token');

    // Simple check for token existence. 
    // Ideally, we should verify validity or expiration, but this suffices for basic routing protection.
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}
