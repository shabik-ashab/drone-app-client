import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import PlaceOrder from "./components/PlaceOrder/PlaceOrder";
import Products from "./components/Products/Products";
import AuthProvider from "./contexts/AuthProvider";
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import {useState , createContext } from 'react';
import Register from "./components/Login/Register/Register";
import Dashboard from "./components/Dashboard/Dashboard";


function App() {
 
  return (
    <div className="App">
     <AuthProvider>
     <Router>

        <Switch>
        <Route exact path="/">
            <Home
            ></Home>
          </Route>
          <Route exact path="/home">
            <Home
            ></Home>
          </Route>
          <Route exact path="/products">
            <Products 
            >
            </Products>
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <PrivateRoute path="/dashboard">
            <Dashboard  
            ></Dashboard>
          </PrivateRoute>
          <PrivateRoute exact path="/placeOrder/:id">
          <PlaceOrder 
          >

          </PlaceOrder>
          </PrivateRoute >

        </Switch>
      </Router>
     </AuthProvider>
    </div>
  );
}

export default App;
