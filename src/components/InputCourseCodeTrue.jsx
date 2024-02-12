import React from 'react'

function InputCourseCodeTrue({item, handleInput, inputValues, deleteInput}) {

  return (
    <div key={item.id} className='relative flex flex-wrap w-full justify-between bg-red-20 even:bg-[rgba(185,170,170,0.25)] px-3 pt-2 pb-2 rounded-lg'>
        <p className='font-bold text-sm w-[8%] bg-red-20 md:text-lg'>{item.id + 1}.</p>
        <div className='w-[25%] space-y-2'>
            <label htmlFor='code' className='text-sm font-bold md:text-lg'>Course<br/>Code</label>
            <input required id="code" name={item.id + ",code"} maxLength={6} autoComplete="off" onChange={handleInput} value={inputValues[item.id].code} type="text" placeholder='GES101' className='p-2 border border-teal-500 w-full uppercase rounded md:h-12 md:text-xl' />
        </div>
        <div className='w-[15%] space-y-2'>
            <label htmlFor='unit' className='text-sm font-bold md:text-lg'>Course<br/>Unit</label>
            <input required id="unit" name={item.id + ",unit"} autoComplete="off" onChange={handleInput} value={inputValues[item.id].unit} type="text" placeholder='2' className='p-2 border border-teal-500 w-full appearance-none rounded md:h-12 md:text-xl' />
        </div>
        <div className='w-[20%] space-y-2'>
            <label htmlFor='grade' className='text-sm font-bold md:text-lg'>Marks<br/>Scored</label>
            <input required id="grade" name={item.id + ",grade"} autoComplete="off" onChange={handleInput} value={inputValues[item.id].grade} type="text" placeholder='79' className='p-2 border border-teal-500 w-full rounded md:h-12 md:text-xl' /> 
        </div>
        <div className='w-[20%] mt-5'>
            <label htmlFor='aggregate' className='text-sm font-bold md:text-lg'>Aggregate</label>
            <p id={item.id} name={item.id + ",aggregate"} onChange={handleInput} className={`text-4xl text-center lg:text-left md:text-5xl font-bold w-full mt-3 ${inputValues[item.id].aggregate.color}`} >{inputValues[item.id].aggregate.value}</p>
        </div>
        {/* <div className='w-full'>
          < button className='text-red-600 font-semibold text-center bg-red-40 p-1 hover:bg-red-600 hover:text-white rounded  m-2'>DELETE</button>
        </div> */}
    </div>
  )
}

export default InputCourseCodeTrue