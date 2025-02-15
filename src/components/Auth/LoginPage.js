import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../css/SignUp.module.css";
import axios from "axios";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

function LoginPage() {
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null)

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);
    setIsSubmit(true);

    if (Object.keys(errors).length === 0) {
      const { email, password } = formValues;

      axios
        .post("http://localhost:3001/login", { email, password })
        .then(({ data }) => {
          console.log("LOGIN RES: ", data);

          if (data?.success) {
            setAlertMessage({ 'severity': 'success', 'title': 'Success', 'message': data?.message });
            setShowAlert(true);
            localStorage.setItem("token", data.token);
            console.log("user : ", data.user?._id);
            localStorage.setItem("userId", data.user?._id);
            navigate("/home");
          } else {
            setAlertMessage({ 'severity': 'error', 'title': 'User', 'message': data?.message });
            setShowAlert(true)
          }
        })
        .catch((err) => {
          console.error("Login Error: ", err);
          setFormErrors({ general: "Something went wrong. Please try again." });
        });

      setFormValues(initialValues);
    }
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }

    return errors;
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      navigate("/home");
    }
  });
  return (
    <div className={styles.container}>
      {Object.keys(formErrors).length === 0 && isSubmit && showAlert && (
        <div style={{
          position: 'absolute', top: 10
        }}>
          <Alert severity={alertMessage?.severity} style={{width: '40vw'}} >
            <AlertTitle>{alertMessage?.title}</AlertTitle>
            {alertMessage?.message}
          </Alert>
        </div>
      )}
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="dodgerblue"
              fillOpacity="1"
              d="M0,192L80,202.7C160,213,320,235,480,224C640,213,800,171,960,170.7C1120,171,1280,213,1360,234.7L1440,256L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
            ></path>
          </svg>
          <h1 className={styles.heading}>Login</h1>
          <div className={styles.uiForm}>
            <div className={styles.field}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formValues.email}
                onChange={handleChange}
              />
            </div>
            <p className={styles.errorMessage}>{formErrors.email}</p>
            <div className={styles.field}>
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formValues.password}
                onChange={handleChange}
              />
            </div>
            <p className={styles.errorMessage}>{formErrors.password}</p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 20,
              }}
            >
              <button className={styles.button}>Login</button>
              <p className={styles.loginPrompt}>
                <Link to="/sign">Create Account</Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default LoginPage;
