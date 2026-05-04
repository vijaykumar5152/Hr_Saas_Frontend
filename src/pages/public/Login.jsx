import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import { toast } from 'sonner';

const Login = () => {
  const authContext = useAuth();
  const { login, loading, isAuthenticated, token } = authContext;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  console.log('📄 Login component rendered', { loading, isAuthenticated });

  // If already authenticated, redirect to dashboard
  React.useEffect(() => {
    console.log('🔍 Check auth:', { isAuthenticated, hasToken: !!token });
    if (isAuthenticated && token) {
      console.log('✅ Redirecting to dashboard');
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, token, navigate]);

  const handleEmailChange = (e) => {
    const val = e.target.value;
    console.log('📧 Email changed:', val);
    setEmail(val);
  };

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    console.log('🔑 Password changed: length=', val.length);
    setPassword(val);
  };

  const handleFormSubmit = async (e) => {
    console.log('🎯 FORM SUBMIT EVENT FIRED');
    e.preventDefault();
    
    console.log('🔐 Login form data:', { email, passwordLength: password.length });
    
    if (!email || !password) {
      console.error('❌ Missing email or password');
      toast.error('Please enter email and password');
      return;
    }

    console.log('🔐 Calling login function...');
    try {
      const result = await login({ email, password });
      console.log('🔐 Login result:', result);
      
      if (result.success) {
        console.log('✅ Login successful!');
        toast.success('Login successful!');
      } else {
        console.error('❌ Login failed:', result.error);
        toast.error(result.error || 'Login failed');
      }
    } catch (err) {
      console.error('❌ Login error:', err);
      toast.error(err.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-50 dark:bg-slate-900">
      <form 
        onSubmit={handleFormSubmit} 
        className="bg-white dark:bg-slate-950 p-8 rounded shadow w-full max-w-md"
        noValidate
      >
        <h2 className="text-2xl font-bold mb-6 text-primary-700">Login</h2>
        
        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input 
            type="email" 
            value={email}
            onChange={handleEmailChange}
            required 
            className="w-full px-3 py-2 border rounded" 
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium">Password</label>
          <input 
            type="password" 
            value={password}
            onChange={handlePasswordChange}
            required 
            className="w-full px-3 py-2 border rounded" 
            placeholder="Enter your password"
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          onClick={() => console.log('🖱️ BUTTON CLICKED')}
          className="w-full px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <Loader /> : 'Login'}
        </button>

        <div className="mt-4 text-center text-sm">
          Don't have an account? <Link to="/register" className="text-primary-600">Register</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
