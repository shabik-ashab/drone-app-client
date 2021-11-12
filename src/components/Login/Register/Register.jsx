import {
  TextField,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Link, useLocation, useHistory, NavLink } from "react-router-dom";
import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import img from "../../../image/login.jpg";

const Register = () => {
  const [loginData, setLoginData] = useState({});
  const location = useLocation();
  const history = useHistory();
  const redirect_uri = location.state?.from || "/";

  const { signInUsingGoogle,registerUser,isLoading  } = useAuth();

  const handleGoogleLogin = () => {
    signInUsingGoogle().then((result) => {
      history.push(redirect_uri);
    });
  };
  const handleLoginSubmit = (e) => {
    if (loginData.password !== loginData.password2) {
        alert('Your password did not match');
        return
    }
    registerUser(loginData.email, loginData.password,loginData.name);
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
        <h1 className="text-center mt-3  mb-5">Register</h1>
      </header>
      <div class="container">
        <div class="row">
          <div className="col-lg-6 col-md-12">
            { !isLoading && <form onSubmit={handleLoginSubmit} className="ms-5 mt-5">
            <TextField
            className="mb-3 mt-5"
                            sx={{ width: '65%' }}
                            id="standard-basic"
                            label="Your Name"
                            name="name"
                            
                            variant="standard" />

              <TextField
                className="mb-3"
                sx={{ width: "65%" }}
                id="standard-basic"
                label="Your Email"
                name="email"
                onChange={handleOnChange}
                variant="standard"
              />
              <TextField
                className="mb-3"
                sx={{ width: "65%" }}
                id="standard-basic"
                label="Your Password"
                type="password"
                name="password"
                onChange={handleOnChange}
                variant="standard"
              />
               <TextField
                className="mb-3"
                sx={{ width: "65%" }}
                id="standard-basic"
                label="Confirm Password"
                type="password"
                name="password2"
                onChange={handleOnChange}
                variant="standard"
              />
              <Button
                sx={{ width: "65%" }}
                type="submit"
                className="mb-3 mt-2"
                variant="contained"
              >
                Register
              </Button>
              <NavLink style={{ textDecoration: "none" }} to="/login">
                <Button variant="text">Already Registered? Please Login</Button>
              </NavLink>
            </form>

            }
            {isLoading && <CircularProgress />}
          </div>
          <div className="col-lg-6 col-md-12">
            <img src={img} className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
