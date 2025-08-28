import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Booking {
  id: number;
  name: string;
  dateFrom: string;
  dateTo: string;
}

interface EditBookingModalProps {
  show: boolean;
  onHide: () => void;
  booking: Booking | null;
  onBookingUpdated: () => void;
}

const API_URL = 'http://localhost:3001/api/bookings';

function EditBookingModal({ show, onHide, booking, onBookingUpdated }: EditBookingModalProps) {
  const [name, setName] = useState('');
  const [dateFrom, setDateFrom] = useState<Date | null>(null);
  const [dateTo, setDateTo] = useState<Date | null>(null);

  useEffect(() => {
    if (booking) {
      setName(booking.name);
      setDateFrom(new Date(booking.dateFrom));
      setDateTo(new Date(booking.dateTo));
    }
  }, [booking]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!booking || !dateFrom || !dateTo) return;

    try {
      await axios.put(`${API_URL}/${booking.id}`, {
        name,
        dateFrom: dateFrom.toISOString().split('T')[0],
        dateTo: dateTo.toISOString().split('T')[0],
      });
      onBookingUpdated();
      onHide();
    } catch (error) {
      console.error('Chyba při úpravě rezervace:', error);
      alert('Při úpravě rezervace došlo k chybě.');
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Upravit rezervaci</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Jméno</Form.Label>
            <Form.Control
              type="text"
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
                  dateFormat="dd. MM. yyyy"
                  className="form-control"
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
                  dateFormat="dd. MM. yyyy"
                  className="form-control"
                />
              </Form.Group>
            </Col>
          </Row>
          <Button variant="primary" type="submit">
            Uložit změny
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditBookingModal;
