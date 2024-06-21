import React, { useEffect, useState } from "react";
import "./auth.css";
import assets from "../assets/assets";
import EmailSuccessResponse from "./EmailSuccessResponse";
import gsap from "gsap";
import ForgotPassword from "./ForgotPassword";
import Login from "./Login";
import SignUp from "./SignUp";

const Auth = () => {
  const [currentRightSlide, setCurrentRightSlide] = useState("login");
  const [currentLeftSlide, setCurrentLeftSlide] = useState("forgot-password");
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState(null);

  const toggleAnimation = () => {
    const t1 = gsap.timeline();
    t1.to(
      "#animation-fromRight",
      { xPercent: -10, duration: 0.5, zIndex: 0 },
      0
    );
    t1.to(".auth-content-left", { xPercent: 150, duration: 0.5 }, 0);
    t1.to("#animation-fromLeft", { xPercent: 0, duration: 0.5, zIndex: 10 }, 0);
  };

  const toggleAnimationBack = () => {
    const t1 = gsap.timeline();
    t1.to("#animation-fromLeft", { xPercent: 10, duration: 0.5, zIndex: 0 }, 0);
    t1.to(
      "#animation-fromRight",
      { xPercent: 0, duration: 0.5, zIndex: 10 },
      0
    );
    t1.to(".auth-content-left", { xPercent: 0, duration: 0.5 }, 0);
  };

  const handleSlideChage = (slide) => {
    if (slide === "login" || slide === "email-response") {
      toggleAnimationBack();
      setCurrentRightSlide(slide);
    }
    if (slide === "signup" || slide === "forgot-password") {
      toggleAnimation();
      setCurrentLeftSlide(slide);
    }
  };

  const renderLeftSlide = () => {
    if (currentLeftSlide === "forgot-password")
      return (
        <ForgotPassword
          toggleSlide={(slide) => handleSlideChage(slide)}
          updateEmail={(email) => setForgotPasswordEmail(email)}
        />
      );
    if (currentLeftSlide === "signup")
      return <SignUp toggleSlide={(slide) => handleSlideChage(slide)} />;
  };

  const renderRightSlide = () => {
    if (currentRightSlide === "login")
      return <Login toggleSlide={(slide) => handleSlideChage(slide)} />;
    if (currentRightSlide === "email-response")
      return (
        <EmailSuccessResponse
          toggleSlide={(slide) => handleSlideChage(slide)}
          email={forgotPasswordEmail}
        />
      );
  };

  useEffect(() => {
    const t2 = gsap.timeline();
    const t4 = gsap.timeline();
    gsap.set(".auth-bg-svg", { autoAlpha: 1 });
    t2.to(
      ".auth-bg-svg",
      {
        xPercent: -110,
        duration: 1,
        opacity: 1,
        scale: 1,
        stagger: {
          each: 2,
          repeat: -1,
          repeatDelay: 5,
        },
      },
      1
    );
    t2.to(
      ".auth-bg-svg",
      {
        xPercent: -210,
        duration: 1,
        stagger: { each: 2, repeat: -1, repeatDelay: 5 },
        opacity: 0,
        scale: 0.5,
        delay: 2,
      },
      1
    );
    t4.to(
      ".circle-1",
      {
        width: "1.5rem",
        x: -6,
        duration: 0.4,
        stagger: { each: 2, repeat: -1, repeatDelay: 5.7 },
      },
      1
    );
    t4.to(
      ".circle-1",
      {
        width: "0.6rem",
        duration: 0.3,
        x: 0,
        stagger: { each: 2, repeat: -1, repeatDelay: 5.8 },
        delay: 2,
      },
      1
    );
  }, []);

  return (
    <div className="w-screen h-screen bg-gray-200 flex items-center justify-center">
      <div className="relative w-full h-full bg-white  shadow-custom flex overflow-hidden laptop-w:max-w-[70%] laptop-w:max-h-[90%] laptop-w:rounded-2xl">
        <div
          id="animation-fromLeft"
          className="absolute left-0 w-full h-full bg-white rounded-r-2xl flex flex-col items-center justify-around z-0 laptop-w:max-w-[60%] "
        >
          {renderLeftSlide()}
        </div>
        <div className="auth-content-left w-[40%] h-full flex-col items-center justify-around z-10 bg-card-bg-blue hidden laptop-w:flex tablet-w:w-[40%]">
          <div className="relative w-[80%] h-[80%] flex overflow-y-hidden">
            <img
              src={assets.Images.Auth_Marquee_1}
              alt="login-svg"
              className="auth-bg-svg absolute right-[-110%] w-full h-full scale-0 opacity-0 object-contain"
            />
            <img
              src={assets.Images.Auth_Marquee_3}
              alt="login-svg"
              className="auth-bg-svg absolute right-[-110%] w-full h-full scale-0 opacity-0 object-contain"
            />
            <img
              src={assets.Images.Auth_Marquee_2}
              alt="login-svg"
              className="auth-bg-svg absolute right-[-110%] w-full h-full scale-0 opacity-0 object-contain"
            />
          </div>
          <div className="relative w-16 h-2 flex justify-between px-[0.1rem]">
            <div className="circle-1 w-2 h-2 rounded-full bg-white absolute " />
            <div className="w-2 h-2 rounded-full bg-white absolute left-6 top-0 circle-1" />
            <div className="w-2 h-2 rounded-full bg-white absolute left-[3rem] top-0 circle-1" />
          </div>
        </div>
        <div
          id="animation-fromRight"
          className=" w-full laptop-w:w-[60%] h-full z-10 flex items-center justify-center bg-white"
        >
          {renderRightSlide()}
        </div>
      </div>
    </div>
  );
};

export default Auth;
