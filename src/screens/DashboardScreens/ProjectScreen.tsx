import {   useEffect, useState } from "react";
// import { Button, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { GetAccountsByUserState, UserLoginState, projectListByUserState } from "../../types";
import { createProject, deleteProject, getProjectsByUser, updateProject } from "../../actions/projectActions";
import { Button, Form,Table } from "react-bootstrap";
import DashboardSidebar from "./components/Sidebar";
import TopBarComponent from "./components/TopBarComponent";

import Loader from "../../components/Loader";
import {  getAccountsByUser } from "../../actions/accountActions";
import { Drawer, Modal, Popconfirm, Select, SelectProps, notification } from "antd";
import Message from "../../components/Message";
import { QuestionCircleOutlined } from '@ant-design/icons';

 const ProjectScreen = () => {

  const dispatch = useDispatch()

  const userLogin = useSelector((state: RootState): UserLoginState => state.userLogin as UserLoginState);  

  const { userInfo } = userLogin

  const projectListByUser = useSelector((state: RootState): projectListByUserState => state.projectListByUser as projectListByUserState);  

  const { projects } = projectListByUser
  const navigate =useNavigate()
  useEffect(() => {
    
      if (!userInfo) {
        // Handle the case when userInfo is not available
        navigate('/')
      } else {
      (dispatch as ThunkDispatch<any, any, AnyAction>)(getProjectsByUser(userInfo.uid));
    }
  }, [dispatch, userInfo]);
  
  useEffect(() => {
    if (projects == undefined) {
      console.log("projects is undefined:", projects);
    }
    else{
console.log("projects is ",projects);

    }
  }, [projects]);


  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    console.log("open model")
    setIsModalOpen(true);
  };



  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const [formData, setFormData] = useState({
    id:"",
    resellEstimate: '',
    botPlatform: '',
    uploadedFilePath: '',
    status:'inactive',
    accounts: [] as string[],
    name : '',
    user: userInfo?.uid
  });


  const handleSubmit = async(event: { preventDefault: () => void; }) => {
    event.preventDefault();
    try {
      await (dispatch as ThunkDispatch<any, any, AnyAction>)(createProject(formData));

    // Reset the form fields if needed
    setFormData({
      id:"",
      resellEstimate: '',
      botPlatform: '',
      uploadedFilePath: '',
      status:'active',
      accounts: [],
      name : '',
      user: userInfo?.uid
  
    });

  handleCancel();
  // Fetch the updated list of brokers
  if(userInfo){
    await (dispatch as ThunkDispatch<any, any, AnyAction>)(getProjectsByUser(userInfo.uid));

  }
  }
  catch (error) {
    // Handle error if necessary
    console.log(error);
  }
  };

  const handleInputChange = (event: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const [, setSelectedFile] = useState<File | null>(null);

  const [uploading, ] = useState(false);
  const uploadFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
     
      // try {
      //       const storageRef = ref(storage,`/bots/${new Date()}-${file.name}`)
      //       const uploadTask = uploadBytesResumable(storageRef, file);

      //       uploadTask.on(
      //             "state_changed",
      //             (err) => {
      //       console.log("error is ",err)
      //         getDownloadURL(uploadTask.snapshot.ref).then((url:string) => {
      //                         console.log(url);
    
      //         setFormData(prevFormData => ({
      //           ...prevFormData,
      //           uploadedFilePath: url
      //         }));
          
      //                     });
      //   },
      //             () => {
      //                 // download url
      //                 getDownloadURL(uploadTask.snapshot.ref).then((url:string) => {
      //                     console.log(url);

      //     setFormData(prevFormData => ({
      //       ...prevFormData,
      //       uploadedFilePath: url
      //     }));
      
      //                 });
      //             }
      //         ); 

      //   // const config = {
      //   //   headers: {
      //   //     'Content-Type': 'multipart/form-data',
      //   //   },
      //   // };

      //   // const { data } = await axios.post('https://peeppipsbackend.onrender.com/api/upload/', formData, config);

      //   // setImage(data);
      //   // const hostBotDetailsString = localStorage.getItem('hostBotDetails');
      //   // let hostBotDetails: HostBotDetails = {};

      //   // if (hostBotDetailsString) {
      //   //   hostBotDetails = JSON.parse(hostBotDetailsString);
      //   // }

      //   // hostBotDetails.uploadedFilePath = data;

      //   // localStorage.setItem('hostBotDetails', JSON.stringify(hostBotDetails));
      //   setUploading(false);
       
      // } catch (error) {
      //   console.error("error in uploading ",error);
      //   setUploading(false);
      //   // Display error message to the user
      // }
    }
  };


  useEffect(() => {
    (dispatch as ThunkDispatch<any, any, AnyAction>)(getAccountsByUser(userInfo?.uid));

  }, []);
  
  const accountByUser = useSelector((state: RootState): GetAccountsByUserState => state.accountByUser as unknown as GetAccountsByUserState);  
  const { loading, error,accounts } = accountByUser


  const options: SelectProps['options'] = [];

  if (!loading) {
    for (let index = 0; index < accounts.length; index++) {
      const element = accounts[index];
    
      options.push({
        value: element.uid.toString(), // Convert element to a string
        label: `${element.login} - ${element.server}`, // Convert element to a string
      });
    }
  }

  
  const handleChange = (value: string | string[]) => {
    console.log(`Selected: ${value}`);
    const updatedAccounts = Array.isArray(value) ? value : [value];
  
    setFormData(prevFormData => ({
      ...prevFormData,
      accounts: updatedAccounts
    }));
  };
  

 
  const [open, setOpen] = useState(false);

  const showDrawer = (accountDetails:any,) => {
    console.log(accountDetails)
    setFormData(accountDetails)
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };


  const confirm = async (id:string) => {
    try {
  
       await (dispatch as ThunkDispatch<any, any, AnyAction>)(deleteProject(id));
     getProjectsByUser
       await (dispatch as ThunkDispatch<any, any, AnyAction>)(getProjectsByUser(userInfo?.uid));
        
    } catch (error) {
      
    }  
    }

  const handleUpdateSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    // Perform submission logic or dispatch an action
    console.log("formdata is ",formData)
    try {
      await (dispatch as ThunkDispatch<any, any, AnyAction>)(updateProject(formData.id, formData));
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
                <h6 className="mb-2">My Projects({projects?.length})</h6>
                <Button  onClick={showModal} variant="primary">Add</Button>

              </div>
            </div>

            <div className="card-body">
          
            <Table striped bordered hover >
      <thead>
        <tr>
          <th>#</th>
       
          <th>Name</th>
          <th>Status</th>
          <th>My Accounts</th>
          <th>Platform</th>
          <th>Action</th>

        </tr>
      </thead>
      <tbody>
      {projects && projects.length > 0 ? (
  projects.map((project, index) => (
    <tr key={index}>
      <td>{index+1}</td>
      <td>{project.name}</td>
      <td>{project.status}</td>
      
      <td>{project.accounts.length}</td>
      <td>{project.botPlatform}</td>
      <td>
        
      <Button variant="warning" onClick={()=>showDrawer(project)}>Edit</Button>
      <Popconfirm
                                    title="Delete the Account"
                                    description="Are you sure to delete this task?"
                                    onConfirm={() => confirm(project?.id?.toString())}

                                    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                                  >
                                    <Button variant="danger">Delete</Button>
                                  </Popconfirm>      </td>
    </tr>
  ))
) : (
  <tr>
    <td colSpan={6}>No projects found.</td>
  </tr>
)}

        

      </tbody>
    </Table>
  </div>


            </div>
          
          </div>
        
     
        </div>
        
      </div>
   
   
  </main>
  
  <Drawer title="Project Edit" placement="right" onClose={onClose} open={open}>
  <Form onSubmit={handleUpdateSubmit}>
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
        <Form.Label> How many people do you estimate you will resell to in a month?</Form.Label>
        <Form.Control
            as="select"
            name="resellEstimate"
            value={formData.resellEstimate}
            onChange={handleInputChange}
          >
            <option value="">Select an option</option>
            <option value="0-10">0-10</option>
            <option value="11-50">11-50</option>
            <option value="51-100">51-100</option>
            <option value="101-500">101-500</option>
            <option value="501+">501+</option>
          </Form.Control>
      </Form.Group>

      <Form.Group controlId="formPlatform">
          <Form.Label>Which platform does your bot run on?</Form.Label>
          <Form.Control
            as="select"
            name="botPlatform"
            value={formData.botPlatform}
            onChange={handleInputChange}
          >
            <option value="">Select an option</option>
            <option value="MT5">MT5</option>
            <option value="MT4">MT4</option>
            <option value="Python">Bot is made in Python</option>
          </Form.Control>
        </Form.Group>

 
        <Form.Group  controlId="formBotFile">
            <Form.Label>Upload the bot</Form.Label>
            <Form.Control type="file" accept=".ex5," onChange={uploadFileHandler} />
            {uploading && <Loader />}
            <Form.Text className="text-muted">
             
              {formData.uploadedFilePath.length > 0 ? <>successfully Added Your Bot</> : <> Please upload an ex5  file containing your bot.</>}
              
              
            </Form.Text>
            
          </Form.Group>


          <Form.Group  controlId="formBotFile">
            <Form.Label>Accounts</Form.Label>
           
            <Select
          mode="tags"
          size="middle"
          placeholder="Please select Accounts"
          defaultValue={[]}
          onChange={handleChange}
          style={{ width: '100%' }}
          options={options}
        />

           {/* {accounts && accounts.map((i)=>(<>{i}</>))} */}
           
          </Form.Group>
<Button type="submit">Update Project</Button>
    </Form>
</Drawer>


  <Modal title="Add Project" open={isModalOpen} footer={[     <Button variant="primary" onClick={handleSubmit} type="submit">
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
        <Form.Label> How many people do you estimate you will resell to in a month?</Form.Label>
        <Form.Control
            as="select"
            name="resellEstimate"
            value={formData.resellEstimate}
            onChange={handleInputChange}
          >
            <option value="">Select an option</option>
            <option value="0-10">0-10</option>
            <option value="11-50">11-50</option>
            <option value="51-100">51-100</option>
            <option value="101-500">101-500</option>
            <option value="501+">501+</option>
          </Form.Control>
      </Form.Group>

      <Form.Group controlId="formPlatform">
          <Form.Label>Which platform does your bot run on?</Form.Label>
          <Form.Control
            as="select"
            name="botPlatform"
            value={formData.botPlatform}
            onChange={handleInputChange}
          >
            <option value="">Select an option</option>
            <option value="MT5">MT5</option>
            <option value="MT4">MT4</option>
            <option value="Python">Bot is made in Python</option>
          </Form.Control>
        </Form.Group>

 
        <Form.Group  controlId="formBotFile">
            <Form.Label>Upload the bot</Form.Label>
            <Form.Control type="file" accept=".ex5," onChange={uploadFileHandler} />
            {uploading && <Loader />}
            <Form.Text className="text-muted">
             
              {formData.uploadedFilePath.length > 0 ? <>successfully Added Your Bot</> : <> Please upload an ex5  file containing your bot.</>}
              
              
            </Form.Text>
            
          </Form.Group>


          <Form.Group  controlId="formBotFile">
            <Form.Label>Accounts</Form.Label>
           
            <Select
          mode="tags"
          size="middle"
          placeholder="Please select Accounts"
          defaultValue={[]}
          onChange={handleChange}
          style={{ width: '100%' }}
          options={options}
        />

           {/* {accounts && accounts.map((i)=>(<>{i}</>))} */}
           
          </Form.Group>

    </Form>
      </Modal>

            </>
  
    )
  }

  export default ProjectScreen