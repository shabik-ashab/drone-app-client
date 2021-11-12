import React, {useEffect,useState} from 'react';
import { useParams } from 'react-router';
import { Link, useLocation, useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import axios  from 'axios';
import useAuth from '../../hooks/useAuth';

const ariaLabel = { 'aria-label': 'description' };

const PlaceOrder = () => {
    const {id} = useParams();
    const [orders,setOrders] = useState([]);
    const [newOrders,setNewOrders] = useState([]);

    const {user} = useAuth();

    const location = useLocation();
    const history = useHistory();
    const redirect_uri = location.state?.from || '/';

    useEffect(() => {
        fetch(`http://localhost:5000/products`)
            .then(res => res.json())
            .then(data => {
                setOrders(data);   
            });
    }, [id]);

    const newOrder = orders.filter(order => order.id === parseInt(id));
    const orderItem = newOrder[0];

    const handleOrder = (order) => {
        const orders = [...newOrders, order];
        setNewOrders(orders);
        
        delete order._id;
        axios.post('http://localhost:5000/orders',order)
        .then( res => {
            history.push(redirect_uri);  
        })   
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
                    <form>
                    <TextField
          required
          id="outlined-required"
          label="Required"
          sx={{ mb: 2 }}
          defaultValue={user.displayName}
        />
        <TextField
            
          id="outlined-required"
          label="Email"
          sx={{ mb: 2 }}
          defaultValue={user.email}
        />
        <TextField
          id="filled-number"
          label="Zip Code"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ mb: 2 }}
          variant="filled"
        />
        <TextField
          required
          id="outlined-required"
          label="Address"
          sx={{ mb: 2 }}
          defaultValue=""
        />
                    </form>
                <Button onClick={() => handleOrder(orderItem)} variant="outlined">Confirm</Button>
                </div>
            </div> 
            </div>
        </div>
    )
}

export default PlaceOrder
