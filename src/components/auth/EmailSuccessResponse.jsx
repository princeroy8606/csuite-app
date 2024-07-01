import React from "react";
import assets from "../assets/assets";
import { useNavigate } from "react-router-dom";

const EmailSuccessResponse = ({ toggleSlide, email }) => {
  const navigate = useNavigate();
  const handleRedirectToMail = () => {
    window.location.href = `mailto:${email}`;
  };
  return (
    <div className="email-container">
      <div className="logo-container">
        <img src={assets.Images.CSuiteLogo} alt="logo" className="logo-img" />
      </div>
      <img
        src={assets.Images.MailSent}
        alt="mail-sent"
        className="mail-sent-img"
      />
      <div className="mail-sent-msg-cnt">
        <h2 className="email-sent-title">Email Sent</h2>
        <h2 className="email-sent-subtitle">
          We have sent an email to <br /> {email} with a link to reset <br />{" "}
          your password
        </h2>
      </div>
      <div className="gmail-button" onClick={() => handleRedirectToMail()}>
        <h3>Open my Gmail</h3>
      </div>
    </div>
  );
};

export default EmailSuccessResponse;
{
  /* <div className="mail-sent-msg-cnt">
        <h2 className="msg-content-text">
          Please use the link that sent to <br /> username@gmail.com to <br />
          reset your password
        </h2>
      </div> */
}
