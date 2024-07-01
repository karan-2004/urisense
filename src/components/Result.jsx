import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageResults = ({ refreshData }) => {
  const [data, setData] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      if (accessToken && refreshToken) {
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };

        try {
          // Fetching tests for a specific user
          const response = await axios.get(`https://karanraj1324.pythonanywhere.com/tests/?user=${localStorage.getItem('userId')}`, config);
          console.log(response.data);
          if (response.data.length > 0) {
            // Assuming tests are returned in descending order (latest first)
            const latestTest = response.data[0];

            // Fetching details of the latest test
            const testDetails = await axios.get(`https://karanraj1324.pythonanywhere.com/tests/${latestTest.id}/`, config);
            console.log(testDetails.data);
            setData(testDetails.data);
          } else {
            setIsEmpty(true); // Set isEmpty state if no tests are found
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      } else {
        console.log('Access token or refresh token missing.');
      }
    };

    fetchData();
  }, [refreshData]); // Add refreshData to dependencies array

  if (isEmpty) {
    return <p>No test data available.</p>;
  }

  if (!data || !data.results) {
    return <p>Loading...</p>;
  }

  return (
    <div className='h-[50%] flex p-5'>
      <div className='mr-5'>
        <p>Your last test results</p>
        <p>test id: {data.id}</p>
        <p>tested on: {data.created_at}</p>
      </div>
      <img src={data.image} alt={`Test ID ${data.id}`} style={{ maxWidth: '5%' }} className='h-[100%] mr-5' />
      <div>
        <p>COLORS OF THE CHEMICALS</p>
        {data.results.map(result => (
          <div key={result.id} style={{ marginBottom: '10px' }} className='flex'>
            <p><strong>{result.chemical}</strong></p>
            <div
              style={{
                width: '20px',
                height: '20px',
                backgroundColor: `rgb(${result.red}, ${result.green}, ${result.blue})`,
                border: '1px solid #ccc',
                borderRadius: '5px',
              }}
              className='ml-3'
            />
            <p className='ml-3'>RGB: {result.red}, {result.green}, {result.blue}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageResults;
