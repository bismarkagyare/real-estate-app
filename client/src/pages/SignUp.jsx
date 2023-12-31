import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          onChange={handleChange}
          placeholder='username'
          id='username'
          className='border p-3 rounded-lg outline-none'
        />
        <input
          type='email'
          onChange={handleChange}
          placeholder='email'
          id='email'
          className='border p-3 rounded-lg outline-none'
        />
        <input
          type='password'
          onChange={handleChange}
          placeholder='password'
          id='password'
          className='border p-3 rounded-lg outline-none'
        />
        <button
          disabled={loading}
          className='bg-slate-700 p-3 uppercase rounded-lg text-white hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading ...' : 'signup'}
        </button>
        <OAuth />
      </form>
      <div className='flex justify-center items-center gap-2 mt-5 text-lg'>
        <p>Have an account?</p>
        <Link to='/sign-in'>
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
};

export default SignUp;
