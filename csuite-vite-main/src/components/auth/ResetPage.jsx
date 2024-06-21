import React, { useState } from "react";
import assets from "../assets/assets";
import { auth } from "../../firebase/firebaseConfig";
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "@firebase/auth";

const ResetPage = () => {
  const [form, setForm] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleValueChange = (type, value) => {
    setForm({ ...form, [type]: value });
  };

  const handleChangePassword = async () => {
    if (form.newPassword !== form.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }
    try {
      const user = auth.currentUser;

      const credential = EmailAuthProvider.credential(
        form.email,
        form.newPassword
      );

      await reauthenticateWithCredential(user, credential);

      await updatePassword(user, form.newPassword);

      setMessage("Password updated successfully!");
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-around ">
      <div className="fgrt-pswrd-top-cnt">
        <div className="w-20 h-20 rounded-full p-4 bg-light-gray flex items-center justify-center">
          <img
            src={assets.Images.CSuiteLogo}
            alt="logo"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="w-[90%] h-[80%] flex flex-col items-center justify-around tablet-w:w-[40%] ">
          <img
            src={assets.Images.Lock}
            alt="forgot-password"
            className="max-w-[50%] h-[25%] object-contain tablet-w:mt-8"
          />
          <h1 className="text-[2.5rem] font-semibold mb-4 tablet-w:mb-0">
            Change Password
          </h1>
          <p className="text-[1rem] font-medium text-gray-600 text-center mb-4 tablet-w:text-lg  tablet-w:mb-0">
            Update your password with a new one
          </p>

          <form className="w-[90%] md:w-[70%]">
            <div className="relative w-full h-12 mb-4 ">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                className="w-full h-full px-4 py-2 border-2 border-gray-300 bg-blue-50 rounded-md font-normal md:font-semibold tablet-w:text-base text-black focus:outline-none"
              />
              <img
                src={assets.Images.Lock_Vector}
                alt="mail-icon"
                className="input-absolute-img"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
            <div className="relative w-full h-12 mb-4 ">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Conform password"
                className="w-full h-full px-4 py-2 border-2 border-gray-300 bg-blue-50 rounded-md font-normal md:font-semibold tablet-w:text-base text-black focus:outline-none"
              />
              <img
                src={assets.Images.Lock_Vector}
                alt="mail-icon"
                className="input-absolute-img"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
            <div className="w-full h-11 rounded-md relative flex items-center justify-center cursor-pointer text-xl font-medium text-white bg-[var(--card-bg-blue)] py-6">
              <p>Update Password</p>
            </div>
          </form>
        </div>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default ResetPage;
