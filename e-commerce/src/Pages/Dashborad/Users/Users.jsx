import { useEffect, useState } from "react";
import TableShow from "../../../Components/Shared/Tables/TableShow";
import { USER, USERS } from "../../../utils/API/Permisions";
import { Axios } from "../../../utils/API/Axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");

  // Get Current User
  useEffect(() => {
    Axios.get(`${USER}`).then((res) => setCurrentUser(res.data));
  }, []);

  // Get All Users
  useEffect(() => {
    Axios.get(`${USERS}`)
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Delete User
  async function handelDelete(usersID) {
    if (currentUser.id !== usersID) {
      try {
        const res = await Axios.delete(`${USER}/${usersID}`);
        setUsers((prev) => prev.filter((item) => item.id !== usersID));
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("You can't delete yourself.");
    }
  }

  const headers = [
    { name: "Name", type: "name" },
    { name: "Email", type: "email" },
    { name: "Role", type: "role" },
  ];

  return (
    <div className="bg-white w-100 p-2">
      <div className="d-flex align-items-center justify-content-between">
        <h1 className="mb-4 mt-2">Users Page</h1>
      </div>
      <TableShow
        header={headers}
        data={users}
        delete={handelDelete}
        currentUser={currentUser}
      />
    </div>
  );
};

export default Users;
