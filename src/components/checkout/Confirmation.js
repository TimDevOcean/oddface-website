import { Link } from "react-router-dom";

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
      <Link to="/shop">
        Continue shopping
      </Link>
      &nbsp; &nbsp; &nbsp;
      <Link to="/">
          Back to Home
        </Link>
    </div>
  );
};

export default Confirmation;