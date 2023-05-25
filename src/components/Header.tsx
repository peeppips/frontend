
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container } from 'react-bootstrap'


import { logout } from '../actions/userActions'
import { RootState } from '../store';
import { notification } from 'antd';

const Header = () => {

  const [api] = notification.useNotification();

  const userLogin = useSelector((state: RootState) => state.userLogin);

  const { userInfo } = userLogin;

  const openNotification = () => {
    api.open({
      message: 'LogoOut Successfull',
      description:
        'See You Soon',
      className: 'custom-class',
      style: {
        width: 600,
      },
    });
  };

  const dispatch = useDispatch();
  const logoutHandler = () => {
    console.log('logout');
    dispatch(logout());
    openNotification()
  };

  return (
    <header>
      <Navbar  expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand> peeppips ltd</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
            
           
            
              {userInfo ? (
<>


{/* <LinkContainer to='/profile' className="nav-link bg-opacity-10 rounded-3 text-primary px-3 py-3 py-xl-0">
<Nav.Link>
{userInfo.firstName}
</Nav.Link>
</LinkContainer> */}

<Nav.Link onClick={logoutHandler}>
Log Out
</Nav.Link>

                </>
              ) : (
<>


                <LinkContainer to='/'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Sign In
                  </Nav.Link>
                </LinkContainer>
                </>
              )
           
              }


          
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
