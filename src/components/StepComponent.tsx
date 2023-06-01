import React, { useEffect, useState } from 'react';
import {  Steps, theme,notification } from 'antd';
import { Form, Button, Col, Row} from 'react-bootstrap';
import { registerWithGoogle,  } from "../firebase";
import { useDispatch } from 'react-redux'
import { register } from '../actions/userActions'

// import Message from './Message';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

import type { NotificationPlacement } from 'antd/es/notification/interface';

const UserDetails = () => {
  const [api, contextHolder] = notification.useNotification();
  
  const openNotification = () => {
    notification.open({
      message: 'User Details',
      description:
        'User Details Captured',
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };

  const openErrorNotification = (placement: NotificationPlacement,description:String) => {
    api.info({
      message: `Error`,
      description,
      placement,
    });
  };


  const userInfo = localStorage.getItem('userInfo');
  const userInfoObject = userInfo ? JSON.parse(userInfo) : null;

  const [firstName, setFirstname] = useState(userInfoObject?.firstName || '');
  const [secondName, setSecondname] = useState(userInfoObject?.secondName || '');
  const [email, setEmail] = useState(userInfoObject?.email || '');
  const [password, setPassword] = useState(userInfoObject?.password || '');
  const [confirmPassword, setConfirmPassword] = useState('');
  // const [message, setMessage] = useState<null | string>(null);
  const [authEmail, setAuthEmail] = useState(userInfo ? true : false);



  

  useEffect(() => {
    if (userInfo) {
      setFirstname(userInfoObject?.firstName);
      setSecondname(userInfoObject?.secondName);
      setEmail(userInfoObject?.email);
    }
  }, [userInfo]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      openErrorNotification('topLeft', 'Passwords do not match');
      
    } else {
      const userInfo = {
        firstName: firstName,
        secondName: secondName,
        email: email,
        password: password,
      };
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      openNotification();
      
    }
  };

  const authenticate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const user = await registerWithGoogle();
    if (user) {
      console.log('user is ', user);
      setAuthEmail(true);
      setEmail(user.email);
    }
  };

  if(email == undefined){
    setEmail('');
  }
  return (
    <>
    {contextHolder}

          <Form onSubmit={submitHandler}>
            <>You are required to Authenticate your email first</>

            {/* {message && <Message variant="danger">{message}</Message>} */}

            <Form.Group controlId="email">
            <Button className="btn btn-block" type="button" onClick={authenticate}>
  Authenticate Email
</Button>

            </Form.Group>

            {authEmail ? (
              <>

              <div id="recaptcha-container">

              </div>
                <Form.Group controlId="name">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Enter First name"
                    value={firstName}
                    required={true}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="name">
                  <Form.Label>Second Name</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Enter Last name"
                    value={secondName}
                    required={true}
                    onChange={(e) => setSecondname(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="name">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Enter Email"
                    value={email}
                    disabled={true}
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
          
                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      required={true}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
          
                  <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm password"
                      value={confirmPassword}
                      required={true}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </Form.Group>
                  <>
                {email == undefined ?<div role="alert" className="fade alert alert-danger show">Email is not confirmed</div>:<>
                {firstName.length > 0 && secondName.length > 0 && email.length > 0 && password.length > 0 && confirmPassword.length > 0 &&                     <Button type="submit" variant="primary">
                      Register User Details
                    </Button>}
                </>}
                </>
               

                
                </>
              ) : (
                <></>
              )}
            </Form>
            </>
  )
}
     
const AccountDetails = () => {

  const openNotification = () => {
    notification.open({
      message: 'Account Details',
      description:
        'Account Details Captured',
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };
  const userInfo = localStorage.getItem('userInfo');
  const userInfoObject = userInfo ? JSON.parse(userInfo) : null;

  const [accountLogin, setAccountLogin] = useState(userInfoObject?.accountLogin || '');
  const [accountBroker, setAccountBroker] = useState(userInfoObject?.accountBroker || '');
  const [accountServer, setAccountServer] = useState(userInfoObject?.accountServer || '');
  const [accountPassword, setAccountPassword] = useState(userInfoObject?.setAccountPassword || '');


  const updateAccountDetails = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userInfo = localStorage.getItem('userInfo');
    const userInfoObject = JSON.parse(userInfo ?? '{}');
  
    const updatedData = {
      ...userInfoObject,
      accountLogin: accountLogin,
      accountBroker: accountBroker,
      accountServer: accountServer,
      accountPassword:accountPassword
    };
  
    localStorage.setItem('userInfo', JSON.stringify(updatedData));
    openNotification();
   
    console.log('userInfo updated successfully:', updatedData);
  };
  




  return (
  

          <Form onSubmit={updateAccountDetails}>
            <Form.Group controlId="name">
              <Form.Label>Account Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Account Number"
                value={accountLogin}
                required={true}
                onChange={(e) => setAccountLogin(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="name">
              <Form.Label>Account Broker</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Broker"
                value={accountBroker}
                required={true}
                onChange={(e) => setAccountBroker(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="text">
              <Form.Label>Account Server</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Server"
                value={accountServer}
                required={true}
                onChange={(e) => setAccountServer(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="text">
              <Form.Label>Account Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={accountPassword}
                required={true}
                onChange={(e) => setAccountPassword(e.target.value)}
              />
            </Form.Group>
{accountLogin.length > 0 && accountBroker.length > 0 && accountPassword.length > 0 && accountServer.length > 0 && 
            <Button type="submit" variant="primary">
              Register Account Details
            </Button>
}
          </Form>
    
  );
};



const StrategyDetails = () => {

  
  const [strategyType, setStrategyType] = useState('');

  const handleStrategyTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setStrategyType(e.target.value);
};

const dispatch = useDispatch();

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  // Update userInfo in localStorage
  const userInfo = localStorage.getItem('userInfo');
  const userInfoObject = userInfo ? JSON.parse(userInfo) : {};

  const updatedUserInfo = {
    ...userInfoObject,
    strategyType: strategyType,
  };

  localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
 
  (dispatch as ThunkDispatch<any, any, AnyAction>)(register(updatedUserInfo));
 
};


  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="strategyType">
          <Form.Label>Select Strategy Type:</Form.Label>
          <Row>
            <Col md={6}>
            <Form.Check
            type="radio"
            id="newStrategy"
            name="strategyType"
            value="new"
            label="New Strategy"
            onChange={handleStrategyTypeChange}
          />
            </Col>

            <Col md={6}>

            <Form.Check
            type="radio"
            id="uploadStrategy"
            name="strategyType"
            value="upload"
            label="Upload Strategy"
            onChange={handleStrategyTypeChange}
          />
            </Col>
          </Row>
          
          
        </Form.Group>
{strategyType.length > 0 && 
        <Button variant="primary" type="submit">
          Submit
        </Button>
}
      </Form>
    </>
  );
};

const steps = [
  {
    title: 'User Detailssssss',
    content: <UserDetails />,
  }
];

const StepComponent: React.FC = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    padding:"2%",
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  

  return (
    <>
      <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div style={{ marginTop: 24 }}>
        {current < steps.length - 1 && (
          <Button variant="primary" onClick={() => next()}>
            Next
          </Button>
        )}
     
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </>
  );
};

export default StepComponent;

