import React, { useState } from 'react';
import axios from 'axios';

function ImageUploadForm() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setUploadStatus('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('user', localStorage.getItem('userId'))
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if(accessToken && refreshToken) {
        const config = {
          headers: {
            "Authorization":`Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data'
          }
        };

    try {
      const response = await axios.post('https://karanraj1324.pythonanywhere.com/tests/', formData, config);

      setUploadStatus('File uploaded successfully');
      console.log(response.data);
    } catch (error) {
      setUploadStatus('File upload failed');
      console.error(error);
    }
  }}

  return (
    <div>
      <h1>Image Upload Form</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
}

export default ImageUploadForm;
