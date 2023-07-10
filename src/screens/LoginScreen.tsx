import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
// import FormContainer from '../components/FormContainer';
import { login } from '../actions/userActions';
import { app, signInWithGoogle } from '../firebase';
import { RootState } from '../store';
import { UserLoginState } from '../types';
// import {  Container } from '@mui/material';
import { getAuth } from "firebase/auth";
// import styles from '../styles/landing.module.css';


import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
// import { Collapse, Row } from 'antd';
// import DashboardIndex from './DashboardScreens/HomeScreen';
import { USER_LOGIN_FAIL } from '../constants/userConstants';
import { Row } from 'react-bootstrap';


const auth = getAuth(app);
console.log(auth)

// const {Panel} = Collapse

const LoginScreen: React.FC = () => {

  // const [ contextHolder] = notification.useNotification();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state: RootState): UserLoginState => state.userLogin as UserLoginState);  
//  const navigate = useNavigate()
  // Destructure the properties with their types
const { loading, error, userInfo } = userLogin;
  // useEffect(() => {
  //   if (userInfo) {
  //     console.log(userInfo)
    
  //   }
  //   else{
  //   navigate('/')
  //   }
  // }, [userInfo]);

  // const openNotification = () => {
  //   api.open({
  //     message: 'Login Successfull',
  //     description:
  //       'Welcome To Our',
  //     className: 'custom-className',
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
  
  const loginwithg = async ()=>{
    const details = await signInWithGoogle()
    console.log("details are ",details)
    const {email,error}= details
    if (email) {
      (dispatch as ThunkDispatch<any, any, AnyAction>)(login({ email, password:"default" }));
    }
    if(error){
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error
            ? error
            : error
      })
    }  }

const navigate = useNavigate();

useEffect(() => {
  if (userInfo) {
    navigate('/dashboard');
  }
}, [userInfo]);



  return (

   <>


    <section>
      <div className="page-header min-vh-100">
       
          <div className="row w-100 vh-100">
          <div className="col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0 mx-auto text-align-center justify-content-center">
              <div className="card card-plain">
              <div className="card-header pb-0 text-start text-center">
  {error && <Message variant='danger'>{error}</Message>}
  {loading && <div className="m-2"> <Loader /> </div>}
  <h4 className="font-weight-bolder">Login In</h4>
  <p className="mb-0">or <Link to="/register">Create an Account</Link></p>
</div>

                <div className="card-body">
                  <form onSubmit={submitHandler}>
                  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email</label>
    <input
      type="email"
      id="email"
      className="form-control form-control-lg"
      placeholder="johndee@gmail.com"
      aria-label="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input
      type="password"
      id="password"
      className="form-control form-control-lg"
      placeholder="*******"
      aria-label="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
  </div>
                  
                    <div className="text-center">
                      <button  type='submit' className="btn btn-lg btn-primary btn-lg w-100 mt-4 mb-0">Sign in</button>
                    </div>
                  </form>
                  <Row>
                <div className="col-12 px-1">
                <div className="text-center mt-4">
                  <b>OR</b>
                      <button  onClick={loginwithg} className="btn btn-block btn-lg btn-primary btn-lg w-100 mt-4 mb-0">Sign in with google</button>
                    </div>
              </div>
                </Row>
                </div>
                
               
              </div>
            </div>
            <div className="col-8 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 end-0 text-center justify-content-center flex-column">
              <div className="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden" style={{backgroundImage: `url('https://img.freepik.com/free-photo/hedge-fund-company-agents-workspace-reviewing-stock-market-prices-highs-lows-brokerage-company-employees-sitting-multi-monitor-workstation-while-analyzing-trading-index_482257-44529.jpg?w=740&t=st=1688977393~exp=1688977993~hmac=a6c72764ba2861af6255aed36e306136f534493128d6984cfffa21695fb47f55')`,backgroundSize: 'cover'}} >
                <span className="mask bg-gradient-primary opacity-6"></span>
                <h4 className="mt-5 text-white font-weight-bolder position-relative">"Powering Your Trading Success"</h4>
                <p className="text-white position-relative">The more effortless the writing looks, the more effort the writer actually put into the process.</p>
              </div>
            </div>
          </div>
      
      </div>
    </section>
 
   
  
      {/* <h1>Sign In</h1>




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
      </Row> */}
    </>
  )}

export default LoginScreen;