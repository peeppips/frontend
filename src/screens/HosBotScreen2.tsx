import React, { useState } from 'react';
import { Form, Col, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PlatformQuestionForm = () => {
  const [platform, setPlatform] = useState('');
  const navigate = useNavigate();

  const handlePlatformChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setPlatform(e.target.value);
  };

  const handleNext = () => {
    const hostBotDetailsString = localStorage.getItem('hostBotDetails');
    let hostBotDetails:any = {};
  
    if (hostBotDetailsString) {
      hostBotDetails = JSON.parse(hostBotDetailsString);
    }
  
    hostBotDetails.botPlatform = platform;
  
    localStorage.setItem('hostBotDetails', JSON.stringify(hostBotDetails));
    navigate('/host-bot/3');
  };
  

  return (
    <Container style={{marginTop:"5%"}}>
      <Form>
        <Form.Group as={Col} controlId="formPlatform">
          <Form.Label>Which platform does your bot run on?</Form.Label>
          <Form.Control
            as="select"
            value={platform}
            onChange={handlePlatformChange}
          >
            <option value="">Select an option</option>
            <option value="MT5">MT5</option>
            <option value="MT4">MT4</option>
            <option value="Python">Bot is made in Python</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" onClick={handleNext}>Next</Button>
      </Form>
    </Container>
  );
};

export default PlatformQuestionForm;
