import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
import DashboardIndex from './DashboardScreens/HomeScreen';
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



  return (
<>
{/* {contextHolder} */}
{userInfo ? (
  <DashboardIndex/>
):
(
   <>


    <section>
      <div className="page-header min-vh-100">
       
          <div className="row w-100 vh-100">
          <div className="col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0 mx-auto text-align-center justify-content-center">
              <div className="card card-plain">
              <div className="card-header pb-0 text-start text-center">
  {error && <Message variant='danger'>{error}</Message>}
  {loading && <Loader />}
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
              <div className="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden" style={{backgroundImage: `url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg')`,backgroundSize: 'cover'}} >
                <span className="mask bg-gradient-primary opacity-6"></span>
                <h4 className="mt-5 text-white font-weight-bolder position-relative">"Attention is the new currency"</h4>
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
  )};
  </>)
};

export default LoginScreen;


// const Homescreen = () => {
//   // const userLogin = useSelector((state: RootState) => state.userLogin);

//   // const { userInfo } = userLogin;
//   type ExpandIconPosition = 'start' | 'end';
//   const [expandIconPosition,] = useState<ExpandIconPosition>('end');
  
//   return(
//     <main style={{marginTop:"5%"}}>

//     <Container className={styles.container}>
// {/* 
//     <Modal title="Bot Details" open={isModalOpen}  onCancel={handleCancel}>
//         <BotForm/>
//       </Modal>
       
//         <Grid container spacing={4}>
          
        
//         {userInfo && <> {userInfo['isAdmin'] ? <> 
//           <Grid item sm={12} xs={12} md={6}>
//                 <Link to={'/research'}>
//                 <Cardcomponent image={`https://leverageedublog.s3.ap-south-1.amazonaws.com/blog/wp-content/uploads/2020/03/28214113/Types-of-Research-Design.jpg`} title={`Research`} description={`/research`}/>
//                 </Link>
//             </Grid>
//             <Grid item sm={12} xs={12} md={6}>
//             <Link to={'/business'}>
                
//                 <Cardcomponent image={`https://www.xero.com/content/dam/xero/pilot-images/guides/how-to-start-an-online-business-guide/htsob-guide-hero.1648510683285.png`} title={`Business`} description={`/business`}/>

//                 </Link>
//             </Grid>
//         </>: <></>} </>}
        
            
//             <Grid item sm={12} xs={12} md={6}>
//             <Link to={'/free-bots'}> 
//             <Cardcomponent image={`https://www.addtelegrammember.com/wp-content/webpc-passthru.php?src=https://www.addtelegrammember.com/wp-content/uploads/2020/12/Telegram-Bot-1200x600.jpg&nocache=1`} title={`Free Bots`} description={`/free-bots`}/>

//                 </Link>
//             </Grid>
//             <Grid item sm={12} xs={12} md={6}>

//             <Link to={'/newsletter'}> 
//             <Cardcomponent image={`https://kinsta.com/wp-content/uploads/2021/12/newsletter-examples.png`} title={`Subscribe To Our NewsLetter`} description={`/newsletter`}/>

//                 </Link>

//                 </Grid>
//                 <Grid item sm={12} xs={12} md={6}>
//                 <Link to={'https://docs.google.com/forms/d/1BNnPyTXVw46JIhJoUNjq2wU07nYR6hRIrFV858xqweg/edit?usp=forms_home&ths=true'} target="_blank" rel="noopener noreferrer"> 
//             <Cardcomponent image={`https://kinsta.com/wp-content/uploads/2021/12/newsletter-examples.png`} title={`I want you to create a trading bot for me`} description={`Fill the Form`}/>

//                 </Link>
//                 </Grid>

//                 <Grid onClick={showModal} item sm={12} xs={12} md={6}>
               
//             <Cardcomponent  image={`https://kinsta.com/wp-content/uploads/2021/12/newsletter-examples.png`} title={`I have a trading bot that I want you to host and to help me  resell (Host Bot)`} description={`Fill the Form`}/>
               
//             </Grid>

//         </Grid> */}


