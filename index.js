const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
require('dotenv').config({ path: './.env.local' });
const cors = require('cors'); 

const app = express();
const PORT = process.env.PORT || 3000;

const mongodbUri = process.env.MONGODB_URI;

mongoose.connect(mongodbUri);

  
const User = mongoose.model('User', {
  email: String,
  password: String,
  userName: String,
});

app.use(bodyParser.json());


app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists && await bcrypt.compare(password, userExists.password)) {
      res.json({ status: 'ok', message: `Hello ${userExists.userName}, you are logged in.` });
    } else {
      res.status(401).json({ status: 'error', message: 'Invalid email or password.' });
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error:', error);
      res.status(500).json({ status: 'error', message: error.message });
    } else {
      res.status(500).json({ status: 'error', message: 'Internal server error.' });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
