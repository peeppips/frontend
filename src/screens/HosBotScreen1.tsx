import React, { useState, useEffect } from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store';
import { UserLoginState } from '../types';

const ResellingEstimateForm = () => {
  const [estimate, setEstimate] = useState('');
  const navigate = useNavigate();

  const userLogin = useSelector((state: RootState): UserLoginState => state.userLogin as UserLoginState);  
 
  // Destructure the properties with their types
const { userInfo } = userLogin;


useEffect(() => {
  if (!userInfo) {
    navigate('/');
  
  }
}, [userInfo]);

  useEffect(() => {
    const storedEstimate = localStorage.getItem('hostBotDetails');
    if (storedEstimate) {
      const parsedData = JSON.parse(storedEstimate);
      setEstimate(parsedData.resellEstimate);
    }
  }, []);

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
    <div className="centered-container">
      <Form>
        <Form.Group as={Col} controlId="formEstimate">
          <Form.Label>
            How many people do you estimate you will resell to in a month?
          </Form.Label>
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
        
        <Button variant="primary" disabled={estimate.length == 0 ? true :false} onClick={handleNext}>
          Next
        </Button>
      </Form>
    </div>
  );
};

export default ResellingEstimateForm;
