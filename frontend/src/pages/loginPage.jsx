import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';

function LoginPage() {
  const [selectedRole, setSelectedRole] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { login, isAuthenticated, initializeAuth, isLoggingIn, logout } =
    useAuthStore();

  const ROLES = ['admin', 'faculty', 'student'];

  useEffect(() => {
    initializeAuth();
    if (isAuthenticated) navigate('/'); // redirect if already logged in
  }, [isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedRole) return toast.error('Please select a role!');
    if (!password) return toast.error('Please enter your password!');

    const success = await login(selectedRole, password);
    if (success) navigate('/'); // navigate on successful login
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 font-sans">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Login
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Select your role to continue
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Role
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="">Choose your role...</option>
              {ROLES.map((role) => (
                <option key={role} value={role}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {selectedRole && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={!selectedRole || !password || isLoggingIn}
            className={`w-full py-2 rounded-lg text-white font-semibold transition ${
              !selectedRole || !password || isLoggingIn
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-indigo-500 hover:bg-indigo-600'
            }`}
          >
            {isLoggingIn ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Secure access to your university portal
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
