import React, { useState, useEffect } from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store';
import { UserLoginState } from '../types';


interface HostBotDetails {
  broker?: string;
  server?: string;
}

const BrokerQuestionForm = () => {
  const [broker, setBroker] = useState('');
  const [server, setServer] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedHostBotDetails = localStorage.getItem('hostBotDetails');
    if (storedHostBotDetails) {
      const parsedData: HostBotDetails = JSON.parse(storedHostBotDetails);
      setBroker(parsedData.broker || '');
      setServer(parsedData.server || '');
    }
  }, []);

  const handleBrokerChange = (e: { target: { value: any; }; }) => {
    const selectedBroker = e.target.value;
    setBroker(selectedBroker);
    setServer('');
  };

  const handleServerChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    const selectedServer = e.target.value;
    setServer(selectedServer);
  };


  const handleNext = () => {
    const hostBotDetailsString = localStorage.getItem('hostBotDetails');
    let hostBotDetails: HostBotDetails = {};

    if (hostBotDetailsString) {
      hostBotDetails = JSON.parse(hostBotDetailsString);
    }

    hostBotDetails.broker = broker;
    hostBotDetails.server = server;

    localStorage.setItem('hostBotDetails', JSON.stringify(hostBotDetails));
    navigate('/host-bot/4');
  };
  const userLogin = useSelector((state: RootState): UserLoginState => state.userLogin as UserLoginState);  
 
  // Destructure the properties with their types
const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate('/')
    } else {
      
    }
  }, [userInfo]);

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
    } else if (broker === 'Broker2') {
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
    <div className="centered-container">
      <Form>
        <Form.Group as={Col} controlId="formBroker">
          <Form.Label>Which broker do you use from the list below?</Form.Label>
          <Form.Control as="select" value={broker} onChange={handleBrokerChange}>
            <option value="">Select an option</option>
            <option value="Broker1">Broker 1</option>
            <option value="Broker2">Broker 2</option>
            {/* Add more broker options if needed */}
          </Form.Control>
        </Form.Group>
        {broker && (
          <Form.Group as={Col} controlId="formServer">
            <Form.Label>Select the server for {broker}</Form.Label>
            <Form.Control as="select" value={server} onChange={handleServerChange}>
              {getServerOptions()}
            </Form.Control>
          </Form.Group>
        )}
        
        <Button variant="primary" onClick={handleNext} disabled={!broker || !server}>
          Next
        </Button>
      </Form>
    </div>
  );
};

export default BrokerQuestionForm;
