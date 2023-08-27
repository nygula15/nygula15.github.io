import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NameAges.css'; // Import the CSS file

const NameAges = () => {
  // State to hold the data from the API
  const [tableData, setTableData] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);

  // State to handle the form input
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  // Function to fetch data from the server
  const fetchData = async () => {
    try {
      // Fetch data from the API endpoint
      const response = await axios.get('/api/name_ages');
      console.log('Response:', response.data);

      // Extract table column names from the response
      setTableColumns(Object.keys(response.data[0]));

      // Update the table data with the fetched data
      setTableData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Call the fetchData function when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Function to handle deletion of a record
  const handleDelete = async (id) => {
    try {
      // Send a DELETE request to the API to delete a record
      await axios.delete(`/api/name_ages/${id}`);
      console.log('Data deleted:', id);

      // After successful deletion, fetch the data again to refresh the table
      fetchData();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  // Function to handle submission of the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to the API to add a new record
      const response = await axios.post('/api/name_ages', {
        name: name,
        age: age,
      });
      console.log('Response:', response.data);

      // Reset the form fields and refresh the table data
      setName('');
      setAge('');
      fetchData();
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  return (
    <div>
      <h1>PostgreSQL Table - name_ages</h1>

      {/* Form for adding a new name and age */}
      <div className="form-container">
        <h2>Add a new name and age</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Name:
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
          </div>
          <div>
            <label>
              Age:
              <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
            </label>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>

      {/* Table to display the data */}
      <table className="table-container">
        <thead>
          <tr>
            {/* Display table column headers */}
            {tableColumns.map((column) => (
              <th key={column}>{column}</th>
            ))}
            <th className="action-cell">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Display table data rows */}
          {tableData.map((row) => (
            <tr key={row.id}>
              {tableColumns.map((column) => (
                <td key={column}>{row[column]}</td>
              ))}
              {/* "Delete" button for each record */}
              <td className="action-cell">
                <button onClick={() => handleDelete(row.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NameAges;
