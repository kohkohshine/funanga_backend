const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
require('dotenv').config({ path: '.env.local' });
const UserModel = require('./models/user');


const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;
const mongodbUri = process.env.MONGODB_URI;

mongoose.connect(mongodbUri);

 
app.post('/login', cors(), async (req, res) => {
    try {
      const { email, password } = req.body;
      const userExists = await UserModel.findOne({ email });
  
      if (userExists && userExists.password === password) {
        res.json({ status: 'ok', message: `Hello ${userExists.username}, you are logged in.` });
      } else {
        res.status(401).json({ status: 'error', message: 'Invalid email or password.' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ status: 'error', message: 'Internal server error.' });
    }
  });
  
  

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
