import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import {
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

const Profile = () => {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();

  //firebase storage
  // allow read;
  //allow write: if
  //request.resource.size < 2 * 1024 * 1024 &&
  //request.resource.contentType.matches('image/.*')

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercentage(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data.message));
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='file'
          ref={fileRef}
          accept='image/.*'
          hidden
          onChange={(e) => setFile(e.target.files[0])}
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt='profile'
          className='rounded-full w-24 h-24 object-cover self-center cursor-pointer mt-2'
        />
        <p className='text-sm text-center mx-auto'>
          {fileUploadError ? (
            <span className='text-red-700'>Error Image Upload</span>
          ) : filePercentage > 0 && filePercentage < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePercentage}`}</span>
          ) : filePercentage === 100 ? (
            <span className='text-green-700'>Image successfully uploaded</span>
          ) : (
            ''
          )}
        </p>
        <input
          type='text'
          placeholder='username'
          defaultValue={currentUser.username}
          className='border p-3 rounded-lg outline-none'
          id='username'
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='email'
          defaultValue={currentUser.email}
          className='border p-3 rounded-lg outline-none'
          id='email'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='password'
          className='border p-3 rounded-lg outline-none'
          id='password'
        />
        <button className='bg-slate-700 rounded-lg text-white p-3 uppercase hover:opacity-95 disabled:hover:opacity-80'>
          update
        </button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete account</span>
        <span className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
    </div>
  );
};

export default Profile;
