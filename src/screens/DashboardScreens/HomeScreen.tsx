import {   useEffect, useState } from "react";
// import { Button, Col, Form } from "react-bootstrap";
import { getUserDetails } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { GetAccountsByUserState, GetReferralsByUserState, UserLoginState, brokerListByUserState, projectListByUserState } from "../../types";
import { getProjectsByUser } from "../../actions/projectActions";
import DashboardSidebar from "./components/Sidebar";
import TopBarComponent from "./components/TopBarComponent";
import ProjectsPieComponent from "./components/ProjectsPieComponent";
import CustomerBarChartComponent from "./components/CustomerBarChartComponent";
import { createAccount, getAccountsByUser } from "../../actions/accountActions";
import { Button, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getAllBrokers } from "../../actions/brokerActions";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { getReferalByUser } from "../../actions/referralActions";

 const DashboardIndex = () => {
  const [broker_selected, setBroker] = useState('')

  
  const dispatch = useDispatch()

  const userLogin = useSelector((state: RootState): UserLoginState => state.userLogin as UserLoginState);  

  const { userInfo } = userLogin

  const projectListByUser = useSelector((state: RootState): projectListByUserState => state.projectListByUser as projectListByUserState);  

  const { projects } = projectListByUser


  const accountByUser = useSelector((state: RootState): GetAccountsByUserState => state.accountByUser as unknown as GetAccountsByUserState);  

  const { loading, error,accounts } = accountByUser

  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate('/')
    } else {
      (dispatch as ThunkDispatch<any, any, AnyAction>)(getUserDetails(userInfo.email));
      (dispatch as ThunkDispatch<any, any, AnyAction>)(getProjectsByUser(userInfo.uid));
      (dispatch as ThunkDispatch<any, any, AnyAction>)(getAccountsByUser(userInfo?.uid));
      (dispatch as ThunkDispatch<any, any, AnyAction>)(getAllBrokers());
      (dispatch as ThunkDispatch<any, any, AnyAction>)(getReferalByUser(userInfo?.uid));
       
        
      }
    
  }, [dispatch, userInfo])

  useEffect(() => {
    if (projects == undefined) {
      console.log("projects is undefined:", projects);
    }
    else{
console.log("projects is ",projects);

    }

    if (accounts == undefined) {
      console.log("accounts is undefined:");
    }
    else{
console.log("accounts are ",accounts);

    }
    
  }, [projects,accounts]);
  

  const [account, setAccount] = useState({
    user: userInfo?.uid,
    login: '',
    password: '',
    investorPassword: '',
    lotSize: '',
    takeProfit: '',
    stopLoss: '',
    broker: '',
    server: ''
  });

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    // Perform submission logic or dispatch an action
    console.log(account);
    try {
      await (dispatch as ThunkDispatch<any, any, AnyAction>)(createAccount(account));
      
      console.log('Account created successfully');
    
      await (dispatch as ThunkDispatch<any, any, AnyAction>)(getAccountsByUser(userInfo?.uid));

    } catch (error) {
      console.log('Failed to create account:', error);
    }
    

    if(userInfo){
      await (dispatch as ThunkDispatch<any, any, AnyAction>)(getUserDetails(userInfo.email));
      await (dispatch as ThunkDispatch<any, any, AnyAction>)(getProjectsByUser(userInfo.email));
      await (dispatch as ThunkDispatch<any, any, AnyAction>)(getAccountsByUser(userInfo?.uid));
      await (dispatch as ThunkDispatch<any, any, AnyAction>)(getAllBrokers());
      await (dispatch as ThunkDispatch<any, any, AnyAction>)(getReferalByUser(userInfo?.uid));
    }


  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccount((prevAccount) => ({
      ...prevAccount,
      [name]: value,
    }));
  };


  const allBrokers = useSelector((state: RootState): brokerListByUserState => state.allBrokers as brokerListByUserState);  

  const { brokers } = allBrokers


  // const serverByBroker = useSelector((state: RootState): serverListByBrokerState => state.serverByBroker as serverListByBrokerState);  

  // const { servers } = serverByBroker

  


  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
  
    setAccount((prevAccount) => ({
      ...prevAccount,
      [name]: value,
    }));
    console.log(name,value)
    if (name == "broker") {
      setBroker(value);
      // (dispatch as ThunkDispatch<any, any, AnyAction>)(getServersByBroker(value));
    }
 

  };
  const selectedBrokerObj = brokers?.find(broker => broker.name === broker_selected);
  

  const isSubmitDisabled = Object.values(account).some((value) => value === '');
  
  const referralListByUser = useSelector((state: RootState): GetReferralsByUserState => state.referralListByUser as GetReferralsByUserState);  

  const { referrals } = referralListByUser
  
  const projectsData = projects !== null ? projects : [];
  
  return(
            <>
              <div className="min-height-300 bg-primary position-absolute w-100"></div>

    <DashboardSidebar />
        
        
       
  <main className="main-content position-relative border-radius-lg ">
 

  
    <div className="container-fluid py-4">
    {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
    <TopBarComponent />)}
  
  <>
  {accounts && accounts.length > 0 ? (
    <>
    
    <div className="row mt-4">
      <div className="col-lg-6 mb-lg-0 mb-4">
        <div className="card ">
          <div className="card-header pb-0 p-3">
            <div className="d-flex justify-content-between">
              <h6 className="mb-2">My Projects</h6>
            </div>
          </div>

          <div className="card-body">
          {projects && projects.length == 0 ? <>No Projects For This User</>:<ProjectsPieComponent projects={projectsData} /> }

 
  
   
  
</div>


          </div>
        
        </div>
      
      <div className="col-lg-6">
        <div className="card">
          <div className="card-header pb-0 p-3">
            <h6 className="mb-0">My Customers</h6>
          </div>
          <div className="card-body p-3">
            {referrals && referrals.length == 0 ? <>No Customers For This User</>:<CustomerBarChartComponent referrals={referrals} /> }
          
          </div>
        </div>
      </div>
      </div>
    </>
      
) : (
<>
{loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <div className="row mt-4">
          <Col md={12}>
          <Message variant='danger'>You Do Not Have Any Accounts Under You.Please Fill in the form below</Message>
        <Form onSubmit={handleSubmit}>
      
        <Form.Group controlId="login">
          <Form.Label>Login</Form.Label>
          <Form.Control
            type="number"
            name="login"
            required={true}
            value={account.login}
            onChange={handleChange}
          />
        </Form.Group>
      
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            required={true}
            value={account.password}
            onChange={handleChange}
          />
        </Form.Group>
      
        <Form.Group controlId="investorPassword">
          <Form.Label>Investor Password</Form.Label>
          <Form.Control
            type="password"
            name="investorPassword"
            required={true}
            value={account.investorPassword}
            onChange={handleChange}
          />
        </Form.Group>
      
        <Form.Group controlId="lotSize">
          <Form.Label>Lot Size</Form.Label>
          <Form.Control
            type="number"
            name="lotSize"
            required={true}
            value={account.lotSize}
            onChange={handleChange}
          />
        </Form.Group>
      
       
      
        <Form.Group controlId="takeProfit">
          <Form.Label>Take Profit</Form.Label>
          <Form.Control
            type="number"
            name="takeProfit"
            required={true}
            value={account.takeProfit}
            onChange={handleChange}
          />
        </Form.Group>
      
        <Form.Group controlId="stopLoss">
          <Form.Label>Stop Loss</Form.Label>
          <Form.Control
            type="number"
            name="stopLoss"
            required={true}
            value={account.stopLoss}
            onChange={handleChange}
          />
        </Form.Group>
      
        <Form.Group controlId="stopLoss">
          <Form.Label>Broker</Form.Label>
          <select 
           name="broker"
           value={account.broker}
           onChange={handleSelectChange}
          className="form-select">
          {brokers && brokers.map((broker:any, index) => (
              <option key={index} value={broker.name}>
                {broker.name}
              </option>
            ))}
          </select>
        </Form.Group>
      
        <Form.Group controlId="stopLoss">
          <Form.Label>Server</Form.Label>
        <>
        
        {selectedBrokerObj && (
                <select 
                name="server"
                value={account.server}
                onChange={handleSelectChange}
                className="form-select"
                >
                  <>              
                  {selectedBrokerObj.servers.map((server:any, index:number) => (
                        <option key={index} value={server}>
                        {server}
                        </option>
                    ))}
                </>
      
                </select>
              )}
      
        </>
          
        </Form.Group>

       
        <Button variant="primary" type="submit" className="w-100" disabled={isSubmitDisabled}>
        Submit
      </Button>
     
      </Form>
      </Col>
      </div>
        )}
</>
  


)}
  </>


      </div>
   
   
  </main>
  
            </>
  
    )
  }

  export default DashboardIndex

  // interface Broker {
  //   name: string;
  //   servers: string[];
  // }
  
  // interface BrokersSelectProps {
  //   brokers: Broker[];
  //   selectedBroker: string;
  //   onSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  // }

