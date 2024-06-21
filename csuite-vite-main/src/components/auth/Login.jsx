import React, { useState } from "react";
import axios from 'axios';
import assets from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { isStrongPassword, isValidEmail } from "../../utils/validityCheck";

const Login = ({ toggleSlide }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
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
    try {
      console.log("sending-to server")
      const response = await axios.post('https://quiz-project-d15l.onrender.com/api/login/', {
        email: form.email,
        password: form.password,
      });
      console.log(response);
      toast.success("Login Success");
      // Navigate to another page or save the token
      navigate('/dashboard');
    } catch (err) {
      console.log(err);
      toast.error("Login Failed");
    }
  };

  return (
    <div className="w-full h-full bg-white rounded-r-2xl flex flex-col items-center justify-around py-14 tablet-h:py-8 tablet-w:w-[60%] laptop-w:w-[80%]">
      <div className="w-20 h-20 rounded-full p-4 bg-light-gray flex items-center justify-center tablet-h:w-14 tablet-h:h-14 laptop-h:w-20 laptop-h:h-20">
        <img
          src={assets.Images.CSuiteLogo}
          alt="logo"
          className="w-full h-full object-contain"
        />
      </div>
      <div className="w-[90%] h-[90%] flex flex-col items-center justify-around text-center laptop-w:h-[auto] ">
        <h2 className="text-[2.5rem] font-semibold mb-4 md:mb-0 tablet-h:text-[1.5rem] laptop-h:text-[2.5rem]">
          Hello Again!
        </h2>
        <p className="text-[1rem] font-medium text-gray-600 text-center mb-4 tablet-h:text-[0.8rem] laptop-h:text-lg  laptop-h:mb-4">
          Empower Your Journey:Where Professionalism <br /> Meets Progress
        </p>
        <form className="w-[100%] laptop-w:w-[80%]">
          <div className="relative w-full min-h-10 h-[6.5vh] max-h-[3rem] mb-4">
            <input
              type="text"
              placeholder="Email or username"
              style={{
                borderColor: error.email ? "red" : "#C7C7C7",
              }}
              onChange={(e) =>
                handleValueChange(
                  "email",
                  e.target.value,
                  isValidEmail(e.target.value)
                )
              }
              className="w-full h-full px-4 py-2 border-2 border-gray-300 bg-blue-50 rounded-md font-normal laptop-h:font-semibold laptop-h:text-base text-black focus:outline-none"
            />
            {error.email && (
              <p className="text-[.7rem] text-red-500 font-medium text-left">
                Enter valid Email
              </p>
            )}
            <img
              src={assets.Images.mail_icon}
              alt="mail-icon"
              className="absolute w-6 h-full object-contain right-4 top-0 cursor-pointer p-1"
            />
          </div>
          <div className="relative w-full min-h-10 h-[6.5vh] max-h-[3rem] mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              style={{
                borderColor: error.password ? "red" : "#C7C7C7",
              }}
              onChange={(e) =>
                handleValueChange(
                  "password",
                  e.target.value,
                  isStrongPassword(e.target.value)
                )
              }
              className="w-full h-full px-4 py-2 border-2 border-gray-300 bg-blue-50 rounded-md font-normal md:font-semibold md:text-base text-black focus:outline-none"
            />
            {error.password && (
              <p className="text-[.7rem] text-red-500 font-medium text-left">
                Enter valid password
              </p>
            )}
            <img
              src={assets.Images.Lock_Vector}
              alt="mail-icon"
              className="absolute w-6 h-full object-contain right-4 top-0 cursor-pointer p-1"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          <div className="flex justify-between mb-5 text-gray-600 items-center">
            <label className="flex h-8 justify-around items-center text-base">
              <input type="checkbox" className="checkbox" />
              <p className="text-[.8rem] md:text-[1rem]">Remember me</p>
            </label>
            <a
              href="#"
              onClick={() => toggleSlide("forgot-password")}
              className="text-blue-600 hover:underline text-[.8rem] md:text-[1rem]"
            >
              Forgot Password?
            </a>
          </div>
          <div
            className="w-full h-[2.8rem] rounded-lg relative flex items-center justify-center cursor-pointer text-[1.5rem] font-medium text-white bg-[#2250AE] "
            onClick={() => handleLogin()}
          >
            <p>Login</p>
          </div>
        </form>
        <div className="w-3/5 flex items-center justify-between mt-5 text-[#666666]">
          <div className="w-[40%] h-[1.5px] bg-gray-600" />{" "}
          <p className="font-semibold"> or </p>{" "}
          <div className="w-[40%] h-[1.5px] bg-gray-600" />{" "}
        </div>
        <div className="w-full  flex items-center justify-around gap-2">
          <div className="max-w-12 max-h-12 h-[6.5vh] m-1 bg-transparent border-2 border-gray-300 rounded-md text-base font-medium cursor-pointer">
            <img
              src={assets.Images.Google}
              alt="Google"
              className="w-full h-full object-contain p-3 grayscale hover:grayscale-0"
            />
          </div>
          <div className="max-w-12 max-h-12 h-[6.5vh] m-1  bg-transparent border-2 border-gray-300 rounded-md text-base font-medium cursor-pointer">
            <img
              src={assets.Images.Microsoft}
              alt="Microsoft"
              className="w-full h-full object-contain p-3 grayscale hover:grayscale-0"
            />
          </div>
          <div className="max-w-12 max-h-12 h-[6.5vh] m-1 bg-transparent border-2 border-gray-300 rounded-md font-normal md:font-semibold md:text-base cursor-pointer">
            <img
              src={assets.Images.Apple}
              alt="Apple"
              className="w-full h-full object-contain p-3 grayscale hover:grayscale-0"
            />
          </div>
          <div className="max-w-12 max-h-12 h-[6.5vh] m-1 bg-transparent border-2 border-gray-300 rounded-md font-normal md:font-semibold md:text-base cursor-pointer">
            <img
              src={assets.Images.LinkedIn}
              alt="LinkedIn"
              className="w-full h-full object-contain p-3 grayscale hover:grayscale-0"
            />
          </div>
        </div>
        <div className="mt-5 text-gray-600">
          Don’t have an account?{" "}
          <a
            href="#"
            onClick={() => toggleSlide("signup")}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Sign up.
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
