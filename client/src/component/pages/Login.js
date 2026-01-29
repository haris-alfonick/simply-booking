import React from 'react'
import { ArrowRight, Lock, Mail, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../api/Api'
import { showError, showSuccess } from '../utils/toast'

const Login = () => {

    const [user, setuser] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const { email, password } = user;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setuser({ ...user, [name]: value });
    };

    const HandleSubmit = async () => {
        if (!email || !password) {
            showError("Email and password are required");
            return;
        }

        setLoading(true);
        showError(null);

        try {
            const result = await login(user);
            if (result?.token) {
                localStorage.setItem("user", JSON.stringify(result.user));
                localStorage.setItem("token", JSON.stringify(result.token));
                showSuccess("Login successful");
                if (result.role === 1) { navigate("/maindashboard") } else { navigate("/clientdashboard") }
            } else {
                showError("Invalid login response");
            }
        } catch (err) {
            showError(err?.response?.data?.message || "Login failed");
            console.error("Login error:", err);
        } finally {
            setLoading(false);
        }
    };

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
                        <h1 className='text-3xl font-bold text-gray-800 mb-2'>Login to your Business Account</h1>
                        <p className='text-gray-600 text-sm'>Start accepting bookings in a minute</p>
                    </div>

                    <div className='space-y-5'>
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

                        <button onClick={() => HandleSubmit()} disabled={loading} className='w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-lg transition-colors shadow-lg shadow-cyan-500/30 flex items-center justify-center'>
                            {loading ? "Logging in..." : <>Log in <ArrowRight className="h-4 w-4 ml-2 mt-1 items-center justify-center" /></>}

                        </button>
                    </div>
                    <div className="flex items-center my-6">
                        <div className="flex-1 border-t border-gray-200"></div>
                        <span className="px-4 text-sm text-gray-500">Continue with</span>
                        <div className="flex-1 border-t border-gray-200"></div>
                    </div>

                    <div className="flex justify-center gap-4">
                        <button className="w-12 h-12 flex items-center justify-center hover:bg-gray-50 hover:border-gray-600 shadow-lg rounded-[50%] transition-all">
                            <svg className="w-8 h-8" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                        </button>
                        <button className="w-12 h-12 flex items-center justify-center hover:bg-gray-50 hover:border-gray-600 shadow-lg rounded-[50%] transition-all">
                            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                            </svg>
                        </button>
                        <button className="w-12 h-12 flex items-center justify-center hover:bg-gray-50 hover:border-gray-600 shadow-lg rounded-[50%] transition-all">
                            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#1877F2">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                        </button>
                        <button className="w-12 h-12 flex items-center justify-center hover:bg-gray-50 hover:border-gray-600 shadow-lg rounded-[50%] transition-all">
                            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#1DA1F2">
                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                            </svg>
                        </button>
                    </div>

                    <div className='mt-6 text-center'>
                        <p className='text-sm text-gray-600'>Don't have an account? <Link to='/signup' className='text-blue-500 hover:text-blue-600 font-medium'>Sign Up</Link></p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login