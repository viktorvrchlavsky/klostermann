import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card, InputGroup } from 'react-bootstrap';

interface PasswordProtectProps {
  children: React.ReactNode;
}

// WARNING: This is not a secure way to store a password.
// In a real application, use environment variables and a more robust authentication mechanism.
const CORRECT_PASSWORD = 'password123';

function PasswordProtect({ children }: PasswordProtectProps) {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Nesprávné heslo');
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Header as="h3" className="text-center">Vyžadováno heslo</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Zadejte heslo</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Heslo"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                      variant="outline-secondary"
                      onMouseDown={() => setShowPassword(true)}
                      onMouseUp={() => setShowPassword(false)}
                      onTouchStart={() => setShowPassword(true)}
                      onTouchEnd={() => setShowPassword(false)}
                    >
                      Zobrazit
                    </Button>
                  </InputGroup>
                </Form.Group>
                <div className="d-grid">
                  <Button variant="primary" type="submit">
                    Vstoupit
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

export default PasswordProtect;
