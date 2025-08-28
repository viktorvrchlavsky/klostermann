import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Booking {
  id: number;
  name: string;
  dateFrom: string;
  dateTo: string;
}

const API_URL = 'http://localhost:3001/api/bookings';

function UserView() {
  const [name, setName] = useState('');
  const [dateFrom, setDateFrom] = useState<Date | null>(null);
  const [dateTo, setDateTo] = useState<Date | null>(null);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);

  useEffect(() => {
    fetchBookedDates();
  }, []);

  const fetchBookedDates = async () => {
    try {
      const response = await axios.get<Booking[]>(API_URL);
      const dates: Date[] = [];
      response.data.forEach(booking => {
        const from = new Date(booking.dateFrom);
        const to = new Date(booking.dateTo);
        let currentDate = new Date(from);
        while (currentDate <= to) {
          dates.push(new Date(currentDate));
          currentDate.setDate(currentDate.getDate() + 1);
        }
      });
      setBookedDates(dates);
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
      await axios.post(API_URL, {
        name,
        dateFrom: dateFrom.toISOString().split('T')[0],
        dateTo: dateTo.toISOString().split('T')[0],
      });
      alert('Rezervace byla úspěšně vytvořena.');
      setName('');
      setDateFrom(null);
      setDateTo(null);
      fetchBookedDates(); // Refresh booked dates
    } catch (error) {
      console.error('Chyba při vytváření rezervace:', error);
      alert('Při vytváření rezervace došlo k chybě.');
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Header as="h2" className="text-center">Vytvořit novou rezervaci</Card.Header>
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
                      <DatePicker
                        selected={dateFrom}
                        onChange={(date) => setDateFrom(date)}
                        selectsStart
                        startDate={dateFrom}
                        endDate={dateTo}
                        minDate={new Date()}
                        excludeDates={bookedDates}
                        dateFormat="dd. MM. yyyy"
                        className="form-control"
                        placeholderText="Vyberte datum"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Datum do</Form.Label>
                      <DatePicker
                        selected={dateTo}
                        onChange={(date) => setDateTo(date)}
                        selectsEnd
                        startDate={dateFrom}
                        endDate={dateTo}
                        minDate={dateFrom ? dateFrom : undefined}
                        excludeDates={bookedDates}
                        dateFormat="dd. MM. yyyy"
                        className="form-control"
                        placeholderText="Vyberte datum"
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
    </Container>
  );
}

export default UserView;
