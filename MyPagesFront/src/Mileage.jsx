import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NameAges.css'; // Import the CSS file

const Mileage = () => {
  const [tableData, setTableData] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://express-back-fzk9.onrender.com/api/mileage');
        console.log('Response:', response.data); // Check if the data is being fetched correctly
        setTableColumns(Object.keys(response.data[0])); // Use response.data[0] to get the first row's columns
        setTableData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Function to format a date in "YYYY-MM-DD" format
  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
    const day = String(dateObject.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <h1>PostgreSQL Table - mileage_records</h1>
      <table className="table-container">
        <thead>
          <tr>
            {tableColumns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr key={row.id}>
              {tableColumns.map((column) => (
                <td key={column}>
                  {column.toLowerCase().includes('date')
                    ? formatDate(row[column]) // Apply the formatDate function to date columns
                    : row[column]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Mileage;
