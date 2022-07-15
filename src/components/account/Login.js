import React, { useState } from 'react';
import commerce from '../../lib/commerce';
import {
    Grid,
    TextField,
    Container,
    Paper,
    LinearProgress,
} from "@mui/material";
import "./style.css";

export const Login = () => {

const [customer, setCustomer] = useState({
    email:"",
    firstname:"",
    lastname:"",
    phone:"",
});
const [isNew, setIsNew] = useState(false);
const [loading, setLoading] = useState(false);
const [message, setMessage] = useState('');
const [msgColor, setMsgColor] = useState('');
const [visibility, setVisibility] = useState('hide');

  const loginCustomer = () => {
    commerce.customer.login(customer.email, 'http://192.168.0.102:3000/account')
    .then((token) => {
        console.log(token);
        if (token.success) {
            setLoading(false);
            setMsgColor('green');
            setMessage(`Success! Please check your email for the link.`);
            setVisibility('show');
        } else {
            console.log('pending..');
        }
    })
    .catch((err) => {
        console.log(err);
        setLoading(false);
        setMsgColor('red');
        setMessage(err.data.error.errors.email);
        setVisibility('show');
    });
  }

  const signupCustomer = () => {
    setLoading(true);
    const url = new URL(
        "https://api.chec.io/v1/customers"
    );

    const key = process.env.REACT_APP_CHEC_SECRET_KEY;
    
    let headers = {
        "X-Authorization": key,
        "Content-Type": "application/json",
        "Accept": "application/json",
    };
    
    let customerInfo = {
        "email": customer.email,
        "phone": customer.phone,
        "firstname": customer.firstname,
        "lastname": customer.lastname
    }
    let body = JSON.stringify(customerInfo);
    fetch(url, {
        method: "POST",
        headers: headers,
        body: body
    })
        .then(response =>  response.json())
        .then(json => {
            console.log(json);
            if (json.id){
                loginCustomer();
                setLoading(false);
                setMsgColor('green');
                setMessage(`Account created successfully, please check your email for the link.`);
                setVisibility('show');
            } else {
                setLoading(false);
                setMsgColor('red');
                setMessage(json.error.errors.email);
                setVisibility('show');            
            }
        })
        .catch((err)=> {
            console.log("err " + err);
            setLoading(false);
            setMsgColor('red');
            setMessage(err.message);
            setVisibility('show');        
        });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (e.target.name === 'login') {
        loginCustomer();
    } else if (e.target.name === 'signup') {
        signupCustomer();
    } else {
        console.log('error');
        console.log(e.target);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({
        ...customer,
        [name]:value,
    });
  };
    
  return (
    <div className='app-container'>
        {!isNew ? 
        <main>
        <Container className='account'>
          <Paper className="paper" elevation={3}>
            <p style={{textAlign:'center',fontSize:'12px'}}>
                Please enter your email address to receive a one-click login email.
            </p>
            <form name="login" className="login-form" onSubmit={handleSubmit} autoComplete="off">
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={12}>
                        <TextField
                        variant="standard"
                        required
                        fullWidth
                        id="email"
                        name="email"
                        label="Email"
                        value={customer.email || ''}
                        onChange={handleChange}
                        />
                    </Grid>
                </Grid><br/>
                {loading &&
                <LinearProgress className="linear-loader" sx={{ color:'#b00000',width:'50%' }} color="inherit" />
                }<br />
                <button onSubmit={(e) => handleSubmit} className='product-view-cart-btn'>
                    Login
                </button><br />
                <p className={visibility} style={{textAlign:'center',fontSize:'12px', color:`${msgColor}`}}>
                {message}
                </p>
            </form> 
            <button onClick={()=>setIsNew(true)} className='text-link'>Sign Up</button>
          </Paper>
        </Container>       
        </main>

        :
        
        <main>
        <Container className='account'>
          <Paper className="paper" elevation={3}>
            <p style={{textAlign:'center',fontSize:'12px'}}>
                You'll receive a one-click login email after signing up.
            </p>
            <form name="signup" className="login-form" onSubmit={handleSubmit} autoComplete="off">
                <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={6}>
                        <TextField
                        variant="standard"
                        required
                        fullWidth
                        id="firstname"
                        name="firstname"
                        label="First Name"
                        value={customer.firstname || ''}
                        onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                        <TextField
                        variant="standard"
                        required
                        fullWidth
                        id="lastname"
                        name="lastname"
                        label="Last Name"
                        value={customer.lastname || ''}
                        onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                        <TextField
                        variant="standard"
                        required
                        fullWidth
                        id="email"
                        name="email"
                        label="Email"
                        value={customer.email || ''}
                        onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                        <TextField
                        variant="standard"
                        fullWidth
                        id="phone"
                        name="phone"
                        label="Phone (Int.)"
                        value={customer.phone || ''}
                        onChange={handleChange}
                        />
                    </Grid>

                </Grid><br/>
                {loading &&
                <LinearProgress className="linear-loader" sx={{ color:'#b00000',width:'50%' }} color="inherit" />
                }<br />
                <button onSubmit={(e) => handleSubmit} className='product-view-cart-btn'>
                    Sign Up
                </button><br />
                <p className={visibility} style={{textAlign:'center',fontSize:'12px', color:`${msgColor}`}}>
                {message}
                </p>
            </form> 
            <button onClick={()=>setIsNew(false)} className='text-link'>Sign In</button>
          </Paper>
        </Container>       
        </main>
        }
    </div>
  )
}

export default Login;
