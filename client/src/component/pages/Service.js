import React, { useEffect, useMemo, useState } from 'react';
import { Hammer, Wrench, Zap, Star, MapPin, Users, User, Clock, ChevronRight, MessageCircle, Phone, Mail, Upload, Image, FileText, MapPinIcon, CheckCircle, XCircle, ChevronLeft } from 'lucide-react';
import Footer from '../footer/Footer';
import Navbar from '../navbar/Navbar';
import axios from 'axios';
import { showError, showSuccess } from '../utils/toast';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from '../api/Api';
const Service = () => {
    const [reviewText, setReviewText] = useState('');
    const [reviewName, setReviewName] = useState('');
    const [reviewEmail, setReviewEmail] = useState('');
    const [ratingStars, setRatingStars] = useState([false, false, false, false, false]);

    const [isFormVisible, setIsFormVisible] = useState(false);

    const [getreviews, setgetreviews] = useState([]);

    const params = useParams();

    const [business, setBusiness] = useState([])
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        address: '',
        details: '',
        photo: null
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, photo: file }));
        }
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('phone', formData.phone);
            formDataToSend.append('service', formData.service);
            formDataToSend.append('address', formData.address);
            formDataToSend.append('details', formData.details);
            formDataToSend.append('businessId', business._id);

            if (formData.photo) {
                formDataToSend.append('photo', formData.photo);
            }
            const response = await fetch(`${API_BASE_URL}/quotes`, {
                method: 'POST',
                body: formDataToSend,
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
                }
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({ type: 'success', text: 'Quote request submitted successfully!' });
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    service: '',
                    address: '',
                    details: '',
                    photo: null
                });
                setTimeout(() => {
                    toggleForm();
                }, 2000);
            } else {
                setMessage({ type: 'error', text: data.message || 'Failed to submit quote request' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Network error. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const submitReview = async () => {

        try {
            const response = await fetch(`${API_BASE_URL}/reviews`, {
                method: 'POST',
                body: JSON.stringify({ reviewText, reviewName, reviewEmail, businessId: business._id, ratingStars }),
                headers: {
                    'Content-Type': "application/json",
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
                }
            });

            const data = await response.json();

            if (response.ok) {
                showSuccess('Review submitted successfully!');
                setReviewText("")
                setReviewName("")
                setReviewEmail("")
                getReviews();
            } else {
                showError('Failed to submit Review');
            }
        } catch (error) {
            showError('Network error. Please try again.');
        };

    }

    useEffect(() => { getBusiness(); }, [])

    const getBusiness = async () => {
        try {
            const { data } = await axios.get(`${API_BASE_URL}/businesses/${params.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
                    },
                }
            );
            setBusiness(data);
            // console.log(data)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => { if (business?._id) { getReviews(); } }, [business?._id]);

    const getReviews = async () => {
        try {
            const { data } = await axios.post(
                `${API_BASE_URL}/reviews/get-reviews-business`,
                { businessId: business._id },
                {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
                    },
                }
            );

            setgetreviews(data);
        } catch (error) {
            console.error("Failed to fetch reviews:", error);
        }
    };


    const toggleForm = () => {
        setIsFormVisible(!isFormVisible);
    };

    const services = [
        {
            icon: <Hammer className="w-6 h-6" />,
            title: "Carpentry",
            trending: true,
            professionals: 127,
            rating: 4.8,
            description: "Custom woodwork, furniture repair, cabinetry, and structural carpentry services.",
            tags: ["Door Repair", "Custom Cabinets", "Furniture Assembly"]
        },
        {
            icon: <Wrench className="w-6 h-6" />,
            title: "Plumbing",
            trending: false,
            professionals: 89,
            rating: 4.7,
            description: "Pipe repairs, drain cleaning, water heater installation, and bathroom fixtures.",
            tags: ["Leak Repair", "Drain Cleaning", "Water Heater"]
        },
        {
            icon: <Zap className="w-6 h-6" />,
            title: "Electrical",
            trending: true,
            professionals: 156,
            rating: 4.9,
            description: "Wiring, panel upgrades, lighting installation, and electrical repairs.",
            tags: ["Wiring", "Panel Upgrade", "Lighting"]
        }
    ];


    const handleStarClick = (index) => {
        const updatedStars = ratingStars.map((_, i) => i <= index);
        setRatingStars(updatedStars);
    };

    const getBase64Image = (image) => {
        if (!image || !image.data) return null;

        const base64String = btoa(
            new Uint8Array(image.data.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ''
            )
        );

        return `data:${image.contentType};base64,${base64String}`;
    };
    const coverPhoto = getBase64Image(business.businessCoverPhoto);
    const logo = getBase64Image(business.businessLogo);
    const image1 = getBase64Image(business.image1);
    const image2 = getBase64Image(business.image2);
    const image3 = getBase64Image(business.image3);

    const ITEMS_PER_PAGE = 5;
    const [currentPage, setCurrentPage] = useState(1);

    const questionsArray = useMemo(() => {
        return Object.entries(business?.questions || {}).map(([key, faq]) => ({
            id: key,
            ...faq
        }));
    }, [business?.questions]);

    const totalPages = Math.ceil(questionsArray.length / ITEMS_PER_PAGE);

    const currentItems = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return questionsArray.slice(startIndex, endIndex);
    }, [questionsArray, currentPage]);

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const getPageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 5;

        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            }
        }

        return pages;
    };

    if (questionsArray.length === 0) {
        return null;
    }

    return (
        <>
            <Navbar />

            {isFormVisible && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="min-w-[30%] max-w-2xl mx-auto shadow-lg mt-10 mb-20 max-h-[90vh] overflow-y-auto">
                        <div className="text-start bg-cyan-500 text-white p-6 rounded-t-lg">
                            <div className="text-2xl font-semibold mb-2">
                                Request a Quote
                            </div>
                            <div className="text-sm text-white">
                                Fill in your details and we will get back to you shortly
                            </div>
                        </div>

                        <div className="mx-auto p-6 bg-white shadow-md rounded-b-lg">
                            {message.text && (
                                <div className={`mb-4 p-4 rounded-md flex items-center gap-2 ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                                    }`}>
                                    {message.type === 'success' ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                                    {message.text}
                                </div>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="mb-4">
                                    <label htmlFor="name" className="flex items-center text-sm font-medium text-gray-700">
                                        <User className="text-cyan-500 h-4 w-4 mr-1" />
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="email" className="flex items-center text-sm font-medium text-gray-700">
                                        <Mail className="text-cyan-500 h-4 w-4 mr-1" />
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="phone" className="flex items-center text-sm font-medium text-gray-700">
                                        <Phone className="text-cyan-500 h-4 w-4 mr-1" />
                                        Phone
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="service" className="flex items-center text-sm font-medium text-gray-700">
                                        <Wrench className="text-cyan-500 h-4 w-4 mr-1" />
                                        Select Service
                                    </label>
                                    <select
                                        id="service"
                                        value={formData.service}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                                    >
                                        <option >Select Service</option>
                                        {Object.entries(business?.services || {}).map(
                                            ([key, service]) => (
                                                <option key={key}>{service.name}</option>

                                            ))}
                                    </select>
                                </div>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="address" className="flex items-center text-sm font-medium text-gray-700">
                                    <MapPin className="text-cyan-500 h-4 w-4 mr-1" />
                                    Address
                                </label>
                                <input
                                    type="text"
                                    id="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="details" className="flex items-center text-sm font-medium text-gray-700">
                                    <FileText className="text-cyan-500 h-4 w-4 mr-1" />
                                    Describe your problem
                                </label>
                                <textarea
                                    id="details"
                                    rows="4"
                                    value={formData.details}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="dropzone-file" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                    <Image className="text-cyan-500 h-4 w-4 mr-1" />
                                    Upload Photo (Optional)
                                </label>
                                <div className="flex items-center justify-center w-full">
                                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 rounded-lg bg-gray-50 border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-100">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <Upload className="h-8 w-8 text-gray-400 mb-2" />
                                            <span className="font-semibold text-sm text-gray-600">
                                                {formData.photo ? formData.photo.name : 'Drag and drop an image here'}
                                            </span>
                                            <p className="text-xs text-gray-500">or click to browse from your device</p>
                                        </div>
                                        <input
                                            id="dropzone-file"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={toggleForm}
                                    disabled={loading}
                                    className="bg-white text-gray-800 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors disabled:opacity-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    onClick={() => handleSubmit()}
                                >
                                    {loading ? 'Submitting...' : 'Submit'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="min-h-screen bg-white">


                <section className="bg-white">

                    <div className="bg-cyan-500 h-80">  <img src={coverPhoto} alt='image' className="banner-img h-full w-full" /></div>
                    <div className="p-8 relative max-w-7xl mx-auto">
                        <div className="absolute -top-12 left-8 bg-white rounded-lg shadow-md">
                            <div className="bg-cyan-500 w-24 h-24 rounded-lg flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                                <img src={logo} alt='image' className="banner-img h-full w-full rounded-lg" />

                            </div>
                        </div>
                        <div className="mt-14">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">{business.businessName}</h3>
                                    <p className="text-gray-500 flex items-center mt-1">
                                        Los Angeles, CA
                                    </p>
                                    <div className="flex items-center mt-2">
                                        <div className="flex text-orange-400">★★★★★</div>
                                        <span className="text-sm text-gray-500 ml-2">({getreviews.count} reviews)</span>
                                    </div>
                                </div>
                                <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600" onClick={toggleForm}>
                                    Request a Quote
                                </button>
                            </div>
                            <p className="text-gray-600 mb-6">

                                {business.businessDescription}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                                <div className="text-center p-4 bg-gray-50 rounded-lg flex gap-2 items-center">
                                    <div className="text-cyan-500 mb-2 h-8 w-8 flex items-center justify-center rounded-lg bg-gray-200">
                                        <Phone />
                                    </div>
                                    <div className="mx-2">
                                        <div className="text-xs text-gray-500">Phone</div>
                                        <div className="font-medium">{business.phoneNumber}</div>
                                    </div>
                                </div>

                                <div className="text-center p-4 bg-gray-50 rounded-lg flex gap-2 items-center">
                                    <div className="text-cyan-500 h-8 w-8 flex items-center justify-center rounded-lg bg-gray-200">
                                        <Mail />
                                    </div>
                                    <div className="mx-2">
                                        <div className="text-xs text-gray-500">Email</div>
                                        <div className="font-medium">{business.email}</div>
                                    </div>
                                </div>

                                <div className="text-center p-4 bg-gray-50 rounded-lg flex gap-2 items-center">
                                    <div className="text-cyan-500 mb-2 h-8 w-8 flex items-center justify-center rounded-lg bg-gray-200">
                                        <Clock />
                                    </div>
                                    <div className="mx-2">
                                        <div className="text-xs text-gray-500">Hours</div>
                                        <div className="font-medium">24/7 Available</div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="font-bold text-gray-900 mb-4">Our Services</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                    {Object.entries(business?.services || {}).map(
                                        ([key, service]) => (
                                            <div
                                                key={key}
                                                className="flex justify-between items-center p-4 bg-gray-50 border border-gray-200 rounded-lg"
                                            >
                                                <span className="font-medium">{service.name}</span>
                                                <span className="text-gray-600">
                                                    Starting at {service.price}
                                                </span>
                                            </div>
                                        )
                                    )}


                                </div>
                            </div>

                        </div>
                        <p className="text-center text-gray-500 mt-10">This is how your business page will look to your customers</p>
                    </div>
                </section>



                <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Work</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                                {[image1, image2, image3].map((work, index) => (
                                    <div key={index} className="aspect-video rounded-lg overflow-hidden bg-gray-200">
                                        <img src={work} alt={`Work ${index + 1}`} className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>

                            <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-200">
                                <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                                    <h3 className="text-xl font-bold text-gray-900">
                                        Questions & Answers ({questionsArray.length})
                                    </h3>
                                </div>

                                <div className="space-y-4">
                                    {currentItems.map((faq) => (
                                        <div
                                            key={faq.id}
                                            className="border-b border-gray-200 pb-4 last:border-0"
                                        >
                                            <div className="flex gap-3 mb-2">
                                                <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center flex-shrink-0">
                                                    <MessageCircle className="w-4 h-4 text-white" />
                                                </div>
                                                <p className="font-medium text-gray-900">
                                                    {faq.question}
                                                </p>
                                            </div>

                                            <div className="flex gap-3 ml-9">
                                                <div className="text-sm text-gray-600">
                                                    <span className="font-semibold text-gray-900">A</span>{' '}
                                                    {faq.answer}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {totalPages > 0 && (
                                    <div className="flex justify-center items-center gap-2 mt-6">
                                        <button
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            className={`w-8 h-8 rounded flex items-center justify-center transition-colors ${currentPage === 1
                                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                            aria-label="Previous page"
                                        >
                                            <ChevronLeft className="w-4 h-4" />
                                        </button>

                                        {getPageNumbers().map((page, index) => (
                                            <React.Fragment key={index}>
                                                {page === '...' ? (
                                                    <span className="w-8 h-8 flex items-center justify-center text-gray-400">
                                                        ...
                                                    </span>
                                                ) : (
                                                    <button
                                                        onClick={() => handlePageChange(page)}
                                                        className={`w-8 h-8 rounded flex items-center justify-center font-medium transition-colors ${currentPage === page
                                                                ? 'bg-cyan-500 text-white'
                                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                            }`}
                                                        aria-label={`Page ${page}`}
                                                        aria-current={currentPage === page ? 'page' : undefined}
                                                    >
                                                        {page}
                                                    </button>
                                                )}
                                            </React.Fragment>
                                        ))}

                                        <button
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                            className={`w-8 h-8 rounded flex items-center justify-center transition-colors ${currentPage === totalPages
                                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                            aria-label="Next page"
                                        >
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-bold text-gray-900">Customer Reviews</h3>
                                    <span className="text-gray-500 text-sm">{getreviews.count} reviews</span>
                                </div>
                                <div className="space-y-6">

                                    {getreviews?.data?.length > 0 ? (
                                        getreviews.data.map((review, index) => (
                                            <div key={index} className="flex gap-4 border border-gray-200 rounded-lg p-4">
                                                <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-700 font-semibold flex-shrink-0">
                                                    {review.reviewName?.charAt(0).toUpperCase()}
                                                </div>

                                                <div className="flex-1">
                                                    <div className="flex items-start justify-between mb-1">
                                                        <div>
                                                            <h4 className="font-semibold text-gray-900">{review.reviewName}</h4>
                                                        </div>
                                                        <span className="text-sm text-gray-500">
                                                            {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : ""}
                                                        </span>
                                                    </div>

                                                    <div className="flex gap-1 mb-2">
                                                        {review.ratingStars?.map((star, i) => (
                                                            <Star
                                                                key={i}
                                                                className={`w-4 h-4 ${star ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                                            />
                                                        ))}
                                                    </div>

                                                    <p className="text-gray-600 text-sm">{review.reviewText}</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No reviews yet.</p>
                                    )}

                                </div>
                                {getreviews?.data?.length > 0 && (
                                    <button className="w-full mt-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50">
                                        Load More Reviews
                                    </button>
                                )}
                            </div>

                            <div className="bg-gray-50 rounded-xl shadow-sm p-6 mt-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Leave a Reply</h3>
                                <textarea
                                    value={reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                    placeholder="Write your review"
                                    className="w-full p-3 border border-gray-300 rounded-lg mb-4 min-h-32 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                />
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        value={reviewName}
                                        onChange={(e) => setReviewName(e.target.value)}
                                        placeholder="Name *"
                                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                    />
                                    <input
                                        type="email"
                                        value={reviewEmail}
                                        onChange={(e) => setReviewEmail(e.target.value)}
                                        placeholder="Email *"
                                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 font-semibold mb-2">
                                        Your Rating
                                    </label>

                                    <div className="flex gap-2 py-2">
                                        {ratingStars.map((filled, index) => (
                                            <svg
                                                key={index}
                                                onClick={() => handleStarClick(index)}
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill={filled ? "#f97316" : "none"}
                                                stroke="#f97316"
                                                strokeWidth="2"
                                                className="w-4 h-4 cursor-pointer transition-transform hover:scale-110"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.062 6.35a1 1 0 00.95.69h6.678c.969 0 1.371 1.24.588 1.81l-5.404 3.93a1 1 0 00-.364 1.118l2.062 6.35c.3.921-.755 1.688-1.54 1.118l-5.404-3.93a1 1 0 00-1.175 0l-5.404 3.93c-.784.57-1.838-.197-1.54-1.118l2.062-6.35a1 1 0 00-.364-1.118L.721 11.777c-.783-.57-.38-1.81.588-1.81h6.678a1 1 0 00.95-.69l2.062-6.35z"
                                                />
                                            </svg>
                                        ))}
                                    </div>
                                </div>





                                <div className="mt-4">
                                    <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 rounded-lg shadow-md transition-colors"
                                        onClick={() => submitReview()}
                                    >
                                        Submit Review
                                    </button>
                                </div>

                            </div>
                        </div>

                        <div className="space-y-6">



                            <div className="bg-white rounded-[25px] border border-gray-200 shadow-sm p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <Clock className="w-5 h-5 text-cyan-500" />
                                    <h3 className="font-semibold text-gray-900">Business Hours</h3>
                                </div>
                                <div className="space-y-2">
                                    {Object.entries(business?.hours || {}).map(([day, schedule]) => {
                                        const formatTime = (time) => {
                                            if (!time) return "";
                                            const [hourStr, minute] = time.split(":");
                                            let hour = parseInt(hourStr, 10);
                                            const ampm = hour >= 12 ? "PM" : "AM";
                                            hour = hour % 12 || 12;
                                            return `${hour}:${minute} ${ampm}`;
                                        };

                                        return (
                                            <div key={day} className="flex justify-between text-sm">
                                                <span className="text-gray-600 capitalize">{day}</span>

                                                {schedule.closed ? (
                                                    <span className="text-gray-400">Closed</span>
                                                ) : (
                                                    <span className="font-medium text-gray-900">
                                                        {formatTime(schedule.start)} – {formatTime(schedule.end)}
                                                    </span>
                                                )}
                                            </div>
                                        );
                                    })}

                                </div>

                            </div>


                            <div className="bg-white shadow-sm p-6 rounded-[25px] border border-gray-200">
                                <div className="flex items-center gap-2 mb-4">
                                    <MapPin className="w-5 h-5 text-cyan-500" />
                                    <h3 className="font-semibold text-gray-900">Service Area</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {(business?.serviceAreas || []).map((area, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-cyan-50 text-cyan-600 rounded-full text-sm"
                                        >
                                            {area}
                                        </span>
                                    ))}

                                </div>
                            </div>


                        </div>
                    </div>
                </section>


                <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            Check out some related services
                        </h2>
                        <p className="text-gray-600 text-sm sm:text-base">
                            Get your professional service page up and running in four simple steps
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service, index) => (
                            <div key={index} className="bg-white rounded-[25px] shadow-sm border border-gray-200 hover:shadow-md transition-shadow p-6 relative">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-cyan-50 rounded-lg flex items-center justify-center text-cyan-600">
                                            {service.name}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-semibold text-gray-900">{service.title}</h3>
                                                {service.trending && <span className="text-orange-500">🔥</span>}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                                <Users className="w-4 h-4" />
                                                <span>{service.professionals} pros</span>
                                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                <span>{service.rating}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-gray-600 text-sm mb-4">{service.description}</p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {service.tags.map((tag, i) => (
                                        <span key={i} className="px-3 py-1 bg-cyan-50 text-cyan-600 rounded-full text-xs">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="absolute bottom-4 left-0 right-0 px-6">
                                    <button className=" mt-5 text-cyan-500 hover:text-cyan-600 font-medium text-sm flex items-center justify-center w-full">
                                        View Providers <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <Footer />
            </div>

        </>
    );
};

export default Service;