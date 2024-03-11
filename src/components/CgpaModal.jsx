import React from "react";

function CgpaModal({ cgpaState, setCgpaState }) {
  return (
    <div onClick={() => setCgpaState({ ...cgpaState, state: false })}>
      <div className="fixed top-0 bottom-0 z-10 w-full bg-[rgba(77,73,73,1)]"></div>
      <div className="fixed z-20 flex items-center justify-center w-[80%] md:w-[55%] xl:w-[50%]  left-[10%] md:left-[22%] xl:left-[25%] top-28 md:h-[40vh] ">
        <div className="relative rounded-lg bg-[rgba(24,23,54,0.8)] border border-gray-800 p-3 md:p-10 xl:p-8 shadow-md shadow-gray-900 bg-red-20">
          <div className="text-center text-white space-y-7 p-5">
            <div>
              <p className="font-medium text-lg xl:text-xl text-gray-400">
                Your C.G.P.A is:{" "}
              </p>
              <p className="font-extrabold text-[4rem] -mt-5">
                {cgpaState.cgpa}
              </p>
            </div>
            <div className="">
              <p className="font-medium text-lg text-gray-400">
                Your Class of Degree is:{" "}
              </p>
              <p className="font-extrabold text-lg -mt-1">
                {cgpaState.degreeClass}
              </p>
              <p className="font-bold text-base -mt-1">{cgpaState.rank}</p>
            </div>
            <p className="text-base text-center text-gray-300 mt-7 leading-6">
              {cgpaState.text}
            </p>
          </div>
        </div>
      </div>



      {/* <div className="relative mt-20 w-96 mx-auto bg-slate-50 z-20 py-3 rounded-xl">
        <div className="flex justify-between w-96 bg-slate-50">
          <div className="w-[50%] bg-red-90 flex items-center">
            <div className="h-[90%] bg-yellow-40">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7seHpPaIGmwQsgqU9oazIjO4t-x6uvH5WGA&usqp=CAU" className="h-full w-full object-fill rounded-t-xl" />
            </div>
          </div>
          <div className="w-1/2 px-3 space-y-2">
            <p className="text-sm font-serif">P E R F U M E</p>
            <p className="font-serif font-bold text-xl">Gabrielle Essence Eau De Parfum</p>
            <p className="text-xs text-slate-500 font-serif">A floral, solar, and voluptous interpretation composed by Olivier Polge, Perfumer-Creator for the house of CHANEL</p>
            <div className="flex items-center gap-4">
              <p className="text-xl text-green-400 font-mono">$149.99</p>
              <div className="relative">
                <p className="text-[10px]">$169.99</p>
              </div>
            </div>
            <div className="w-[80%] mx-auto bg-red-40">
              <button className="text-center w-full bg-green-500 p-1 rounded-md">Add to Cart</button>

            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default CgpaModal;
