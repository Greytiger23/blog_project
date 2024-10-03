const express = require('express');
const register = require('./');

const app = express();

app.use('/register', register);

app.listen(3000, () => {
    console.log('Server listening to http://localhost:3000');
});