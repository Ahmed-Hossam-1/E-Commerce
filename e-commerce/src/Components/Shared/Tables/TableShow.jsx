import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const TableShow = (props) => {
  // Defalut Value currentUser
  const currentUser = props.currentUser?.name || false;
  const headerShow = props.header.map((head, index) => (
    <th key={index}>{head.name}</th>
  ));
  const dataShow = props.data.map((item, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      {props.header.map((head, key) => (
        <td key={key}>
          {head.type === "image" ? (
            <img src={item[head.type]} alt="Err" width="80px" height="80px" />
          ) : item[head.type] === "1995" ? (
            "Admin"
          ) : item[head.type] === "2001" ? (
            "User"
          ) : item[head.type] === "1999" ? (
            "PM"
          ) : item[head.type] === "1996" ? (
            "Writer"
          ) : (
            item[head.type]
          )}
          {item[head.type] === currentUser && " (You)"}
        </td>
      ))}
      {/* Action Colum */}
      <td>
        <div className="d-flex align-items-center justify-content-center gap-2">
          <Link to={`${item.id}`}>
            <FontAwesomeIcon
              fontSize={"19px"}
              color="#0e729a"
              icon={faPenToSquare}
            />
          </Link>
          {currentUser !== item.name && (
            <FontAwesomeIcon
              onClick={() => props.delete(item.id)}
              cursor={"pointer"}
              fontSize={"19px"}
              color="red"
              icon={faTrash}
            />
          )}
        </div>
      </td>
    </tr>
  ));

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>id</th>
          {headerShow}
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {props.data.length === 0 && (
          <tr style={{ textAlign: "center" }}>
            <td colSpan={12}>LAODING...</td>
          </tr>
        )}
        {dataShow}
      </tbody>
    </Table>
  );
};

export default TableShow;
