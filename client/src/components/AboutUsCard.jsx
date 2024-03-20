import React from 'react'

const AboutUsCard = () => {
    return (
        <div className='flex flex-col items-center bg-white p-4 rounded-lg'>
            <img src="https://images.unsplash.com/photo-1531455812304-0f9f68b3957b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='rounded-full w-32 h-32 object-cover' />
            <h2 className='text-xl text-orange-500 font-bold mt-2'>John Doe</h2>
            <p className='font-bold'>Front End</p>
            <div className='flex w-full justify-evenly mt-4'>
                <i className="fa-brands fa-github"></i>
                <i className="fa-brands fa-linkedin"></i>
                <i className="fa-solid fa-user-tie"></i>
            </div>
        </div>
    )
}

export default AboutUsCard