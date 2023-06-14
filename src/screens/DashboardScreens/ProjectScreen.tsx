import {   useEffect, useState } from "react";
// import { Button, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { GetAccountsByUserState, UserLoginState, projectListByUserState } from "../../types";
import { createProject, getProjectsByUser } from "../../actions/projectActions";
import { Button, Form,Table } from "react-bootstrap";
import DashboardSidebar from "./components/Sidebar";
import TopBarComponent from "./components/TopBarComponent";
import {
      ref,
      uploadBytesResumable,
      getDownloadURL 
  } from "firebase/storage";
import { storage } from "../../firebase";
import Loader from "../../components/Loader";
import { getAccountsByUser } from "../../actions/accountActions";
import { Modal, Select, SelectProps } from "antd";
import Message from "../../components/Message";

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
      resellEstimate: '',
      botPlatform: '',
      uploadedFilePath: '',
      status:'inactive',
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

  const [uploading, setUploading] = useState(false);
  const uploadFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('image', file);
      setUploading(true);

      try {
            const storageRef = ref(storage,`/bots/${new Date()}-${file.name}`)
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                  "state_changed",
                  (err) => {
            console.log("error is ",err)
              getDownloadURL(uploadTask.snapshot.ref).then((url:string) => {
                              console.log(url);
    
              setFormData(prevFormData => ({
                ...prevFormData,
                uploadedFilePath: url
              }));
          
                          });
        },
                  () => {
                      // download url
                      getDownloadURL(uploadTask.snapshot.ref).then((url:string) => {
                          console.log(url);

          setFormData(prevFormData => ({
            ...prevFormData,
            uploadedFilePath: url
          }));
      
                      });
                  }
              ); 

        // const config = {
        //   headers: {
        //     'Content-Type': 'multipart/form-data',
        //   },
        // };

        // const { data } = await axios.post('https://peeppipsbackend.onrender.com/api/upload/', formData, config);

        // setImage(data);
        // const hostBotDetailsString = localStorage.getItem('hostBotDetails');
        // let hostBotDetails: HostBotDetails = {};

        // if (hostBotDetailsString) {
        //   hostBotDetails = JSON.parse(hostBotDetailsString);
        // }

        // hostBotDetails.uploadedFilePath = data;

        // localStorage.setItem('hostBotDetails', JSON.stringify(hostBotDetails));
        setUploading(false);
       
      } catch (error) {
        console.error("error in uploading ",error);
        setUploading(false);
        // Display error message to the user
      }
    }
  };


  useEffect(() => {
    (dispatch as ThunkDispatch<any, any, AnyAction>)(getAccountsByUser(userInfo?.uid));

  }, []);
  
  const accountByUser = useSelector((state: RootState): GetAccountsByUserState => state.accountByUser as GetAccountsByUserState);  
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
  



    return(
            <>
              <div className="min-height-300 bg-primary position-absolute w-100"></div>
              <DashboardSidebar/>
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
          <th>Accounts</th>
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
      
      <td>{project.accounts.map((account:string) => (
  <>{account}</>
))}
</td>
      <td>{project.botPlatform}</td>
      <td>
        <Button>View</Button>
        <Button variant="warning">Edit</Button>
        <Button variant="danger">Disable</Button>
      </td>
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