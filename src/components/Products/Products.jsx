import React, {useEffect,useState} from 'react';
import Button from '@mui/material/Button';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { CardContext } from '../../App';
import Navbar from '../Navbar/Navbar';

const Products = () => {
    const [products, setProducts] = useState([]);
    const location = useLocation();


    useEffect(() => {
        fetch(`http://localhost:5000/products`)
            .then(res => res.json())
            .then(data => {
                setProducts(data);   
            });
    }, []);
    // we will show cards in home page 
    let navStyle = {
        display: "none"
      }; 
      let mystyle = {
          display: "block"
      }
      if(location.pathname === '/products'){
        navStyle = {
            display: "block"
          };
          mystyle = {
            display: "none"
        }
        products.length = products.length;
        }
    if(location.pathname === '/home'){
        navStyle = {
            display: "none"
          };
          mystyle = {
            display: "block"
        }
    products.length = 6;
    }
    if(location.pathname === '/'){
        navStyle = {
            display: "none"
          };
          mystyle = {
            display: "block"
        }
    products.length = 6;
    }
   
    return (
        <div>
            {/* {
                navbar && 
                <Navbar
        >
        </Navbar>
            } */}
            <div style={navStyle}>
                <Navbar />
            </div>
            <header>
                <h1 className="text-center mt-3  mb-5">Products</h1>
            </header>
            <div className="container">
            <div className="row row-cols-1 row-cols-md-2 g-4 mb-5">
                  {
                      products.map(product => 
                        <div key={product.id}
                         className="col-lg-4 g-4">
                            <div class="card my-card h-100">
                              <img src={product.img} class="img-fluid p-2" alt="..." />
                              <div class="card-body ms-2">
                                  {/* <p>{product.type}</p> */}
                                 <h5 class="card-title">{product.name}</h5>
                                 <p class="card-text"><span className="text-primary">Camera: </span>{product.camera}</p>
                                 <p class="card-text"><span className="text-primary">Flight Time: </span>{product.time}</p>
                                 <p class="card-text"><span className="text-primary">Price: </span>{product.price}$</p>
                                 <Link to={`PlaceOrder/${product.id}`}>
                                 <Button variant="outlined">Purchase</Button>
                                 </Link>
                              </div>
                              </div>
                        </div>
                        )
                  }
                  <div style={mystyle}>
                  <NavLink  to="/products">Explore more...</NavLink>
                  </div>
              </div>
            </div>
        </div>
    )
}

export default Products
