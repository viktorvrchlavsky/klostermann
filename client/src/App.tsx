import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, ListGroup, Card } from 'react-bootstrap';
import PasswordProtect from './PasswordProtect'; // Import the new component

interface Booking {
  name: string;
  dateFrom: string;
  dateTo: string;
}

const API_URL = 'http://localhost:3001/api/bookings';

function App() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [name, setName] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get<Booking[]>(API_URL);
      setBookings(response.data);
    } catch (error) {
      console.error('Chyba při načítání rezervací:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !dateFrom || !dateTo) {
      alert('Vyplňte prosím všechna pole.');
      return;
    }
    try {
      const newBooking: Booking = { name, dateFrom, dateTo };
      const response = await axios.post<Booking>(API_URL, newBooking);
      setBookings([...bookings, response.data]);
      setName('');
      setDateFrom('');
      setDateTo('');
    } catch (error) {
      console.error('Chyba při vytváření rezervace:', error);
    }
  };

  return (
    <PasswordProtect>
      <Container className="mt-5">
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Card>
              <Card.Header as="h2" className="text-center">Rezervační systém</Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Jméno</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Zadejte vaše jméno"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>
                  <Row>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Datum od</Form.Label>
                        <Form.Control
                          type="date"
                          value={dateFrom}
                          onChange={(e) => setDateFrom(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Datum do</Form.Label>
                        <Form.Control
                          type="date"
                          value={dateTo}
                          onChange={(e) => setDateTo(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <div className="d-grid">
                    <Button variant="primary" type="submit">
                      Rezervovat
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col md={{ span: 6, offset: 3 }}>
            <h3>Existující rezervace</h3>
            <ListGroup>
              {bookings.map((booking, index) => (
                <ListGroup.Item key={index}>
                  <strong>{booking.name}</strong> - od: {booking.dateFrom} do: {booking.dateTo}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </PasswordProtect>
  );
}

export default App;
