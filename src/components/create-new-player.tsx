import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

export const CreateNewPlayer = () => {

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const createPlayer = async (event: any) => {
    const name = event.target?.name?.value ?? '';
    const age = event.target?.age?.value ?? '';

    fetch('http://localhost:8000/players/', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "name": name,
            "age": age
        })
    })
    .then(response => response.json())
}

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin:'5%' }}>
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <h1>Create new player</h1>
      <Row  className="mb-3">
        <Form.Group as={Col} md="4" controlId="name">
          <Form.Label>First name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="First name"
          />
        </Form.Group>

        <Form.Group as={Col} md="3" controlId="age">
          <Form.Label>Age</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
            required
              type="number"
              placeholder="Age"
            />
          </InputGroup>
        </Form.Group>
      </Row>
      <Button variant='success' onClick={createPlayer} type="submit">Submit form</Button>
    </Form>
    </div>
  );
};
