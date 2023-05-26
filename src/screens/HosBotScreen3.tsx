import React, { useState } from 'react';
import { Form, Col, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const BrokerQuestionForm = () => {
  const [broker, setBroker] = useState('');
  const [server, setServer] = useState('');
  const navigate = useNavigate();
  const handleBrokerChange = (e: { target: { value: any; }; }) => {
    const selectedBroker = e.target.value;
    setBroker(selectedBroker);
    // Reset the server selection when the broker changes
    setServer('');
  };
  
  const handleServerChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setServer(e.target.value);
  };
  
  const handleNext = () => {
    const hostBotDetailsString = localStorage.getItem('hostBotDetails');
    let hostBotDetails:any = {};
  
    if (hostBotDetailsString) {
      hostBotDetails = JSON.parse(hostBotDetailsString);
    }
  
    hostBotDetails.broker = broker;
    hostBotDetails.server = server;
  
    localStorage.setItem('hostBotDetails', JSON.stringify(hostBotDetails));
    navigate('/host-bot/4');
  };
  

  // Define the server options based on the selected broker
  const getServerOptions = () => {
    if (broker === 'Broker1') {
      return (
        <>
          <option value="">Select an option</option>
          <option value="Server1">Server 1</option>
          <option value="Server2">Server 2</option>
          <option value="Server3">Server 3</option>
        </>
      );
    }
    else if (broker === 'Broker2') {
      return (
        <>
          <option value="">Select an option</option>
          <option value="Server4">Server 4</option>
          <option value="Server5">Server 5</option>
          <option value="Server6">Server 6</option>
        </>
      );
    }
    // Add more cases for other brokers if needed
  };

  return (
    <Container style={{marginTop:"5%"}}>
      <Form>
        <Form.Group as={Col} controlId="formBroker">
          <Form.Label>Which broker do you use from the list below?</Form.Label>
          <Form.Control
            as="select"
            value={broker}
            onChange={handleBrokerChange}
          >
            <option value="">Select an option</option>
            <option value="Broker1">Broker 1</option>
            <option value="Broker2">Broker 2</option>
            {/* Add more broker options if needed */}
          </Form.Control>
        </Form.Group>
        {broker && (
          <Form.Group as={Col} controlId="formServer">
            <Form.Label>Select the server for {broker}</Form.Label>
            <Form.Control
              as="select"
              value={server}
              onChange={handleServerChange}
            >
              {getServerOptions()}
            </Form.Control>
          </Form.Group>
        )}
        <Button variant="primary" onClick={handleNext} disabled={!broker || !server}>
          Next
        </Button>
      </Form>
    </Container>
  );
};

export default BrokerQuestionForm;
