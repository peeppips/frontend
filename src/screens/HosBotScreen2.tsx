import React, { useState, useEffect } from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { RootState } from '../store';
import { UserLoginState } from '../types';

interface HostBotDetails {
  botPlatform?: string;
}

const PlatformQuestionForm = () => {
  const [platform, setPlatform] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedHostBotDetails = localStorage.getItem('hostBotDetails');
    if (storedHostBotDetails) {
      const parsedData: HostBotDetails = JSON.parse(storedHostBotDetails);
      setPlatform(parsedData.botPlatform || '');
    }
  }, []);

  const handlePlatformChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setPlatform(e.target.value);
  };

  const handleNext = () => {
    const hostBotDetailsString = localStorage.getItem('hostBotDetails');
    let hostBotDetails: HostBotDetails = {};

    if (hostBotDetailsString) {
      hostBotDetails = JSON.parse(hostBotDetailsString);
    }

    hostBotDetails.botPlatform = platform;

    localStorage.setItem('hostBotDetails', JSON.stringify(hostBotDetails));
    navigate('/host-bot/3');
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

  return (
    <div className="centered-container">
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
        <Button variant="primary" disabled={platform.length == 0 ? true :false} onClick={handleNext}>
          Next
        </Button>
      </Form>
    </div>
  );
};

export default PlatformQuestionForm;
