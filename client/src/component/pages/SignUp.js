import React, { useState } from 'react'
import { ArrowRight, Eye, EyeOff, Lock, Mail, User } from 'lucide-react'
import { Link } from 'react-router-dom'
const SignUp = () => {


    const [user, setuser] = useState({
        fullname: "",
        email: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [agreedterms, setAgreedTerms] = useState(false);


    const { fullname, email, password } = user;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setuser({
            ...user,
            [name]: value
        });
    };

        const HandleSubmit = () => {
        console.log(user)
    }

    return (
        <div className='min-h-screen bg-cyan-50 flex items-center justify-center p-4'>
            <div className='w-full max-w-md mt-[-100px]'>
                <div className='flex item-center justify-center mb-8'>
                    <div className='bg-cyan-500 rounded-lg py-2 px-4 shadow-lg'>
                        <span className='text-white text-center text-2xl font-bold'>S</span>

                    </div>
                    <span className='text-3xl font-bold text-gray-700 ml-2'>SimplyBooking</span>
                </div>
                <div className='bg-white rounded-2xl shadow-lg p-8 '>
                    <div className='text-center mb-6'>
                        <h1 className='text-3xl font-bold text-gray-800 mb-2'>Create your Business Account</h1>
                        <p className='text-gray-600 text-sm'>Start accepting bookings in a minute</p>
                    </div>

                    <div className='space-y-5'>
                        <div>
                            <label className='flex items-center text-gray-700 text-sm font-medium mb-2'>
                                <User className='h-4 w-4 mr-2 text-cyan-500' />
                                Full Name</label>
                            <input type='text'
                                name="fullname"
                                value={fullname}
                                onChange={handleInputChange}
                                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400' placeholder='Enter your full name' />
                        </div>
                        <div>
                            <label className='flex items-center text-gray-700 text-sm font-medium mb-2'>
                                <Mail className='h-4 w-4 mr-2 text-cyan-500' />
                                Email Address</label>
                            <input type='email'
                                name="email"
                                value={email}
                                onChange={handleInputChange}
                                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400' placeholder='Enter your email' />
                        </div>
                        <div>

                            <div>
                                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                    <Lock className="w-4 h-4 mr-2 text-cyan-500" />
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={password}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all pr-12"
                                        placeholder="Password"
                                    />
                                    <button
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-start rounded-[50%] mt-2">
                                <div className="flex items-center h-5 rounded-[50%]">
                                    <input
                                        type="radio"
                                        // checked={agreedterms}
                                        // onChange={(e) => setAgreedTerms(e.target.checked)}
                                        className="w-4 h-4 text-cyan-500 border-cyan-500 bg-cyan-500 rounded focus:ring-2 focus:ring-cyan-500 cursor-pointer"
                                    />
                                </div>
                                <label className="ml-3 text-sm text-gray-600">
                                    I agree to the{' '}
                                    <Link to="#" className="text-blue-500 hover:text-blue-600 font-medium transition-colors">
                                        Terms of Service
                                    </Link>{' '}
                                    and{' '}
                                    <Link to="#" className="text-blue-500 hover:text-blue-600 font-medium transition-colors">
                                        Privacy Policy
                                    </Link>
                                </label>
                            </div>

                        </div>

                        <button onClick={() => HandleSubmit()} className='w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-lg transition-colors shadow-lg shadow-cyan-500/30 flex items-center justify-center'>Start Building My Page <ArrowRight className='h-4 w-4 ml-2 justify-center items-center' /></button>
                    </div>

                    <div className='mt-6 text-center'>
                        <p className='text-sm text-gray-600'>Already have an account? <Link to='/login' className='text-blue-500 hover:text-blue-600 font-medium'>Sign In</Link></p>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default SignUp