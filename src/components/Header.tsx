
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import {  Nav } from 'react-bootstrap'


import { logout } from '../actions/userActions'
import { RootState } from '../store';
// import { notification } from 'antd';
import { Link } from 'react-router-dom';

const Header = () => {

  // const [api] = notification.useNotification();

  const userLogin = useSelector((state: RootState) => state.userLogin);

  const { userInfo } = userLogin;



  const dispatch = useDispatch();
  const logoutHandler = () => {
    console.log('logout');
    dispatch(logout());
    
  };

  return (

    <nav className="navbar navbar-expand-lg blur border-radius-lg top-0 z-index-3 position-absolute py-2 start-0 end-0 " style={{boxShadow: "none"}}>
    <div className="container-fluid">
      <Link className="navbar-brand font-weight-bolder ms-lg-0 ms-3 " to="/">
        PEEPPIPS LTD
      </Link>
      <button className="navbar-toggler shadow-none ms-2" type="button" data-bs-toggle="collapse" data-bs-target="#navigation" aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon mt-2">
          <span className="navbar-toggler-bar bar1"></span>
          <span className="navbar-toggler-bar bar2"></span>
          <span className="navbar-toggler-bar bar3"></span>
        </span>
      </button>
      <div className="collapse navbar-collapse" id="navigation">
        <ul className="navbar-nav mx-auto">
        
          <>
           {userInfo ? (<></>):(
            <>
 <li className="nav-item">
                 <LinkContainer className="nav-link me-2" to='/'>
                   <Nav.Link>
                     <i className='fas fa-user'></i> Sign In
                   </Nav.Link>
                </LinkContainer>
                </li>
                <li className="nav-item">
                <LinkContainer to='/register' className="nav-link me-2">
                   <Nav.Link>
                     <i className='fas fa-user'></i> Sign Up
                   </Nav.Link>
                </LinkContainer>
                </li>
                </>
                )}</>


       
        </ul>
        <ul className="navbar-nav d-lg-block d-none">
          
        {userInfo ? (
          <li className="nav-item">
           <Nav.Link onClick={logoutHandler}>
            Log Out
            </Nav.Link>
          </li>
        ):<></>}
        </ul>
      </div>
    </div>
  </nav>

//     <header>
//       <Navbar  expand='lg' collapseOnSelect>
//         <Container>
//           <LinkContainer to='/'>
//             <Navbar.Brand> peeppips ltd</Navbar.Brand>
//           </LinkContainer>
//           <Navbar.Toggle aria-controls='basic-navbar-nav' />
//           <Navbar.Collapse id='basic-navbar-nav'>
//             <Nav className='ml-auto'>
            
           
            
//               {userInfo ? (
// <>


// {/* <LinkContainer to='/profile' className="nav-link bg-opacity-10 rounded-3 text-primary px-3 py-3 py-xl-0">
// <Nav.Link>
// {userInfo.firstName}
// </Nav.Link>
// </LinkContainer> */}

// <Nav.Link onClick={logoutHandler}>
// Log Out
// </Nav.Link>

//                 </>
//               ) : (
// <>


//                 <LinkContainer to='/'>
//                   <Nav.Link>
//                     <i className='fas fa-user'></i> Sign In
//                   </Nav.Link>
//                 </LinkContainer>
//                 </>
//               )
           
//               }


          
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//     </header>
  )
}

export default Header
