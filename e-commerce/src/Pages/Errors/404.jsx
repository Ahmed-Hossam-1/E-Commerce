import { Link } from "react-router-dom";
import "../../CSS/pages/403.css";

const NotFound = () => {
  return (
    <>
      <div className="not-access">
        <h1>404 - Not Found :(</h1>
        <Link to="/" className="btn btn-primary">
          GO BACK
        </Link>
      </div>
    </>
  );
};

export default NotFound;
