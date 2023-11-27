import React from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      //create a new instance of the google auth provider
      const provider = new GoogleAuthProvider();

      //get the authentication instance from the firebase app
      const auth = getAuth(app);

      //signin with popup with google as the auth provider
      const result = await signInWithPopup(auth, provider);

      const response = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      const data = await response.json();

      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      console.log('Could not sign in with Google', error);
    }
  };

  return (
    <button
      type='button'
      className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
      onClick={handleGoogleClick}
    >
      Continue with Google
    </button>
  );
};

export default OAuth;
