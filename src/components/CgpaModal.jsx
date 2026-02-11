import React from "react";

function CgpaModal({ cgpaState, setCgpaState }) {
  return (
    <div onClick={() => setCgpaState({ ...cgpaState, state: false })}>
      <div className="fixed top-0 bottom-0 z-10 w-full h-full bg-[rgba(77,73,73,1)] tw-all-center">
        <div className="relative max-w-[90vw] lg:max-w-[30vw] rounded-lg bg-[rgba(24,23,54,0.8)] border border-gray-800 p-3 md:p-10 xl:p-8 shadow-md shadow-gray-900 bg-red-20">
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
    </div>
  );
}

export default CgpaModal;
