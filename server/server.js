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
  const newBooking = { id: Date.now(), ...req.body }; // Add an ID

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

// Update a booking
app.put('/api/bookings/:id', (req, res) => {
  const bookingId = parseInt(req.params.id, 10);
  const updatedBooking = req.body;

  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read bookings.' });
    }
    const db = JSON.parse(data);
    const bookingIndex = db.bookings.findIndex(b => b.id === bookingId);

    if (bookingIndex === -1) {
      return res.status(404).json({ error: 'Booking not found.' });
    }

    db.bookings[bookingIndex] = { ...db.bookings[bookingIndex], ...updatedBooking };

    fs.writeFile(dbPath, JSON.stringify(db, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to update booking.' });
      }
      res.json(db.bookings[bookingIndex]);
    });
  });
});

// Delete a booking
app.delete('/api/bookings/:id', (req, res) => {
  const bookingId = parseInt(req.params.id, 10);

  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read bookings.' });
    }
    const db = JSON.parse(data);
    const filteredBookings = db.bookings.filter(b => b.id !== bookingId);

    if (db.bookings.length === filteredBookings.length) {
      return res.status(404).json({ error: 'Booking not found.' });
    }

    db.bookings = filteredBookings;

    fs.writeFile(dbPath, JSON.stringify(db, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to delete booking.' });
      }
      res.status(204).send();
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
