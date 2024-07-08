const express = require('express');
const serverless = require('serverless-http');
const app = express();
app.use(cors());

app.get('/api/set_appoinment', (req, res) => {
    res.send('Hello, world!');
});

app.get('/api/data', (req, res) => {
    // Handle API logic here
    res.json({ message: 'API data' });
});

app.post('/api/users', (req, res) => {
    // Handle user creation logic here
    res.json({ message: 'User created' });
});

module.exports.handler = serverless(app);








