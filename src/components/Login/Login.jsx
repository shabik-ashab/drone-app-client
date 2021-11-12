
import {
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Link, useLocation, useHistory, NavLink} from "react-router-dom";
import React, { useState } from 'react';
import useAuth from "../../hooks/useAuth";
import img from "../../image/login.jpg";

const Login = () => {
  const [loginData, setLoginData] = useState({});
  const location = useLocation();
  const history = useHistory();
  const redirect_uri = location.state?.from || "/";

  const { signInUsingGoogle } = useAuth();

  const handleGoogleLogin = () => {
    signInUsingGoogle().then((result) => {
      history.push(redirect_uri);
    });
  };
  const handleLoginSubmit = (e) => {
    // loginUser(loginData.email, loginData.password, location, history);
    e.preventDefault();
  };
  const handleOnChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newLoginData = { ...loginData };
    newLoginData[field] = value;
    setLoginData(newLoginData);
  };
  return (
    <div>
      <header>
        <h1 className="text-center mt-3  mb-5">Login</h1>
      </header>
      <div class="container">
        <div class="row">
          <div className="col-lg-6 col-md-12">
            <form onSubmit={handleLoginSubmit} className="ms-5 mt-5">
              <TextField
                className="mb-3 mt-5"
                sx={{ width: "65%",  }}
                id="standard-basic"
                label="Your Email"
                name="email"
                onChange={handleOnChange}
                variant="standard"
              />
              <TextField
                className="mb-3"
                sx={{ width: "65%",  }}
                id="standard-basic"
                label="Your Password"
                type="password"
                name="password"
                onChange={handleOnChange}
                variant="standard"
              />
              <Button sx={{ width: '65%' }} type="submit" className="mb-3 mt-2"variant="contained">Login</Button>
              <NavLink
                            style={{ textDecoration: 'none'}}
                            to="/register">
                            <Button variant="text">New User? Please Register</Button>
                        </NavLink>
            </form>
          </div>
          <div className="col-lg-6 col-md-12">
            <img src={img} className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
