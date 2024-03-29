import React from 'react'

const AboutUsCard = ({name, role, image, imageAltText}) => {
    return (
        <div className='flex flex-col items-center bg-white p-4 rounded-lg text-center'>
            <img src={image} alt={imageAltText} className='rounded-full w-32 h-32 object-cover' />
            <h2 className='text-xl text-orange-500 font-bold mt-2'>{name}</h2>
            <p className='font-bold'>{role}</p>
            <div className='flex w-full justify-evenly mt-10'>
                <i className="fa-brands fa-github"></i>
                <i className="fa-brands fa-linkedin text-blue-600"></i>
                <i className="fa-solid fa-user-tie"></i>
            </div>
        </div>
    )
}

export default AboutUsCard