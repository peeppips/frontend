import {   useEffect, useState } from "react";
// import { Button, Col, Form } from "react-bootstrap";
import { RootState } from "../../store";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { UserLoginState, creditList } from "../../types";
import {  Button, Form, Table } from "react-bootstrap";
import DashboardSidebar from "./components/Sidebar";
import { Modal} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import TopBarComponent from "./components/TopBarComponent";
import { createCredit, getAllCredits } from "../../actions/creditActions";

 const CreditsScreen = () => {
  

  const dispatch = useDispatch()

  const userLogin = useSelector((state: RootState): UserLoginState => state.userLogin as UserLoginState);  

  const { userInfo } = userLogin

  const allCredits = useSelector((state: RootState): creditList => state.allCredits as creditList);  

  const { credits } = allCredits

  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo) {
      // Handle the case when userInfo is not available
      navigate('/')
    } else {
      (dispatch as ThunkDispatch<any, any, AnyAction>)(getAllCredits());
      
      

    }
  }, [dispatch, userInfo]);

  const handleSubmit = async(event: { preventDefault: () => void; }) => {
    event.preventDefault();
    try {
     
      await (dispatch as ThunkDispatch<any, any, AnyAction>)(createCredit(formData));
      
      // Reset the form fields if needed
      setFormData({
        user: '',
            project: '',
            points: 0,
      });
  
      handleCancel();
      
      // Fetch the updated list of brokers
      await (dispatch as ThunkDispatch<any, any, AnyAction>)(getAllCredits());
     
    } catch (error) {
      // Handle error if necessary
      console.log(error);
    }
  };
  
  useEffect(() => {
    if (credits == undefined) {
      console.log("credits is undefined:");
    }
    else{
console.log("credits are ",credits);

    }
  }, [credits]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // const showModal = () => {
  //   console.log("open model")
  //   setIsModalOpen(true);
  // };



  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [formData, setFormData] = useState({
    user: '',
    project: '',
    points: 0,
   
  });

  const handleInputChange = (event: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

    return(
            <>
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
                <h6 className="mb-2">Credits({credits?.length})</h6>

                {/* <Button  onClick={showModal} variant="primary">Add</Button> */}
              </div>
            </div>

            <div className="card-body">
          
            <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>ID</th>
          <th>Name</th>
          <th>Country</th>
          <th>Regulations</th>
          <th>Servers</th>
         

        </tr>
      </thead>
      <tbody>
      {credits && credits.length > 0 ? (
  credits.map((credit, index) => (
    <tr key={index}>
      <td>{index}</td>
      <td>{credit.uid}</td>
      <td>{credit.user}</td>
      <td>{credit.transactionId}</td>
      <td>{credit.project}</td>
       
    </tr>
  ))
) : (
  <tr>
    <td colSpan={6}>No Credits found.</td>
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
  
  <Modal title="Add Credit" open={isModalOpen} footer={[     <Button variant="primary" onClick={handleSubmit} type="submit">
        Submit
      </Button>]} onCancel={handleCancel}>
  <Form >
      <Form.Group controlId="formName">
        <Form.Label>User</Form.Label>
        <Form.Control
          type="text"
          name="user"
          required={true}
          value={formData.user}
          onChange={handleInputChange}
          placeholder="Enter User"
        />
      </Form.Group>

    

      <Form.Group controlId="formRegulations">
        <Form.Label>Project</Form.Label>
        <Form.Control
          type="text"
          name="regulations"
          required={true}
          value={formData.project}
          onChange={handleInputChange}
          placeholder="Enter regulations"
        />
      </Form.Group>

     

 
    </Form>
      </Modal>

            </>
  
    )
  }

  export default CreditsScreen