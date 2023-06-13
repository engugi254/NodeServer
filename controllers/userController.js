const users = require('../data') 
const jwt = require('jsonwebtoken');

exports.registerUser = (req, res) => {
  const { username, password } = req.body;
  // Perform validation checks if needed
  const user = { id: users.length + 1, username, password };
  users.push(user);
  res.status(201).json({ message: 'User registered successfully' });
};

exports.loginUser = (req, res) => {
  const { username, password } = req.body;
  // Perform validation checks if needed
  const user = users.find((user) => user.username === username);
  if (!user) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
  // Check password using bcrypt or other hashing mechanism
  if (user.password !== password) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
  // Generate a JWT token and send it in the response
  const token = generateToken(user);
  res.json({ token });
};

exports.getAllUsers = (req, res) => {
  res.json(users);
};

exports.getUserById = (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === Number(id));
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
};

exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;
  const user = users.find((user) => user.id === Number(id));
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  // Perform validation checks if needed
  user.username = username;
  user.password = password;
  res.json({ message: 'User updated successfully' });
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex((user) => user.id === Number(id));
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  users.splice(userIndex, 1);
  res.json({ message: 'User deleted successfully' });
};

function generateToken(user) {
  // Generate a JWT token using jsonwebtoken library
  const token = jwt.sign({ id: user.id, username: user.username }, 'your_secret_key', {expiresIn: '1h',  });
  return token;
}
