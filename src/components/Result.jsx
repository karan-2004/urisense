import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';

const  ImageResults = () => {
    const [data, setData] = useState([]);
    const [isEmpty, setIsEmpty] = useState(0);


    useEffect(() => {
        const fetchData = async () => {
          const accessToken = localStorage.getItem("accessToken");
          const refreshToken = localStorage.getItem("refreshToken");
    
          if (accessToken && refreshToken) {
            const config = {
              headers: {
                "Authorization": `Bearer ${accessToken}`
              }
            };
    
            try {
              // Fetching tests for a specific user
              const response = await axios.get(`https://karanraj1324.pythonanywhere.com/tests/?user=${localStorage.getItem('userId')}`, config);
              console.log(response.data)
              if (response.data.length > 0) {
                // Assuming tests are returned in descending order (latest first)
                const latestTest = response.data[0];
    
                // Fetching details of the latest test
                const testDetails = await axios.get(`https://karanraj1324.pythonanywhere.com/tests/${latestTest.id}/`, config);
                console.log(testDetails)
                setData(testDetails.data);
              } else {
                setIsEmpty(1); // Set isEmpty state if no tests are found
              }
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          } else {
            console.log("Access token or refresh token missing.");
          }
        };
    
        fetchData();
      }, []);

      if (isEmpty) {
        return <p>No test data available.</p>;
      }
    
      if (!data || !data.results) {
        return <p>Loading...</p>;
      }
    
      return (
        <div className='h-[50%] flex'>
          <h2 className='text-orange-400'>Image Results</h2>
          <img src={data.image} alt={`Test ID ${data.id}`} style={{ maxWidth: '5%' }} className='h-[100%]' />
          <div>
            {data.results.map(result => (
              <div key={result.id} style={{ marginBottom: '10px' }} className='flex'>
                <p><strong>{result.chemical}</strong></p>
                <div
                  style={{
                    width: '15px',
                    height: '15px',
                    backgroundColor: `rgb(${result.red}, ${result.green}, ${result.blue})`,
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                  }}
                />
                <p>RGB: {result.red}, {result.green}, {result.blue}</p>
              </div>
            ))}
          </div>
        </div>
      );
    
};

export default ImageResults;
