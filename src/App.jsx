import { createElement, useState } from 'react';
import ui_logo from './images/ui_logo.jpg';
import CgpaModal from './components/CgpaModal';


function App() {
  const [number, setNumber] = useState(0);
  const [codeState, setCodeState] = useState(true);
  const [inputValues, setInputValues] = useState([]);
  const [cgpaState, setCgpaState] = useState({
    cgpa: 0,
    degreeClass: "",
    state: false,
    text: ""
  });
  
  
  function handleInputRender(e) {
    let arr = [];
    let val = e.target.value;
    arr.length = val;
    for (let i = 0; i < arr.length; i++){
      arr[i] = {
        id: i,
        code: "",
        unit: "",
        grade: "",
        aggregate: {
          value: "",
          color: ""
        }
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
    let nameSplit = name.split(',');
    let itemKey = parseInt(nameSplit[0]);
    let itemValue = nameSplit[1];
    let selectItem, copyInputValue;
    if (itemValue === "unit" || itemValue === "grade") {
      let intVal = parseInt(val);
      // check and handles if value of the "unit" and "grade" input is a number or not
      if (!intVal || (val.toString().length < 1)) {
        if (itemValue === "grade") {
          evaluateGrade(itemKey, val);
        }
        
        selectItem = { ...inputValues[itemKey], [itemValue]: "" }
        copyInputValue = [...inputValues];
        copyInputValue[itemKey] = selectItem;
        setInputValues(copyInputValue);
        return NaN;
      }

      // check and handle if the value of the "unit" input is no less than 1 or greater than 4
      if (itemValue === "unit" && (val < 1 || val > 4) ){
          return "Invalid Input";
      }
    }
    if (itemValue === "grade") {
      evaluateGrade(itemKey, val);
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
    for(let items of inputValues) {
      // alert(items)
      total_units += parseInt(items.unit);
      let degree = evaluateGrade(items.id, items.grade);
      if (degree < 0) {
        alert("Ooops");
      } else {
        gpa += degree *  parseInt(items.unit);
      }
    }
    let cgpa = gpa / total_units;
    cgpa = cgpa.toFixed(2);
    let text, degreeClass;
    if (cgpa >= 3.50) {
      text = "Iwe !!! \nKeep soaring high. The sky is the limit.\nBGS incoming";
      degreeClass = "First Class Honours";
      setCgpaState({...cgpaState, cgpa: cgpa, degreeClass: degreeClass, state: true, text: text});
    } else if (cgpa >= 3.00) {
      text = "With a little more effort, anything is possible.\nAlmost there.";
      degreeClass = "Second Class Upper";
      setCgpaState({...cgpaState, cgpa: cgpa, degreeClass: degreeClass, state: true, text: text});
    } else if (cgpa >= 2.00) {
      text = "Keep pushing.\nYou can do it. Dont relent";
      degreeClass = "Second Class Lower";
      setCgpaState({...cgpaState, cgpa: cgpa, degreeClass: degreeClass, state: true, text: text});
    } else if (cgpa >= 1.00) {
      text = "Dont give up. Push and fight.\nNaa who give up fuck up.";
      degreeClass = "Third Class";
      setCgpaState({...cgpaState, cgpa: cgpa, degreeClass: degreeClass, state: true, text: text});
    } else {
      text = "Dont give up. Push and fight.\nIt is not over until it is over.";
      degreeClass = " --- ";
      setCgpaState({...cgpaState, cgpa: cgpa, degreeClass: degreeClass, state: true, text: text});
    }
    
    
  }



  return (
    <div>
      {cgpaState.state && <CgpaModal cgpaState={cgpaState} setCgpaState={setCgpaState} /> }
    <div className='relative bg-yellow-30 p-3'>
      {/* transparent background UI logo */}
      <div className='opacity-10 w-[80%] right-[10%] mx-auto bg-red-50 h-[50vh] fixed top-[45vh] md:w-[60%] xl:w-[30%] md:right-[20%] xl:right-[35%] md:h-[50vh] xl:h-[45vh] md:top-[40vh] xl:top-[50vh] '>
        <img src={ui_logo} className='w-full h-full' />
      </div>
    
      <div className='mb-5 w-20 h-20 mx-auto text-center md:w-28 md:h-28 xl:w-32 xl:h-32'>
        <img src={ui_logo} />
      </div> 
      <p className='text-2xl font-bold font-sans text-center md:text-4xl md:mt-7' >UNIVERSITY OF IBADAN</p>
      <p className='text-center md:text-lg md:mt-1 xl:text-2xl'>A University of Ibadan standard C.G.P.A calculator using a scale of 4.0</p>

      <div className='text-left my-2 md:text-center md:mt-7'>
        <input type="checkbox" defaultChecked={true} onClick={() =>setCodeState(!codeState)} className='w-5 h-5 border md:h-6 md:w-6' />
        <span className='font-semibold text-lg ml-3 md:text-2xl'>Input Course Code</span>
      </div>

      <div className='md:w-[50%] md:mx-auto bg-red-20'>
        <input onChange={handleInputRender} type="number" placeholder="Total number of courses" className="w-[80%] p-2 rounded-md text-lg md:text-2xl border-2 border-blue-300 bg-[rgba(194,192,213,0.3)] font-medium placeholder:text-base md:placeholder:text-xl md:w-full md:h-12 " />
      </div>
      <form onSubmit={handleSubmit} className='space-y-1 bg-red-40 h-[60vh] overflow-scroll mt-3 md:w-[90%] md:mx-auto no-scrollbar'>
        { inputValues.map(item => {
          return(
            codeState ? 
            <div key={item.id} className='relative flex w-full justify-between bg-red-20 even:bg-[rgba(185,170,170,0.25)] p-3 rounded-lg'>
              <p className='font-bold text-sm w-[8%] bg-red-20 md:text-lg'>{item.id + 1}.</p>
              <div className='w-[25%] space-y-2'>
                <label htmlFor='code' className='text-sm font-bold md:text-lg'>Course<br/>Code</label>
                <input required id="code" name={item.id + ",code"} maxLength={6} autoComplete="off" onChange={handleInput} value={inputValues[item.id].code} type="text" className='p-2 border border-teal-500 w-full uppercase rounded md:h-12 md:text-xl' />
              </div>
              <div className='w-[15%] space-y-2'>
                <label htmlFor='unit' className='text-sm font-bold md:text-lg'>Course<br/>Unit</label>
                <input required id="unit" name={item.id + ",unit"} autoComplete="off" onChange={handleInput} value={inputValues[item.id].unit} type="text" className='p-2 border border-teal-500 w-full appearance-none rounded md:h-12 md:text-xl' />
              </div>
              <div className='w-[20%] space-y-2'>
                <label htmlFor='grade' className='text-sm font-bold md:text-lg'>Marks<br/>Scored</label>
                <input required id="grade" name={item.id + ",grade"} autoComplete="off" onChange={handleInput} value={inputValues[item.id].grade} type="text" className='p-2 border border-teal-500 w-full rounded md:h-12 md:text-xl' /> 
              </div>
              <div className='w-[20%] mt-3'>
                <label htmlFor='aggregate' className='text-sm font-bold md:text-lg'>Aggregate</label>
                <p id={item.id} name={item.id + ",aggregate"} onChange={handleInput} className={`text-4xl md:text-5xl font-bold w-full mt-4 ${inputValues[item.id].aggregate.color}`} >{inputValues[item.id].aggregate.value}</p>
              </div>
            </div> :
            <div key={item.id + "2"} className='relative flex w-full justify-between bg-red-20 even:bg-[rgba(185,170,170,0.25)] p-3'>
              <p className='font-bold text-lg w-[5%] md:text-lg'>{item.id + 1}.</p>
              <div className='w-[25%] space-y-2'>
              <label htmlFor='unit' className='text-sm font-bold md:text-lg'>Course<br/>Unit</label>
                <input required id="unit" name={item.id + ",unit"} autoComplete="off" onChange={handleInput} value={inputValues[item.id].unit} type="text" className='p-2 border border-teal-500 w-full appearance-none rounded md:h-12 md:text-xl' />
              </div>
              <div className='w-[25%] space-y-2'>
              <label htmlFor='grade' className='text-sm font-bold md:text-lg'>Marks<br/>Scored</label>
                <input required id="grade" name={item.id + ",grade"} autoComplete="off" onChange={handleInput} value={inputValues[item.id].grade} type="text" className='p-2 border border-teal-500 w-full rounded md:h-12 md:text-xl' /> 
              </div>
              <div className='w-[25%] md:mt-5'>
                <label htmlFor='aggregate' className='text-sm font-bold md:text-lg'>Aggregate</label>
                <p id={item.id} name={item.id + ",aggregate"} onChange={handleInput} className={`text-4xl md:text-5xl font-bold w-full mt-1 md:mt-3 ${inputValues[item.id].aggregate.color}`}>{inputValues[item.id].aggregate.value}</p>
              </div>
            </div>
          )
        })};
        { inputValues.length !== 0 &&
        <div className='bg-red-30 w-40 mx-auto'>
          <button type="submit" className='relative w-40 xl:w-56 bg-blue-500 font-bold h-16 xl:h-20 mx-auto text-lg xl:text-2xl rounded-xl text-white hover:bg-blue-700'>Calculate CGPA</button>
        </div> }
      </form>
       
      
      
    </div>
    </div>
  )
}

export default App
