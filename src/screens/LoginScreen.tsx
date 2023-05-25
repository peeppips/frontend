import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/userActions';
import { app } from '../firebase';
import { RootState } from '../store';
import { UserLoginState } from '../types';
import { Grid, Container } from '@mui/material';
import { getAuth } from "firebase/auth";
import styles from '../styles/landing.module.css';

import Cardcomponent from '../components/Cardcomponent';

import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { Modal } from 'antd';


const auth = getAuth(app);
console.log(auth)



const LoginScreen: React.FC = () => {

  // const [ contextHolder] = notification.useNotification();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state: RootState): UserLoginState => state.userLogin as UserLoginState);  
 
  // Destructure the properties with their types
const { loading, error, userInfo } = userLogin;
  useEffect(() => {
    if (userInfo) {
      console.log(userInfo)
    
    }
  }, [userInfo]);

  // const openNotification = () => {
  //   api.open({
  //     message: 'Login Successfull',
  //     description:
  //       'Welcome To Our',
  //     className: 'custom-class',
  //     style: {
  //       width: 600,
  //     },
  //   });
  // };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    (dispatch as ThunkDispatch<any, any, AnyAction>)(login({ email, password }));
    // openNotification()

  };
  



  return (
<>
{/* {contextHolder} */}
{userInfo ? (
  <Homescreen/>):
(
    <FormContainer>
      <h1>Sign In</h1>


      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button type='submit' variant='primary'>
          Sign In
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          New Customer?{' '}
          <Link to='/register'>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )};
  </>)
};

export default LoginScreen;

const BotForm = () => {
  const [resellCount, setResellCount] = useState('');
  const [platform, setPlatform] = useState('');
  const [broker, setBroker] = useState('');
  // const [botFile, setBotFile] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [password, setPassword] = useState('');
  const [server, setServer] = useState('');
  // const [userLogin, setstate] = useState([] as any[]);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Perform form submission logic here
    // You can access the form values using the state variables

    // Reset form fields after submission
    setResellCount('');
    setPlatform('');
    setBroker('');
    // setBotFile('');
    setAccountNumber('');
    setPassword('');
    setServer('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="resellCount">
        <Form.Label>
          How many people do you estimate you will resell to in a month:
        </Form.Label>
        <Form.Control
          type="text"
          value={resellCount}
          onChange={(e) => setResellCount(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="platform">
        <Form.Label>Which platform does your bot run on?</Form.Label>
        <Form.Control
          as="select"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
        >
          <option value="">Select Platform</option>
          <option value="MT5">MT5</option>
          <option value="MT4">MT4</option>
          <option value="Python">Bot is made in python</option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="broker">
        <Form.Label>Which broker do you use from the list below?</Form.Label>
        <Form.Control
          as="select"
          value={broker}
          onChange={(e) => setBroker(e.target.value)}
        >
          <option value="">Select Broker</option>
          <option value="Broker 1">Broker 1</option>
          <option value="Broker 2">Broker 2</option>
          <option value="Broker 3">Broker 3</option>
          {/* Add more options as needed */}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="botFile">
        <Form.Label>Upload the bot</Form.Label>
        {/* <Form.Control
          type="file"
          onChange={(e) => setBotFile(e.target.files[0])}
        /> */}
      </Form.Group>

      <Form.Group controlId="accountNumber">
        <Form.Label>Account Number</Form.Label>
        <Form.Control
          type="text"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="server">
        <Form.Label>Broker Server</Form.Label>
        <Form.Control
          type="text"
          value={server}
          onChange={(e) => setServer(e.target.value)}
        />
      </Form.Group>

      <Button type="submit">Submit</Button>

      </Form>
  )
}


const Homescreen = () => {
  const userLogin = useSelector((state: RootState) => state.userLogin);

  const { userInfo } = userLogin;


  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };


  const handleCancel = () => {
    setIsModalOpen(false);
  };
  
  return(
    <main>

    <Container className={styles.container}>

    <Modal title="Bot Details" open={isModalOpen}  onCancel={handleCancel}>
        <BotForm/>
      </Modal>
       
        <Grid container spacing={4}>
          
        
        {userInfo && <> {userInfo['isAdmin'] ? <> 
          <Grid item sm={12} xs={12} md={6}>
                <Link to={'/research'}>
                <Cardcomponent image={`https://leverageedublog.s3.ap-south-1.amazonaws.com/blog/wp-content/uploads/2020/03/28214113/Types-of-Research-Design.jpg`} title={`Research`} description={`/research`}/>
                </Link>
            </Grid>
            <Grid item sm={12} xs={12} md={6}>
            <Link to={'/business'}>
                
                <Cardcomponent image={`https://www.xero.com/content/dam/xero/pilot-images/guides/how-to-start-an-online-business-guide/htsob-guide-hero.1648510683285.png`} title={`Business`} description={`/business`}/>

                </Link>
            </Grid>
        </>: <></>} </>}
        
            
            <Grid item sm={12} xs={12} md={6}>
            <Link to={'/free-bots'}> 
            <Cardcomponent image={`https://www.addtelegrammember.com/wp-content/webpc-passthru.php?src=https://www.addtelegrammember.com/wp-content/uploads/2020/12/Telegram-Bot-1200x600.jpg&nocache=1`} title={`Free Bots`} description={`/free-bots`}/>

                </Link>
            </Grid>
            <Grid item sm={12} xs={12} md={6}>

            <Link to={'/newsletter'}> 
            <Cardcomponent image={`https://kinsta.com/wp-content/uploads/2021/12/newsletter-examples.png`} title={`Subscribe To Our NewsLetter`} description={`/newsletter`}/>

                </Link>

                </Grid>
                <Grid item sm={12} xs={12} md={6}>
                <Link to={'https://docs.google.com/forms/d/1BNnPyTXVw46JIhJoUNjq2wU07nYR6hRIrFV858xqweg/edit?usp=forms_home&ths=true'} target="_blank" rel="noopener noreferrer"> 
            <Cardcomponent image={`https://kinsta.com/wp-content/uploads/2021/12/newsletter-examples.png`} title={`I want you to create a trading bot for me`} description={`Fill the Form`}/>

                </Link>
                </Grid>

                <Grid onClick={showModal} item sm={12} xs={12} md={6}>
               
            <Cardcomponent  image={`https://kinsta.com/wp-content/uploads/2021/12/newsletter-examples.png`} title={`I have a trading bot that I want you to host and to help me  resell (Host Bot)`} description={`Fill the Form`}/>
               
            </Grid>

        </Grid>


    </Container>
</main>

  )
}