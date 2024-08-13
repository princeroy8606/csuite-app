import React, { useState } from "react";
import assets from "../assets/assets";
import { auth } from "../../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { toast } from "react-toastify";
import { isStrongPassword, isValidEmail } from "../../utils/validityCheck";
import { googlePopup } from "../../firebase/auth_google_popup";
import { signinMicrosoft } from "../../firebase/auth_microsoft_execute";
import { handleLinkedIn} from "../../firebase/auth_linkedIn_execute";

const Login = ({ toggleSlide }) => {
  const [form, setForm] = useState({ email: null, password: null });
  const [error, setError] = useState({ email: false, password: false });
  const [showPassword, setShowPassword] = useState(false);

  const handleValueChange = (type, value, valid) => {
    setForm({ ...form, [type]: value });
    if (valid && error[type] === true) setError({ ...error, [type]: false });
    if (!valid && error[type] === false) setError({ ...error, [type]: true });
  };

  const handleLogin = async () => {
    const newError = {};
    if (!isValidEmail(form.email)) {
      newError.email = true;
    }
    if (!isStrongPassword(form.password)) {
      newError.password = true;
    }
    if (Object.keys(newError).length > 0) {
      setError(newError);
      return;
    }
    // try {
    //   const response = await axios.post(
    //     "https://quiz-project-d15l.onrender.com/api/login/",
    //     {
    //       email: form.email,
    //       password: form.password,
    //     }
    //   );
    //   console.log(response);
    //   toast.success("Login Success");
    //   // Navigate to another page or save the token
    //   navigate("/dashboard");
    // } catch (err) {
    //   console.log(err);
    //   toast.error("Login Failed");
    // }
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      console.log(response);
      toast.success("Login Success");
    } catch (err) {
      console.log(err);
      toast.error("Login Failed");
    }
  };

  const handleSocialLogin = async (type) => {
    let res;
    if (type === "google") {
      res = await googlePopup();
    }
    if (type === "linkedin") {
      handleLinkedIn();
    }
    if (type === "microsoft") {
      res = await signinMicrosoft();
    }
    // console.log(res,"response");
  };

  return (
    <div className="login-container">
      <div className="logo-container">
        <img src={assets.Images.CSuiteLogo} alt="logo" className="logo-img" />
      </div>
      <div className="login-details">
        <h2 className="login-title">Hello Again!</h2>
        <p className="login-subtitle">
          Empower Your Journey: Where Professionalism <br /> Meets Progress
        </p>
        <form className="login-form">
          <div className="input-container">
            <input
              type="text"
              placeholder="Email or username"
              style={{ borderColor: error.email ? "red" : "#C7C7C7" }}
              onChange={(e) =>
                handleValueChange(
                  "email",
                  e.target.value,
                  isValidEmail(e.target.value)
                )
              }
              className="input"
            />
            {error.email && <p className="input-error">Enter valid Email</p>}
            <img
              src={assets.Images.mail_icon}
              alt="mail-icon"
              className="icon"
            />
          </div>
          <div className="input-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              style={{ borderColor: error.password ? "red" : "#C7C7C7" }}
              onChange={(e) =>
                handleValueChange(
                  "password",
                  e.target.value,
                  isStrongPassword(e.target.value)
                )
              }
              className="input"
            />
            {error.password && (
              <p className="input-error">Enter valid password</p>
            )}
            <img
              src={assets.Images.Lock_Vector}
              alt="mail-icon"
              className="icon"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          <div className="options-container">
            <label className="checkbox-label">
              <input type="checkbox" className="checkbox" />
              <p className="checkbox-text">Remember me</p>
            </label>
            <p
              onClick={() => toggleSlide("forgot-ppssword")}
              className="forgot-password-link"
            >
              Forgot Password?
            </p>
          </div>
          <div className="login-button" onClick={() => handleLogin()}>
            <p>Login</p>
          </div>
        </form>
        <div className="divider-container">
          <div className="divider"></div>
          <p className="divider-text">or</p>
          <div className="divider"></div>
        </div>
        <div className="social-login-container">
          <div
            className="social-login-button"
            onClick={() => handleSocialLogin("google")}
          >
            <img
              src={assets.Images.Google}
              alt="Google"
              className="social-login-icon"
            />
          </div>
          <div
            className="social-login-button"
            onClick={() => handleSocialLogin("microsoft")}
          >
            <img
              src={assets.Images.Microsoft}
              alt="Microsoft"
              className="social-login-icon"
            />
          </div>
          <div className="social-login-button">
            <img
              src={assets.Images.Apple}
              alt="Apple"
              className="social-login-icon"
            />
          </div>
          <div
            className="social-login-button"
            onClick={() => handleSocialLogin("linkedin")}
          >
            <img
              src={assets.Images.LinkedIn}
              alt="LinkedIn"
              className="social-login-icon"
            />
          </div>
        </div>
        <div className="signup-link-container">
          Don’t have an account?{" "}
          <p
            onClick={() => toggleSlide("signup")}
            className="signup-link"
          >
            Sign up.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
