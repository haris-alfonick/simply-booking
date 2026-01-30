import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthWatcher = () => {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('expiresAt');
        navigate('/');
    };

    useEffect(() => {
        const expiresAt = localStorage.getItem('expiresAt');
        if (!expiresAt) return;
        const timeout = expiresAt - Date.now();
        if (timeout <= 0) {
            logout();
        } else {
            const timer = setTimeout(logout, timeout);
            return () => clearTimeout(timer);
        }
    }, []);

    return null;
};

export default AuthWatcher;
