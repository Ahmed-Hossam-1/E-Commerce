import { useEffect, useRef, useState } from "react";
import Loading from "../../Components/Loading/Loading";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userSignup } from "../../Featrures/authFeature/authActions";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { isLoading, isError, message } = useSelector((state) => state.auth);
  const dispath = useDispatch();
  const navigate = useNavigate();

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
    dispath(userSignup(form));
    navigate("/dashboard/users", { replace: true });
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
                {isLoading ? <Loading /> : "Register"}
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
              {isError && <span className="err">{message}</span>}
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Register;
