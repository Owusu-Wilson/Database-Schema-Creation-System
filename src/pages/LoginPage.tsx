import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

import schemaAILogo from '@/assets/schema-ai-white.png'
import { FaGithub, FaGoogle } from 'react-icons/fa';
import GithubButton from '../components/Authentication/GithubButton';
import GoogleButton from '../components/Authentication/GoogleButton';
import Divider from '../components/Authentication/Divider';



export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { login, user } = useAuth();

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      const from = (location.state as any)?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [user, navigate, location]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      // Navigation will be handled by the useEffect above
    } catch (err) {
      if (err instanceof Error) {
        // Handle specific error messages
        setError(err.message);
      } else {
        setError('An error occurred during sign in');
        
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-schema-dark flex flex-col">
      {/* Top Navigation */}
      <Navbar/>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div
        
          className="max-w-md w-full space-y-8 text-center"
        >
          <div className="space-y-3">
            <Link to={'/'}>
          <img src={schemaAILogo} alt="schema AI" className='w-full h-20 bg-transparent rounded-md object-contain' /></Link>
            <h1 className="text-4xl font-semibold text-white">Login to your Account <span className="text-blue-500"></span></h1>
            <p className="text-gray-500">Continue with the amazing stuff you're creating</p>
          </div>

          <div className="space-y-4">
          <GithubButton isLoading={isLoading}/>
          <GoogleButton isLoading={isLoading}/>

            <Divider/>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2 text-left">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors"
                  placeholder="Type your email"
                />
                {error && (
                  <p className="text-red-500 text-sm">
                    {error}
                  </p>
                )}
              </div>
              <div className="space-y-2 text-left">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-colors"
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex items-center justify-center px-4 py-2.5 border border-transparent rounded-md shadow-sm text-white bg-schema-green hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? 'Loading...' : 'Continue with email'}
              </button>

              <p className="text-sm text-gray-500">
                Don't have an account?{' '}
                <Link to="/signup" className="text-blue-500 hover:underline">
                <span  className="text-blue-500 hover:underline">
                  Sign up
                </span>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full p-6">
        <div className="max-w-6xl mx-auto">
          <div
         
            className="text-sm text-gray-500 text-center"
          >
            <p>
              By clicking "Sign in with Google" or "Continue with email"
              <br />
              you agree to our{' '}
              <a href="#" className="underline hover:text-gray-700">
                Terms of Use
              </a>{' '}
              and{' '}
              <a href="#" className="underline hover:text-gray-700">
                Privacy policy
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

