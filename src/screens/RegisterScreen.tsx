import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {  Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { RootState } from '../store';
import StepComponent from '../components/StepComponent';
import type { NotificationPlacement } from 'antd/es/notification/interface';
import {notification } from 'antd';


const RegisterScreen: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();


  const [message, ] = useState<null | string>(null);

  const userRegister = useSelector((state: RootState) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const openErrorNotification = (placement: NotificationPlacement,description:String) => {
    api.info({
      message: `Error`,
      description,
      placement,
    });
  };
  if(error){
    openErrorNotification('topLeft', error);

  }
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      // document.location.href = '/';
      navigate("/")
      // history.push(redirect)
    }
  }, [userInfo]);


  return (
    <>
    {contextHolder}
    <FormContainer>
      <h1>Sign Up</h1>

      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}

<StepComponent/>


        <Row className='py-3'>
          <Col>
            Have an Account?{' '}
            <Link to={'/'}>
              Login
            </Link>
          </Col>
        </Row>
      </FormContainer>
      </>

    );
};

export default RegisterScreen;
