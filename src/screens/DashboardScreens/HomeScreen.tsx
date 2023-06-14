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


  const accountByUser = useSelector((state: RootState): GetAccountsByUserState => state.accountByUser as GetAccountsByUserState);  

  const { loading, error,accounts } = accountByUser

  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate('/')
    } else {
      (dispatch as ThunkDispatch<any, any, AnyAction>)(getUserDetails(userInfo.token,userInfo.email));
      (dispatch as ThunkDispatch<any, any, AnyAction>)(getProjectsByUser(userInfo.uid));
      (dispatch as ThunkDispatch<any, any, AnyAction>)(getAccountsByUser(userInfo?.uid));
      (dispatch as ThunkDispatch<any, any, AnyAction>)(getAllBrokers());

       
        
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
    riskManagementPercentage: '',
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
      await (dispatch as ThunkDispatch<any, any, AnyAction>)(getUserDetails(userInfo.token,userInfo.email));
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
        
              {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
    <DashboardSidebar />)}
        
        
       
  <main className="main-content position-relative border-radius-lg ">
 
    <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl " id="navbarBlur" data-scroll="false">
      <div className="container-fluid py-1 px-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
            <li className="breadcrumb-item text-sm"><a className="opacity-5 text-white" href="javascript:;">Pages</a></li>
            <li className="breadcrumb-item text-sm text-white active" aria-current="page">Dashboard</li>
          </ol>
          <h6 className="font-weight-bolder text-white mb-0">Dashboard</h6>
        </nav>
        <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
          <div className="ms-md-auto pe-md-3 d-flex align-items-center">
            <div className="input-group">
              <span className="input-group-text text-body"><i className="fas fa-search" aria-hidden="true"></i></span>
              <input type="text" className="form-control" placeholder="Type here..."/>
            </div>
          </div>
          <ul className="navbar-nav  justify-content-end">
            <li className="nav-item d-flex align-items-center">
              <a href="javascript:;" className="nav-link text-white font-weight-bold px-0">
                <i className="fa fa-user me-sm-1"></i>
                <span className="d-sm-inline d-none">Sign In</span>
              </a>
            </li>
            <li className="nav-item d-xl-none ps-3 d-flex align-items-center">
              <a href="javascript:;" className="nav-link text-white p-0" id="iconNavbarSidenav">
                <div className="sidenav-toggler-inner">
                  <i className="sidenav-toggler-line bg-white"></i>
                  <i className="sidenav-toggler-line bg-white"></i>
                  <i className="sidenav-toggler-line bg-white"></i>
                </div>
              </a>
            </li>
            <li className="nav-item px-3 d-flex align-items-center">
              <a href="javascript:;" className="nav-link text-white p-0">
                <i className="fa fa-cog fixed-plugin-button-nav cursor-pointer"></i>
              </a>
            </li>
            <li className="nav-item dropdown pe-2 d-flex align-items-center">
              <a href="javascript:;" className="nav-link text-white p-0" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="fa fa-bell cursor-pointer"></i>
              </a>
              <ul className="dropdown-menu  dropdown-menu-end  px-2 py-3 me-sm-n4" aria-labelledby="dropdownMenuButton">
                <li className="mb-2">
                  <a className="dropdown-item border-radius-md" href="javascript:;">
                    <div className="d-flex py-1">
                      <div className="my-auto">
                        <img src="../assets/img/team-2.jpg" className="avatar avatar-sm  me-3 "/>
                      </div>
                      <div className="d-flex flex-column justify-content-center">
                        <h6 className="text-sm font-weight-normal mb-1">
                          <span className="font-weight-bold">New message</span> from Laur
                        </h6>
                        <p className="text-xs text-secondary mb-0">
                          <i className="fa fa-clock me-1"></i>
                          13 minutes ago
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
                <li className="mb-2">
                  <a className="dropdown-item border-radius-md" href="javascript:;">
                    <div className="d-flex py-1">
                      <div className="my-auto">
                        <img src="../assets/img/small-logos/logo-spotify.svg" className="avatar avatar-sm bg-gradient-dark  me-3 "/>
                      </div>
                      <div className="d-flex flex-column justify-content-center">
                        <h6 className="text-sm font-weight-normal mb-1">
                          <span className="font-weight-bold">New album</span> by Travis Scott
                        </h6>
                        <p className="text-xs text-secondary mb-0">
                          <i className="fa fa-clock me-1"></i>
                          1 day
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item border-radius-md" href="javascript:;">
                    <div className="d-flex py-1">
                      <div className="avatar avatar-sm bg-gradient-secondary  me-3  my-auto">
                        <svg width="12px" height="12px" viewBox="0 0 43 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                          <title>credit-card</title>
                          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g transform="translate(-2169.000000, -745.000000)" fill="#FFFFFF" fill-rule="nonzero">
                              <g transform="translate(1716.000000, 291.000000)">
                                <g transform="translate(453.000000, 454.000000)">
                                  <path className="color-background" d="M43,10.7482083 L43,3.58333333 C43,1.60354167 41.3964583,0 39.4166667,0 L3.58333333,0 C1.60354167,0 0,1.60354167 0,3.58333333 L0,10.7482083 L43,10.7482083 Z" opacity="0.593633743"></path>
                                  <path className="color-background" d="M0,16.125 L0,32.25 C0,34.2297917 1.60354167,35.8333333 3.58333333,35.8333333 L39.4166667,35.8333333 C41.3964583,35.8333333 43,34.2297917 43,32.25 L43,16.125 L0,16.125 Z M19.7083333,26.875 L7.16666667,26.875 L7.16666667,23.2916667 L19.7083333,23.2916667 L19.7083333,26.875 Z M35.8333333,26.875 L28.6666667,26.875 L28.6666667,23.2916667 L35.8333333,23.2916667 L35.8333333,26.875 Z"></path>
                                </g>
                              </g>
                            </g>
                          </g>
                        </svg>
                      </div>
                      <div className="d-flex flex-column justify-content-center">
                        <h6 className="text-sm font-weight-normal mb-1">
                          Payment successfully completed
                        </h6>
                        <p className="text-xs text-secondary mb-0">
                          <i className="fa fa-clock me-1"></i>
                          2 days
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  
    <div className="container-fluid py-4">
    {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
    <TopBarComponent />)}
  
  <>
  {accounts && accounts.length > 0 ? (
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
      
        <Form.Group controlId="riskManagementPercentage">
          <Form.Label>Risk Management Percentage</Form.Label>
          <Form.Control
            type="number"
            name="riskManagementPercentage"
            required={true}
            value={account.riskManagementPercentage}
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

