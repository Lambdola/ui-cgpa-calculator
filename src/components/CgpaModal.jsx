import React from 'react';

function CgpaModal({cgpaState, setCgpaState}) {
  return (
    <div onClick={()=> setCgpaState({...cgpaState, state: false})}>
        <div className='fixed z-10 h-full w-full bg-[rgba(77,73,73,0.8)]'></div>
        <div className='absolute z-20  w-[80%] md:w-[55%] xl:w-[50%] left-[10%] md:left-[22%] xl:left-[25%] top-[25vh] h-[50vh] md:h-[40vh] rounded-lg bg-[rgba(24,23,54,0.8)] border p-3 md:p-10 xl:p-8 shadow-lg shadow-gray-500'>
            <div className='relative bg-red-20'>
                <div className='text-center text-white space-y-7'>
                    <div>
                        <p className='font-medium text-lg text-gray-300'>Your C.G.P.A is: </p>
                        <p className='font-extrabold text-[4rem] -mt-5'>{cgpaState.cgpa}</p>
                    </div>
                    <div className=''>
                        <p className='font-medium text-lg text-gray-300'>Your Class of Degree is: </p>
                        <p className='font-extrabold text-lg -mt-1'>{cgpaState.degreeClass}</p>
                        <p className='font-bold text-base -mt-1'>{cgpaState.rank}</p>
                    </div>
                    <p className='text-lg text-gray-100 mt-7 leading-6'>{cgpaState.text}</p>
                </div>
            </div>
        </div>
    </div> 
  )
}

export default CgpaModal