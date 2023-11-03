import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Loading from "../../../Components/Loading/Loading";
import { useNavigate } from "react-router-dom";
import { USER } from "../../../services/API/Permisions";
import { Axios } from "../../../services/API/Axios";

function UserDetials() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  // Error
  const [err, setErr] = useState("");
  //Loading
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Handel Form Change
  const handelChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  async function handelSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await Axios.post(`${USER}/add`, form);
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

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          name="password"
          type="password"
          value={form.password}
          required
          minLength="6"
          onChange={handelChange}
          placeholder="Enter Your Password"
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
          <option value="1999">Product Manager</option>
        </Form.Select>
      </Form.Group>

      <Button
        disabled={
          form.name.length > 1 &&
          form.password.length >= 6 &&
          form.email.length > 1 &&
          form.role !== ""
            ? false
            : true
        }
        variant="primary"
        type="submit"
      >
        {loading ? <Loading /> : "Add User"}
      </Button>

      {err && <span className="err">{err}</span>}
    </Form>
  );
}

export default UserDetials;
