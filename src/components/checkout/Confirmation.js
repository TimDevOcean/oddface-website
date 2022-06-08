import { Link } from "react-router-dom";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const Confirmation = ({ orderInfo, orderError }) => {
  if (orderError) {
    return (
      <div className="confirmation">
        <p>Error: {orderError}</p>
        <Link to="/">
          Back to Home
        </Link>
      </div>
    );
  }
  return (
    <div className="confirmation">
      <p>
        Thank you for your purchase!
      </p>
      <div><CheckCircleOutlineIcon color="success" fontSize="inherit" className="success-icon"/></div>
      <div className="actions">
        <Link to="/">
            Back to Home
        </Link>
        <Link to="/shop">
          Continue shopping
        </Link>
      </div>
    </div>
  );
};

export default Confirmation;