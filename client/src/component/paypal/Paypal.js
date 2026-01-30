import React, { useState } from 'react';
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { ShieldCheck, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { API_BASE_URL, YOUR_PAYPAL_CLIENT_ID, currency, intent } from '../api/Api';

const PayPalForm = () => {
    const [amount, setAmount] = useState(0);
    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('idle');
    const [paypalTransactionId, setPaypalTransactionId] = useState('');
    const initialOptions = {
        clientId: YOUR_PAYPAL_CLIENT_ID,
        currency: currency,
        intent: intent,
    };


    // const initialOptions = {
    //     clientId: "YOUR_PAYPAL_CLIENT_ID",
    //     currency: "USD",
    //     intent: "capture",
    // };

    const createOrder = async (data, actions) => {
        setPaymentStatus('processing');

        try {
            const response = await fetch(`${API_BASE_URL}/paypal/create-order`, {
                method: 'POST',
                body: JSON.stringify({
                    amount: parseFloat(amount).toFixed(2),
                    customerName: customerName,
                    customerEmail: customerEmail
                }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
                }

            });

            if (!response.ok) throw new Error("Failed to create order");
            const orderData = await response.json();
            return orderData.id;
        } catch (error) {
            console.error(error);
            setPaymentStatus('error');
            return null;
        }
    };

    const onApprove = async (data, actions) => {
        try {
            const response = await fetch(`${API_BASE_URL}/paypal/capture-order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
                },
                body: JSON.stringify({
                    orderID: data.orderID,
                    customerInfo: { name: customerName, email: customerEmail }
                })
            });

            const captureData = await response.json();

            if (captureData.success) {
                setPaymentStatus('success');
                setPaypalTransactionId(captureData.transactionId);
            } else {
                setPaymentStatus('error');
            }
        } catch (error) {
            console.error(error);
            setPaymentStatus('error');
        }
    };

    if (paymentStatus === 'success') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50 p-4">
                <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center transform animate-fadeIn">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                        <CheckCircle2 className="w-12 h-12 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">
                        Payment Successful!
                    </h2>
                    <p className="text-gray-600 mb-8">Your transaction has been completed successfully.</p>

                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 mb-8 border border-gray-200">
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Transaction ID</span>
                                <span className="font-mono text-xs text-gray-800 bg-white px-3 py-1 rounded-lg break-all">
                                    {paypalTransactionId || 'Pending...'}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Amount</span>
                                <span className="text-xl font-bold text-gray-900">${parseFloat(amount).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => window.location.reload()}
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                        Done
                    </button>
                </div>
            </div>
        );
    }

    return (
        <PayPalScriptProvider options={initialOptions}>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-4">
                <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 max-w-lg w-full">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <ShieldCheck className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                            Secure Payment
                        </h1>
                        <p className="text-gray-600">Complete your payment with PayPal</p>
                    </div>

                    <form className="space-y-5 mb-8" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                                className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none"
                                placeholder="Enter Your Full Name"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={customerEmail}
                                onChange={(e) => setCustomerEmail(e.target.value)}
                                className="w-full px-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none"
                                placeholder="Email Your Address"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Amount (USD)
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold text-lg">$</span>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none text-lg font-semibold"
                                    placeholder="0.00"
                                    step="0.01"
                                    min="0.01"
                                    required
                                />
                            </div>
                        </div>
                    </form>

                    {paymentStatus === 'processing' && (
                        <div className="mb-6 bg-blue-50 border-2 border-blue-200 rounded-xl p-4 flex items-center animate-pulse">
                            <Loader2 className="w-5 h-5 text-blue-600 mr-3 animate-spin" />
                            <span className="text-blue-800 font-medium">Processing payment...</span>
                        </div>
                    )}

                    {paymentStatus === 'error' && (
                        <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start">
                            <XCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold text-red-800 mb-1">Payment Failed</h3>
                                <p className="text-sm text-red-600">Could not process transaction. Please try again.</p>
                            </div>
                        </div>
                    )}

                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 mb-6 border-2 border-blue-100">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-700 font-medium">Total Amount</span>
                            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                ${parseFloat(amount).toFixed(2)}
                            </span>
                        </div>
                    </div>

                    <div className="mb-6">
                        <PayPalButtons
                            style={{
                                layout: "vertical",
                                color: "blue",
                                shape: "rect",
                                label: "pay",
                                height: 55
                            }}
                            createOrder={createOrder}
                            onApprove={onApprove}
                            onError={(err) => {
                                console.error(err);
                                setPaymentStatus('error');
                            }}
                            disabled={paymentStatus === 'processing' || !customerName || !customerEmail || !amount}
                        />

                        {/* <button style={{
                            layout: "vertical",
                            color: "blue",
                            shape: "rect",
                            label: "pay",
                            height: 55
                        }} onClick={() => createOrder()}>Submit</button> */}

                    </div>

                    <div className="text-center">
                        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mb-3">
                            <ShieldCheck className="w-4 h-4 text-green-600" />
                            <span>Secured & encrypted payment</span>
                        </div>
                        <p className="text-xs text-gray-400">
                            Protected by PayPal Buyer Protection
                        </p>
                    </div>
                </div>
            </div>
        </PayPalScriptProvider>
    );
};

export default PayPalForm;












