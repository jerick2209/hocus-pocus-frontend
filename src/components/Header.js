import { Outlet, NavLink, Link, useLocation } from "react-router-dom";
import image_logo from "../assets/hocus-pocus-logo.png"
import { isAuthenticated, getUsername, clearJWT } from "./auth/auth-helper";

const Header = () => {

  const location = useLocation();
  
  const signoutClick = () => {
    clearJWT();
  }


  return (
    <>
      {/* -- Main Nav bar  -- */}
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
        <div className="container-fluid">
          {/* -- Brand/logo -- */}
          <NavLink className="navbar-brand" to="#">
            <img src={image_logo} alt="logo" style={{ width: 40 }} />
          </NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            {/* !-- Links -- */}
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  <i className="fas fa-home"></i> Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link className='nav-link dropdown-toggle' to="#" role="button" data-bs-toggle="dropdown">
                  <i className="fa-solid fa-barcode"></i> Advertisements
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink className="dropdown-item" to="/inventory/list">
                      <i className="fa-regular fa-rectangle-list"></i> Active Ads
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/inventory/add">
                      <i className="fa-solid fa-square-plus"></i> Post an Ad
                    </NavLink>
                  </li>
                </ul>
              </li >
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  <i className="fas fa-home"></i> About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/users">
                  <i className="fas fa-user"></i> Users
                </NavLink>
              </li >
              {!isAuthenticated() &&
                <li className="nav-item">
                  <NavLink className="nav-link" to="/users">
                    <i className="fa-solid fa-right-to-bracket"></i> Register
                  </NavLink>
                </li>
              }
              <li className="nav-item">
                {!isAuthenticated() &&
                  <NavLink className="nav-link" to="/auth/signin">
                    <i className="fa-solid fa-right-to-bracket"></i> Login
                  </NavLink>}
                {isAuthenticated() &&
                  <Link className="nav-link" to="/auth/signout" onClick={signoutClick}>
                    <i className="fa-solid fa-right-from-bracket"></i> Sign-out ({getUsername()})
                  </Link>}
              </li>
            </ul >
          </div>
        </div>
      </nav >

      <Outlet />
    </>
  )
};

export default Header;

