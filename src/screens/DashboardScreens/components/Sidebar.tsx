import { Link } from "react-router-dom"

const DashboardSidebar = () => {

    return(
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
            <Link className="nav-link " to="/brokers">
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-calendar-grid-58 text-warning text-sm opacity-10"></i>
              </div>
              <span className="nav-link-text ms-1">Brokers</span>
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
    )
}


export default DashboardSidebar