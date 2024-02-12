import React from 'react'

function InputCourseCodeFalse({item, handleInput, inputValues, setInputValues}) {
  return (
    <div key={item.id + "2"} className='relative flex flex-wrap w-full justify-between bg-red-20 even:bg-[rgba(185,170,170,0.25)] px-3 pt-2 pb-2 rounded-lg'>
        <p className='font-bold text-lg w-[5%] md:text-lg'>{item.id + 1}.</p>
        <div className='w-[25%] space-y-2'>
            <label htmlFor='unit' className='text-sm font-bold md:text-lg'>Course<br/>Unit</label>
            <input required id="unit" name={item.id + ",unit"} autoComplete="off" onChange={handleInput} value={inputValues[item.id].unit} type="text" placeholder='2' className='p-2 border border-teal-500 w-full appearance-none rounded md:h-12 md:text-xl' />
        </div>
        <div className='w-[25%] space-y-2'>
            <label htmlFor='grade' className='text-sm font-bold md:text-lg'>Marks<br/>Scored</label>
            <input required id="grade" name={item.id + ",grade"} autoComplete="off" onChange={handleInput} value={inputValues[item.id].grade} type="text" placeholder='79' className='p-2 border border-teal-500 w-full rounded md:h-12 md:text-xl' /> 
        </div>
        <div className='w-[25%] mt-5 md:mt-5'>
            <label htmlFor='aggregate' className='text-sm font-bold md:text-lg'>Aggregate</label>
            <p id={item.id} name={item.id + ",aggregate"} onChange={handleInput} className={`text-4xl text-center md:text-5xl lg:text-left font-bold w-full mt-3 md:mt-3 ${inputValues[item.id].aggregate.color}`}>{inputValues[item.id].aggregate.value}</p>
        </div>
        {/* <div className='w-full'>
          <p className='text-red-600 font-semibold text-center bg-red-40 p-1 hover:bg-red-600 hover:text-white rounded  m-2'>DELETE</p>
        </div> */}
    </div>
  )
}

export default InputCourseCodeFalse