import {   useEffect, useState } from "react";
// import { Button, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import {  GetAccountsByUserState, UserLoginState,  brokerListByUserState,  referralListByUserState } from "../../types";
import { Button, Form,  Table } from "react-bootstrap";
import DashboardSidebar from "./components/Sidebar";

import { createAccount, getAccountsByUser } from "../../actions/accountActions";
import {  getAllReferals, getReferalByUser } from "../../actions/referralActions";
import { Input, Modal } from "antd";
import { getServersByBroker } from "../../actions/serverActions";
import { getAllAccounts } from "../../actions/accountActions";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import TopBarComponent from "./components/TopBarComponent";


 const UserAccountScreen = () => {
  const [broker_selected, setBroker] = useState('')
  const [account_added_uid,] = useState('')
  const dispatch = useDispatch()

  const userLogin = useSelector((state: RootState): UserLoginState => state.userLogin as UserLoginState);  

  const { userInfo } = userLogin

  const allReferrals = useSelector((state: RootState): referralListByUserState => state.allReferrals as referralListByUserState);  

  const { referrals } = allReferrals
  
  
  const navigate =useNavigate()
  useEffect(() => {
    
      if (!userInfo) {
        // Handle the case when userInfo is not available
        navigate('/')
      } else {
        if(userInfo.isAdmin){
          (dispatch as ThunkDispatch<any, any, AnyAction>)(getAllReferals());
          (dispatch as ThunkDispatch<any, any, AnyAction>)(getAllAccounts());


        }
        else{
                  
      (dispatch as ThunkDispatch<any, any, AnyAction>)(getReferalByUser(userInfo.uid));
        }
    }
  }, [dispatch, userInfo]);
  
  useEffect(() => {
    if (referrals == undefined) {
      console.log("referrals is undefined:", referrals);
    }
    else{
console.log("referrals is ",referrals);

    }
  }, [referrals]);


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalAccountOpen, setIsModalAccountOpen] = useState(false);

  const showModal = () => {
    console.log("open model")
    setIsModalOpen(true);
  };



  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleAccountCancel = () => {
    setIsModalAccountOpen(false);
  };
  





  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    await (dispatch as ThunkDispatch<any, any, AnyAction>)(createAccount(account));

    // Reset the form fields if needed
    setAccount({
      user: '',
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

  handleCancel();
  // Fetch the updated list of brokers
  await (dispatch as ThunkDispatch<any, any, AnyAction>)(getReferalByUser(userInfo?.uid));

  setIsModalAccountOpen(true)
  };

  // const handleInputChange = (event: { target: { name: any; value: any; }; }) => {
  //   setFormData({ ...formData, [event.target.name]: event.target.value });
  // };




  useEffect(() => {
    (dispatch as ThunkDispatch<any, any, AnyAction>)(getAccountsByUser(userInfo?.uid));

  }, []);
  


  const [account, setAccount] = useState({
    user: account_added_uid,
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


  const allBrokers = useSelector((state: RootState): brokerListByUserState => state.allBrokers as brokerListByUserState);  
  const { brokers } = allBrokers

  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccount((prevAccount) => ({
      ...prevAccount,
      [name]: value,
    }));
  };

  const handleAccountSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    // Perform submission logic or dispatch an action
    console.log(account);
    (dispatch as ThunkDispatch<any, any, AnyAction>)(createAccount(account));

  };


  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setAccount((prevAccount) => ({
      ...prevAccount,
      [name]: value,
    }));
    console.log(account)
    if (name == "broker") {
      setBroker(value);
      (dispatch as ThunkDispatch<any, any, AnyAction>)(getServersByBroker(value));
    }
 

  };

  const selectedBrokerObj = brokers?.find(broker => broker.name === broker_selected);


  const accountByUser = useSelector((state: RootState): GetAccountsByUserState => state.accountByUser as unknown as GetAccountsByUserState);  
  const { loading, error } = accountByUser


    return(
            <>
              <div className="min-height-300 bg-primary position-absolute w-100"></div>
              <DashboardSidebar/>
  <main className="main-content position-relative border-radius-lg ">
  
    <div className="container-fluid py-4">

    {/* {!loading ? (
           <TopBarComponent />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ):(<></>)} */}

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
                <h6 className="mb-2">User Accounts (0)</h6>
                <Button  onClick={showModal} variant="primary">Add</Button>

              </div>
            </div>

            <div className="card-body">
          
            <Table striped bordered hover >
      <thead>
        <tr>
         
       
          <th>User</th>
          <th>Account Number</th>
          

          <th>Action</th>

        </tr>
      </thead>
      <tbody>
      {referrals && referrals.map((referral) => {
        if (referral.accounts && referral.accounts.length > 0) {
          return referral.accounts.map((account: any) => (
            <tr key={account.id}>
              
              <td>{referral.firstName}</td>
              <td>{account.login}</td>
              <td>
              <Button variant="warning">Edit</Button>
              <Button variant="danger">Delete</Button>
              </td>
            </tr>
          ));
        } else {
          return null; // Skip rendering referrals without accounts
        }
      })}
      </tbody>
    </Table>
  </div>
            </div>
          
          </div>
        
     
        </div>
      </div>
   
   
  </main>
  
  <Modal title="Add User Account" open={isModalOpen} footer={[     <Button variant="primary" onClick={handleSubmit} type="submit">
        Submit
      </Button>]} onCancel={handleCancel}>
  <Form >
      <Form.Group controlId="formName">
        <Form.Label>User</Form.Label>
        <select 
            className="form-select"
            name="user"
            value={account.user}
            onChange={handleSelectChange}
        >
          <option>Select User</option>
          
          <>
          {referrals && referrals.map((referral)=>(
            <option value={referral.uid}>{referral.firstName}</option>
          ))}
          </>
        </select>
      </Form.Group>



<Form.Group controlId="login">
  <Form.Label>Account Number</Form.Label>
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


    </Form>
      </Modal>

      <Modal title="Add Account" open={isModalAccountOpen} onCancel={handleAccountCancel}>

  <Form onSubmit={handleAccountSubmit}>

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
  <Input.Password />
  {/* <Form.Control
    type="password"
    name="password"
    required={true}
    value={account.password}
    onChange={handleChange}
  /> */}
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






<Button variant="primary" type="submit" onClick={handleSubmit}>
  Submit
</Button>
</Form>
    
      </Modal>

            </>
  
    )
  }

  export default UserAccountScreen