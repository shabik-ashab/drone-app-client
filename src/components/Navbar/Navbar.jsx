import * as React from 'react';
import Button from 'react-bootstrap/Button';
import {  NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import logo from '../../image/logo.png'
import { useContext } from 'react';
import { CardContext } from '../../App';

const Navbar = (props) => {
    const {user,logOut} = useAuth();
    // console.log(user);
    // // handleClick function help the state to know page location 
    const {handleClick} = props;
    
    
    return (
    <div className="header">
       <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
      <a class="navbar-brand" href="#"><img src={logo} /></a>
      <ul class="navbar-nav ms-2 me-auto mb-2 mb-lg-0">
        <li class="nav-item">
        <NavLink onClick={() => handleClick('home')} to="/home">Home</NavLink>
        </li>
        <li class="nav-item">
        <NavLink onClick={() => handleClick('products')} to="/products">Products</NavLink>
        </li>
        <li class="nav-item">
        <NavLink to="/contact">Contact</NavLink>
        </li>
        <li class="nav-item">
        
          {
                 user.email?
                ""
                 :
                <NavLink to="/login">login</NavLink>
            }
        </li>
        <li class="nav-item">
        
        </li>
        
      </ul>
      {
                user.displayName?
                <p className="usr">{user.displayName} <img src={user.photoURL} className="w-25 p-2" />
                <Button className="ms-4" onClick={logOut} variant="outline-danger">Logout</Button>
                </p>
                  :
                  ""
            }
    </div>
  </div>
</nav>
  
     </div>
    )
}

export default Navbar