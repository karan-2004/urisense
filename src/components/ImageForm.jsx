import React, { useState } from 'react';
import axios from 'axios';

function ImageUploadForm({onFormSubmit, uploadStatus}) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onFormSubmit(event, selectedFile);
  }

  return (
    <div className='flex flex-col items-center text-2xl text-gray-600'>
      <h1>Urine strip color extraction</h1>
      <form onSubmit={handleSubmit} className='flex flex-col items-start text-[1rem]'>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit" className='text-black'>Upload</button>
      </form>
      {uploadStatus && <p className='text-sm'>{uploadStatus}</p>}
    </div>
  );
}

export default ImageUploadForm;
