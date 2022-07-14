import React, { useState, useEffect } from 'react';
import commerce from '../../lib/commerce';
import {
    Container,
    Grid,
    Paper,
} from "@mui/material";
import "./style.css";
import EditIcon from '@mui/icons-material/Edit';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LogoutIcon from '@mui/icons-material/Logout';
import Orders from './Orders';
import Info from './Info';
import Login from './Login';

export const Dashboard = () => {

    const [customerId, setCustomerId] = useState('');
    const [orders, setOrders] = useState();
    const [dashboard, setDashboard] = useState('');
    const loginToken = window.location.pathname.split("/");

    const [customer, setCustomer] = useState({});
    
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomer({ ...customer, [name]: value });
        console.log(customer);
    };
    

    const handleMenu = (e) => {
        setDashboard(e.target.name);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        commerce.customer.update({
            email: customer.email,
            firstname: customer.firstname,
            lastname: customer.lastname,
            phone: customer.phone,
          }, customerId)
            .then((Updatedcustomer) => console.log(Updatedcustomer));
    }

    const getLoginToken = (token) => {
        commerce.customer.getToken(token)
        .then((jwt) => setCustomerId(jwt.customer_id))
        .catch(err => console.log(err.message));
    }

    const getOrders = () => {
        commerce.customer.getOrders(customerId)
        .then((orders) => setOrders(orders.data))
        .catch(err => console.log(err.message));
    }

    const getCustomer = () => {
        commerce.customer.about().then((customer) => setCustomer(customer));
    }
    
    useEffect(() => {
        getLoginToken(loginToken[2]);
        if (commerce.customer.isLoggedIn() === true) {
            getOrders();
            getCustomer();
        } else {
            console.log("Customer not logged in.");
        }
        // eslint-disable-next-line 
    }, []);
    
  return (
    <div className='app-container'>
        {commerce.customer.isLoggedIn() === true ?
        <main>
        <Grid container className='account-menu'>
            <Grid item md={4}>
                <button name='myorders' onClick={handleMenu}><BusinessCenterIcon /> My Orders</button>
            </Grid>
            <Grid sx={{borderLeft:'1px solid #dadada',borderRight:'1px solid #dadada'}} item md={4}>
                <button name='myinfo' onClick={handleMenu}><EditIcon /> My Info</button>
            </Grid>
            <Grid item md={4}>
                <button onClick={()=> {commerce.customer.logout();}}><LogoutIcon /> Logout</button>
            </Grid>
        </Grid>
        <Container className='account dashboard'>
          <Paper className="paper" elevation={3}>
            {dashboard === 'myorders' ?
                <Orders orders={orders}/>
            : dashboard === 'myinfo' ?
                <Info 
                    customer={customer}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                />
            : <p style={{textAlign:'center'}}>Welcome {customer.firstname}</p>
            }
          </Paper>
        </Container>  
        </main>
        : 
        <Container className='account'>
            <p style={{textAlign:'center'}}>It appears you're not logged in, please do so below.</p>
            <Login />
        </Container>  
        }     
    </div>
  )
}

export default Dashboard;
