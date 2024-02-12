import React from "react";

function Header({setSideNav}) {
  return (
    <div className="relative">
      <div className="fixed top-0 z-10 w-full h-10 bg-slate-500 bg-opacity-50 blur flex justify-between items-center"></div>
      <div className="fixed z-10 w-full h-10 bg-white bg-opacity-50 flex justify-between items-center">
        <div onClick={() => setSideNav(true)} className="h-10 w-10 hover:bg-gray-400 flex items-center justify-center ">
            <div className="space-y-1">
            <div className="w-5 h-1 bg-black rounded-full"></div>
            <div className="w-3 h-1 bg-black rounded-full"></div>
            </div>
            
        </div>
        <div onClick={() => {window.location.reload()}} className="font-mono font-bold text-lg cursor-pointer"><p>CGPA-Wizard 1.0</p></div>
        <div className="h-10 w-10 bg-yellow-300 rounded-full"></div>
      </div>
    </div>
  );
}

export default Header;
