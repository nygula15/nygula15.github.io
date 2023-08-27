const axios = require('axios');

const url = '/api/name_ages'; // Replace with the appropriate URL

const data = {
  name: 'Anissa Nygmet',
  age: 8
};

axios.post(url, data)
  .then(response => console.log(response.data))
  .catch(error => console.error('Error:', error));