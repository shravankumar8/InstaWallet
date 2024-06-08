import React from "react";
import { useNavigate } from "react-router-dom";

const Appbar = () => {
  const navigate=useNavigate()
  return (
    <div className="shadow h-14 flex justify-between">
      <div className="flex flex-col justify-center h-full ml-4">payTm App</div>
      <div className="flex">
        <div className="flex flex-col justify-center h-full mr-4">Hello</div>
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mr-4">
          <button onClick={()=>{
            localStorage.removeItem("token");
            navigate("/signin")
            
          }} className="flex flex-col justify-center h-full text-xl">U</button>
        </div>
      </div>
    </div>
  );
};

export default Appbar;