//  <Collapse defaultActiveKey={['1']}  expandIconPosition={expandIconPosition}>
//       <Panel header="Reseach" key="1">
//         <p>
//           Our research methodology for developing a trading bot system involves a systematic approach that integrates data collection, algorithm development, and testing. We gather relevant financial data from diverse sources and preprocess it to ensure accuracy and consistency. Advanced machine learning algorithms are then developed to analyze the data and generate trading signals. These algorithms undergo rigorous testing and validation using historical data to assess their performance and effectiveness. The research process focuses on optimizing trading strategies, implementing risk management techniques, and ensuring compliance with regulatory guidelines. Through continuous monitoring and maintenance, we strive to create a reliable and adaptive trading bot system capable of maximizing profitability while minimizing risks.
//         </p>
//       </Panel>
//       <Panel header="Business" key="2">
//         <p>Our research methodology for business analysis follows a comprehensive approach to gather relevant data from diverse sources and analyze it using quantitative and qualitative techniques. Through data collection and rigorous analysis, we derive meaningful insights that inform strategic decision-making. The results are interpreted in the context of the research objectives and used to formulate effective business strategies. Continuous monitoring and evaluation ensure that the strategies are implemented successfully and adapted to evolving market dynamics. By employing this research methodology, we provide businesses with valuable insights and recommendations to drive growth, improve competitiveness, and enhance overall performance.</p>
//       </Panel>
//       <Panel header="Free Bots" key="3">
//         <p>Free bots refer to automated software programs that perform specific tasks or functions without any cost to the user. These bots are designed to streamline and automate various processes, such as customer service, data analysis, social media management, or trading activities. The research methodology for evaluating free bots typically involves assessing their features, capabilities, user reviews, and compatibility with specific requirements. It also includes testing the bot's performance, reliability, security, and scalability to ensure its effectiveness in achieving the desired outcomes. The research aims to identify and recommend reliable free bots that offer value and efficiency to users, enabling them to optimize their operations and save time and resources.</p>
//       </Panel>
//             <Panel header="Subscribe to Our Newsletter" key="4">
//         <p>Subscribing to our newsletter offers a valuable opportunity to stay informed and up-to-date with the latest developments in our industry. By joining our newsletter community, you gain access to exclusive content, industry insights, expert analysis, and upcoming events or promotions. Our carefully curated newsletter delivers relevant information directly to your inbox, saving you time and effort in seeking out valuable resources. Subscribers also receive early access to new products or services, special discounts, and personalized recommendations. Don't miss out on the chance to enhance your knowledge, stay connected, and maximize your opportunities by subscribing to our newsletter today.</p>
//       </Panel>
//             <Panel header="I want you to create a trading bot for me" key="5">
//         <p>
//           If you're seeking a customized trading bot tailored to your specific needs, we can provide you with a comprehensive solution. Our team of experts specializes in developing sophisticated trading bots that leverage cutting-edge technologies and advanced algorithms. By understanding your trading goals, risk appetite, and desired strategies, we can create a bot that automates your trading activities, monitors market conditions, executes trades, and optimizes your portfolio. With a focus on performance, reliability, and risk management, our trading bot will aim to maximize your potential returns while minimizing risks. Let us help you streamline your trading process and unlock new opportunities with a personalized trading bot designed just for you.
//         </p>
//       </Panel>

//                   <Panel header="I have a trading bot that I want you to host and to help me  resell (Host Bot)" key="6">
//         <p>If you have a trading bot that you want to host and resell, we can provide you with the necessary infrastructure and support to make it a success. Our hosting services offer a secure and reliable environment for your bot, ensuring its continuous operation and optimal performance. Additionally, we can assist you in marketing and reselling your bot by leveraging our network and expertise in the trading industry. With our partnership, you can expand your reach, gain access to a wider customer base, and enhance your bot's visibility in the market. Let us help you unlock the potential of your trading bot by providing hosting services and strategic guidance for successful reselling.</p>
//                 <Link className="btn btn-primary" to="/host-bots/1">Get Started</Link>

//       </Panel>

      
//     </Collapse>


//     </Container>
// </main>

//   )
// }