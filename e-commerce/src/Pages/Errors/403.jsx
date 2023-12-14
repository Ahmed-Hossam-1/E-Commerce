import { Link } from "react-router-dom";
import "../../CSS/pages/403.css";

const Forbidden = ({ role }) => {
  return (
    <>
      <div className="not-access">
        <h1>403 - ACCESS DENIED</h1>
        <Link
          to={role === "1996" ? "/dashboard/writer" : role === 2001 && "/"}
          className="btn btn-primary"
        >
          GO BACK
        </Link>
      </div>
    </>
  );
};

export default Forbidden;
