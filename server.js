require('dotenv').config();
require('./db'); // connect DB once

const express = require('express');
const app = express();

const Person = require('./models/person');

app.use(express.json()); // replaces body-parser

// Home route
app.get('/', (req, res) => {
  res.send('Welcome my hotel... How can I help you? We have a list of menus.');
});

// POST route to add a person
app.post('/person', async (req, res) => {
  try {
    const data = req.body;

    const newPerson = new Person(data);
    const savedPerson = await newPerson.save();

    res.status(201).json(savedPerson);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
