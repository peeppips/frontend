import React, { useEffect, useState } from 'react';
import { Form, Col, Button, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { AnyAction } from 'redux';
// import { ThunkDispatch } from 'redux-thunk';
// import { createProject } from '../actions/projectActions';
import {  notification } from 'antd';
import type { NotificationPlacement } from 'antd/es/notification/interface';
import { RootState } from '../store';
import { UserLoginState } from '../types';

const Context = React.createContext({ name: 'Default' });

interface HostBotDetails {
  accountNumber?: string;
  password?: string;
}

const DeployBotForm = () => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: `Notification ${placement}`,
      description: <Context.Consumer>{({ name }) => `Hello, ${name}!`}</Context.Consumer>,
      placement,
    });
  };

  // const dispatch = useDispatch();
  const [accountNumber, setAccountNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountNumber(e.target.value);
    updateLocalStorage('accountNumber', e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    updateLocalStorage('password', e.target.value);
  };

  const updateLocalStorage = (key: keyof HostBotDetails, value: string) => {
    const hostBotDetailsString = localStorage.getItem('hostBotDetails');
    let hostBotDetails: HostBotDetails = {};

    if (hostBotDetailsString) {
      hostBotDetails = JSON.parse(hostBotDetailsString);
    }

    hostBotDetails[key] = value;

    localStorage.setItem('hostBotDetails', JSON.stringify(hostBotDetails));
  };

  const handleDeploy = async() => {

    type HostBotDetails = {
      email:string;
      resellEstimate: string;
      platform: string;
      broker: string;
      server: string;
      uploadedFilePath: string;
      accountNumber: number;
      password: string;
    };

    
    // let hostBotDetails: HostBotDetails ;
    
  
    const hostBotDetailsString = localStorage.getItem('hostBotDetails');
    const userInfoString = localStorage.getItem('userInfo');
   
    if (hostBotDetailsString && userInfoString) {
     
      const hostBotDetails: HostBotDetails = JSON.parse(hostBotDetailsString);
      const userInfo = JSON.parse(userInfoString);
      hostBotDetails.email = userInfo.email;
      console.log(hostBotDetails);
     
      
      
    
      try {
        // await (dispatch as ThunkDispatch<any, any, AnyAction>)(createProject(hostBotDetails));;
        // Navigation upon successful project creation
        openNotification('topLeft')
        navigate('/'); // Replace with your desired navigation path
      } catch (error) {
        // Handle error
      }

    }

    // Perform the necessary action to deploy the bot using the hostBotDetails
    // For example, you can send an API request to a server or execute deployment logic
    // dispatchBotDeployment(hostBotDetails);
    
    // navigate('/host-bot/submit');
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
       {contextHolder}
      <Container>
        <Form>
          <Form.Group as={Col} controlId="formAccountNumber">
            <Form.Label>Account Number</Form.Label>
            <Form.Control
              type="number"
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
          <Button
            variant="primary"
            onClick={handleDeploy}
            disabled={!accountNumber || !password}
          >
            Deploy
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default DeployBotForm;
