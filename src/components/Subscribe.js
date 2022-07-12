import { Grid } from '@mui/material';
import React from 'react';
import MailchimpSubscribe from "react-mailchimp-subscribe";


const Subscribe = () => {

    const url = "//oddfaceapparel.us12.list-manage.com/subscribe/post?u=2cbb8a35cb22567b7c5d3c2f9&id=62b4a23685";
    const SimpleForm = () => <MailchimpSubscribe url={url}/>

    return (
        <div className='subscribe'>
        <Grid container>
            <Grid item xs={12} md={8} className="s-form">
            <h2>Get the latest updates & offers</h2>
            <h5>Subscribe to our newsletter.</h5>
            <MailchimpSubscribe
                url={url}
                render={({ subscribe, status, message }) => (
                <div>
                    <SimpleForm onSubmitted={formData => subscribe(formData)} />
                    {status === "sending" && <div style={{ color: "white" }}>sending...</div>}
                    {status === "error" && <div style={{ color: "red" }} dangerouslySetInnerHTML={{__html: message}}/>}
                    {status === "success" && <div style={{ color: "green" }}>Subscribed !</div>}
                </div>
                )}
            />
            </Grid>
            <Grid item xs={12} md={4} className="s-img">

            </Grid>
        </Grid>
        </div>
    );
};


export default Subscribe;