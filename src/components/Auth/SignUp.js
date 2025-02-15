import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

// Import the CSS module
import styles from "../css/SignUp.module.css";

function SignUp() {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      navigate("/home");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = formValues;
    const errors = validate(formValues);
    setFormErrors(errors);
    setIsSubmit(true);
    if (Object.keys(errors).length === 0) {
      axios
        .post("http://localhost:3001/signup", {
          username,
          email,
          password,
          confirmPassword,
        })
        .then((res) => {
          if (res?.data?.success) {
            setFormValues(initialValues);
            navigate("/login");
          } else {
            alert(res?.data?.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors, formValues, isSubmit]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Username is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be more than 8 character";
    } else if (values.password.length > 10) {
      errors.password = "Password must not exceed more than 10 character";
    } else if (!/[A-Z]/.test(values.password)) {
      errors.password = "Password must contain at least one uppercase letter";
    } else if (!/[a-z]/.test(values.password)) {
      errors.password = "Password must contain at least one lowercase letter";
    } else if (!/[0-9]/.test(values.password)) {
      errors.password = "Password must contain at least one digit";
    } else if (!/[!@#$%^&*]/.test(values.password)) {
      errors.password = "Password must contain at least one special character";
    }
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.container}>
      {Object.keys(formErrors).length === 0 && isSubmit && (
        <Alert severity="success" className={styles.alert}>
          <AlertTitle>Success</AlertTitle>
          This is a success Alert with an encouraging title.
        </Alert>
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
          <h1 className={styles.heading}>Sign-Up Form</h1>
          <div className={styles.uiForm}>
            <div className={styles.field}>
              <label>Username</label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formValues.username}
                onChange={handleChange}
                className={styles.inputField}
              />
            </div>
            <p className={styles.errorMessage}>{formErrors.username}</p>
            <div className={styles.field}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formValues.email}
                onChange={handleChange}
                className={styles.inputField}
              />
            </div>
            <p className={styles.errorMessage}>{formErrors.email}</p>
            <div className={styles.field}>
              <label>Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="password"
                value={formValues.password}
                onChange={handleChange}
                className={styles.inputField}
              />
            </div>
            <p className={styles.errorMessage}>{formErrors.password}</p>
            <div className={styles.field}>
              <label>Confirm Password</label>
              <div className={styles.passwordContainer}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formValues.confirmPassword}
                  onChange={handleChange}
                  className={styles.inputField}
                />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className={styles.secondaryButton}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <p className={styles.errorMessage}>{formErrors.confirmPassword}</p>
            <div className={styles.buttonContainer}>
              <button className={styles.button}>Sign Up</button>
            </div>
          </div>
        </form>
        <p className={styles.loginPrompt}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
