import { useEffect, useMemo, useRef, useState } from "react";
import ui_logo from "./images/ui_logo.jpg";
import naruto from "./images/naruto.jfif";
import CgpaModal from "./components/CgpaModal";
import InputCourseCodeTrue from "./components/InputCourseCodeTrue";
import InputCourseCodeFalse from "./components/InputCourseCodeFalse";
import Header from "./components/Header";
import ResultsHistory from "./components/ResultsHistory";
import { Hourglass, Plus } from "lucide-react";
import roundToTwo from "./utils/roundToTwo";

function App() {
  const [codeState, setCodeState] = useState(false);
  const [inputValues, setInputValues] = useState([]);
  const [sideNav, setSideNav] = useState(false);
  const [scale, setScale] = useState(0);
  const [firstMount, setFirstMount] = useState(true);
  const [scaleModal, setScaleModal] = useState(true);
  const [cgpaState, setCgpaState] = useState({
    cgpa: 0,
    degreeClass: "",
    rank: "",
    state: false,
    text: "",
  });
  const [noOfCourses, setNoOfCourses] = useState("");

  const noOfCoursesRef = useRef(null);

  const scalePref = useMemo(() => {
    if (window && window.localStorage) {
      let scalePref = localStorage.getItem("UI_CGPA_SCALE_PREFERENCE");
      if (scalePref) {
        setScale(parseInt(scalePref));
        firstMount && setScaleModal(false);
        setFirstMount(false);
        return scalePref;
      }
      return null;
    }
    return null;
  }, [scaleModal]);

  useEffect(() => {
    // set a session id
    const cgpa_calculation_session_id = localStorage.getItem(
      "cgpa_calculation_session_id",
    );
    if (!cgpa_calculation_session_id) {
      localStorage.setItem("cgpa_calculation_session_id", crypto.randomUUID());
    }

    const markedResults = localStorage.getItem("markedResults");

    if (!markedResults || markedResults !== "yes") {
      let results = localStorage.getItem("CGPA");

      if (results) {
        results = JSON.parse(results);
        const _markedResults = results.map((result) => {
          if (result.length === 3) {
            return [...result, crypto.randomUUID()];
          }
          return result;
        });

        localStorage.setItem("CGPA", JSON.stringify(_markedResults));
        localStorage.setItem("markedResults", "yes");
      }
    }
  }, []);

  function handleInputRender(e) {
    let arr = [];
    let val = e.target.value.trim();
    if (isNaN(Number(val)) || !Number(val)) {
      setNoOfCourses("");
      setInputValues([]);
      return;
    }

    arr.length = Number(val);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = {
        id: i,
        code: "",
        unit: "",
        grade: "",
        aggregate: {
          value: "",
          color: "",
        },
      };
    }
    setInputValues(arr);
    setNoOfCourses(val);
    localStorage.removeItem("cgpa_calculation_session_id");
    localStorage.setItem("cgpa_calculation_session_id", crypto.randomUUID());
    // e.target.value = ""
  }

  function evaluateGrade(name, val) {
    let ele = document.getElementById(name);
    if (val.length < 1) {
      ele.innerHTML = "";
      return -2;
    }

    val = parseInt(val);
    if (val < 0 || val > 100) {
      ele.innerHTML = " ";
      inputValues[name].aggregate.value = " ";
      inputValues[name].aggregate.color = "text-red-600";
      return -1;
    }
    if (val >= 70) {
      ele.innerHTML = "A";
      inputValues[name].aggregate.value = "A";
      inputValues[name].aggregate.color = "text-green-600";
      return Number(scalePref) === 4 ? 4 : 5;
    }
    if (val >= 60 && val < 70) {
      ele.innerHTML = "B";
      inputValues[name].aggregate.value = "B";
      inputValues[name].aggregate.color = "text-blue-600";
      return Number(scalePref) === 4 ? 3 : 4;
    }
    if (val >= 50 && val < 60) {
      ele.innerHTML = "C";
      inputValues[name].aggregate.value = "C";
      inputValues[name].aggregate.color = "text-orange-600";
      return Number(scalePref) === 4 ? 2 : 3;
    }
    if (val >= 45 && val < 50) {
      ele.innerHTML = "D";
      inputValues[name].aggregate.value = "D";
      inputValues[name].aggregate.color = "text-purple-600";
      return Number(scalePref) === 4 ? 1 : 2;
    }
    if (val >= 40 && val < 45) {
      ele.innerHTML = "E";
      inputValues[name].aggregate.value = "E";
      inputValues[name].aggregate.color = "text-red-600";
      return Number(scalePref) === 4 ? 0 : 1;
    }
    if (val < 40) {
      ele.innerHTML = "F";
      inputValues[name].aggregate.value = "F";
      inputValues[name].aggregate.color = "text-gray-900";
      return Number(scalePref) === 4 ? 0 : 0;
    }
  }

  function handleInput(e) {
    let cgpa_calculation_session_id = localStorage.getItem(
      "cgpa_calculation_session_id",
    );
    if (cgpa_calculation_session_id) {
      localStorage.removeItem("cgpa_calculation_session_id");
    }
    // gets the properties of the input tag that triggered this function call
    let name = e.target.name;
    let val = e.target.value;

    // cleans the name to get the particular row and column of the input tag that triggered this function call
    let nameSplit = name.split(",");
    let itemKey = parseInt(nameSplit[0]);
    let itemValue = nameSplit[1];
    let selectItem, copyInputValue;
    if (itemValue === "unit" || itemValue === "grade") {
      // check and handles if value of the "unit" and "grade" input is a number or not(float, string)
      let intVal = parseInt(val);
      if (val != intVal.toString() && val.length > 1) {
        return;
      }
      // check and handles if value of the "unit" and "grade" input is a number or not(float, string)
      if (!intVal || val.toString().length < 1) {
        if (itemValue === "grade") {
          evaluateGrade(itemKey, val);
        }

        selectItem = { ...inputValues[itemKey], [itemValue]: "" };
        copyInputValue = [...inputValues];
        copyInputValue[itemKey] = selectItem;
        setInputValues(copyInputValue);
        return NaN;
      }

      // check and handle if the value of the "unit" input is no less than 1 or greater than 4
      if (itemValue === "unit" && (val < 1 || val > 6)) {
        return "Invalid Input";
      }
    }
    if (itemValue === "grade") {
      let res = evaluateGrade(itemKey, val);
      if (res < 0) {
        selectItem = { ...inputValues[itemKey], [itemValue]: "" };
        copyInputValue = [...inputValues];
        copyInputValue[itemKey] = selectItem;
        setInputValues(copyInputValue);
        return NaN;
      }
    }

    // updates the value of the particular input tag that triggered this function call
    selectItem = { ...inputValues[itemKey], [itemValue]: val };
    copyInputValue = [...inputValues];
    copyInputValue[itemKey] = selectItem;
    setInputValues(copyInputValue);
  }

  function handleSubmit(e) {
    e.preventDefault();
    window.scrollTo(0, 0);
    let total_units = 0;
    let gpa = 0;
    for (let items of inputValues) {
      total_units += parseInt(items.unit);
      let degree = evaluateGrade(items.id, items.grade);
      if (degree < 0) {
        alert("Seems you filled the courses wrong");
        return;
      } else {
        gpa += degree * parseInt(items.unit);
      }
    }
    let cgpa = gpa / total_units;
    cgpa = roundToTwo(cgpa).toFixed(2);
    let text, degreeClass, rank;
    const firstClass = Number(scalePref) === 4 ? cgpa >= 3.5 : cgpa >= 4.5;
    const secondClassUpper =
      Number(scalePref) === 4 ? cgpa >= 3.0 : cgpa >= 3.5;
    const secondClassLower =
      Number(scalePref) === 4 ? cgpa >= 2.0 : cgpa >= 2.4;
    const thirdClass = Number(scalePref) === 4 ? cgpa >= 1.0 : cgpa >= 1.5;
    const pass = Number(scalePref) === 4 ? cgpa < 1.0 : cgpa >= 1;
    // const fail = Number(scalePref) === 4 ? cgpa < 1.0 : cgpa < 1;
    if (firstClass) {
      text =
        "Excellence personified! You aren't just reaching for the stars; you're setting the pace. Keep that fire burning. Best Graduating Student (BGS) loading...";
      degreeClass = "First Class Honours";
      rank = "";
    } else if (secondClassUpper) {
      text =
        "You are within touching distance of greatness. One final push, one extra hour, one more milestone. You have the brilliance; now finish strong!";
      degreeClass = "Second Class Honours";
      rank = "(Upper Division)";
    } else if (secondClassLower) {
      text =
        "Your journey is a marathon, not a sprint. Every effort counts, and your potential is still untapped. Don't relent now; the breakthrough is coming.";
      degreeClass = "Second Class Honours";
      rank = "(Lower Division)";
    } else if (thirdClass) {
      text =
        "The comeback is always stronger than the setback. Refuse to be defined by a grade. Fight for every inch, because 'na who give up fuck up.' Dig deep!";
      degreeClass = "Third Class Honours";
      rank = "";
    } else if (pass) {
      text =
        "You're still in the race, and as long as you're running, you can win. Steel your resolve. It’s time to show the world the heart of a survivor.";
      degreeClass = "Pass";
      rank = "";
    } else {
      text =
        "The story isn't over yet. A fall is just a setup for a legendary rise. Dust yourself off, change the strategy, and go again. It’s not over until YOU win.";
      degreeClass = "Fail";
      rank = "";
    }

    // alert(JSON.stringify(inputValues))
    let cgpa_calculation_session_id = localStorage.getItem(
      "cgpa_calculation_session_id",
    );

    if (!cgpa_calculation_session_id) {
      const id = crypto.randomUUID();
      cgpa_calculation_session_id = id;
      localStorage.setItem("cgpa_calculation_session_id", id);
    }

    let results = localStorage.getItem("CGPA");
    let resultsArrHistory;
    if (results) {
      results = JSON.parse(results);
      const existingResult = results.find(
        (result) => result[3] === cgpa_calculation_session_id,
      );
      if (existingResult) {
        setCgpaState({
          ...cgpaState,
          cgpa: cgpa,
          degreeClass: degreeClass,
          rank: rank,
          state: true,
          text: text,
        });
        return;
      }

      resultsArrHistory = [
        ...results,
        [cgpa, inputValues, scalePref, cgpa_calculation_session_id],
      ];
      localStorage.setItem("CGPA", JSON.stringify(resultsArrHistory));
    } else {
      // alert("no")
      resultsArrHistory = [
        [cgpa, inputValues, scalePref, cgpa_calculation_session_id],
      ];
      localStorage.setItem("CGPA", JSON.stringify(resultsArrHistory));
    }

    setCgpaState({
      ...cgpaState,
      cgpa: cgpa,
      degreeClass: degreeClass,
      rank: rank,
      state: true,
      text: text,
    });
  }

  function handleAddMoreCourses() {
    let copyArr = [...inputValues];
    copyArr.push({
      id: inputValues.length,
      code: "",
      unit: "",
      grade: "",
      aggregate: {
        value: "",
        color: "",
      },
    });
    if (noOfCoursesRef && noOfCoursesRef.current) {
      noOfCoursesRef.current.value = inputValues.length + 1;
      setNoOfCourses(String(inputValues.length + 1));
    }
    setInputValues(copyArr);
  }

  function deleteInput(id) {
    let filterValues = inputValues.filter((items) => items.id !== id);
    let mappedFilteredValues = filterValues.map((input, idx) => ({
      ...input,
      id: idx,
    }));

    if (noOfCoursesRef && noOfCoursesRef.current) {
      const length = mappedFilteredValues.length;
      noOfCoursesRef.current.value = length;
      if (length === 0) {
        setNoOfCourses("");
        setInputValues([]);
        return;
      }

      setNoOfCourses(String(length));
    }

    setInputValues(mappedFilteredValues);
    localStorage.removeItem("cgpa_calculation_session_id");
    localStorage.setItem("cgpa_calculation_session_id", crypto.randomUUID());
  }

  function setScaleState(val) {
    if (val === scale) {
      setScale(0);
      return;
    }
    setScale(val);
  }

  function saveScale() {
    localStorage.setItem("UI_CGPA_SCALE_PREFERENCE", scale);
    setTimeout(() => {
      setScaleModal(false);
    }, 500);
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {scaleModal && (
        <div className="absolute z-40 h-screen w-full bg-stone-200 tw-all-center p-5">
          <div className="space-y-5">
            <div>
              <h2 className="font-bold font-instrument-serif text-center  md:text-lg">
                Are you using a 4-point or a 5-point scale ?
              </h2>
              {scale !== 0 ? (
                <p className="text-sm  font-instrument-serif text-center text-gray-500 font-medium md:text-lg">
                  Click again to show both options
                </p>
              ) : (
                <p className="text-sm  font-instrument-serif text-center text-gray-500 font-medium md:text-lg">
                  You can edit your choice later on
                </p>
              )}
            </div>

            <div className="flex justify-center gap-2 md:gap-5 transition-a duration-">
              <div
                className={`w-[40vw] max-w-[200px] aspect-[1/1.5 bg-white ${scale === 5 ? "hidden" : ""} rounded-xl overflow-hidden p-1`}
              >
                <button onClick={() => setScaleState(4)} className="w-full">
                  <figure className="w-full aspect-square bg-yellow-500 rounded-lg p-5 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <div className="w-3 h-3 rounded-full bg-black"></div>
                      <div className="w-3 h-3 rounded-full bg-black"></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="w-3 h-3 rounded-full bg-black"></div>
                      <div className="w-3 h-3 rounded-full bg-black"></div>
                    </div>
                  </figure>
                  <p className="p-1  font-instrument-serif text-sm  text-gray-800 font-bold rounded-full text-center">
                    4-Point Scale
                  </p>
                </button>
              </div>
              <div
                className={`w-[40vw] max-w-[200px] aspect-[1/1.5 bg-white ${scale === 4 ? "hidden" : ""} rounded-xl overflow-hidden p-1`}
              >
                <button onClick={() => setScaleState(5)} className="w-full">
                  <figure className="w-full aspect-square bg-yellow-500 rounded-lg p-5 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <div className="w-3 h-3 rounded-full bg-black"></div>
                      <div className="w-3 h-3 rounded-full bg-black"></div>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-black"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="w-3 h-3 rounded-full bg-black"></div>
                      <div className="w-3 h-3 rounded-full bg-black"></div>
                    </div>
                  </figure>
                  <p className=" p-1  font-instrument-serif text-sm  text-gray-800 font-bold rounded-full text-center">
                    5-Point Scale
                  </p>
                </button>
              </div>
            </div>
            <div
              className={`w-full tw-all-center mt-5 ${scale === 0 ? "opacity-0" : "opacity-100"}`}
            >
              <button
                onClick={saveScale}
                className="bg-blue-500  font-instrument-serif text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      <Header setSideNav={setSideNav} />

      {/* side nav results history panel */}
      {sideNav && (
        <ResultsHistory
          setSideNav={setSideNav}
          setInputValues={setInputValues}
          setScaleModal={setScaleModal}
          scalePref={scalePref}
        />
      )}

      {/* CGPA modal score popup */}
      {cgpaState.state && (
        <CgpaModal cgpaState={cgpaState} setCgpaState={setCgpaState} />
      )}

      {/* main code body */}
      <div className="relative p-3 h-full pt-10 md:pt-10 overflow-auto md:overflow-hidden">
        {/* transparent background UI logo */}
        <div className="opacity-5 -z-10 w-[80%] right-[10%] mx-auto bg-red-50 fixed top-[30vh] md:w-[60%] xl:w-[40%] md:right-[20%] xl:right-[30%] md:h-[50vh] xl:h-[70vh] md:top-[40vh] xl:top-[20vh] ">
          <img src={ui_logo} className="w-full h-full object-contain" />
        </div>

        {/* desktop sub-header */}
        <div className="hidden md:block items-center justify-center py-2">
          <div className=" w-full md:w-[80%] mx-auto">
            <p className=" font-bold font-instrument-serif text-center text-4xl">
              UNIVERSITY OF IBADAN
            </p>
            <p className="text-center font-manrope text-slate-700 text-sm leading-5 font-manrope">
              A University of Ibadan standard C.G.P.A calculator using a scale
              of {scalePref ? scalePref : "4 or 5"} points.
            </p>
            <p className="text-center font-manrope text-sm text-slate-500">
              (per semester GPA calculator)
            </p>
          </div>

          <div className="">
            <p className="text-sm text-center text-slate-500 font-manrope">
              Designed & Developed by{" "}
              <a
                href="https://x.com/elijahdimeji549"
                rel="noreferrer"
                target="_blank"
                className="text-blue-700 underline underline-offset-4 hover:text-red-400"
              >
                Olalekan Oladimeji{" "}
              </a>{" "}
            </p>
            <p className="text-sm text-center text-slate-600 font-manrope">
              <span>&#169; 2023 - {new Date().getFullYear()}. </span> All Rights
              Reserved.
            </p>
          </div>
        </div>

        {/* mobile sub-header */}
        <div className="md:hidden flex flex-wrap items-center justify-center py-2 bg-red-30">
          <div className="">
            <p className="text-center font-manrope text-slate-700 text-sm leading-5 md:text-lg md:mt-1 xl:text-2xl xl:text-left">
              A University of Ibadan standard C.G.P.A calculator using a scale
              of {scalePref ? scalePref : "4 or 5"} points.
            </p>
            <p className="text-center font-manrope text-sm text-slate-500 xl:text-left">
              (per semester GPA calculator)
            </p>
          </div>

          <div className="md:hidden w-full space-y- mt-1">
            <p className="text-sm text-center text-slate-500">
              Developed by{" "}
              <a
                href="https://x.com/elijahdimeji549"
                rel="noreferrer"
                target="_blank"
                className="text-blue-700 underline underline-offset-4 hover:text-red-400"
              >
                Olalekan Oladimeji{" "}
              </a>{" "}
            </p>
            <p className="text-sm text-center text-slate-600">
              <span>&#169; 2023 - {new Date().getFullYear()}. </span> All Rights
              Reserved.
            </p>
          </div>
        </div>

        {/* desktop courses list */}
        <div className="h-[calc(100%-100px)] items-start gap-10 md:max-lg:gap-5 hidden md:flex max-w-[1280px] mx-auto">
          {/* input field for number of courses */}
          <aside className="w-[40%] max-w-[300px]">
            <div className="w-full">
              <input
                ref={noOfCoursesRef}
                onChange={handleInputRender}
                value={noOfCourses}
                placeholder="Enter number of courses"
                autoFocus
                className="w-full appearance-none outline-none h-10 p-2 rounded-md text-lg md:text-2xl border border-stone-400 bg-[rgba(194,192,213,0.3)] placeholder:text-lg font-manrope"
              />
            </div>

            {inputValues.length > 0 && (
              <div className="flex items-center my-2 md:text-center md:mt-2">
                {/* controls the "input course code" checkbox */}
                <div className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={codeState}
                    onChange={() => setCodeState(!codeState)}
                    className="w-5 h-5 md:max-lg:w-4 md:max-lg:h-4 border cursor-pointer"
                  />
                </div>

                <p className="font-medium font-manrope ml-1 md:max-lg:ml-0.5 text-xl md:max-lg:text-sm">
                  Show Course Code
                </p>
              </div>
            )}

            {inputValues.length !== 0 && (
              <button type="button" onClick={handleAddMoreCourses}>
                <div className="flex items-center gap-1 mt-5">
                  <div className="h-5 w-5 bg-red-40 flex items-center justify-center">
                    <Plus color="#1e40af" size={20} />
                  </div>
                  <p className="text-lg text-blue-500 font-bold font-manrope  md:max-lg:text-sm">
                    Add another course
                  </p>
                </div>
              </button>
            )}

            {inputValues.length !== 0 && (
              <div className="bg-red-30 rounded-xl w-40 xl:w-full mx-auto">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="relative w-40 xl:w-56 bg-blue-500 font-bold h-16 xl:h-16 xl:mt-5 mx-auto text-lg xl:text-2xl rounded-xl text-white hover:bg-blue-700 font-manrope"
                >
                  Calculate CGPA
                </button>
              </div>
            )}
          </aside>

          {/* course list desktop */}
          <form
            onSubmit={handleSubmit}
            className="h-full overflow-auto no-scrollbar w-full pb-10"
          >
            {inputValues.length > 0 &&
              inputValues.map((item) => {
                return codeState ? (
                  <InputCourseCodeTrue
                    key={item.id}
                    item={item}
                    handleInput={handleInput}
                    inputValues={inputValues}
                    deleteInput={deleteInput}
                  />
                ) : (
                  <InputCourseCodeFalse
                    key={item.id}
                    item={item}
                    handleInput={handleInput}
                    inputValues={inputValues}
                    deleteInput={deleteInput}
                  />
                );
              })}

            {inputValues.length === 0 && (
              <div className="size-full bg-stone-200/80 h-full tw-all-center">
                <div className="tw-all-center flex-col animate-pulse">
                  <Hourglass size={40} />
                  <p>Waiting for your input</p>
                </div>
              </div>
            )}
          </form>

          <aside className="font-manrope md:max-lg:max-w-[250px] max-w-[300px]">
            <p className="font-bold text-xl">Are you an anime lover ?</p>

            <p>
              If no, try to watch{" "}
              <a
                href="https://animepahe.pw/anime/a52b33da-140d-4047-7f25-4dac253bc538"
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 underline italic"
              >
                Death note
              </a>{" "}
              as your first anime. If yes, rewatch{" "}
              <a
                href="https://animepahe.pw/anime/4420c9ee-ae49-75ed-cc96-cbf524915b10"
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 underline italic"
              >
                AOT
              </a>{" "}
              again.
            </p>

            <figure
              style={{
                backgroundImage: `url(${naruto})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
              }}
              className="h-40 w-full rounded-md"
            >
              {/* <img src={naruto} className="w-full h-full object-contain" /> */}
            </figure>

            <p className="text-sm">
              This is not an ad. This is just me, misusing this platform to
              force more people to watch anime 😁😁😁. I also updated the user
              interface for you as a bribe for putting this banner here. Thanks
              for using this tool. It means alot
            </p>
          </aside>
        </div>

        {/* mobile courses list */}
        <div className="md:hidden">
          {/* input field for number of courses */}
          <div className="">
            <div className="md:w-[50%] md:mx-auto xl:mx-0 xl:w-full bg-red-80 mt-2">
              <input
                ref={noOfCoursesRef}
                onChange={handleInputRender}
                value={noOfCourses}
                placeholder="Enter number of courses"
                autoFocus
                type="number"
                className="w-[80%] appearance-none outline-none h-10 p-2 rounded-md text-lg md:text-2xl border-2 border-blue-300 bg-[rgba(194,192,213,0.3)] placeholder:text-sm md:placeholder:text-xl md:w-full md:h-12"
              />
            </div>

            {inputValues.length > 0 && (
              <div className="flex items-center my-2 md:text-center md:mt-2">
                {/* controls the "input course code" checkbox */}
                <div className="bg-red-40 w-7 flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={codeState}
                    onChange={() => setCodeState(!codeState)}
                    className="w-5 h-5 border  md:h-6 md:w-6"
                  />
                </div>

                <p className="font-medium text-sm font-manrope ml-1 md:text-2xl">
                  Show Course Code
                </p>
              </div>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-1 lg:overflow-auto overflow-scroll mt-3 no-scrollbar"
          >
            {inputValues.map((item) => {
              return codeState ? (
                <InputCourseCodeTrue
                  key={item.id}
                  item={item}
                  handleInput={handleInput}
                  inputValues={inputValues}
                  deleteInput={deleteInput}
                />
              ) : (
                <InputCourseCodeFalse
                  key={item.id}
                  item={item}
                  handleInput={handleInput}
                  inputValues={inputValues}
                  deleteInput={deleteInput}
                />
              );
            })}

            {inputValues.length !== 0 && (
              <button type="button" onClick={handleAddMoreCourses}>
                <div className="flex items-center gap-1 my-3 font-manrope">
                  <div className="h-5 w-5 bg-red-40 flex items-center justify-center">
                    <Plus color="#1e40af" />
                  </div>
                  <p className="text-sm text-blue-500 font-bold">
                    Add another course
                  </p>
                </div>
              </button>
            )}

            {/* only show the "calculate CGPA button" if there are rendered course fields */}
            {inputValues.length !== 0 && (
              <div className="bg-red-800 rounded-xl w-40 xl:w-80 mx-auto">
                <button
                  type="submit"
                  className="font-manrope relative w-40 xl:w-56 bg-blue-500 font-bold h-12 xl:h-20 mx-auto xl:text-2xl rounded-xl text-white hover:bg-blue-700"
                >
                  Calculate CGPA
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
