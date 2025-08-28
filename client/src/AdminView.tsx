import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap';
import EditBookingModal from './EditBookingModal';

interface Booking {
  id: number;
  name: string;
  dateFrom: string;
  dateTo: string;
}

const API_URL = 'http://localhost:3001/api/bookings';

function AdminView() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

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

  const handleDelete = async (id: number) => {
    if (window.confirm('Opravdu chcete smazat tuto rezervaci?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchBookings(); // Refresh the list
      } catch (error) {
        console.error('Chyba při mazání rezervace:', error);
      }
    }
  };

  const handleShowEditModal = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowEditModal(true);
  };

  const handleHideEditModal = () => {
    setShowEditModal(false);
    setSelectedBooking(null);
  };

  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col>
            <h2>Všechny rezervace</h2>
            <ListGroup>
              {bookings.map((booking) => (
                <ListGroup.Item key={booking.id} className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{booking.name}</strong> - od: {booking.dateFrom} do: {booking.dateTo}
                  </div>
                  <div>
                    <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleShowEditModal(booking)}>Upravit</Button>
                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(booking.id)}>Smazat</Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>

      <EditBookingModal
        show={showEditModal}
        onHide={handleHideEditModal}
        booking={selectedBooking}
        onBookingUpdated={fetchBookings}
      />
    </>
  );
}

export default AdminView;
