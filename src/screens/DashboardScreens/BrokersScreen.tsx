import {   useEffect, useState } from "react";
// import { Button, Col, Form } from "react-bootstrap";
import { RootState } from "../../store";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import {  UserLoginState, brokerListByUserState } from "../../types";
import { getProjectsByUser } from "../../actions/projectActions";
import { Badge, Button, Form, Table } from "react-bootstrap";
import DashboardSidebar from "./components/Sidebar";
import { Drawer, Modal, Popconfirm, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { createBroker, deleteBroker, getAllBrokers } from "../../actions/brokerActions";
import {  useNavigate } from "react-router-dom";
import TopBarComponent from "./components/TopBarComponent";
import { QuestionCircleOutlined } from '@ant-design/icons';







 const BrokersScreen = () => {

  const [countryOptions, setCountryOptions] = useState([]);

  useEffect(() => {
    fetchCountryOptions();
  }, []);

  const fetchCountryOptions = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const data = await response.json();

      const options = data.map((country: { name: { common: any; }; }) => ({
        value: country.name.common,
        label: country.name.common,
      }));

      setCountryOptions(options);
    } catch (error) {
      console.error('Error fetching country options:', error);
    }
  };

  const dispatch = useDispatch()

  const userLogin = useSelector((state: RootState): UserLoginState => state.userLogin as UserLoginState);  

  const { userInfo } = userLogin

  const allBrokers = useSelector((state: RootState): brokerListByUserState => state.allBrokers as brokerListByUserState);  

  const { brokers } = allBrokers


  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo) {
      // Handle the case when userInfo is not available
      navigate('/')
    } else {
      (dispatch as ThunkDispatch<any, any, AnyAction>)(getProjectsByUser(userInfo.email));
      (dispatch as ThunkDispatch<any, any, AnyAction>)(getAllBrokers());
      
      

    }
  }, [dispatch, userInfo]);

  const handleSubmit = async(event: { preventDefault: () => void; }) => {
    event.preventDefault();
    try {
     
      await (dispatch as ThunkDispatch<any, any, AnyAction>)(createBroker(formData));
      
      // Reset the form fields if needed
      setFormData({
        name: '',
        country: '',
        regulations: [],
        servers: [],
      });
  
      handleCancel();
      
      // Fetch the updated list of brokers
      await (dispatch as ThunkDispatch<any, any, AnyAction>)(getAllBrokers());
     
    } catch (error) {
      // Handle error if necessary
      console.log(error);
    }
  };
  
  useEffect(() => {
    if (brokers == undefined) {
      console.log("brokers is undefined:");
    }
    else{
console.log("brokers are ",brokers);

    }
  }, [brokers]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    console.log("open model")
    setFormData({
      name: '',
      country: '',
      regulations: [],
      servers: [],
    });
    setIsModalOpen(true);
  };



  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [formData, setFormData] = useState({
    name: '',
    country: '',
    regulations: [],
    servers: [],
  });

  const handleInputChange = (event: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

 
  const [servers, setServers] = useState(['']);
  const [regulations,setRegulations]= useState(['']);

  const handleServerChange = (index: number, event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const updatedServers = [...servers];
    updatedServers[index] = event.target.value;
    setServers(updatedServers);
    const newLocal = (prevState: any) => ({
      ...prevState,
      servers: updatedServers
    });
    setFormData(newLocal);
  };
  
  

  
  const addServerField = () => {
    setServers([...servers, '']);
  };

  const removeServerField = (index: number) => {
    const updatedServers = [...servers];
    updatedServers.splice(index, 1);
    setServers(updatedServers);
  };

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
    setFormData((prevState) => ({
      ...prevState,
      country: value
    }));
  };


  // const onChange = (value: string) => {
  //   console.log(`selected ${value}`);
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     country: value
  //   }));
  // };
  
  const onSearch = (value: string) => {
    console.log('search:', value);
  };

  const [open, setOpen] = useState(false);

  const showDrawer = (brokerDetails:any) => {
    console.log(brokerDetails)
    setFormData(brokerDetails)
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };


  // const editBroker = async (uid:string) => {
  //   try {
  //     (dispatch as ThunkDispatch<any, any, AnyAction>)(getBrokerById(uid));
  //     console.log(broker)
  //     showDrawer();
     
  //     // Check if x is defined and handle the result accordingly
      

  //     setFormData({
  //       name: broker.name,
  //       country: broker.country,
  //       regulations: broker.regulations,
  //       servers:[]
  //     });
  


  //   } catch (error) {
  //     // Handle any errors that occurred during the asynchronous operation
  //     console.error('Error:', error);
  //   }
    

  // }

 

 

  const confirm = async (id:string) => {
  try {

     await (dispatch as ThunkDispatch<any, any, AnyAction>)(deleteBroker(id));
   
     await (dispatch as ThunkDispatch<any, any, AnyAction>)(getAllBrokers());
      
  } catch (error) {
    
  }  
  }

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  
    const updatedRegulations = [...regulations];
    
    setRegulations(updatedRegulations);
    const newLocal = (prevState:any) => ({
      ...prevState,
      regulations: [...prevState.regulations, value]
    });
    setFormData(newLocal);

  };

    return(
            <>

<Drawer title="Edit Broker" placement="right" onClose={onClose} open={open}>
<Form >
      <Form.Group controlId="formName">
        <Form.Label>Name </Form.Label>
        <Form.Control
          type="text"
          name="name"
          required={true}
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Enter name"
        />
      </Form.Group>

      <Form.Group controlId="formCountry">
        <Form.Label>Country</Form.Label>
        {/* <Form.Control
          type="text"
          name="country"
          value={formData.country}
          onChange={handleInputChange}
          placeholder="Enter country"
        /> */}
  <br/>
  {countryOptions.length > 0 ? (
  <Select
    style={{ width: "100%" }}
    showSearch
    placeholder="Select a country"
    optionFilterProp="children"
    onChange={onChange}
    onSearch={onSearch}
    options={countryOptions}

    
  />
) : (
  <p>No options available</p>
)}

      </Form.Group>

      <Form.Group controlId="formRegulations">
        <Form.Label>Regulations</Form.Label>
        
        <Select
      mode="multiple"
      allowClear
      style={{ width: '100%' }}
      placeholder="Please select"
      defaultValue={[]}
      onChange={handleChange}
      options={countryOptions}
    />

      </Form.Group>

      

      <div>
          <label htmlFor="servers">Servers:</label>
          {formData.servers.map((server, index) => (
            <div key={index}>
              <Form.Control
                type="text"
                required={true}
                value={server}
                onChange={(event) => handleServerChange(index, event)}
              />
              {index > 0 && (
                <Button variant="danger" type="button" onClick={() => removeServerField(index)}>
                  Remove
                </Button>
              )}
            </div>
          ))}
          <Button variant="warning" type="button" onClick={addServerField}>
            Add Server
          </Button>
        </div>

        <Button className="btn btn-block w-100" type="submit">Update Broker</Button>

    </Form>
      </Drawer>

              <div className="min-height-300 bg-primary position-absolute w-100"></div>
              <DashboardSidebar/>


  <main className="main-content position-relative border-radius-lg ">
 
   
  
    <div className="container-fluid py-4">
     <TopBarComponent />
  
      <div className="row mt-4">
        <div className="col-lg-12 mb-lg-0 mb-4">
          <div className="card ">
            <div className="card-header pb-0 p-3">
              <div className="d-flex justify-content-between">
                <h6 className="mb-2">Brokers({brokers?.length})</h6>

                <Button  onClick={showModal} variant="primary">Add</Button>
              </div>
            </div>

            <div className="card-body">
          
            <div className="responsive-table">
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Country</th>
        <th>Regulations</th>
        <th>Servers</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {brokers && brokers.length > 0 ? (
        brokers.map((broker, index) => (
          <tr key={index}>
            <td>{index}</td>
            <td>{broker.name}</td>
            <td>{broker.country}</td>
            <td>{broker.regulations}</td>
            <td>
              {broker.servers.map((server:string, index:any) => (
                <Badge key={index}>{server}</Badge>
              ))}
            </td>
            <td>
              <Button variant="primary" size="sm" onClick={() => showDrawer(broker)}>
                Edit
              </Button>
              <Popconfirm
    title="Delete the Broker"
    description="Are you sure to delete this task?"
    onConfirm={()=>confirm(broker?.id)}
    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
  >
    <Button variant="danger">Delete</Button>
  </Popconfirm>

              {/* <Button variant="danger" size="sm" onClick={() => deleteBrokerHandler(broker?.uid)}>
                Delete
              </Button> */}
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={6}>No Brokers found.</td>
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
  
  <Modal title="Add Broker" open={isModalOpen} footer={[     <Button variant="primary" onClick={handleSubmit} type="submit">
        Submit
      </Button>]} onCancel={handleCancel}>
  <Form >
      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          required={true}
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Enter name"
        />
      </Form.Group>

      <Form.Group controlId="formCountry">
        <Form.Label>Country</Form.Label>
        {/* <Form.Control
          type="text"
          name="country"
          value={formData.country}
          onChange={handleInputChange}
          placeholder="Enter country"
        /> */}
  <br/>
  {countryOptions.length > 0 ? (
  <Select
    style={{ width: "100%" }}
    showSearch
    placeholder="Select a person"
    optionFilterProp="children"
    onChange={onChange}
    onSearch={onSearch}
    options={countryOptions}

    
  />
) : (
  <p>No options available</p>
)}

      </Form.Group>

   <Form.Group controlId="formRegulations">
        <Form.Label>Regulations</Form.Label>
        
        <Select
      mode="multiple"
      allowClear
      style={{ width: '100%' }}
      placeholder="Please select"
      defaultValue={[]}
      onChange={handleChange}
      options={countryOptions}
    />
    
      </Form.Group>

      <div>
          <label htmlFor="servers">Servers:</label>
          {servers.map((server, index) => (
            <div key={index}>
              <Form.Control
                type="text"
                required={true}

                value={server}
                onChange={(event) => handleServerChange(index, event)}
              />
              {index > 0 && (
                <Button variant="danger" type="button" onClick={() => removeServerField(index)}>
                  Remove
                </Button>
              )}
            </div>
          ))}
          <Button variant="warning" type="button" onClick={addServerField}>
            Add Server
          </Button>
        </div>

 
    </Form>
      </Modal>

            </>
  
    )
  }

  export default BrokersScreen