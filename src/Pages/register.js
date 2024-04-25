import { useState } from "react";
import { useHistory } from "react-router-dom";
import MyTitle from "../Components/mytitle.js";
import {
  validEmail,
  validPassword,
  validUsername,
} from "../Components/rejex.js";
import { Link } from "react-router-dom";
import { Card} from "react-bootstrap";

function RegisterDetails() {
  const history = useHistory();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    userName: "",
    pass: "",
    confirmPass: "",
  });

  const [errors, setErrors] = useState({
    nameError: "",
    emailError: "",
    userNameError: "",
    passError: "",
    confirmPassError: "",
  });

  function changeData(e) {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });

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
      case "name":
        setErrors({
          ...errors,
          nameError:
            value.length < 3 ? "Name must be at least 3 characters long" : "",
        });
        break;
      case "userName":
        setErrors({
          ...errors,
          userNameError: validUsername.test(value)
            ? ""
            : "Invalid username format",
        });
        break;
      case "confirmPass":
        setErrors({
          ...errors,
          confirmPassError:
            value !== userData.pass ? "Passwords do not match" : "",
        });
        break;
      default:
        break;
    }
  }

  const submitData = (e) => {
    e.preventDefault();
    // Save user data in local storage
    localStorage.setItem("userData", JSON.stringify(userData));
    history.push("/login");
  };

  return (
    <>
      <section className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <Card>
              <Card.Body className="mt-5">
                <MyTitle
                  color="dark"
                  content="Registration"
                  className="mb-5 text-dark"
                />

                <form onSubmit={(e) => submitData(e)} className="w-75 mx-auto">
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputName"
                      className="form-label fw-bolder text-dark"
                    >
                      Name{" "}
                    </label>
                    <input
                      required
                      type="text"
                      className={`form-control `}
                      value={userData.name}
                      onChange={(e) => changeData(e)}
                      name="name"
                    />
                    <p className="text-danger"> {errors.nameError} </p>
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputEmail1"
                      className="form-label fw-bolder text-dark"
                    >
                      Email{" "}
                    </label>
                    <input
                      required
                      type="email"
                      className={`form-control ${
                        errors.emailError ? "border-danger" : "border-success"
                      }`}
                      value={userData.email}
                      onChange={(e) => changeData(e)}
                      name="email"
                    />
                    <p className="text-danger"> {errors.emailError} </p>
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputUserName"
                      className="form-label fw-bolder text-dark"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      required
                      className={`form-control ${
                        errors.userNameError
                          ? "border-danger"
                          : "border-success"
                      }`}
                      onChange={(e) => changeData(e)}
                      value={userData.userName}
                      name="userName"
                    />
                    <p className="text-danger"> {errors.userNameError} </p>
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label fw-bolder text-dark"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      className={`form-control ${
                        errors.passError ? "border-danger" : "border-success"
                      }`}
                      onChange={(e) => changeData(e)}
                      value={userData.pass}
                      name="pass"
                    />
                    <p className="text-danger"> {errors.passError} </p>
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputPassword2"
                      className="form-label fw-bolder text-dark"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      required
                      className={`form-control ${
                        errors.confirmPassError
                          ? "border-danger"
                          : "border-success"
                      }`}
                      onChange={(e) => changeData(e)}
                      value={userData.confirmPass}
                      name="confirmPass"
                    />
                    <p className="text-danger"> {errors.confirmPassError} </p>
                  </div>

                  <div className="d-flex justify-content-center">
                    <button
                      disabled={
                        errors.emailError ||
                        errors.passError ||
                        errors.nameError ||
                        errors.confirmPassError ||
                        errors.userNameError
                      }
                      type="submit"
                      className="btn btn-dark mb-3 w-100"
                    >
                      Register
                    </button>
                  </div>
                </form>

                <div className="text-center">
                  <p className="mb-0">Already have an account?</p>
                  <Link to="/login" className="text-dark">
                    Login
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}

export default RegisterDetails;
