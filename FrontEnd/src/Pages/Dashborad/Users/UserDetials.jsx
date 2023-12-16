import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Loading from "../../../Components/Shared/Loading/Loading";
import FullLaoding from "../../../Components/Shared/Loading/FullLaoding";
import { useNavigate, useParams } from "react-router-dom";
import { USER } from "../../../utils/API/Permisions";
import { Axios } from "../../../utils/API/Axios";

function UserDetials() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
  });
  // Error
  const [err, setErr] = useState("");
  //Loading
  const [Fullloading, setFullLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(true);

  const navigate = useNavigate();
  // User ID
  const { usersID } = useParams();
  // Fetch User
  useEffect(() => {
    setFullLoading(true);
    Axios.get(`${USER}/${usersID}`)
      .then((res) => {
        setForm(res.data);
        setFullLoading(false);
      })
      .then(() => setDisable(false))
      .catch((err) => navigate("/dashboard/users/page/404"), { replace: true });
  }, []);
  // Handel Form Change
  const handelChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  async function handelSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await Axios.post(`${USER}/edit/${usersID}`, form);
      setLoading(false);
      navigate("/dashboard/users", { replace: true });
    } catch (err) {
      setLoading(false);
      if (err.response.status === 422) {
        setErr("Email is already been Taken");
      } else {
        setErr("Internal Server Error");
      }
    }
  }
  return (
    <>
      {Fullloading ? (
        <FullLaoding />
      ) : (
        <Form className="bg-white w-100 p-3" onSubmit={handelSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name="email"
              value={form.email}
              required
              onChange={handelChange}
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              name="name"
              value={form.name}
              required
              onChange={handelChange}
              type="text"
              placeholder="User Name"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicRole">
            <Form.Label>Role</Form.Label>
            <Form.Select name="role" value={form.role} onChange={handelChange}>
              <option disabled value="">
                Select Role
              </option>
              <option value="1995">Admin</option>
              <option value="2001">User</option>
              <option value="1996">Writer</option>
            </Form.Select>
          </Form.Group>

          <Button disabled={disable} variant="primary" type="submit">
            {loading ? <Loading /> : "Update"}
          </Button>

          {err && <span className="err">{err}</span>}
        </Form>
      )}
    </>
  );
}

export default UserDetials;
