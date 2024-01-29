import { createElement, useState } from "react";
import ui_logo from "./images/ui_logo.jpg";
import CgpaModal from "./components/CgpaModal";
import InputCourseCodeTrue from "./components/InputCourseCodeTrue";
import InputCourseCodeFalse from "./components/InputCourseCodeFalse";


function App() {
  const [number, setNumber] = useState(0);
  const [codeState, setCodeState] = useState(true);
  const [inputValues, setInputValues] = useState([]);
  const [cgpaState, setCgpaState] = useState({
    cgpa: 0,
    degreeClass: "",
    rank: "",
    state: false,
    text: "",
  });

  function handleInputRender(e) {
    let arr = [];
    let val = e.target.value;
    arr.length = val;
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
  }
  

  function evaluateGrade(name, val) {
    let ele = document.getElementById(name);
    if (val.length < 1) {
      ele.innerHTML = "";
      return -2;
    }
    val = parseInt(val);
    if (val < 0 || val > 100) {
      ele.innerHTML = "--";
      inputValues[name].aggregate.value = "--";
      inputValues[name].aggregate.color = "text-red-600";
      return -1;
    }
    if (val >= 70) {
      ele.innerHTML = "A";
      inputValues[name].aggregate.value = "A";
      inputValues[name].aggregate.color = "text-green-600";
      return 4;
    }
    if (val >= 60 && val < 70) {
      ele.innerHTML = "B";
      inputValues[name].aggregate.value = "B";
      inputValues[name].aggregate.color = "text-blue-600";
      return 3;
    }
    if (val >= 50 && val < 60) {
      ele.innerHTML = "C";
      inputValues[name].aggregate.value = "C";
      inputValues[name].aggregate.color = "text-orange-600";
      return 2;
    }
    if (val >= 45 && val < 50) {
      ele.innerHTML = "D";
      inputValues[name].aggregate.value = "D";
      inputValues[name].aggregate.color = "text-purple-600";
      return 1;
    }
    if (val < 45) {
      ele.innerHTML = "E";
      inputValues[name].aggregate.value = "E";
      inputValues[name].aggregate.color = "text-red-600";
      return 0;
    }
  }

  function handleInput(e) {
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
      if (itemValue === "unit" && (val < 1 || val > 4)) {
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
    let total_units = 0;
    let gpa = 0;
    for (let items of inputValues) {
      // alert(items)
      total_units += parseInt(items.unit);
      let degree = evaluateGrade(items.id, items.grade);
      if (degree < 0) {
        alert("Ooops");
      } else {
        gpa += degree * parseInt(items.unit);
      }
    }
    let cgpa = gpa / total_units;
    cgpa = cgpa.toFixed(2);
    let text, degreeClass, rank;
    if (cgpa >= 3.5) {
      text = "Iwe !!! \nKeep soaring high. The sky is the limit.\nBGS incoming";
      degreeClass = "First Class Honours";
      rank = "";
    } else if (cgpa >= 3.0) {
      text = "With a little more effort, anything is possible.Almost there.";
      degreeClass = "Second Class Honours";
      rank = "(Upper Division)";
    } else if (cgpa >= 2.0) {
      text = "Keep pushing.\nYou can do it. Dont relent";
      degreeClass = "Second Class Honours";
      rank = "(Lower Division)";
    } else if (cgpa >= 1.0) {
      text = "Dont give up. Push and fight.\nNaa who give up fuck up.";
      degreeClass = "Third Class Honours";
      rank = "";
    } else {
      text = "Dont give up. Push and fight.\nIt is not over until it is over.";
      degreeClass = " --- ";
      rank = "";
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

  return (
    <div>
      {cgpaState.state && (
        <CgpaModal cgpaState={cgpaState} setCgpaState={setCgpaState} />
      )}
      <div className="relative bg-yellow-30 p-3">
        {/* transparent background UI logo */}
        <div className="opacity-10 -z-10 w-[80%] right-[10%] mx-auto bg-red-50 fixed top-[30vh] md:w-[60%] xl:w-[40%] md:right-[20%] xl:right-[30%] md:h-[50vh] xl:h-[70vh] md:top-[40vh] xl:top-[20vh] ">
          <img src={ui_logo} className="w-full h-full object-cover" />
        </div>

        <div className="mb-5 w-20 h-20 mx-auto text-center md:w-28 md:h-28 xl:w-32 xl:h-32">
          <img src={ui_logo} />
        </div>
        <p className="text-2xl font-bold font-sans text-center md:text-4xl md:mt-7">
          UNIVERSITY OF IBADAN
        </p>
        <p className="text-center md:text-lg font-medium md:mt-1 xl:text-2xl">
          A University of Ibadan standard C.G.P.A calculator using a scale of
          4.0
        </p>
        <p className="text-center text-slate-600">( Per semester/session calculator )</p>

        <div className="text-left my-2 md:text-center md:mt-7">
          <input
            type="checkbox"
            defaultChecked={true}
            onClick={() => setCodeState(!codeState)}
            className="w-5 h-5 border md:h-6 md:w-6"
          />
          <span className="font-semibold text-lg ml-3 md:text-2xl">
            Input Course Code
          </span>
        </div>

        <div className="md:w-[50%] md:mx-auto bg-red-20">
          <input
            onChange={handleInputRender}
            type="number"
            placeholder="Total number of courses"
            className="w-[80%] p-2 rounded-md text-lg md:text-2xl border-2 border-blue-300 bg-[rgba(194,192,213,0.3)] font-medium placeholder:text-base md:placeholder:text-xl md:w-full md:h-12 "
          />
        </div>
        <form
          onSubmit={handleSubmit}
          className="space-y-1 bg-red-40 h-[60vh lg:h-auto lg:overflow-auto overflow-scroll mt-3 md:w-[90%] md:mx-auto no-scrollbar"
        >
          {inputValues.map((item) => {
            return codeState ? (
              <InputCourseCodeTrue
                item={item}
                handleInput={handleInput}
                inputValues={inputValues}
              />
            ) : (
              <InputCourseCodeFalse
                item={item}
                handleInput={handleInput}
                inputValues={inputValues}
              />
            );
          })}
          {inputValues.length !== 0 && (
            <div className="bg-red-30 w-40 mx-auto">
              <button
                type="submit"
                className="relative w-40 xl:w-56 bg-blue-500 font-bold h-16 xl:h-20 mx-auto text-lg xl:text-2xl rounded-xl text-white hover:bg-blue-700"
              >
                Calculate CGPA
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default App;
