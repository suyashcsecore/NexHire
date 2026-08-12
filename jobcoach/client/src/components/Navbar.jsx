import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useClerk, UserButton, useUser, Show } from '@clerk/react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {

    const { openSignIn } = useClerk()
    const { user } = useUser()

    const navigate = useNavigate()

    const { setShowRecruiterLogin } = useContext(AppContext)

    return (
        <div className='shadow py-4'>
            <div className='container px-4 2xl:px-20 mx-auto flex justify-between items-center'>
                <img onClick={() => navigate('/')} className='cursor-pointer h-8 sm:h-10 w-auto' src={assets.logo_job} alt="Job Coach Logo" />

                {
                    user
                        ? <div className='flex items-center gap-4'>
                            <Link to={'/applications'} className='hover:text-blue-600 transition-colors'>Applied Jobs</Link>
                            <p className='text-gray-300'>|</p>
                            <Link to={'/chat'} className='hover:text-blue-600 transition-colors'>Chat App</Link>
                            <p className='text-gray-300'>|</p>
                            <Link to={'/pingup'} className='hover:text-blue-600 transition-colors'>Social Media</Link>
                            <p className='text-gray-300'>|</p>
                            <Link to={'/chatbot'} className='hover:text-blue-600 transition-colors'>Career Chatbot</Link>
                            <p className='text-gray-300'>|</p>
                            <p className='max-sm:hidden text-gray-700 font-medium'>Hi, {user.firstName}</p>
                            <UserButton />
                        </div>
                        : <div className='flex gap-4 max-sm:text-xs'>
                            <button onClick={e => setShowRecruiterLogin(true)} className='text-gray-600'>Recruiter Login</button>
                            <button onClick={e => openSignIn()} className='bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full'>Login</button>
                        </div>
                }


                {/* <Show when="signed-out">
                <div className='flex gap-4 max-sm:text-xs'>
                    <button className='text-gray-600 '>Recruiter Login</button>
                    <button onClick={e => openSignIn()} className='bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full'>Login</button>
                </div>
            </Show>
            <Show when="signed-in">
                <div className='flex gap-4 max-sm:text-xs items-center'>
                    <button className='text-gray-600 '>Recruiter Login</button>
                    <UserButton />
                </div>
            </Show> */}
            </div>
        </div>
    )
}

export default Navbar
