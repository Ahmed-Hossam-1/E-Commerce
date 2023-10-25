import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { REGISTER, baseURL } from "../../API/Api";
import Loading from "../../Components/Loading/Loading";
import Cookie from "cookie-universal";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  //cookies
  const cookie = Cookie();
  //Loading
  const [loading, setLoading] = useState(false);
  // Error
  const [err, setErr] = useState("");

  // Handel Form Change
  const handelChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handel Foucs Input
  let foucs = useRef(null);
  useEffect(() => {
    foucs.current.focus();
  }, []);

  async function handelSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${baseURL}/${REGISTER}`, form);
      setLoading(false);
      const token = res.data.token;
      cookie.set("Bearer", token);
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
      <div className="container">
        <div className="row">
          <Form className="e-form" onSubmit={handelSubmit}>
            <div className="custom-form">
              <h1 className="head">Register Now</h1>
              <Form.Group className="form-gro" controlId="formBasicName">
                <Form.Control
                  name="name"
                  ref={foucs}
                  value={form.name}
                  required
                  onChange={handelChange}
                  type="text"
                  placeholder="Enter Your Name"
                />
                <Form.Label>Name</Form.Label>
              </Form.Group>

              <Form.Group className="form-gro" controlId="formBasicEmail">
                <Form.Control
                  name="email"
                  value={form.email}
                  required
                  onChange={handelChange}
                  type="email"
                  placeholder="Enter Your Email"
                />
                <Form.Label>Email</Form.Label>
              </Form.Group>

              <Form.Group className="form-gro" controlId="formBasicPassword">
                <Form.Control
                  name="password"
                  type="password"
                  value={form.password}
                  required
                  minLength="6"
                  onChange={handelChange}
                  placeholder="Enter Your Password"
                />
                <Form.Label>Password</Form.Label>
              </Form.Group>
              <button className="btn0 btn-primary0">
                {loading ? <Loading /> : "Register"}
              </button>
              <div className="google-btn">
                <a href={"http://127.0.0.1:8000/login-google"}>
                  <div className="google-icon-wrapper">
                    <img
                      className="google-icon"
                      src="image\R.jpeg"
                      alt="sign in with google"
                    />
                  </div>
                  <p className="btn-text">
                    <b>sign in with google</b>
                  </p>
                </a>
              </div>
              {err && <span className="err">{err}</span>}
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Register;
