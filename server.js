const bcrypt = require('bcrypt');
const users = require('../data');

const express = require('express');
const app = express();
const port = 5000;

const userRoutes = require('./routes/users');

app.use(express.json());

app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
