import { useState } from "react";
import MyTitle from "../Components/mytitle.js";
import { validEmail, validPassword } from "../Components/rejex.js";
import {
  useHistory,
  useLocation,
  useRouteMatch,
} from "react-router-dom/cjs/react-router-dom.min.js";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

function LoginDetails(props) {
  const location = useLocation(); 
  const history = useHistory();
  const match = useRouteMatch(); 

  const [userData, setuserData] = useState({
    email: "",
    pass: "",
  });

  const [errors, setErrors] = useState({
    emailError: "",
    passError: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  function changeData(e) {
    const { name, value } = e.target;
    setuserData({ ...userData, [name]: value });

    switch (name) {
      case "email":
        setErrors({
          ...errors,
          emailError: validEmail.test(value) ? "" : "Invalid email format",
        });
        break;
      case "pass":
        setErrors({
          ...errors,
          passError: validPassword.test(value) ? "" : "Invalid password format",
        });
        break;
      default:
        break;
    }
  }

  const submitData = (e) => {
    e.preventDefault();
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedUserData &&
      storedUserData.email === userData.email &&
      storedUserData.pass === userData.pass
    ) {
      localStorage.setItem("isLoggedIn", true); 
      history.push("/");
    } else {
      setErrors({ ...errors, loginError: "Invalid email or password" });
    }
  };


  return (
    <>
     <div className="container mt-5">
  <div className="row justify-content-center">
    <div className="col-md-6">
      <Card>
        <Card.Body className="mt-5">
          <MyTitle color="dark" content="Login" className="mb-5 text-dark" />

          <form onSubmit={(e) => submitData(e)}>
            <div className="mb-3">
              <p className="text-danger">{errors.loginError}</p>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label fw-bolder text-dark">Email</label>
              <input
                required
                type="email"
                className={`form-control ${errors.emailError ? "border-danger" : "border-success"}`}
                value={userData.email}
                onChange={(e) => changeData(e)}
                name="email"
              />
              <p className="text-danger"> {errors.emailError} </p>
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label fw-bolder text-dark">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                required
                className={`form-control  ${errors.passError ? "border-danger" : "border-success"}`}
                onChange={(e) => changeData(e)}
                value={userData.pass}
                name="pass"
              />
              <p className="text-danger"> {errors.passError} </p>
            </div>

            <input
              id="check"
              type="checkbox"
              value={showPassword}
              onChange={() => setShowPassword((prev) => !prev)}
            />
            <label htmlFor="check" className="text-dark">Show Password</label>
            <br />
            <br />

            <div className="d-flex justify-content-center">
              <button
                disabled={errors.emailError || errors.passError}
                type="submit"
                className="btn btn-dark mb-3 w-100"
              >
                Login
              </button>
            </div>
          </form>

          <div className="text-center">
            <h5 className="card-title text-dark">New User?</h5>
            <Link to="/register" className="card-text text-dark">Register now to create an account.</Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  </div>
</div>



    </>
  );
}

export default LoginDetails;
