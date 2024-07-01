import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageUploadForm from '../components/ImageForm';
import { Link } from 'react-router-dom';
import ImageResults from '../components/Result';

const Home = () => {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [refreshData, setRefreshData] = useState(false); // State to trigger data refresh

  useEffect(() => {
    const checkLoggedInUser = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (token) {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          setLoggedIn(true);
          setUsername(localStorage.getItem('userName'));
        } else {
          setLoggedIn(false);
          setUsername('');
        }
      } catch (error) {
        setLoggedIn(false);
        setUsername('');
      }
    };
    checkLoggedInUser();
  }, []);

  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      if (accessToken && refreshToken) {
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
        await axios.post('https://karanraj1324.pythonanywhere.com/auth/token/logout/', { refresh: refreshToken }, config);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userName');
        localStorage.removeItem('userId');
        setLoggedIn(false);
        setUsername('');
        console.log('Log out successful!');
      }
    } catch (error) {
      console.error('Failed to logout', error.response?.data || error.message);
    }
  };

  const handleSubmit = async (event, selectedFile) => {
    event.preventDefault();
    if (!selectedFile) {
      setUploadStatus('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('user', localStorage.getItem('userId'));
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (accessToken && refreshToken) {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      };

      try {
        const response = await axios.post('https://karanraj1324.pythonanywhere.com/tests/', formData, config);

        setUploadStatus('File uploaded successfully');
        console.log(response.data);

        // Trigger data refresh in ImageResults component
        setRefreshData(prev => !prev);
      } catch (error) {
        setUploadStatus('File upload failed');
        console.error(error);
      }
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <>
          <div className='flex p-3 justify-end'>
            <h2 className='mr-3'>{username}</h2>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <ImageUploadForm onFormSubmit={handleSubmit} uploadStatus={uploadStatus} />
          <hr />
          <ImageResults refreshData={refreshData} /> {/* Pass refreshData as prop */}
        </>
      ) : (
        <>
          <div className='flex justify-end p-5'>
            <Link to='/login' className='mr-3'>
              Login
            </Link>
            <Link to='/register'>Register</Link>
          </div>
          <h2 className='text-center text-slate-700 font-medium mt-56'>Please Login to test</h2>
        </>
      )}
    </div>
  );
};

export default Home;
