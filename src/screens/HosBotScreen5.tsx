import React, { useState } from 'react';
import { Form, Col, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const DeployBotForm = () => {
  const [accountNumber, setAccountNumber] = useState('');
  const [password, setPassword] = useState('');
  const [broker, setBroker] = useState('');
  const [server, setServer] = useState('');
  const navigate = useNavigate();

  const handleAccountNumberChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setAccountNumber(e.target.value);
  };

  const handlePasswordChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setPassword(e.target.value);
  };

  const handleBrokerChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setBroker(e.target.value);
  };

  const handleServerChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setServer(e.target.value);
  };

  const handleDeploy = () => {
    // Perform the necessary action to deploy the bot using the provided variables
    // For example, you can send an API request to a server or execute deployment logic

    navigate('/host-bot/submit');
  };

  return (
    <Container style={{marginTop:"5%"}}>
      <Form>
        <Form.Group as={Col} controlId="formAccountNumber">
          <Form.Label>Account Number</Form.Label>
          <Form.Control
            type="text"
            value={accountNumber}
            onChange={handleAccountNumberChange}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formBroker">
          <Form.Label>Broker</Form.Label>
          <Form.Control
            type="text"
            value={broker}
            onChange={handleBrokerChange}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formServer">
          <Form.Label>Server</Form.Label>
          <Form.Control
            type="text"
            value={server}
            onChange={handleServerChange}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleDeploy} disabled={!accountNumber || !password || !broker || !server}>
          Deploy
        </Button>
      </Form>
    </Container>
  );
};

export default DeployBotForm;
