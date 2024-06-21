import React from "react";
import assets from "../assets/assets";
import { useNavigate } from "react-router-dom";

const EmailSuccessResponse = ({ toggleSlide, email }) => {
  const navigate = useNavigate();
  const handleRedirectToMail = () => {
    window.location.href = `mailto:${email}`;
  };
  return (
    <div className="w-full h-full bg-white rounded-r-2xl flex flex-col items-center justify-around pt-8">
      <div className="w-20 h-20 rounded-full p-4 bg-light-gray flex items-center justify-center tablet-h:w-14 tablet-h:h-14 laptop-h:w-20 laptop-h:h-20">
        <img
          src={assets.Images.CSuiteLogo}
          alt="logo"
          className="w-full h-full object-contain"
        />
      </div>
      <img
        src={assets.Images.MailSent}
        alt="logo"
        className="max-w-[50%] h-[25%] object-contain md:mt-8"
      />
      <div className="mail-sent-msg-cnt">
        <h2 className="text-[2.5rem] font-semibold mb-4 md:mb-0 tablet-h:text-[1.5rem] laptop-h:text-[2.5rem]">
          Email Sent
        </h2>
        <h2 className="text-[1rem] font-medium text-gray-600 text-center mb-4 tablet-h:text-[0.8rem]  laptop-w:text-lg  laptop-h:mb-4">
          We have sent an email to <br /> username@gmail.com with a link to
          reset <br />
          your password
        </h2>
      </div>
      {/* button --> to ---> gmail */}
      <div className="gmail-button cursor-pointer" onClick={() => handleRedirectToMail()}>
        <h3>Open my gmail</h3>
      </div>
      <div></div>
      {/* <div className="mail-sent-msg-cnt">
        <h2 className="msg-content-text">
          Please use the link that sent to <br /> username@gmail.com to <br />
          reset your password
        </h2>
      </div> */}
    </div>
  );
};

export default EmailSuccessResponse;
