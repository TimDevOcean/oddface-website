import React from 'react';
import Alert from '@mui/material/Alert';

 const Alerter = (props) => {

  const handleAlertClose = () => {
    var element = document.getElementById("alerter");
    element.classList.remove("show");
  }


  return (
    <div id="alerter" className="" >
      <Alert 
        severity={`${props.type}`} 
        onClose={() => handleAlertClose()}
      >{`${props.message}`}
      </Alert>
    </div>
  );
}

export default  Alerter;