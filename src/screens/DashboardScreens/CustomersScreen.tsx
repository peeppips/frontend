import {   useEffect, useState } from "react";
// import { Button, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import {  UserLoginState,  brokerListByUserState,  referralListByUserState } from "../../types";
import { Button, Form,  Table } from "react-bootstrap";
import DashboardSidebar from "./components/Sidebar";

import { createAccount, getAccountsByUser } from "../../actions/accountActions";
import { createReferal, deleteReferral, getAllReferals, getReferalByUser, updateReferral } from "../../actions/referralActions";
import { Drawer, Modal, Popconfirm,notification } from "antd";
import { getServersByBroker } from "../../actions/serverActions";
import { QuestionCircleOutlined } from '@ant-design/icons';



 const CustomerScreen = () => {
  const [broker_selected, setBroker] = useState('')
  const [account_added_uid] = useState('')
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
    setFormData({
      id:'',
      referee: userInfo?.uid,
      firstName: '',
      secondName: '',
      email:'',
    });

    setIsModalOpen(true);
  };



  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleAccountCancel = () => {
    setIsModalAccountOpen(false);
  };
  


  const [formData, setFormData] = useState({
    id:'',
    referee: userInfo?.uid,
    firstName: '',
    secondName: '',
    email:'',
  });


  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    await (dispatch as ThunkDispatch<any, any, AnyAction>)(createReferal(formData));

    // Reset the form fields if needed
    setFormData({
      id:'',
      referee: userInfo?.uid,
      firstName: '',
      secondName: '',
      email:'',
    });

  handleCancel();
  // Fetch the updated list of brokers
  await (dispatch as ThunkDispatch<any, any, AnyAction>)(getAllReferals());

  setIsModalAccountOpen(true)
  };

  const handleInputChange = (event: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };




  useEffect(() => {
    (dispatch as ThunkDispatch<any, any, AnyAction>)(getAccountsByUser(userInfo?.uid));

  }, []);
  


  const [account, setAccount] = useState({
    id:"",
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
    console.log(name)
    if (name == "") {
      setBroker(value);
      (dispatch as ThunkDispatch<any, any, AnyAction>)(getServersByBroker(value));
    }
 

  };

  const selectedBrokerObj = brokers?.find(broker => broker.name === broker_selected);

   
  const [open, setOpen] = useState(false);

  const showDrawer = (formData:any) => {
    setFormData(formData)
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };


  const confirm = async (id:string) => {
    try {
  
       await (dispatch as ThunkDispatch<any, any, AnyAction>)(deleteReferral(id));
     
       await (dispatch as ThunkDispatch<any, any, AnyAction>)(getAllReferals());
        
    } catch (error) {
      
    }  
    }

    const handleUpdateSubmit = async (event: { preventDefault: () => void; }) => {
      event.preventDefault();
      // Perform submission logic or dispatch an action
      console.log(formData);
    
      try {
        await (dispatch as ThunkDispatch<any, any, AnyAction>)(updateReferral(formData.id, formData));
        notification.success({
          message: 'Account Updated',
          description: 'The account was updated successfully.',
        });
        await (dispatch as ThunkDispatch<any, any, AnyAction>)(getAllReferals());
  
  
      } catch (error) {
        notification.error({
          message: 'Update Failed',
          description: 'Failed to update the account. Please try again later.',
        });
      }
    };

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

 
  
      <div className="row mt-4">
        <div className="col-lg-12 mb-lg-0 mb-4">
          <div className="card ">
            <div className="card-header pb-0 p-3">
              <div className="d-flex justify-content-between">
                <h6 className="mb-2">My Users({referrals?.length})</h6>
                <Button  onClick={showModal} variant="primary">Add</Button>

              </div>
            </div>

            <div className="card-body">
            <div className="responsive-table">
            <Table striped bordered hover >
      <thead>
        <tr>
          <th>#</th>
       
          <th>First Name</th>
          <th>Second Name</th>
          <th>Email</th>
          <th>Action</th>

        </tr>
      </thead>
      <tbody>
      {referrals && referrals.length > 0 ? (
  referrals.map((referral, index) => (
    <tr key={index}>
      <td>{index+1}</td>
      <td>{referral.firstName}</td>
      <td>{referral.secondName}</td>
      <td>{referral.email}</td>
      <td>
        
      <Button variant="warning" onClick={()=>showDrawer(referral)}>Edit</Button>
          <Popconfirm
    title="Delete the User"
    description="Are you sure to delete this task?"
    onConfirm={()=>confirm(referral?.id)}
    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
  >
    <Button variant="danger">Delete</Button>
  </Popconfirm>      </td>
    </tr>
  ))
) : (
  <tr>
    <td colSpan={7}>No Customers found.</td>
  </tr>
)}

        

      </tbody>
    </Table>
    </div>
  </div>


            </div>
          
          </div>
        
     
        </div>
      </div>
   
   
  </main>
  
  <Modal title="Add Customer" open={isModalOpen} footer={[     <Button variant="primary" onClick={handleSubmit} type="submit">
        Submit
      </Button>]} onCancel={handleCancel}>
  <Form >
      <Form.Group controlId="formName">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          name="firstName"
          required={true}
          value={formData.firstName}
          onChange={handleInputChange}
          placeholder="Enter First name"
        />
      </Form.Group>

      <Form.Group controlId="formName">
        <Form.Label>Second Name</Form.Label>
        <Form.Control
          type="text"
          name="secondName"
          required={true}
          value={formData.secondName}
          onChange={handleInputChange}
          placeholder="Enter Second name"
        />
      </Form.Group>

      <Form.Group controlId="formName">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          required={true}
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Enter Email name"
        />
      </Form.Group>

      {/* <Form.Group controlId="formName">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          required={true}
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Enter Password name"
        />
      </Form.Group> */}

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






<Button variant="primary" type="submit" onClick={handleSubmit}>
  Submit
</Button>
</Form>
    
      </Modal>

  <Drawer title="User Edit" placement="right" onClose={onClose} open={open}>
       
  <Form onSubmit={handleUpdateSubmit}>

      <Form.Group controlId="formName">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          name="firstName"
          required={true}
          value={formData.firstName}
          onChange={handleInputChange}
          placeholder="Enter First name"
        />
      </Form.Group>

      <Form.Group controlId="formName">
        <Form.Label>Second Name</Form.Label>
        <Form.Control
          type="text"
          name="secondName"
          required={true}
          value={formData.secondName}
          onChange={handleInputChange}
          placeholder="Enter Second name"
        />
      </Form.Group>

      <Form.Group controlId="formName">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          required={true}
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Enter Email name"
        />
      </Form.Group>

      {/* <Form.Group controlId="formName">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          required={true}
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Enter Password name"
        />
      </Form.Group> */}
   <Button type="submit">Update User Details</Button>
    </Form>

   

      </Drawer>
            </>
  
    )
  }

  export default CustomerScreen