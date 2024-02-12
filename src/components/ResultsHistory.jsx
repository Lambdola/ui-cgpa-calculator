import React, { useEffect, useState } from "react";

function ResultsHistory({ setSideNav, setInputValues }) {
  const [results, setResults] = useState("");

  useEffect(() => {
    let history = localStorage.getItem("CGPA");
    if (history) {
      history = JSON.parse(history);
      setResults(history);
    }
    // alert(JSON.stringify(history));
    // alert( typeof history)
    // alert(history.length)
  }, []);

  return (
    <div
      onClick={() => {
        setSideNav(false);
      }}
      className="fixed z-10 w-full h-screen bg-black bg-opacity-90 slide-in-left"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="absolute w-60 h-full bg-white "
      >
        <button
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 w-full my-5 mx-2"
        >
          <div className="h-7 w-7 bg-red-500 rounded-full"></div>
          <p className="text-sm font-semibold">New CGPA Calculation</p>
        </button>

        <div className="p-3 space-y-2">
            <p className="text-sm font-medium">CGPA Results History</p>
          {results ?
            results.map((items) => {
              return (
                <div
                  onClick={() => {
                    setSideNav(false);
                    setInputValues(items[1]);
                  }}
                >
                  <button className="p-2 bg-slate-800 w-full text-left rounded-md text-white">{items[0]}</button>
                </div>
              );
            }) : <p>No results</p>}
        </div>
      </div>
    </div>
  );
}

export default ResultsHistory;
