import { useState } from 'react';
import { showError, showSuccess } from '../utils/toast';
import { deleteBusinessData, updateBusinessData } from '../api/Api';
import { useNavigate } from 'react-router-dom';

export default function CancellationForm({ quotes }) {
    const [formData, setFormData] = useState({
        reason: '',
        billingPlan: '',
        usage: '',
        id: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate()
    const billingPlans = ['Free', 'Basic', 'Pro', 'Enterprise'];

    const usageOptions = ['Low Usage', 'Medium Usage', 'High Usage'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.reason.trim()) { newErrors.reason = 'Please provide a reason for cancellation' }
        if (!formData.billingPlan) { newErrors.billingPlan = 'Please select your billing plan' }
        if (!formData.usage) { newErrors.usage = 'Please select your usage level' }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsSubmitting(true);

        const cancellationData = {
            ...formData,
            id: quotes.businessId,
            cancelledAt: new Date().toISOString(),
        };
        try {
            const result = await deleteBusinessData(
                quotes.businessId,
                cancellationData
            );
            // if (!result?.ok) {
            //     throw new Error("Update failed");
            // }
            showSuccess("Cancellation request submitted successfully");
            setFormData({ reason: "", billingPlan: "", usage: "" });
            setTimeout(() => navigate("/"), 1500);
        } catch (error) {
            console.error("Submission error:", error);
            showError("Failed to submit cancellation. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <div className="mx-auto h-[90%] bg-gradient-to-br from-white-50 to-white-100 flex items-center justify-center">
            <div className="w-ful max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 px-8 py-6">
                    <h2 className="text-3xl font-bold text-white">Cancel Subscription</h2>
                    <p className="text-cyan-50 mt-2">We're sorry to see you go. Please help us improve by sharing your feedback.</p>
                </div>

                <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6">
                    <div>


                        <label htmlFor="billingPlan" className="block text-sm font-semibold text-gray-700 mb-2">
                            Current Billing Plan <span className="text-cyan-600">*</span>
                        </label>
                        <select
                            id="billingPlan"
                            name="billingPlan"
                            value={formData.billingPlan}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent ${errors.billingPlan
                                ? 'border-red-300 bg-red-50'
                                : 'border-gray-200 hover:border-cyan-300'
                                }`}
                        >
                            <option value="">Select your plan</option>
                            {billingPlans.map(plan => (
                                <option key={plan} value={plan}>{plan}</option>
                            ))}
                        </select>
                        {errors.billingPlan && (
                            <p className="mt-1 text-sm text-red-600">{errors.billingPlan}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Usage Level <span className="text-cyan-600">*</span>
                        </label>

                        <select
                            id="usage"
                            name="usage"
                            value={formData.usage}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent ${errors.usage
                                ? 'border-red-300 bg-red-50'
                                : 'border-gray-200 hover:border-cyan-300'
                                }`}
                        >
                            <option value="">Select your Usage</option>
                            {usageOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                        {errors.usage && (
                            <p className="mt-1 text-sm text-red-600">{errors.usage}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="reason" className="block text-sm font-semibold text-gray-700 mb-2">
                            Reason for Cancellation <span className="text-cyan-600">*</span>
                        </label>
                        <textarea
                            id="reason"
                            name="reason"
                            value={formData.reason}
                            onChange={handleChange}
                            rows="5"
                            placeholder="Please tell us why you're cancelling. Your feedback helps us improve..."
                            className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none ${errors.reason
                                ? 'border-red-300 bg-red-50'
                                : 'border-gray-200 hover:border-cyan-300'
                                }`}
                        />
                        {errors.reason && (
                            <p className="mt-1 text-sm text-red-600">{errors.reason}</p>
                        )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className="px-6 py-3 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            Go Back
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-semibold rounded-lg shadow-md hover:from-cyan-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </span>
                            ) : (
                                'Confirm Cancellation'
                            )}
                        </button>
                    </div>
                </form>

                <div className="bg-cyan-50 px-8 py-4 border-t border-cyan-100">
                    <p className="text-sm text-cyan-900">
                        <strong>Note:</strong> Your subscription will remain active until the end of your current billing period.
                    </p>
                </div>
            </div>
        </div>
    );
}