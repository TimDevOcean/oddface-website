import React from 'react';
import { Alert, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

 const Alerter = (props) => {

  const handleAlertClose = () => {
    var element = document.getElementById("alerter");
    element.classList.remove("show");
  }

  

  const action = (
    <React.Fragment>
      <Button color="inherit" size="small" onClick={props.onClick}>
      {props.btnText} 
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleAlertClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div id="alerter" className="" >
      <Alert 
        severity={`${props.type}`} 
        onClose={() => handleAlertClose()}
        action={action}
      >
        {`${props.message}`}
      </Alert>
    </div>
  );
}

export default  Alerter;