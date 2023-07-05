import { useEffect, useState } from "react";
// import { Button, Col, Form } from "react-bootstrap";
import { RootState } from "../../store";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { GetAccountsByUserState, UserLoginState, brokerListByUserState } from "../../types";
import { Button, Table } from "react-bootstrap";
import DashboardSidebar from "./components/Sidebar";
import { Drawer, Modal, Popconfirm,  notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TopBarComponent from "./components/TopBarComponent";
import { createAccount, deleteAccount, getAccountsByUser, getAllAccounts, updateAccount } from "../../actions/accountActions";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { getAllBrokers } from "../../actions/brokerActions";
import { getServersByBroker } from "../../actions/serverActions";
import { QuestionCircleOutlined } from '@ant-design/icons';
import {  Form, Input } from 'antd';

const AccountsScreen = () => {
  const [] = notification.useNotification();
  const [broker_selected, setBroker] = useState('')
  const [message,] = useState<string | null>(null);

  const dispatch = useDispatch()

  const accountByUser = useSelector((state: RootState): GetAccountsByUserState => state.accountByUser as unknown as GetAccountsByUserState);

  const { loading, error, accounts } = accountByUser

  const userLogin = useSelector((state: RootState): UserLoginState => state.userLogin as UserLoginState);

  const { userInfo } = userLogin


  const allBrokers = useSelector((state: RootState): brokerListByUserState => state.allBrokers as brokerListByUserState);
  const { brokers } = allBrokers

  useEffect(() => {
    (dispatch as ThunkDispatch<any, any, AnyAction>)(getAccountsByUser(userInfo?.uid));

  }, []);





  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo) {
      // Handle the case when userInfo is not available
      navigate('/')
    } else {
      (dispatch as ThunkDispatch<any, any, AnyAction>)(getAccountsByUser(userInfo.uid));
      (dispatch as ThunkDispatch<any, any, AnyAction>)(getAllBrokers());
    }
  }, [dispatch, userInfo]);


  useEffect(() => {
    if (accounts == undefined) {
      console.log("accounts is undefined:");
    }
    else {
      console.log("accounts are ", accounts);

    }
  }, [accounts]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    console.log("open model")
    setAccount({
      id: '',
      uid: '',
      user: userInfo?.uid,
      login: '',
      password: '',
      investorPassword: '',
      lotSize: '',
      takeProfit: '',
      stopLoss: '',
      broker: '',
      server: ''
    })
    setIsModalOpen(true);
  };



  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const [account, setAccount] = useState({
    id: '',
    uid: '',
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccount((prevAccount) => ({
      ...prevAccount,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    // Perform submission logic or dispatch an action
    console.log(account);
   await (dispatch as ThunkDispatch<any, any, AnyAction>)(createAccount(account));

   await (dispatch as ThunkDispatch<any, any, AnyAction>)(getAccountsByUser(userInfo?.uid));


  };

  const handleUpdateSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    // Perform submission logic or dispatch an action
    console.log(account);

    try {
      await (dispatch as ThunkDispatch<any, any, AnyAction>)(updateAccount(account.id, account));
      notification.success({
        message: 'Account Updated',
        description: 'The account was updated successfully.',
      });
      await (dispatch as ThunkDispatch<any, any, AnyAction>)(getAccountsByUser(userInfo?.uid));


    } catch (error) {
      notification.error({
        message: 'Update Failed',
        description: 'Failed to update the account. Please try again later.',
      });
    }
  };





  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAccount((prevAccount) => ({
      ...prevAccount,
      [name]: value,
    }));
    console.log(name)
    if (name == "broker") {
      setBroker(value);
      (dispatch as ThunkDispatch<any, any, AnyAction>)(getServersByBroker(value));
    }
 

  };

  const selectedBrokerObj = brokers?.find(broker => broker.name === broker_selected);
  console.log("selected broker obj is ", selectedBrokerObj)

  const [open, setOpen] = useState(false);

  const showDrawer = (accountDetails: any) => {
    
    setAccount(accountDetails)
    setOpen(true);
    console.log("account details opened are ",account)
  };

  const onClose = () => {
    setOpen(false);

    setAccount({
      id: '',
      uid: '',
      user: userInfo?.uid,
      login: '',
      password: '',
      investorPassword: '',
      lotSize: '',
      takeProfit: '',
      stopLoss: '',
      broker: '',
      server: ''
    })
  };


  const confirm = async (id: string) => {
    try {

      await (dispatch as ThunkDispatch<any, any, AnyAction>)(deleteAccount(id));

      await (dispatch as ThunkDispatch<any, any, AnyAction>)(getAllAccounts());

    } catch (error) {

    }
  }

  return (
    <>

      <div className="min-height-300 bg-primary position-absolute w-100"></div>
      <DashboardSidebar />


      <main className="main-content position-relative border-radius-lg ">



        <div className="container-fluid py-4">

          {!loading ? (
            <TopBarComponent />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (<></>)}


          <div className="row mt-4">
            <div className="col-lg-12 mb-lg-0 mb-4">
              <div className="card ">
                <div className="card-header pb-0 p-3">
                  <div className="d-flex justify-content-between">
                    <h6 className="mb-2">Accounts ({accounts?.length})</h6>

                    <Button onClick={showModal} variant="primary">Add</Button>
                  </div>
                </div>

                <div className="card-body">
                  {message && <Message variant='danger'>{message}</Message>}
                  { }
                  {/* {success && <Message variant='success'>Profile Updated</Message>} */}
                  {loading ? (
                    <Loader />
                  ) : error ? (
                    <Message variant='danger'>{error}</Message>
                  ) : (
                    <div className="responsive-table">
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Login</th>
                            <th>Password</th>
                            <th>Broker</th>
                            <th>Server</th>

                            <th>S.L</th>
                            <th>T.P</th>

                            <th> </th>


                          </tr>
                        </thead>
                        <tbody>
                          {accounts && accounts.length > 0 ? (
                            accounts.map((account, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{account.login}</td>
                                <td>{account.password}</td>
                                <td>{account.broker}</td>
                                <td>{account.server}</td>
                                <td>{account.takeProfit} pips </td>
                                <td>{account.stopLoss} pips</td>

                                <td>
                                  <Button variant="warning" onClick={() => showDrawer(account)}>Edit</Button>
                                  <Popconfirm
                                    title="Delete the Account"
                                    description="Are you sure to delete this task?"
                                    onConfirm={() => confirm(account?.id?.toString())}

                                    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                                  >
                                    <Button variant="danger">Delete</Button>
                                  </Popconfirm>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={6}>No Accounts found.</td>
                            </tr>
                          )}



                        </tbody>
                      </Table>
                    </div>
                  )}


                </div>


              </div>

            </div>



          </div>
        </div>


      </main>

      <Modal title="Add Account" open={isModalOpen} onCancel={handleCancel}
        footer={[
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        ]}


      >

<Form
  initialValues={{ remember: true }}
  onFinish={handleSubmit}
  labelCol={{ span: 16 }}
  wrapperCol={{ span: 24 }}
  style={{ maxWidth: 600 }}
  layout="vertical" // Set the layout prop to 'vertical'
>

        <Form.Item
      label="Account Number"
      name="login"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input 
      type="number"
      name="login"
      value={account.login}
      onChange={handleChange}

      />
    </Form.Item>

          
          <Form.Item
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password 
      name="password"
      required={true}
      value={account.password}
      onChange={handleChange}

      />
    </Form.Item>

    
    <Form.Item
      label="Investor Password"
      name="investorPassword"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password 
      name="investorPassword"
      required={true}
      value={account.investorPassword}
      onChange={handleChange}

      />
    </Form.Item>


    <Form.Item
  label="Lot Size"
  name="lotSize"
  rules={[{ required: true, message: 'Please input the lot size!' }]}
>
  <Input
    type="number"
    name="lotSize"
    value={account.lotSize}
    onChange={handleChange}
  />
</Form.Item>

<Form.Item
  label="Take Profit"
  name="takeProfit"
  rules={[{ required: true, message: 'Please input the take profit!' }]}
>
  <Input
    type="number"
    name="takeProfit"
    value={account.takeProfit}
    onChange={handleChange}
  />
</Form.Item>

<Form.Item
  label="Stop Loss"
  name="stopLoss"
  rules={[{ required: true, message: 'Please input the stop loss!' }]}
>
  <Input
    type="number"
    name="stopLoss"
    value={account.stopLoss}
    onChange={handleChange}
  />
</Form.Item>

<Form.Item
  label="Broker"
  name="broker"
  rules={[{ required: true, message: 'Please select a broker!' }]}
>
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
</Form.Item>
{selectedBrokerObj && (
<Form.Item
  label="Server"
  name="server"
  rules={[{ required: true, message: 'Please select a server!' }]}
>

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
  
</Form.Item> 
)}

{/*   
   

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
              {brokers && brokers.map((broker: any, index) => (
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
                    {selectedBrokerObj.servers.map((server: any, index: number) => (
                      <option key={index} value={server}>
                        {server}
                      </option>
                    ))}
                  </>

                </select>
              )}

            </>

          </Form.Group>
 */}






        </Form>

      </Modal>

      <Drawer title="Account Edit" placement="right" onClose={onClose} open={open}>

       <Form
    initialValues={{
      login: account.login,
      password: account.password,
      investorPassword: account.investorPassword,
      lotSize: account.lotSize,
      takeProfit: account.takeProfit,
      stopLoss: account.stopLoss,
      broker: account.broker,
      server: account.server
    }}
  onFinish={handleUpdateSubmit}
  labelCol={{ span: 16 }}
  wrapperCol={{ span: 24 }}
  style={{ maxWidth: 600 }}
  layout="vertical" // Set the layout prop to 'vertical'
>

        <Form.Item
      label={`Current Account Number - ${account.login}`}
      name="login"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input 
      type="number"
      name="login"
      value={account.login}
      onChange={handleChange}

      />
    </Form.Item>

          
          <Form.Item
      label={`Current Password - ${account.password}`}
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password 
      name="password"
      required={true}
      value={account.password}
      onChange={handleChange}

      />
    </Form.Item>

    
    <Form.Item
      label={`Current Inv Password - ${account.investorPassword}`}
      name="investorPassword"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password 
      name="investorPassword"
      required={true}
      value={account.investorPassword}
      onChange={handleChange}

      />
    </Form.Item>


    <Form.Item
  label={`Current Lot Size - ${account.lotSize}`}
  name="lotSize"
  rules={[{ required: true, message: 'Please input the lot size!' }]}
>
  <Input
    type="number"
    name="lotSize"
    value={account.lotSize}
    onChange={handleChange}
  />
</Form.Item>

<Form.Item
  label={`Current Take Profit - ${account.takeProfit}`}
  name="takeProfit"
  rules={[{ required: true, message: 'Please input the take profit!' }]}
>
  <Input
    type="number"
    name="takeProfit"
    value={account.takeProfit}
    onChange={handleChange}
  />
</Form.Item>

<Form.Item
  label={`Current stop loss ${account.stopLoss}`}
  name="stopLoss"
  rules={[{ required: true, message: 'Please input the stop loss!' }]}
>
  <Input
    type="number"
    name="stopLoss"
    value={account.stopLoss}
    onChange={handleChange}
  />
</Form.Item>

<Form.Item
  label="Broker"
  name="broker"
  rules={[{ required: true, message: 'Please select a broker!' }]}
>
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
</Form.Item>
{selectedBrokerObj && (
<Form.Item
  label="Server"
  name="server"
  rules={[{ required: true, message: 'Please select a server!' }]}
>

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
  
</Form.Item> 
)}

<Button type="submit">Update Account</Button>
        </Form>
      </Drawer>

    </>

  )
}

export default AccountsScreen