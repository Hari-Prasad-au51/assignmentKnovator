const User = require('../model/User');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user || !user.comparePassword(password)) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const token = jwt.sign({ sub: user._id }, 'your-secret-key', { expiresIn: '1h' });
      res.json({ user:user ,token: token});
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

  const register = async (req, res) => {
    try {
      const { username, password } = req.body;
      const existingUser = await User.findOne({ username });
  
      if (existingUser) {
        return res.status(400).json({ message: 'Username is already taken. Please choose a different one.' });
      }
      const newUser = new User({ username, password });
      const user = await newUser.save();
  
      const token = jwt.sign({ sub: user._id }, 'your-secret-key', { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Registration failed' });
    }
  };
  
module.exports = {
    login,
    register
  }
