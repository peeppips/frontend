import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link,useLocation, useNavigate } from "react-router-dom"
import { RootState } from "../../../store";
import { GetAccountsByUserState, UserLoginState } from "../../../types";
import { logout } from "../../../actions/userActions";
import myLogo from '../../../assets/img/logos/logo.jpg'
const DashboardSidebar = () => {
  const navigate = useNavigate()
  const userLogin = useSelector((state: RootState): UserLoginState => state.userLogin as UserLoginState);  

  const {userInfo } = userLogin;
  useEffect(() => {
    if (userInfo) {
      console.log(userInfo)
    
    }
    else{
    navigate('/')
    }
  }, [userInfo]);

  const location = useLocation();

  const accountByUser = useSelector((state: RootState): GetAccountsByUserState => state.accountByUser as unknown as GetAccountsByUserState);  

  const { accounts } = accountByUser

  const dispatch = useDispatch();
  const logoutHandler = () => {
    console.log('logout');
    dispatch(logout());
    
  };
    return(
      <aside className="sidenav bg-white navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4 " id="sidenav-main">
      <div className="sidenav-header">
        <i className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
        <Link className="navbar-brand m-0" to="/">
          <img src={myLogo} className="navbar-brand-img h-100" alt="main_logo"/>
          <span className="ms-1 font-weight-bold">Peeppips Ltd</span>
        </Link>
      </div>
      <hr className="horizontal dark mt-0"/>
      <div className="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
        <ul className="navbar-nav">
          <li className="nav-item">
          <Link className={location.pathname === "/login" ? "nav-link active" : "nav-link"} to="/login">
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-tv-2 text-primary text-sm opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">Dashboard</span>
            </Link>
          </li>
          {accounts && accounts.length > 0 ? (
            <>
          <li className="nav-item">
            <Link className={location.pathname === "/accounts" ? "nav-link active" : "nav-link"} to="/accounts">
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-calendar-grid-58 text-warning text-sm opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">Accounts</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className={location.pathname === "/projects" ? "nav-link active" : "nav-link"} to="/projects">
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-calendar-grid-58 text-warning text-sm opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">Projects</span>
            </Link>
          </li>


          <li className="nav-item">
            <Link className={location.pathname === "/customers" ? "nav-link active" : "nav-link"} to="/customers">
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-credit-card text-success text-sm opacity-10"></i>
              </div>
              {userInfo && userInfo.isAdmin == true ?  <span className="nav-link-text ms-1">Users</span> :  <span className="nav-link-text ms-1"> My Users</span> }
            </Link>
          </li>

          <li className="nav-item">
            <Link className={location.pathname === "/user_accounts" ? "nav-link active" : "nav-link"} to="/user_accounts">
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-calendar-grid-58 text-warning text-sm opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">User Accounts</span>
            </Link>
          </li>
  
        
     
          <li className="nav-item">
            <Link className={location.pathname === "/profile" ? "nav-link active" : "nav-link"} to="/profile">
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-single-copy-04 text-warning text-sm opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">Profile</span>
            </Link>
          </li>
   {userInfo && userInfo.isAdmin == true ? <>
   
    <li className="nav-item mt-3">
          <h6 className="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">Admin pages</h6>
        </li>

        <li className="nav-item">
            <Link className={location.pathname === "/credits" ? "nav-link active" : "nav-link"} to="/credits">
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-calendar-grid-58 text-warning text-sm opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">Credits</span>
            </Link>
          </li>


        <li className="nav-item">
            <Link className={location.pathname === "/brokers" ? "nav-link active" : "nav-link"} to="/brokers">
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-calendar-grid-58 text-warning text-sm opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">Brokers</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className={location.pathname === "/research" ? "nav-link active" : "nav-link"} to="/research">
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-calendar-grid-58 text-warning text-sm opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">Research</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className={location.pathname === "/bussiness" ? "nav-link active" : "nav-link"} to="/business">
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-calendar-grid-58 text-warning text-sm opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">Bussiness</span>
            </Link>
          </li>
          </>

   : <> </>} </>) : <></> }
        
        <li className="nav-item">
            <Link onClick={logoutHandler} className="nav-link" to={""} >
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-credit-card text-success text-sm opacity-10"></i>
              </div>
               <span className="nav-link-text ms-1">Log Out</span>
            </Link>
          </li>

        </ul>
      </div>
    
    </aside>
    )
}


export default DashboardSidebar