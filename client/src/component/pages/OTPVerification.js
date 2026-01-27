import React, { useState, useRef, useEffect } from 'react'
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react'
import axios from 'axios'
import { API_BASE_URL } from '../api/Api';

const OTPVerification = ({ email, onSuccess, onBack }) => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);

    const inputRefs = useRef([]);

    useEffect(() => {
        // Focus first input on mount
        inputRefs.current[0]?.focus();
    }, []);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else {
            setCanResend(true);
        }
    }, [timer]);

    const handleChange = (index, value) => {
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setError('');

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }

        // Auto-submit when all fields are filled
        if (newOtp.every(digit => digit !== '') && index === 5) {
            handleVerify(newOtp.join(''));
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6).split('');
        if (pastedData.every(char => /^\d$/.test(char))) {
            const newOtp = [...otp];
            pastedData.forEach((char, idx) => {
                if (idx < 6) newOtp[idx] = char;
            });
            setOtp(newOtp);
            if (pastedData.length === 6) {
                handleVerify(newOtp.join(''));
            }
        }
    };

    const handleVerify = async (otpCode = otp.join('')) => {
        if (otpCode.length !== 6) {
            setError('Please enter all 6 digits');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await axios.post(`${API_BASE_URL}/auth/verify-otp`, { email, otp: otpCode });

            if (response.data.success) {
                setSuccess(true);
                setTimeout(() => {
                    onSuccess();
                }, 1500);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid OTP. Please try again.');
            setOtp(['', '', '', '', '', '']);
            inputRefs.current[0]?.focus();
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        setResendLoading(true);
        setError('');

        try {
            const response = await axios.post(`${API_BASE_URL}/auth/resend-otp`, {
                email
            });

            if (response.data.success) {
                setTimer(60);
                setCanResend(false);
                setOtp(['', '', '', '', '', '']);
                inputRefs.current[0]?.focus();
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to resend OTP');
        } finally {
            setResendLoading(false);
        }
    };

    if (success) {
        return (
            <div className='min-h-screen bg-cyan-50 flex items-center justify-center p-4'>
                <div className='w-full max-w-md'>
                    <div className='bg-white rounded-2xl shadow-lg p-8 text-center'>
                        <div className='w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                            <CheckCircle className='w-12 h-12 text-green-500' />
                        </div>
                        <h2 className='text-2xl font-bold text-gray-800 mb-2'>Verification Successful!</h2>
                        <p className='text-gray-600'>Your account has been verified. Redirecting...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-cyan-50 flex items-center justify-center p-4'>
            <div className='w-full max-w-md'>
                <div className='flex items-center justify-center mb-8'>
                    <div className='bg-cyan-500 rounded-lg py-2 px-4 shadow-lg'>
                        <span className='text-white text-center text-2xl font-bold'>S</span>
                    </div>
                    <span className='text-3xl font-bold text-gray-700 ml-2'>SimplyBooking</span>
                </div>

                <div className='bg-white rounded-2xl shadow-lg p-8'>
                    <button
                        onClick={onBack}
                        className='flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors'
                    >
                        <ArrowLeft className='w-4 h-4 mr-2' />
                        Back
                    </button>

                    <div className='text-center mb-8'>
                        <div className='w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                            <Mail className='w-8 h-8 text-cyan-500' />
                        </div>
                        <h1 className='text-2xl font-bold text-gray-800 mb-2'>Verify Your Email</h1>
                        <p className='text-gray-600 text-sm'>
                            We've sent a 6-digit code to<br />
                            <span className='font-semibold text-gray-800'>{email}</span>
                        </p>
                    </div>

                    {error && (
                        <div className='mb-6 p-3 bg-red-50 border border-red-200 rounded-lg'>
                            <p className='text-red-600 text-sm text-center'>{error}</p>
                        </div>
                    )}

                    <div className='mb-6'>
                        <div className='flex justify-center gap-3 mb-2'>
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={el => inputRefs.current[index] = el}
                                    type='text'
                                    maxLength='1'
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    onPaste={handlePaste}
                                    disabled={loading}
                                    className='w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-cyan-500 focus:outline-none transition-all disabled:bg-gray-100'
                                />
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={() => handleVerify()}
                        disabled={loading || otp.some(digit => !digit)}
                        className='w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-300 text-white font-semibold py-3 rounded-lg transition-colors shadow-lg shadow-cyan-500/30 mb-4'
                    >
                        {loading ? 'Verifying...' : 'Verify Email'}
                    </button>

                    <div className='text-center'>
                        <p className='text-sm text-gray-600 mb-2'>
                            Didn't receive the code?
                        </p>
                        {canResend ? (
                            <button
                                onClick={handleResend}
                                disabled={resendLoading}
                                className='text-cyan-500 hover:text-cyan-600 font-semibold text-sm disabled:text-cyan-300'
                            >
                                {resendLoading ? 'Sending...' : 'Resend Code'}
                            </button>
                        ) : (
                            <p className='text-sm text-gray-500'>
                                Resend code in {timer}s
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OTPVerification
