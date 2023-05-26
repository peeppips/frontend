import React, { useState } from 'react';
import { Form, Col, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ResellingEstimateForm = () => {
  const [estimate, setEstimate] = useState('');
//   const history = useHistory();
  const navigate = useNavigate();

  const handleEstimateChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setEstimate(e.target.value);
  };

  const handleNext = () => {
    const hostBotDetails = {
      resellEstimate: estimate
    };

    localStorage.setItem('hostBotDetails', JSON.stringify(hostBotDetails));
    navigate('/host-bot/2');
  };

  return (
    <Container style={{marginTop:"5%"}}>
    <Form>
      <Form.Group as={Col} controlId="formEstimate">
        <Form.Label>How many people do you estimate you will resell to in a month?</Form.Label>
        <Form.Control
          as="select"
          value={estimate}
          onChange={handleEstimateChange}
        >
          <option value="">Select an option</option>
          <option value="0-10">0-10</option>
          <option value="11-50">11-50</option>
          <option value="51-100">51-100</option>
          <option value="101-500">101-500</option>
          <option value="501+">501+</option>
        </Form.Control>
      </Form.Group>
      <Button variant="primary" onClick={handleNext}>Next</Button>
    </Form>
    </Container>
  );
};

export default ResellingEstimateForm;
