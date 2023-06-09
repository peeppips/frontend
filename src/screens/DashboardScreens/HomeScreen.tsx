import {   useEffect } from "react";
// import { Button, Col, Form } from "react-bootstrap";
import { getUserDetails } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { UserLoginState, projectListByUserState } from "../../types";
import { getProjectsByUser } from "../../actions/projectActions";
import { Button, Table } from "react-bootstrap";
import DashboardSidebar from "./components/Sidebar";

 const DashboardIndex = () => {

  
  const dispatch = useDispatch()

  const userLogin = useSelector((state: RootState): UserLoginState => state.userLogin as UserLoginState);  

  const { userInfo } = userLogin

  const projectListByUser = useSelector((state: RootState): projectListByUserState => state.projectListByUser as projectListByUserState);  

  const { projects } = projectListByUser


  useEffect(() => {
    if (!userInfo) {
      
    } else {
      (dispatch as ThunkDispatch<any, any, AnyAction>)(getUserDetails(userInfo.user.email));
      (dispatch as ThunkDispatch<any, any, AnyAction>)(getProjectsByUser(userInfo.user.email));
      
       
        
      }
    
  }, [dispatch, userInfo])

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
      <div className="row">
        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div className="card">
            <div className="card-body p-3">
              <div className="row">
                <div className="col-8">
                  <div className="numbers">
                    <p className="text-sm mb-0 text-uppercase font-weight-bold">My Projects</p>
                    <h5 className="font-weight-bolder">
                    {projects?.length}
                    </h5>
                    {/* <p className="mb-0">
                      <span className="text-success text-sm font-weight-bolder">+55%</span>
                      since yesterday
                    </p> */}
                  </div>
                </div>
                <div className="col-4 text-end">
                  <div className="icon icon-shape bg-gradient-primary shadow-primary text-center rounded-circle">
                    <i className="ni ni-money-coins text-lg opacity-10" aria-hidden="true"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div className="card">
            <div className="card-body p-3">
              <div className="row">
                <div className="col-8">
                  <div className="numbers">
                    <p className="text-sm mb-0 text-uppercase font-weight-bold">My Referrals</p>
                    <h5 className="font-weight-bolder">
                     0
                    </h5>
                    {/* <p className="mb-0">
                      <span className="text-success text-sm font-weight-bolder">+3%</span>
                      since last week
                    </p> */}
                  </div>
                </div>
                <div className="col-4 text-end">
                  <div className="icon icon-shape bg-gradient-danger shadow-danger text-center rounded-circle">
                    <i className="ni ni-world text-lg opacity-10" aria-hidden="true"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div className="card">
            <div className="card-body p-3">
              <div className="row">
                <div className="col-8">
                  <div className="numbers">
                    <p className="text-sm mb-0 text-uppercase font-weight-bold">My Input Variables</p>
                    <h5 className="font-weight-bolder">
                      0
                    </h5>
                    {/* <p className="mb-0">
                      <span className="text-danger text-sm font-weight-bolder">-2%</span>
                      since last quarter
                    </p> */}
                  </div>
                </div>
                <div className="col-4 text-end">
                  <div className="icon icon-shape bg-gradient-success shadow-success text-center rounded-circle">
                    <i className="ni ni-paper-diploma text-lg opacity-10" aria-hidden="true"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6">
          <div className="card">
            <div className="card-body p-3">
              <div className="row">
                <div className="col-8">
                  <div className="numbers">
                    <p className="text-sm mb-0 text-uppercase font-weight-bold">Accounts Under Me</p>
                    <h5 className="font-weight-bolder">
                     0
                    </h5>
                    {/* <p className="mb-0">
                      <span className="text-success text-sm font-weight-bolder">+5%</span> than last month
                    </p> */}
                  </div>
                </div>
                <div className="col-4 text-end">
                  <div className="icon icon-shape bg-gradient-warning shadow-warning text-center rounded-circle">
                    <i className="ni ni-cart text-lg opacity-10" aria-hidden="true"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <div className="row mt-4">
        <div className="col-lg-7 mb-lg-0 mb-4">
          <div className="card ">
            <div className="card-header pb-0 p-3">
              <div className="d-flex justify-content-between">
                <h6 className="mb-2">My Referrals</h6>
              </div>
            </div>

            <div className="card-body">
          
            <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>#</th>
          {/* <th>First Name</th>
          <th>Second Name</th> */}
          <th>Email</th>
          <th>Project</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>devngecu@gmail.com</td>
          <td>Diamond</td>
          <td>
          <Button>
              View
            </Button>

            <Button variant="warning">
              Edit
            </Button>
            <Button variant="danger">
              Disable
            </Button>
          </td>
        </tr>

        <tr>
          <td>2</td>
          <td>ngecu16@gmail.com</td>
          <td>Lukas</td>
          <td>
          <Button>
              View
            </Button>

            <Button variant="warning">
              Edit
            </Button>
            <Button variant="danger">
              Disable
            </Button>
          </td>
        </tr>

      

       

        
      
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
        
        <div className="col-lg-5">
          <div className="card">
            <div className="card-header pb-0 p-3">
              <h6 className="mb-0">My Projects</h6>
            </div>
            <div className="card-body p-3">
              <ul className="list-group">
                <li className="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
                  <div className="d-flex align-items-center">
                    <div className="icon icon-shape icon-sm me-3 bg-gradient-dark shadow text-center">
                      <i className="ni ni-mobile-button text-white opacity-10"></i>
                    </div>
                    <div className="d-flex flex-column">
                      <h6 className="mb-1 text-dark text-sm">Diamond</h6>
                      <span className="text-xs">250 Users, <span className="font-weight-bold">346 Accounts</span></span>
                    </div>
                  </div>
                  {/* <div className="d-flex">
                    <button className="btn btn-link btn-icon-only btn-rounded btn-sm text-dark icon-move-right my-auto"><i className="ni ni-bold-right" aria-hidden="true"></i></button>
                  </div> */}
                </li>

                <li className="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
                  <div className="d-flex align-items-center">
                    <div className="icon icon-shape icon-sm me-3 bg-gradient-dark shadow text-center">
                      <i className="ni ni-mobile-button text-white opacity-10"></i>
                    </div>
                    <div className="d-flex flex-column">
                      <h6 className="mb-1 text-dark text-sm">Diamond</h6>
                      <span className="text-xs">250 Users, <span className="font-weight-bold">346 Accounts</span></span>
                    </div>
                  </div>
                  {/* <div className="d-flex">
                    <button className="btn btn-link btn-icon-only btn-rounded btn-sm text-dark icon-move-right my-auto"><i className="ni ni-bold-right" aria-hidden="true"></i></button>
                  </div> */}
                </li>


                <li className="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
                  <div className="d-flex align-items-center">
                    <div className="icon icon-shape icon-sm me-3 bg-gradient-dark shadow text-center">
                      <i className="ni ni-mobile-button text-white opacity-10"></i>
                    </div>
                    <div className="d-flex flex-column">
                      <h6 className="mb-1 text-dark text-sm">Diamond</h6>
                      <span className="text-xs">250 Users, <span className="font-weight-bold">346 Accounts</span></span>
                    </div>
                  </div>
                  {/* <div className="d-flex">
                    <button className="btn btn-link btn-icon-only btn-rounded btn-sm text-dark icon-move-right my-auto"><i className="ni ni-bold-right" aria-hidden="true"></i></button>
                  </div> */}
                </li>


                <li className="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
                  <div className="d-flex align-items-center">
                    <div className="icon icon-shape icon-sm me-3 bg-gradient-dark shadow text-center">
                      <i className="ni ni-mobile-button text-white opacity-10"></i>
                    </div>
                    <div className="d-flex flex-column">
                      <h6 className="mb-1 text-dark text-sm">Diamond</h6>
                      <span className="text-xs">250 Users, <span className="font-weight-bold">346 Accounts</span></span>
                    </div>
                  </div>
                  {/* <div className="d-flex">
                    <button className="btn btn-link btn-icon-only btn-rounded btn-sm text-dark icon-move-right my-auto"><i className="ni ni-bold-right" aria-hidden="true"></i></button>
                  </div> */}
                </li>
               
              </ul>
            </div>
          </div>
        </div>
        </div>
      </div>
   
   
  </main>
  
            </>
  
    )
  }

  export default DashboardIndex