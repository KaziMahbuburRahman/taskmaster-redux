import React from "react";
import Logo from "../../assets/image/to-do-list.png";

export default function Preloader() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <img src={Logo} alt="logo" className="w-24 h-24" />
      <div className="flex items-center justify-center mt-4">
        <div className="w-3 h-3 bg-blue-700 rounded-full animate-bounce mr-1"></div>
        <div className="w-3 h-3 bg-blue-700 rounded-full animate-bounce mr-1"></div>
        <div className="w-3 h-3 bg-blue-700 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
}
