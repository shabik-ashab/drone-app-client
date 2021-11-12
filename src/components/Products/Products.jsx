import React, {useEffect,useState} from 'react';
import Button from '@mui/material/Button';
import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { CardContext } from '../../App';

const Products = (props) => {
    // // handleClick function help the state to know page location 
    const {handleClick} = props;
    const [products, setProducts] = useState([]);
    
    // getting the value of card with context api 
    // card help us to know the current page 
    const card = useContext(CardContext);

    useEffect(() => {
        fetch(`http://localhost:5000/products`)
            .then(res => res.json())
            .then(data => {
                setProducts(data);   
            });
    }, [card]);
    let mystyle = {
        display: "none"
      };
    // we will show cards in home page  
    if(card === 'home'){
        products.length = 6;
        mystyle = {
            display: "block"
          };
    }
     
    return (
        <div>
            <header>
                <h1 className="text-center mt-3  mb-5">Products</h1>
            </header>
            <div className="container">
            <div className="row row-cols-1 row-cols-md-2 g-4 mb-5">
                  {
                      products.map(product => 
                        <div className="col-lg-4 g-4">
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
                  <NavLink onClick={() => handleClick('products')}  to="/products">Explore more...</NavLink>
                  </div>
              </div>
            </div>
        </div>
    )
}

export default Products
