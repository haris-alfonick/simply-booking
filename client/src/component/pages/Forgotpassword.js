import React, { useState,useEffect } from 'react';
import { ArrowRight, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { requestPasswordReset, resetPassword, verifyResetToken } from '../api/Api';
import { showError, showSuccess } from '../utils/toast';

const ForgotPassword = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const navigate = useNavigate();

    // Step 1: Request reset email
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    // Step 2: Reset password with token
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [tokenValid, setTokenValid] = useState(false);
    const [tokenChecked, setTokenChecked] = useState(false);

    // Verify token on component mount if token exists
    useEffect(() => {
        if (token) {
            verifyToken();
        }
    }, [token]);

    const verifyToken = async () => {
        try {
            const result = await verifyResetToken(token);
            if (result?.valid) {
                setTokenValid(true);
            } else {
                showError('Invalid or expired reset link');
                setTokenValid(false);
            }
        } catch (err) {
            showError(err?.response?.data?.message || 'Invalid reset link');
            setTokenValid(false);
        } finally {
            setTokenChecked(true);
        }
    };

    const handleRequestReset = async (e) => {
        e.preventDefault();

        if (!email) {
            showError('Please enter your email address');
            return;
        }

        setLoading(true);

        try {
            const result = await requestPasswordReset({ email });
            if (result?.success) {
                showSuccess('Password reset link sent to your email');
                setEmailSent(true);
            }
        } catch (err) {
            showError(err?.response?.data?.message || 'Failed to send reset email');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (!newPassword || !confirmPassword) {
            showError('Please fill in all fields');
            return;
        }

        if (newPassword.length < 6) {
            showError('Password must be at least 6 characters');
            return;
        }

        if (newPassword !== confirmPassword) {
            showError('Passwords do not match');
            return;
        }

        setLoading(true);

        try {
            const result = await resetPassword({ token, newPassword });
            if (result?.success) {
                showSuccess('Password reset successful! Redirecting to login...');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            }
        } catch (err) {
            showError(err?.response?.data?.message || 'Failed to reset password');
        } finally {
            setLoading(false);
        }
    };

    // Render reset password form if token exists and is valid
    if (token) {
        if (!tokenChecked) {
            return (
     <div className='min-h-screen bg-sky-100 flex items-center justify-center p-4'>

            <div
                className="
      pointer-events-none
      absolute
      rounded-full
      bg-[#11A4D4]/20
      blur-3xl
      animate-float

      top-[-80px] right-[-80px]
      w-[180px] h-[180px]

      sm:top-[-100px] sm:right-[-120px]
      sm:w-[240px] sm:h-[240px]

      lg:top-[-115px] lg:right-[-160px]
      lg:w-[320px] lg:h-[320px]
    "
            />                    <div className='w-full max-w-md'>
                        <div className='bg-white rounded-2xl shadow-lg p-8'>
                            <div className='text-center'>
                                <p className='text-gray-500'>Verifying reset link...</p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        if (!tokenValid) {
            return (
     <div className='min-h-screen bg-sky-100 flex items-center justify-center p-4'>

            <div
                className="
      pointer-events-none
      absolute
      rounded-full
      bg-[#11A4D4]/20
      blur-3xl
      animate-float

      top-[-80px] right-[-80px]
      w-[180px] h-[180px]

      sm:top-[-100px] sm:right-[-120px]
      sm:w-[240px] sm:h-[240px]

      lg:top-[-115px] lg:right-[-160px]
      lg:w-[320px] lg:h-[320px]
    "
            />                    <div className='w-full max-w-md'>
                        <div className='flex item-center justify-center mb-8'>
                            <div className='bg-gradient-to-r from-[#11A4D4] to-[#25AFF4] rounded-lg py-2 px-4 shadow-lg'>
                                <span className='text-white text-center text-2xl font-bold'>S</span>
                            </div>
                            <span className='text-3xl font-bold ml-2 text-[#11A4D4]'>SimplyBooking</span>
                        </div>
                        <div className='bg-white rounded-2xl shadow-lg p-8'>
                            <div className='text-center mb-6'>
                                <h1 className='text-3xl font-bold text-gray-800 mb-2'>Invalid Reset Link</h1>
                                <p className='text-gray-500 text-sm'>This password reset link is invalid or has expired.</p>
                            </div>
                            <Link to='/forgot-password'>
                                <button className='w-full bg-gradient-to-r from-[#11A4D4] to-[#25AFF4] hover:bg-cyan-600 text-white font-semibold py-3 rounded-lg transition-colors shadow-lg shadow-cyan-500/30'>
                                    Request New Link
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            );
        }

        return (
     <div className='min-h-screen bg-sky-100 flex items-center justify-center p-4'>

            <div
                className="
      pointer-events-none
      absolute
      rounded-full
      bg-[#11A4D4]/20
      blur-3xl
      animate-float

      top-[-80px] right-[-80px]
      w-[180px] h-[180px]

      sm:top-[-100px] sm:right-[-120px]
      sm:w-[240px] sm:h-[240px]

      lg:top-[-115px] lg:right-[-160px]
      lg:w-[320px] lg:h-[320px]
    "
            />                <div className='w-full max-w-md mt-[-100px]'>
                    <div className='flex item-center justify-center mb-8'>
                        <div className='bg-gradient-to-r from-[#11A4D4] to-[#25AFF4] rounded-lg py-2 px-4 shadow-lg'>
                            <span className='text-white text-center text-2xl font-bold'>S</span>
                        </div>
                        <span className='text-3xl font-bold ml-2 text-[#11A4D4]'>SimplyBooking</span>
                    </div>
                    <div className='bg-white rounded-2xl shadow-lg p-8'>
                        <div className='text-center mb-6'>
                            <h1 className='text-3xl font-bold text-gray-800 mb-2'>Reset Your Password</h1>
                            <p className='text-gray-500 text-sm'>Enter your new password below</p>
                        </div>

                        <form onSubmit={handleResetPassword} className='space-y-5'>
                            <div>
                                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                    <Lock className="w-4 h-4 mr-2 text-blue-600" />
                                    New Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showNewPassword ? 'text' : 'password'}
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all pr-12"
                                        placeholder="Enter new password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                    <Lock className="w-4 h-4 mr-2 text-blue-600" />
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all pr-12"
                                        placeholder="Confirm new password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className='w-full bg-gradient-to-r from-[#11A4D4] to-[#25AFF4] hover:bg-cyan-600 text-white font-semibold py-3 rounded-lg transition-colors shadow-lg shadow-cyan-500/30 flex items-center justify-center'
                            >
                                {loading ? 'Resetting...' : (
                                    <>
                                        Reset Password
                                        <ArrowRight className="h-4 w-4 ml-2" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className='mt-6 text-center'>
                            <p className='text-sm text-gray-600'>
                                Remember your password?{' '}
                                <Link to='/login' className='text-blue-500 hover:text-blue-600 font-bold'>
                                    Login
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Render email request form
    return (
     <div className='min-h-screen bg-sky-100 flex items-center justify-center p-4'>

            <div
                className="
      pointer-events-none
      absolute
      rounded-full
      bg-[#11A4D4]/20
      blur-3xl
      animate-float

      top-[-80px] right-[-80px]
      w-[180px] h-[180px]

      sm:top-[-100px] sm:right-[-120px]
      sm:w-[240px] sm:h-[240px]

      lg:top-[-115px] lg:right-[-160px]
      lg:w-[320px] lg:h-[320px]
    "
            />            <div className='w-full max-w-md mt-[-100px]'>
                <div className='flex item-center justify-center mb-8'>
                    <div className='bg-gradient-to-r from-[#11A4D4] to-[#25AFF4] rounded-lg py-2 px-4 shadow-lg'>
                        <span className='text-white text-center text-2xl font-bold'>S</span>
                    </div>
                    <span className='text-3xl font-bold ml-2 text-[#11A4D4]'>SimplyBooking</span>
                </div>
                <div className='bg-white rounded-2xl shadow-lg p-8'>
                    {!emailSent ? (
                        <>
                            <div className='text-center mb-6'>
                                <h1 className='text-3xl font-bold text-gray-800 mb-2'>Forgot Password?</h1>
                                <p className='text-gray-500 text-sm'>
                                    Enter your email and we'll send you a link to reset your password
                                </p>
                            </div>

                            <form onSubmit={handleRequestReset} className='space-y-5'>
                                <div>
                                    <label className='flex items-center text-gray-700 text-sm font-medium mb-2'>
                                        <Mail className='h-4 w-4 mr-2 text-blue-600' />
                                        Email Address
                                    </label>
                                    <input
                                        type='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className='w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400'
                                        placeholder='Enter your email'
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className='w-full bg-gradient-to-r from-[#11A4D4] to-[#25AFF4] hover:bg-cyan-600 text-white font-semibold py-3 rounded-lg transition-colors shadow-lg shadow-cyan-500/30 flex items-center justify-center'
                                >
                                    {loading ? 'Sending...' : (
                                        <>
                                            Send Reset Link
                                            <ArrowRight className="h-4 w-4 ml-2" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className='text-center'>
                            <div className='mb-6'>
                                <div className='mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4'>
                                    <Mail className='h-8 w-8 text-green-600' />
                                </div>
                                <h1 className='text-3xl font-bold text-gray-800 mb-2'>Check Your Email</h1>
                                <p className='text-gray-500 text-sm'>
                                    We've sent a password reset link to <strong>{email}</strong>
                                </p>
                            </div>
                            <p className='text-sm text-gray-600 mb-4'>
                                Didn't receive the email? Check your spam folder or{' '}
                                <button
                                    onClick={() => setEmailSent(false)}
                                    className='text-blue-500 hover:text-blue-600 font-bold'
                                >
                                    try again
                                </button>
                            </p>
                        </div>
                    )}

                    <div className='mt-6 text-center'>
                        <p className='text-sm text-gray-600'>
                            Remember your password?{' '}
                            <Link to='/login' className='text-blue-500 hover:text-blue-600 font-bold'>
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;