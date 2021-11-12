import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import PlaceOrder from "./components/PlaceOrder/PlaceOrder";
import Products from "./components/Products/Products";
import AuthProvider from "./contexts/AuthProvider";
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import {useState , createContext } from 'react';


// create and export context api 
export const CardContext = createContext('card')

function App() {
  // handleClick function from header that helps with load different data on different copononenst 
  const [card, setCard] = useState('home');
   const handleClick = (name) =>{
    setCard(name)
   }
  return (
    <CardContext.Provider value={card}>
    <div className="App">
     <AuthProvider>
     <Router>
        <Navbar handleClick={handleClick}
        >
        </Navbar>
        <Switch>
        <Route exact path="/">
            <Home handleClick={handleClick} 
            ></Home>
          </Route>
          <Route exact path="/home">
            <Home handleClick={handleClick}
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
          <PrivateRoute exact path="/placeOrder/:id">
          <PlaceOrder />
          </PrivateRoute >

        </Switch>
      </Router>
     </AuthProvider>
    </div>
    </CardContext.Provider>
  );
}

export default App;
