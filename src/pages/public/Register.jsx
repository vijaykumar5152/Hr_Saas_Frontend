import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Loader from '../../components/common/Loader';
import { toast } from 'sonner';

const Register = () => {
  const authContext = useAuth();
  const { register, loading, isAuthenticated, token } = authContext;
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('hr');
  const navigate = useNavigate();

  console.log('📄 Register component rendered', { loading, isAuthenticated });

  // If already authenticated, redirect to dashboard
  React.useEffect(() => {
    console.log('🔍 Check auth:', { isAuthenticated, hasToken: !!token });
    if (isAuthenticated && token) {
      console.log('✅ Redirecting to dashboard');
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, token, navigate]);

  const handleFormSubmit = async (e) => {
    console.log('🎯 FORM SUBMIT EVENT FIRED');
    e.preventDefault();
    
    const formData = { full_name: fullName, email, password, confirm_password: confirmPassword, role };
    console.log('📝 Register form data:', formData);
    
    if (!fullName || !email || !password || !confirmPassword) {
      console.error('❌ Missing required fields');
      toast.error('Please fill all fields');
      return;
    }

    if (password !== confirmPassword) {
      console.error('❌ Passwords do not match');
      toast.error('Passwords do not match');
      return;
    }

    console.log('📝 Calling register function...');
    try {
      const result = await register(formData);
      console.log('📝 Register result:', result);
      
      if (result.success) {
        console.log('✅ Register successful!');
        toast.success('Registration successful!');
      } else {
        console.error('❌ Register failed:', result.error);
        toast.error(result.error || 'Registration failed');
      }
    } catch (err) {
      console.error('❌ Register error:', err);
      toast.error(err.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-50 dark:bg-slate-900">
      <form 
        onSubmit={handleFormSubmit}
        className="bg-white dark:bg-slate-950 p-8 rounded shadow w-full max-w-md"
        noValidate
      >
        <h2 className="text-2xl font-bold mb-6 text-primary-700">Register</h2>
        
        <div className="mb-4">
          <label className="block mb-1 font-medium">Full Name</label>
          <input 
            type="text" 
            value={fullName}
            onChange={(e) => { console.log('👤 Full name:', e.target.value); setFullName(e.target.value); }}
            required 
            className="w-full px-3 py-2 border rounded" 
            placeholder="Enter your full name"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => { console.log('📧 Email:', e.target.value); setEmail(e.target.value); }}
            required 
            className="w-full px-3 py-2 border rounded" 
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Password</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => { console.log('🔑 Password: length=', e.target.value.length); setPassword(e.target.value); }}
            required 
            className="w-full px-3 py-2 border rounded" 
            placeholder="Enter your password"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Confirm Password</label>
          <input 
            type="password" 
            value={confirmPassword}
            onChange={(e) => { console.log('🔑 Confirm password: length=', e.target.value.length); setConfirmPassword(e.target.value); }}
            required 
            className="w-full px-3 py-2 border rounded" 
            placeholder="Confirm your password"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium">Role</label>
          <select 
            value={role} 
            onChange={(e) => { console.log('👥 Role:', e.target.value); setRole(e.target.value); }}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="admin">Admin</option>
            <option value="hr">HR</option>
            <option value="recruiter">Recruiter</option>
          </select>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          onClick={() => console.log('🖱️ BUTTON CLICKED')}
          className="w-full px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <Loader /> : 'Register'}
        </button>

        <div className="mt-4 text-center text-sm">
          Already have an account? <Link to="/login" className="text-primary-600">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
