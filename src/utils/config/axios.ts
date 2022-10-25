import axios from 'axios';

// we are reading API Base URL form the ".env" file in our root directory.
// REACT_APP_API_URL=https://api.themoviedb.org/3/
const client = axios.create({
    // baseURL: process.env.BACKEND_API_URL,
    baseURL: 'http://localhost:3001/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default client;
