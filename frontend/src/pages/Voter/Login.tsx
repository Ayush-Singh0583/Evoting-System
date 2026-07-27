import React, { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react'; // Optional: for icons

const VoterLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useLogin();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await loginUser({ email, password });
      navigate('/home');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Voter Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password input with toggle */}
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className="w-full p-2 border rounded pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 w-full rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default VoterLogin;