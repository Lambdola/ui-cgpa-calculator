import { BadgePlus, Calculator } from "lucide-react";
import React, { useEffect, useState } from "react";

function ResultsHistory({ setSideNav, setInputValues, setScaleModal, scalePref }) {
  const [results, setResults] = useState("");
  const [scale, setScale] = useState(0);
  

  useEffect(() => {
    if (window && window.localStorage) {
      let scalePref = localStorage.getItem("UI_CGPA_SCALE_PREFERENCE");
      let history = localStorage.getItem("CGPA");
      if (history) {
        history = JSON.parse(history);
        setResults(history);
      }
      if (scalePref) {
        setScale(parseInt(scalePref));
        // setScaleModal(false);
      }
    }
  }, []);

  return (
    <div
      onClick={() => {
        setSideNav(false);
      }}
      className="fixed z-10 w-full h-screen bg-black bg-opacity-90 slide-in-left "
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="absolute w-60 xl:w-1/3 xl:max-w-[300px] h-full bg-white overflow-scroll"
      >
        <button
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 w-full my-5 mx-2"
        >
          <div className="h-7 w-7 bg-slate-700 rounded-full flex items-center justify-center">
            <Calculator color="#ffffff" size={15} />
          </div>
          <p className="text-sm font-semibold">Start a new Calculation</p>
        </button>

        <div className="w-full  shadow-md shadow-gray-400 border-t border-b border-gray-300 mx-3 p-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setScaleModal(true);
            }}
            className="text-left w-full rounded-lg"
          >
            <p className="text-sm font-semibold">Reset Grade Point Scale</p>
            <p className="text-sm">
              Grade Point Scale in Use:{" "}
              <span className="font-semibold">{scalePref}</span>
            </p>
          </button>
        </div>

        <div className="p-3 space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-sm xl:text-base font-medium object-cover">
              CGPA Results History
            </p>
            {results && (
              <button
                onClick={() => {
                  localStorage.removeItem("CGPA");
                  setResults("");
                }}
                className="text-red-200 text-xs font-bold bg-red-700 hover:text-red-700 hover:bg-white py-1 px-2 rounded-md"
              >
                X Clear
              </button>
            )}
          </div>

          {results ? (
            results.map((items) => {
              return (
                <div
                  key={items[0]}
                  onClick={() => {
                    setSideNav(false);
                    setInputValues(items[1]);
                  }}
                >
                  <button className="p-2 bg-slate-800 hover:bg-slate-400 w-full text-left rounded-md text-white">
                    {items[0]}
                  </button>
                </div>
              );
            })
          ) : (
            <p className="text-slate-400">No History</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResultsHistory;
