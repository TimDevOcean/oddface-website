import PuffLoader from "react-spinners/PuffLoader";
import "./style.css";

const Loader = () => {

  // const [loading, setLoading] = useState(true);
  // const [color, setColor] = useState("#b00000");

  return (
    <div className="loader">
      <PuffLoader  size={80} /> 
    </div>
  );
}

export default Loader;