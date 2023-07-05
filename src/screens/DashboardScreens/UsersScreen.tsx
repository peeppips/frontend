import {   useEffect } from "react";
// import { Button, Col, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import {  UserLoginState, projectListByUserState } from "../../types";
import { getProjectsByUser } from "../../actions/projectActions";
import { Button, Table } from "react-bootstrap";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import TopBarComponent from "./components/TopBarComponent";

 const UsersScreen = () => {

  const dispatch = useDispatch()

  const userLogin = useSelector((state: RootState): UserLoginState => state.userLogin as UserLoginState);  

  const { userInfo } = userLogin

  const projectListByUser = useSelector((state: RootState): projectListByUserState => state.projectListByUser as projectListByUserState);  

  const { loading,error,projects } = projectListByUser

  const navigate =useNavigate()
  useEffect(() => {
    if (!userInfo) {
      navigate('/')
    } else {
      (dispatch as ThunkDispatch<any, any, AnyAction>)(getProjectsByUser(userInfo.email));
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


    return(
            <>
              <div className="min-height-300 bg-primary position-absolute w-100"></div>
  <aside className="sidenav bg-white navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4 " id="sidenav-main">
    <div className="sidenav-header">
      <i className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
      <Link className="navbar-brand m-0" to=" https://demos.creative-tim.com/argon-dashboard/pages/dashboard.html " target="_blank">
        <img src="../../../public/logo.jpg" className="navbar-brand-img h-100" alt="main_logo"/>
        <span className="ms-1 font-weight-bold">Peeppips Ltd</span>
      </Link>
    </div>
    <hr className="horizontal dark mt-0"/>
    <div className="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link active" to="/">
            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
              <i className="ni ni-tv-2 text-primary text-sm opacity-10"></i>
            </div>
            <span className="nav-link-text ms-1">Dashboard</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " to="/projects">
            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
              <i className="ni ni-calendar-grid-58 text-warning text-sm opacity-10"></i>
            </div>
            <span className="nav-link-text ms-1">Projects</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " to="/users">
            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
              <i className="ni ni-credit-card text-success text-sm opacity-10"></i>
            </div>
            <span className="nav-link-text ms-1">Users</span>
          </Link>
        </li>
   
        <li className="nav-item">
          <Link className="nav-link " to="/profile">
            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
              <i className="ni ni-single-copy-04 text-warning text-sm opacity-10"></i>
            </div>
            <span className="nav-link-text ms-1">Profile</span>
          </Link>
        </li>
 
      </ul>
    </div>
    <div className="sidenav-footer mx-3 ">
      <div className="card card-plain shadow-none" id="sidenavCard">
        <img className="w-50 mx-auto" src="../../../public/icon-documentation.svg" alt="sidebar_illustration"/>
        <div className="card-body text-center p-3 w-100 pt-0">
          <div className="docs-info">
            <h6 className="mb-0">Need help?</h6>
            <p className="text-xs font-weight-bold mb-0">Please check our docs</p>
          </div>
        </div>
      </div>
      <a href="https://www.creative-tim.com/learning-lab/bootstrap/license/argon-dashboard" target="_blank" className="btn btn-dark btn-sm w-100 mb-3">Documentation</a>
    </div>
  </aside>
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
                <h6 className="mb-2">My Users</h6>
              </div>
            </div>

            <div className="card-body">
          
            <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>#</th>
       
          <th>Project</th>
          <th>Broker</th>
          <th>Email</th>
          <th>Password</th>
          <th>Action</th>

        </tr>
      </thead>
      <tbody>
      {projects && projects.length > 0 ? (
  projects.map((project, index) => (
    <tr key={index}>
      <td>{index}</td>
      <td>{project.accountNumber}</td>
      <td>{project.broker}</td>
      <td>{project.email}</td>
      <td>{project.password}</td>
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
    
      {/* <Form onSubmit={handleSubmit}>
        <Form.Group as={Col} controlId="formAccountNumber">
          <Form.Label>Account Number</Form.Label>
          <Form.Control
            type="text"
            value={accountNumber}
            onChange={handleAccountNumberChange}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formBroker">
          <Form.Label>Broker</Form.Label>
          <Form.Control as="select" value={selectedBroker} onChange={handleBrokerChange}>
            <option value="">Select a broker</option>
           
          </Form.Control>
        </Form.Group>

        <Form.Group as={Col} controlId="formServer">
          <Form.Label>Server</Form.Label>
          <Form.Control as="select" value={selectedServer} onChange={handleServerChange} disabled={!selectedBroker}>
            <option value="">Select a server</option>
           
          </Form.Control>
        </Form.Group>

        <Form.Group as={Col} controlId="formLotSize">
          <Form.Label>Lot Size</Form.Label>
          <Form.Control
            type="text"
            value={lotSize}
            onChange={handleLotSizeChange}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formTakeProfit">
          <Form.Label>Take Profit</Form.Label>
          <Form.Control
            type="text"
            value={takeProfit}
            onChange={handleTakeProfitChange}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formStopLoss">
          <Form.Label>Stop Loss</Form.Label>
          <Form.Control
            type="text"
            value={stopLoss}
            onChange={handleStopLossChange}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          disabled={!accountNumber || !password || !selectedBroker || !selectedServer || !lotSize || !takeProfit || !stopLoss}
        >
          Submit
        </Button>
      </Form> */}
    
  </div>


            </div>
          
          </div>
        
     
        </div>
      </div>
   
   
  </main>
  
            </>
  
    )
  }

  export default UsersScreen