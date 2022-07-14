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

export const Dashboard = () => {

    const [customerId, setCustomerId] = useState('');
    const [orders, setOrders] = useState();
    const [dashboard, setDashboard] = useState('');

    const handleMenu = (e) => {
        setDashboard(e.target.name);
    }

    const getLoginToken = (token) => {
        commerce.customer.getToken(token).then((jwt) => setCustomerId(jwt.customer_id));
    }
    
    useEffect(() => {
            const loginToken = window.location.pathname.split("/");
            getLoginToken(loginToken[2]);
            getOrders();
            // eslint-disable-next-line 
    }, []);

    const getOrders = () => {
        commerce.customer.getOrders(customerId).then((orders) => setOrders(orders.data));
    }

    
  return (
    <div className='app-container'>
        <main>
        <Grid container className='account-menu'>
            <Grid item md={4}>
                <button name='myorders' onClick={handleMenu}><BusinessCenterIcon /> My Orders</button>
            </Grid>
            <Grid sx={{borderLeft:'1px solid #dadada',borderRight:'1px solid #dadada'}} item md={4}>
                <button name='myinfo' onClick={handleMenu}><EditIcon /> My Info</button>
            </Grid>
            <Grid item md={4}>
                <button name='logout' onClick={handleMenu}><LogoutIcon /> Logout</button>
            </Grid>
        </Grid>
        <Container className='account dashboard'>
          <Paper className="paper" elevation={3}>
            {dashboard === 'myorders' ?
                <Orders orders={orders}/>
            : <p>Login</p>
            }
          </Paper>
        </Container>       
        </main>
    </div>
  )
}

export default Dashboard;
