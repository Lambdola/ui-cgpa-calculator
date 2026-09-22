import {
  BadgePlus,
  Calculator,
  ChevronRight,
  FileClock,
  GraduationCap,
  RefreshCcw,
  View,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import roundToTwo from "../utils/roundToTwo";

function ResultsHistory({
  setSideNav,
  setInputValues,
  setScaleModal,
  scalePref,
}) {
  const [results, setResults] = useState("");
  const [levelsGroup, setLevelsGroup] = useState(null);
  const [scale, setScale] = useState(0);
  const [cgpa, setCGPA] = useState(0);

  useEffect(() => {
    if (window && window.localStorage) {
      let scalePref = localStorage.getItem("UI_CGPA_SCALE_PREFERENCE");
      let history = localStorage.getItem("CGPA");
      if (history) {
        history = JSON.parse(history);
        let groupedByLevels = {};
        for (let record of history) {
          const level = record[4];
          const semester = record[5];
          if (level && semester) {
            if (!groupedByLevels[level]) {
              groupedByLevels[level] = [];
            }
            groupedByLevels[level].push(record);
            groupedByLevels[level].sort((a, b) => Number(a[5]) - Number(b[5]));
          } else {
            const key = "unsaved";
            if (!groupedByLevels[key]) {
              groupedByLevels[key] = [];
            }
            groupedByLevels[key].push(record);
            // groupedByLevels[key].sort((a,b) => Number(a[5]) - Number(b[5]))
          }
        }

        let noOfLevels = 0;
        let levelGPASum = 0;
        for (let lvl in groupedByLevels) {
          if (Number(lvl)) {
            noOfLevels++;
            const levelResults = groupedByLevels[lvl];
            const levelGPA = roundToTwo(
              levelResults.reduce((sum, result) => sum + Number(result[0]), 0) /
                levelResults.length,
            ).toFixed(2)
            

            levelGPASum += Number(levelGPA);
          }
        }
        

        const gpaSum = roundToTwo(levelGPASum / noOfLevels).toFixed(2)
        setCGPA(gpaSum);
        setResults(history);
        setLevelsGroup(groupedByLevels);
      }
      if (scalePref) {
        setScale(parseInt(scalePref));
        // setScaleModal(false);
      }
    }
  }, [scale]);

  function deleteResult(id) {
    let history = localStorage.getItem("CGPA");
    if (history) {
      history = JSON.parse(history);
      const filteredHistory = history.filter((h) => h[3] !== id);
      localStorage.setItem("CGPA", JSON.stringify(filteredHistory));
      setScale(Math.random());
    }
  }

  return (
    <div
      onClick={() => {
        setSideNav(false);
      }}
      className="fixed font-manrope z-20 w-full h-screen bg-black bg-opacity-70 slide-in-left "
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="space-y-2 absolute max-w-[70%] xl:w-1/3 xl:max-w-[300px] h-full bg-white overflow-scroll p-2"
      >
        {/* CGPA Banner */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#193b78] to-[#102f65] px-4 py-3 text-white">
          <div className="relative z-10 flex items-center gap-3">
            <GraduationCap className="h-9 w-9 shrink-0" />

            <div>
              <p className="text-xs text-white/80 font-instrument-serif ">
                Your CGPA is
              </p>

              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold leading-none  ">
                  {cgpa}
                </span>
              </div>
            </div>
          </div>

          {/* Decorative glow */}
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-blue-400/10 blur-xl" />
        </div>

        <div>
          <button
            onClick={() => window.location.reload()}
            className="flex items-start text-left gap-2 bg-slate-700 p-2 rounded-md text-white"
          >
            <div className=" bg-slate-700 rounded-full flex items-center justify-center">
              <Calculator color="#ffffff" size={15} />
            </div>

            <p className="text-xs">Start a new GPA calculation</p>
          </button>
        </div>

        <div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setScaleModal(true);
            }}
            className="flex items-start text-left gap-2 bg-blue-200/20 border p-2 rounded-md"
          >
            <div className=" rounded-full flex items-center justify-center">
              <RefreshCcw size={15} />
            </div>

            <div>
              <p className="text-xs font-semibold">Reset Grade Point Scale</p>
              <p className="text-xs">
                You are currently using {scalePref} pts{" "}
              </p>
            </div>
          </button>
        </div>

        <div className="space-y-0">
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm xl:text-base font-medium object-cover">
              History
            </p>
            {results && (
              <button
                onClick={() => {
                  localStorage.removeItem("CGPA");
                  setResults("");
                }}
                className="text-red-600 text-xs font-bold hover:text-red-700 hover:bg-white py-1 px-2 rounded-md"
              >
                Clear All
              </button>
            )}
          </div>
          <div>
            {levelsGroup &&
              (Object.keys(levelsGroup)?.length ?? 0) > 0 &&
              Object.keys(levelsGroup).map((lvl) => {
                return (
                  <div key={lvl} className="ml-1 mb-2">
                    <p className="font-instrument-serif text-sm font-medium capitalize">
                      {lvl} {Number(lvl) % 100 === 0 && "level"}{" "}
                    </p>
                    <div className="">
                      {levelsGroup[lvl].map((result, idx) => {
                        return (
                          <div key={result[3]}>
                            <p className="px-2 leading-0 text-[10px]">
                              {idx === 0 ? "1st" : "2nd"} semester{" "}
                            </p>
                            <div className="px-2 w-full text-left rounded-md flex items-center gap-2 -mt-1">
                              <div className="">
                                <FileClock strokeWidth={2} size={15} />
                              </div>
                              <div className="flex items-center justify-between w-full">
                                <p className="text-sm">
                                  <span className="text-base">
                                    {" "}
                                    {result[0]}
                                  </span>{" "}
                                  /{result[2]}
                                </p>

                                <div className="text-xs tw-all-center gap-1">
                                  <button
                                    hidden={!result[3]}
                                    onClick={() => deleteResult(result[3])}
                                    className="text-red-500 font-medium"
                                  >
                                    Delete <span className="text-black">/</span>
                                  </button>
                                  <button
                                    onClick={() => {
                                      setSideNav(false);
                                      setInputValues(result[1]);
                                      localStorage.setItem(
                                        "cgpa_calculation_session_id",
                                        result[3],
                                      );
                                    }}
                                    className="text-blue-500 font-medium"
                                  >
                                    Open
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}{" "}
          </div>

          {levelsGroup && (Object.keys(levelsGroup)?.length ?? 0) === 0 && (
            <p className="text-slate-400">No History</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResultsHistory;
