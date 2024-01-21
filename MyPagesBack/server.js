const express = require('express');
//const { Pool } = require('pg');
const pool = require('./dbConfig'); // Import the database configuration
const axios = require('axios');
const cors = require('cors'); // Import the cors middleware


const app = express();
const port = 5000; // choose your desired port number
app.use(express.json());// Parse JSON request bodies

// Use CORS middleware to enable CORS for all routes
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to My API Service!');
});

// Define your API routes
app.get('/api/name_ages', async (req, res) => {
  try {
    // Query your database using the pool instance
    const result = await pool.query('SELECT * FROM name_ages');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/api/name_ages', async (req, res) => {
  const { name, age } = req.body; // Assuming you want to insert a new name and age
  try {
    const result = await pool.query(
      'INSERT INTO name_ages (name, age) VALUES ($1, $2) RETURNING id, name, age',
      [name, age]
    );
    const insertedRecord = result.rows[0];
    res.json(insertedRecord);
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/name_ages/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Delete the record with the specified id
    const result = await pool.query('DELETE FROM name_ages WHERE id = $1', [id]);
    res.json({ message: 'Record deleted successfully' });
  } catch (error) {
    console.error('Error deleting data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/mileage', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM mileage_records ORDER BY id DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching mileage records:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/prayer-times', async (req, res) => {
  const { year, month, city, country, method } = req.query;
  const apiUrl = `http://api.aladhan.com/v1/calendarByCity/${year}/${month}?city=${city}&country=${country}&method=${method}`;

  try {
      const response = await axios.get(apiUrl);
      const prayerTimesData = response.data;
      // Process the data as needed and send it back to the client
      res.json(prayerTimesData);
  } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});