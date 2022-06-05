import { CircularProgress } from "@mui/material";
import "./style.css";

const Loader = () => (
  <div className="spinner">
    <CircularProgress />
  </div>
);

export default Loader;