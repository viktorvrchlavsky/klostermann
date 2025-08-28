const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const dbPath = path.join(__dirname, 'db.json');

// Get all bookings
app.get('/api/bookings', (req, res) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read bookings.' });
    }
    res.json(JSON.parse(data).bookings);
  });
});

// Create a new booking
app.post('/api/bookings', (req, res) => {
  const newBooking = req.body;

  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read bookings.' });
    }
    const db = JSON.parse(data);
    db.bookings.push(newBooking);

    fs.writeFile(dbPath, JSON.stringify(db, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to save booking.' });
      }
      res.status(201).json(newBooking);
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
