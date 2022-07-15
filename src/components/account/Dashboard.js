import React, { useState, useEffect } from 'react';
import commerce from '../../lib/commerce';
import {
    Container,
    Grid,
    LinearProgress,
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

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [msgColor, setMsgColor] = useState('');
    const [visibility, setVisibility] = useState('hide');

    const [customerId, setCustomerId] = useState('');
    const [orders, setOrders] = useState();
    const [dashboard, setDashboard] = useState('');
    const loginToken = window.location.pathname.split("/");

    const [customer, setCustomer] = useState({});

    
    useEffect(() => {
        if (visibility === 'show') {
            setTimeout(()=>setVisibility('hide'), 5000);
        } else {
            console.log("");
        }
}, [visibility]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomer({ ...customer, [name]: value });
    };
    
    const handleMenu = (e) => {
        setDashboard(e.target.name);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        commerce.customer.update({
            email: customer.email,
            firstname: customer.firstname,
            lastname: customer.lastname,
            phone: customer.phone,
          }, customerId)
            .then((updatedCustomer) => {
                console.log(updatedCustomer);
                if (updatedCustomer.id) {
                    setLoading(false);
                    setMsgColor('green');
                    setMessage(`Your account details have been updated successfully.`);
                    setVisibility('show');
                } else {
                    console.log("Customer update error");
                }
            });
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

    const logoutCustomer = () => {
        commerce.customer.logout();
        console.log("Customer logged out");
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
    }, [customerId]);


    
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
                <button onClick={logoutCustomer}><LogoutIcon /> Logout</button>
            </Grid>
        </Grid>
        <Container className='account dashboard'>
          <Paper className="paper" elevation={3}>
            {dashboard === 'myorders' ?
                <Orders orders={orders}/>
            : dashboard === 'myinfo' ?
            <>
                <Info 
                    customer={customer}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                /><br />
                {loading &&
                    <LinearProgress className="linear-loader" sx={{ color:'#b00000',width:'50%' }} color="inherit" />
                }<br />
                <p className={visibility} style={{textAlign:'center',fontSize:'12px', color:`${msgColor}`}}>
                    {message}
                </p>
            </>
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
