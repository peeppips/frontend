import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { getUserDetails, updateUserProfile } from '../../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../../constants/userConstants'
import DashboardSidebar from './components/Sidebar'
import { useNavigate } from 'react-router-dom'
import { UserLoginState, userDetailsState } from '../../types'
import { RootState } from '../../store'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { useEffect, useState } from 'react'
import TopBarComponent from './components/TopBarComponent'
 
const ProfileScreen = () => {
  const [firstName, setfirstName] = useState('')
  const [secondName, setsecondName] = useState('')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState<string | null>(null);

  const dispatch = useDispatch()

  const userDetails = useSelector((state: RootState): userDetailsState => state.userDetails as userDetailsState);  
  const { loading, error, user } = userDetails



  const userLogin = useSelector((state: RootState): UserLoginState => state.userLogin as UserLoginState);  
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state: RootState): userDetailsState => state.userUpdateProfile as userDetailsState);  
  const { success } = userUpdateProfile

  const navigate =useNavigate()

  useEffect(() => {
    if (!userInfo) {
      navigate('/')
    } else {
      if (!user || !user.firstName || success) {
        (dispatch as ThunkDispatch<any, any, AnyAction>)({ type: USER_UPDATE_PROFILE_RESET });

        (dispatch as ThunkDispatch<any, any, AnyAction>)(getUserDetails(userInfo.uid));

      } else {
        setfirstName(user.firstName)
        setEmail(user.email)
        setsecondName(user.secondName)
        console.log(user)
      }
    }
  }, [dispatch, history, userInfo])

  const submitHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      (dispatch as ThunkDispatch<any, any, AnyAction>)(updateUserProfile(userInfo?.id,{ firstName,secondName, email, password }));
    }
  }


    return(
            <>
              <div className="min-height-300 bg-primary position-absolute w-100"></div>
              <DashboardSidebar/>


  <main className="main-content position-relative border-radius-lg ">
 
  
  
    <div className="container-fluid py-4">
    {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
    <TopBarComponent />)}
  
      <div className="row mt-4">
        <div className="col-lg-12 mb-lg-0 mb-4">
          <div className="card ">
            <div className="card-header pb-0 p-3">
              <div className="d-flex justify-content-between">
                {/* <h6 className="mb-2">My Profile</h6> */}

              </div>
            </div>

            <div className="card-body">
          
            <Row>
      <Col md={12}>
        <h2>User Profile</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {}
        {success && <Message variant='success'>Profile Updated</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter First name'
                value={firstName}
                onChange={(e) => setfirstName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='name'>
              <Form.Label>Second Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter Second name'
                value={secondName}
                onChange={(e) => setsecondName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </Col>
    </Row>
      
  </div>


            </div>
          
          </div>
        
         
     
        </div>
      </div>
   
   
  </main>
  

            </>
  
    )
  }

  export default ProfileScreen