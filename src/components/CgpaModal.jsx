import { Check } from "lucide-react";
import React, { useRef, useState } from "react";

function CgpaModal({ cgpaState, setCgpaState }) {
  const [saveResult, setSaveResult] = useState(false);
  const [semester, setSemester] = useState(1);

  const levelRef = useRef(null);

  function closeCGPAModal() {
    setCgpaState({ ...cgpaState, state: false });
    // localStorage.removeItem("cgpa_calculation_session_id");
  }

  function _saveResult() {
    let level = null;
    if (levelRef && levelRef.current) {
      level = levelRef.current.value;
    }

    if (!Number(level)) {
      alert("Input your level");
      return;
    }
    if (level.length !== 3) {
      alert("Expected level to be a 3-digit input, e.g. 100,200,300");
      return;
    }

    if (level % 100 !== 0) {
      alert("Expected level to be in multiple of 100's, e.g. 100,200,300");
      return;
    }

    const cgpa_calculation_session_id = localStorage.getItem(
      "cgpa_calculation_session_id",
    );
    let results = localStorage.getItem("CGPA");

    if (results) {
      results = JSON.parse(results);
      const existingLevelAndSemester = results.filter(
        (result) =>
          String(result[4]) === String(level) &&
          String(result[5]) === String(semester),
      );
      if (existingLevelAndSemester) {
        alert(
          `You have already saved a result for ${level} level, ${semester === 1 ? "1st" : "2nd"} semester`,
        );
        return;
      }
      const levelResults = results.filter((result) => result[4] === level);

      if (levelResults.length === 2) {
        alert("You have already saved two semesters results for this level");
        return;
      }

      const resultIndex = results.findIndex(
        (result) => result[3] === cgpa_calculation_session_id,
      );
      if (resultIndex === -1) alert("Error saving result");

      const resultToSave = results[resultIndex];
      let resultsCopy = [...results];
      const newResultCopy = [...resultToSave, level, semester];
      resultsCopy.splice(resultIndex, 1, newResultCopy);

      localStorage.setItem("CGPA", JSON.stringify(resultsCopy));
      alert("Result Saved");
      setSaveResult(false);
      closeCGPAModal();
    }
  }

  if (saveResult) {
    return (
      <div className="fixed font-manrope z-30 w-full h-screen bg-white slide-in-lef p-3">
        <div>
          <p className="font-medium text-lg">
            Save Result as a semester result
          </p>
          <p className="text-sm">
            Select your level and semester to save this result
          </p>
          <p className="text-red-400 text-xs">
            *Calculation history is saved locally on your device. Your data will
            not persist across different browsers or devices.
          </p>
        </div>

        <div className="flex justify-cente gap-2 md:gap-5 mt-5">
          <div
            className={`w-[40vw] max-w-[200px] aspect-[1/1.5 bg-white  rounded-xl overflow-hidde p-1`}
          >
            <div className={`${semester === 2 && "opacity-60"}`}>
              <button
                onClick={() => setSemester(1)}
                className={`${semester === 1 && " ring-2 ring-offset-2 ring-black"} relative w-full outline-none  aspect-square bg-yellow-500 rounded-2xl p-5 tw-all-center`}
              >
                {semester === 1 && (
                  <div className="absolute z-40 -bottom-1 -right-1 w-5 h-5 bg-black rounded-full tw-all-center text-white">
                    <Check size={13} />
                  </div>
                )}
                <div className="w-3 h-3 rounded-full bg-black"></div>
              </button>
              <p className="p-1  font-instrument-serif text-sm  text-gray-800 font-bold rounded-full text-center">
                1st semester
              </p>
            </div>
          </div>
          <div
            className={`w-[40vw] max-w-[200px] aspect-[1/1.5 bg-white rounded-xl overflow-hidde p-1`}
          >
            <div className={`${semester === 1 && "opacity-60"}`}>
              <button
                onClick={() => setSemester(2)}
                className={`${semester === 2 && " ring-2 ring-offset-2 ring-black"} relative w-full outline-none aspect-square bg-yellow-500 rounded-2xl p-5 flex flex-col justify-between`}
              >
                {semester === 2 && (
                  <div className="absolute z-40 -bottom-1 -right-1 w-5 h-5 bg-black rounded-full tw-all-center text-white">
                    <Check size={13} />
                  </div>
                )}
                <div className="flex items-center justify-end">
                  <div className="w-3 h-3 rounded-full bg-black"></div>
                </div>
                <div className="w-3 h-3 rounded-full bg-black"></div>
              </button>
              <p className=" p-1  font-instrument-serif text-sm  text-gray-800 font-bold rounded-full text-center">
                2nd semester
              </p>
            </div>
          </div>
        </div>

        <div>
          <label>Level</label>
          <div>
            <input
              ref={levelRef}
              maxLength={3}
              minLength={3}
              placeholder="e.g. 100, 200, 300, 400"
              autoFocus
              className="w-[80%] h-10 p-2 rounded-md text-lg md:text-2xl border-2 border-blue-300 bg-[rgba(194,192,213,0.3)] placeholder:text-sm md:placeholder:text-xl md:w-full md:h-12"
            />
          </div>
        </div>

        <div onClick={_saveResult}>
          <button className="bg-black text-white my-2 py-2 text-center rounded-md w-full tw-all-center mt-5">
            Save result
          </button>
        </div>
        <div onClick={closeCGPAModal}>
          <button className="border border-red-500 text-red-500 my-2 py-2 text-center rounded-md w-full tw-all-center mt-2">
            Cancel
          </button>
        </div>
      </div>
    );
  }
  return (
    <div onClick={closeCGPAModal}>
      <div className="fixed top-0 bottom-0 z-10 w-full h-full bg-[rgba(77,73,73,1)] tw-all-center font-manrope">
        <div className="relative max-w-[90vw] lg:max-w-[30vw] space-y-3">
          <div className="text-center text-white space-y-7 bg-[rgba(24,23,54,0.8)] border border-gray-800 rounded-lg  p-3 md:p-10 xl:p-8 shadow-md shadow-gray-900 bg-red-20">
            <div>
              <p className="font-medium text-lg xl:text-xl text-gray-400 font-instrument-serif">
                Your G.P.A is:{" "}
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
          <div
            onClick={(e) => {
              e.stopPropagation();
              setSaveResult(true);
            }}
          >
            <button className="bg-white my-2 p-3 text-center rounded-md w-full tw-all-center">
              Save result
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CgpaModal;
