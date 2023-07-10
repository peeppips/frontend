import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {  Row, Col, Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { RootState } from '../store';
import type { NotificationPlacement } from 'antd/es/notification/interface';
import {notification } from 'antd';
import { registerWithGoogle,  } from "../firebase";
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { register } from '../actions/userActions'
import "./RegisterPage.css"

const RegisterScreen: React.FC = () => {
  const dispatch = useDispatch();

  const [,setMessage ] = useState<null | string>(null);

  const userRegister = useSelector((state: RootState) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const openErrorNotification = (placement: NotificationPlacement,description:String) => {
    api.info({
      message: `Error`,
      description,
      placement,
    });
  };


  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      // document.location.href = '/';
      navigate("/dashboard")
      // history.push(redirect)
    }

    if(error){
      setMessage(error)
  
    }
  }, [userInfo]);

  const [api, contextHolder] = notification.useNotification();

  const [firstName, setFirstname] = useState('');
  const [secondName, setSecondname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // const [message, setMessage] = useState<null | string>(null);



  

  useEffect(() => {
    if (userInfo) {
     navigate('/')
    }
  }, [userInfo]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      openErrorNotification('topLeft', 'Passwords do not match');
      
    } else {

      (dispatch as ThunkDispatch<any, any, AnyAction>)(register({
        firstName, secondName, password,email
      }));

      
    }
  };

  const authenticate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const signupgoogledetails = await registerWithGoogle();
   
    if (signupgoogledetails) {
      console.log("sadasd",signupgoogledetails);

      const x_firstname = signupgoogledetails.user?.displayName;
      const x_email = signupgoogledetails.user?.email

      console.log(x_firstname,x_email)

      if (x_firstname && x_email) {
        (dispatch as ThunkDispatch<any, any, AnyAction>)(register({
          firstName:x_firstname, secondName:x_firstname, password:"default",email:x_email
        }));
      }
   

    }
    // const {firstName,secondName,email,error,profile_pic} = signupgoogledetails

    // if(firstName){
    //   dispatch(register( {firstName,secondName,email,error,profile_pic}))
    // }
  };

  if(email == undefined){
    setEmail('');
  }

  return (
    <>
    {contextHolder}

      <div className="row  justify-content-center vh-100">
        <div className="col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0 mx-auto text-align-center justify-content-center">
          <div className="card z-index-0">
            <div className="card-header text-center pt-4">
              {error && <Message variant='danger'>{error}</Message>}
              {loading && <Loader />}
              <h5>Sign Up</h5>
              <p className="mb-0">or <Link to="/">Login to Your Account</Link></p>

            </div>
            <div className="row px-xl-5 px-sm-4 px-3">
              <div className="col-12 me-auto px-1">
                <button className="btn btn-outline-light w-100" onClick={authenticate}>
                  <svg width="24px" height="32px" viewBox="0 0 64 64" version="1.1">
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <g transform="translate(3.000000, 2.000000)" fill-rule="nonzero">
                        <path d="M57.8123233,30.1515267 C57.8123233,27.7263183 57.6155321,25.9565533 57.1896408,24.1212666 L29.4960833,24.1212666 L29.4960833,35.0674653 L45.7515771,35.0674653 C45.4239683,37.7877475 43.6542033,41.8844383 39.7213169,44.6372555 L39.6661883,45.0037254 L48.4223791,51.7870338 L49.0290201,51.8475849 C54.6004021,46.7020943 57.8123233,39.1313952 57.8123233,30.1515267" fill="#4285F4"></path>
                        <path d="M29.4960833,58.9921667 C37.4599129,58.9921667 44.1456164,56.3701671 49.0290201,51.8475849 L39.7213169,44.6372555 C37.2305867,46.3742596 33.887622,47.5868638 29.4960833,47.5868638 C21.6960582,47.5868638 15.0758763,42.4415991 12.7159637,35.3297782 L12.3700541,35.3591501 L3.26524241,42.4054492 L3.14617358,42.736447 C7.9965904,52.3717589 17.959737,58.9921667 29.4960833,58.9921667" fill="#34A853"></path>
                        <path d="M12.7159637,35.3297782 C12.0932812,33.4944915 11.7329116,31.5279353 11.7329116,29.4960833 C11.7329116,27.4640054 12.0932812,25.4976752 12.6832029,23.6623884 L12.6667095,23.2715173 L3.44779955,16.1120237 L3.14617358,16.2554937 C1.14708246,20.2539019 0,24.7439491 0,29.4960833 C0,34.2482175 1.14708246,38.7380388 3.14617358,42.736447 L12.7159637,35.3297782" fill="#FBBC05"></path>
                        <path d="M29.4960833,11.4050769 C35.0347044,11.4050769 38.7707997,13.7975244 40.9011602,15.7968415 L49.2255853,7.66898166 C44.1130815,2.91684746 37.4599129,0 29.4960833,0 C17.959737,0 7.9965904,6.62018183 3.14617358,16.2554937 L12.6832029,23.6623884 C15.0758763,16.5505675 21.6960582,11.4050769 29.4960833,11.4050769" fill="#EB4335"></path>
                      </g>
                    </g>
                  </svg>
                </button>
              </div>
              <div className="mt-2 position-relative text-center">
                <p className="text-sm font-weight-bold mb-2 text-secondary text-border d-inline z-index-2 bg-white px-3">
                  or
                </p>
              </div>
            </div>
            <div className="card-body">

            <Form onSubmit={submitHandler}>
          

            {/* {message && <Message variant="danger">{message}</Message>} */}

              <>

                <Row>
                  <Col md={6}>
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

                  </Col>

                  <Col md={6}>
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

                  </Col>
                  
                  <Col md={12}>
                  <Form.Group controlId="name">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    // disabled={true}
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>

                  </Col>

                  <Col md={6}>

                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      required={true}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  </Col>

                  <Col md={6}>
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

                  </Col>
                </Row>

                  <>
                {email == undefined ?<div role="alert" className="fade alert alert-danger show">Email is not confirmed</div>:<>
                                  <Button className='btn-block w-100 mt-4' disabled={(firstName.length > 0 && secondName.length > 0 && email.length > 0 && password.length > 0 && confirmPassword.length > 0) ? true :false  } type="submit" variant="primary">
                      Register User Details
                    </Button>
                </>}
                </>
               
               
                
                </>
            
            </Form>
            </div>
          </div>
        </div>
        <div className="col-xl-8 col-lg-7 col-md-5">
        <div className="justify-content-center position-relative bg-gradient-primary h-100  px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden d-flex align-items-center" style={{backgroundImage: `url('https://img.freepik.com/free-photo/hedge-fund-company-agents-workspace-reviewing-stock-market-prices-highs-lows-brokerage-company-employees-sitting-multi-monitor-workstation-while-analyzing-trading-index_482257-44529.jpg?w=740&t=st=1688977393~exp=1688977993~hmac=a6c72764ba2861af6255aed36e306136f534493128d6984cfffa21695fb47f55')`,backgroundSize: 'cover'}} >
                <span className="mask bg-gradient-primary opacity-6"></span>
                {/* <img src="../../../public/logo.jpg" className="navbar-brand-img h-100" alt="main_logo"/> */}
                <h3 className="mt-5 text-white font-weight-bolder position-relative">Welcome</h3>
                <h1 className="text-white position-relative">Peeppips Dashboard</h1>
               
               
     </div>
        </div>
      </div>
      </>

    );
};

export default RegisterScreen;
