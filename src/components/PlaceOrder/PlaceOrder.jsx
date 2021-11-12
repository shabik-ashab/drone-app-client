import React, {useEffect,useState} from 'react';
import { useParams } from 'react-router';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import axios  from 'axios';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';


const PlaceOrder = () => {
    const {user} = useAuth();
    const {id} = useParams();
    const [orders,setOrders] = useState([]);

    const [orderSucsess,setOrderSucsess] = useState(false)
    const initialInfo = {Name: user.displayName, email: user.email, zip: '',address: '' }
    const [newOrders,setNewOrders] = useState(initialInfo);

    useEffect(() => {
        fetch(`http://localhost:5000/products`)
            .then(res => res.json())
            .then(data => {
                setOrders(data);   
            });
    }, [id]);

    const newOrder = orders.filter(order => order.id === parseInt(id));
    const orderItem = newOrder[0];

    // const handleOrder = (order) => {
    //     const orders = [...newOrders, order];
    //     setNewOrders(orders);
        
    //     delete order._id;
    //     axios.post('http://localhost:5000/orders',order)
    //     .then( res => {
    //         history.push(redirect_uri);  
    //     })   
    // }

    const handleOnBlur = e => {
      const field = e.target.name;
      const value = e.target.value;
      const newInfo = { ...newOrders };
      newInfo[field] = value;
      setNewOrders(newInfo);
  }

  const handleBookingSubmit = e => {
     // collect data
     const orders = {
      ...newOrders,
      serviceName: orderItem.name,
      img: orderItem.img,
      price:orderItem.price
  }
       axios.post('http://localhost:5000/orders',orders)
        .then( res => {
          if (res.data.insertedId) {
            setOrderSucsess(true)
          }
            // history.push(redirect_uri);  
        })  
    e.preventDefault();
  }
    return (
        <div>
             <header className="text-center">
                <h1 className="text-center mt-3  ">Confirm Order</h1>
                <p className="mb-5">{orderItem?.name}</p>
            </header>
            <div className="container">
            <div className="row">
                <div className="col-lg-4 mx-auto">
                  
                    {
                      orderSucsess && <div className="mb-4">
                        <Alert severity="success">Place order sucessfully</Alert>
                        <Link to="/products">
                        <Button>Shop More</Button>
                        </Link>
                      </div>
                    }
                    <form onSubmit={handleBookingSubmit}>
                    <TextField
          required
          id="outlined-required"
          label="Required"
          name="name"
          sx={{ mb: 2 }}
          defaultValue={user.displayName}
        />
        <TextField
            
          id="outlined-required"
          label="Email"
          name="email"
          onBlur={handleOnBlur}
          sx={{ mb: 2 }}
          defaultValue={user.email}
        />
        <TextField
          id="filled-number"
          label="Zip Code"
          type="number"
          onBlur={handleOnBlur}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ mb: 2 }}
          variant="filled"
          name="zip"
        />
        <TextField
          required
          id="outlined-required"
          label="Address"
          sx={{ mb: 2 }}
          defaultValue=""
          name="address"
          onBlur={handleOnBlur}
        />
        <br />
        <Button type="submit" variant="outlined">Submit</Button>
                    </form>
               
                </div>
            </div> 
            </div>
        </div>
    )
}

export default PlaceOrder
