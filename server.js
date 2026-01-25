require('dotenv').config();
require('./db'); // connect DB once

const express = require('express');
const app = express();

const Person = require('./models/person');
const MenuItem = require('./models/MenuItem');

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
// GET route to fetch all persons
app.get('/person', async (req, res) => {
  try {
    const persons = await Person.find();
    res.status(200).json(persons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// CREATE MenuItem
app.post('/MenuItem', async (req, res) => {
  try {
    const data = req.body;

    const newMenuItem = new MenuItem(data);
    const savedMenuItem = await newMenuItem.save();

    res.status(201).json(savedMenuItem); // ✅ FIXED
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// READ all MenuItems
app.get('/MenuItem', async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
