import React, { useEffect, useMemo, useState } from 'react';
import { Hammer, Wrench, Zap, Star, MapPin, Users, User, Clock, ChevronRight, MessageCircle, Phone, Mail, Upload, Image, FileText, MapPinIcon, CheckCircle, XCircle, ChevronLeft, ArrowRight } from 'lucide-react';
import Footer from '../footer/Footer';
import Navbar from '../navbar/Navbar';
import axios from 'axios';
import { showError, showSuccess } from '../utils/toast';
import { useNavigate, useParams } from 'react-router-dom';
import { API_BASE_URL } from '../api/Api';
const Service = () => {
  const [reviewText, setReviewText] = useState('');
  const [reviewName, setReviewName] = useState('');
  const [reviewEmail, setReviewEmail] = useState('');
  const [ratingStars, setRatingStars] = useState([false, false, false, false, false]);

  const [isFormVisible, setIsFormVisible] = useState(false);

  const [getreviews, setgetreviews] = useState([]);

  const params = useParams();
  const navigate = useNavigate()

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

  const token = JSON.parse(localStorage.getItem("token"));

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
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Quote request submitted successfully!' });
        setFormData({ name: '', email: '', phone: '', service: '', address: '', details: '', photo: null });
        setTimeout(() => {
          toggleForm();
          setMessage({ type: '', text: '' });
        }, 2000);

      } else { setMessage({ type: 'error', text: data.message || 'Failed to submit quote request' }) }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally { setLoading(false); }
  };

  const submitReview = async () => {

    try {
      const response = await fetch(`${API_BASE_URL}/reviews`, {
        method: 'POST',
        body: JSON.stringify({ reviewText, reviewName, reviewEmail, businessId: business._id, ratingStars }),
        headers: {
          'Content-Type': "application/json",
          Authorization: `Bearer ${token}`
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


  useEffect(() => {
    const getBusiness = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/businesses/${params.id}`, { headers: { Authorization: `Bearer ${token}` } });
        setBusiness(data);
      } catch (error) {
        navigate("/", { replace: true });
      }
    };

    getBusiness();
  }, [params.id, navigate]);

  useEffect(() => { if (business?._id) { getReviews(); } }, [business?._id]);

  const getReviews = async () => {
    try {
      const { data } = await axios.post(`${API_BASE_URL}/reviews/get-reviews-business`, { businessId: business._id }, { headers: { Authorization: `Bearer ${token}` } });
      setgetreviews(data);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    }
  };


  const toggleForm = () => { setIsFormVisible(!isFormVisible) };

  const services = [
    {
      icon: <Hammer className="w-6 h-6 text-orange-500" />,
      title: "Carpentry",
      trending: true,
      professionals: 127,
      rating: 4.8,
      description: "Custom woodwork, furniture repair, cabinetry, and structural carpentry services.",
      tags: ["Door Repair", "Custom Cabinets", "Furniture Assembly"]
    },
    {
      icon: <Wrench className="w-6 h-6 text-gray-500" />,
      title: "Plumbing",
      trending: false,
      professionals: 89,
      rating: 4.7,
      description: "Pipe repairs, drain cleaning, water heater installation, and bathroom fixtures.",
      tags: ["Leak Repair", "Drain Cleaning", "Water Heater"]
    },
    {
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
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
    <div className='max-h-screen bg-gradient-to-bl from-sky-100 via-sky-50 from-0% via-5% to-white'>
      <Navbar />

      {isFormVisible && (
        <div className="fixed inset-0 bg-[#22222266] flex justify-center items-center z-50">

          {/* // <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50 "> */}
          <div className="w-full max-w-[800px] mx-auto overflow-y-auto rounded-[20px]">
            <div className="text-start bg-[#25AFF4] text-white p-6 rounded-t-lg">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                <div className="mb-4">
                  <label htmlFor="name" className="flex items-center text-[16px] font-normal text-[#627084] ">
                    <User className="text-[#11A4D4] h-4 w-4 mr-1" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="mt-2 block w-full border border-[#62708440] rounded-md p-2 sm:text-sm focus-visible:outline-none placeholder:text-[#627084] placeholder:font-normal"
                    placeholder='John Doe'
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="flex items-center text-[16px] font-normal text-[#627084] ">
                    <Mail className="text-[#11A4D4] h-4 w-4 mr-1" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="mt-2 block w-full border border-[#62708440] rounded-md p-2 sm:text-sm focus-visible:outline-none placeholder:text-[#627084] placeholder:font-normal"
                    placeholder='John@example.com'
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="phone" className="flex items-center text-[16px] font-normal text-[#627084] ">
                    <Phone className="text-[#11A4D4] h-4 w-4 mr-1" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="mt-2 block w-full border border-[#62708440] rounded-md p-2 sm:text-sm focus-visible:outline-none placeholder:text-[#627084] placeholder:font-normal"
                    placeholder='(555) 123-4567'
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="service" className="flex items-center text-[16px] font-normal text-[#627084] ">
                    <Wrench className="text-[#11A4D4] h-4 w-4 mr-1" />
                    Select Service
                  </label>
                  <select
                    id="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="mt-2 block w-full border border-[#62708440] rounded-md text-[#627084] p-2 text-sm focus-visible:outline-none"
                  >
                    <option className='test' >Select Service</option>
                    {Object.entries(business?.services || {}).map(
                      ([key, service]) => (
                        <option key={key}>{service.name}</option>

                      ))}
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="address" className="flex items-center text-[16px] font-normal text-[#627084] ">
                  <MapPin className="text-[#11A4D4] h-4 w-4 mr-1" />
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="mt-2 block w-full border border-[#62708440] rounded-md p-2 sm:text-sm focus-visible:outline-none placeholder:text-[#627084] placeholder:font-normal"
                  placeholder='Enter Your Address'

                />
              </div>

              <div className="mb-4">
                <label htmlFor="details" className="flex items-center text-[16px] font-normal text-[#627084] ">
                  <FileText className="text-[#11A4D4] h-4 w-4 mr-1" />
                  Describe your problem
                </label>
                <textarea
                  id="details"
                  rows="4"
                  value={formData.details}
                  onChange={handleInputChange}
                  required
                  className="mt-2 block w-full border border-[#62708440] rounded-md p-2 sm:text-sm focus-visible:outline-none placeholder:text-[#627084] placeholder:font-normal"
                  placeholder='Please Describe the issue you are experiencing in detail, ...'

                />
              </div>

              <div className="mb-4">
                <label htmlFor="dropzone-file" className="flex items-center text-[16px] font-normal text-[#627084] mb-2">
                  <Image className="text-[#11A4D4] h-4 w-4 mr-1" />
                  Upload Photo (Optional)
                </label>
                <div className="flex items-center justify-center w-full">
                  <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 rounded-[8px] border-2 border-dashed border-[#62708440] cursor-pointer">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="h-8 w-8 text-gray-700 mb-2" />
                      <span className="font-semibold text-sm text-gray-700">
                        {formData.photo ? formData.photo.name : 'Drag and drop an image here'}
                      </span>
                      <p className="text-xs text-gray-700">or click to browse from your device</p>
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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


      <div className="bg-white">


        <section className="bg-white">

          <div className="h-54 md:h-96">  <img src={coverPhoto} alt='image' className="banner-img h-full w-full" /></div>
          <div className="p-4 lg:p-8 relative max-w-[1150px] mx-auto">
            <div className="absolute -top-12 lg:left-8 bg-white rounded-2xl shadow-[0px_30px_30px_-7.7px_#0000001A]">
              <div className="bg-[#25AFF4] m-2 lg:m-4 w-20 h-20 p-1 lg:w-24 lg:h-24 rounded-lg flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                <img src={logo} alt='image' className="banner-img h-full w-full rounded-lg object-contain" />

              </div>
            </div>
            <div className="mt-12 md:mt-[70px]">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="sm:text-[28px] text-xl font-semibold font-outfit text-[#222222]">{business.businessName}</h3>
                  <p className="text-[#627084] flex items-center mt-2">
                    <MapPin size={20} className='text-[#627084] mr-1.5' />
                    {business.location}
                  </p>
                  <div className="flex items-center mt-1">
                    <div className="flex text-[#FA832E] text-lg">★★★★★</div>
                    <span className="text-[16px] text-[#627084] ml-2">({getreviews.count} reviews)</span>
                  </div>
                </div>
                <button className="px-4 md:px-8 py-3 text-sm md:text-base bg-[#FA832E] text-white font-semibold rounded-lg shadow-[0_5px_8px_-1px_#0000001A] transition-all duration-200 hover:bg-[#11A4D4]" onClick={toggleForm}>
                  Request a Quote
                </button>
              </div>
              <p className="text-[#627084] max-sm:text-[16px] max-sm:leading-5 mb-6 text-lg font-normal font-arial">

                {business.businessDescription}
              </p>
              <div className="grid grid-cols-1 p-4 bg-[#E4EBF14D] rounded-lg sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <div className="flex gap-2 items-center">
                  <div className="text-[#11A4D4] p-2 flex items-center justify-center rounded-[10px] bg-[#11A4D41A]">
                    <Phone size={22} />
                  </div>
                  <div className="mx-2">
                    <div className="text-sm text-[#627084]">Phone</div>
                    <div className="font-medium text-[#222222]">{business.phoneNumber}</div>
                  </div>
                </div>

                <div className="flex gap-2 items-center">
                  <div className="text-[#11A4D4] p-2 flex items-center justify-center rounded-[10px] bg-[#11A4D41A]">
                    <Mail size={22} />
                  </div>
                  <div className="mx-2">
                    <div className="text-sm text-[#627084]">Email</div>
                    <div className="font-medium text-[#222222]">{business.email}</div>
                  </div>
                </div>

                <div className="flex gap-2 items-center">
                  <div className="text-[#11A4D4] p-2 flex items-center justify-center rounded-[10px] bg-[#11A4D41A]">
                    <Clock size={22} />
                  </div>
                  <div className="mx-2">
                    <div className="text-sm text-[#627084]">Hours</div>
                    <div className="font-medium text-[#222222]">24/7 Available</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-[#222222] mb-4 text-xl font-outfit">Our Services</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  {Object.entries(business?.services || {}).map(
                    ([key, service]) => (
                      <div
                        key={key}
                        className="flex justify-between gap-2 items-center max-sm:px-2! p-4 border border-[#D9E0E8] rounded-[14px]"
                      >
                        <span className="font-medium">{service.name}</span>
                        <span className="text-[#627084] text-end">
                          Starting at {service.price}
                        </span>
                      </div>
                    )
                  )}


                </div>
              </div>

            </div>
            {/* <p className="text-center text-gray-500 mt-10">This is how your business page will look to your customers</p> */}
          </div>
        </section>

        <section className="py-4 lg:py-8 px-4 sm:px-6 lg:px-8 max-w-[1150px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h3 className="font-bold text-[#222222] text-xl font-outfit sm:mb-6 mb-3">Recent Work</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {[image1, image2, image3].map((work, index) => (
                  <div key={index} className="aspect-video rounded-lg overflow-hidden bg-gray-200">
                    <img src={work} alt={`Work ${index + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-xl p-6 mb-8 border border-[#E1E7EF]">
                <div className="flex items-center justify-between mb-6 border-b border-[#E1E7EF] pb-4">
                  <h3 className="text-lg font-medium text-[#222222]">
                    Questions & Answers ({questionsArray.length})
                  </h3>
                </div>

                <div className="space-y-4">
                  {currentItems.map((faq) => (
                    <div
                      key={faq.id}
                      className="border-b border-[#E1E7EF] pb-4 last:border-1"
                    >
                      <div className="flex gap-3 mb-2 items-center">
                        <div className="px-3 py-1 text-white bg-[#F97015] rounded flex items-center justify-center font-bold">
                          Q
                        </div>

                        <p className="font-medium text-[#222222]">
                          {faq.question}
                        </p>
                      </div>

                      <div className="flex gap-3 mt-4 items-start">
                        <div className="text-[#65758B] px-3 py-1 bg-[#F1F5F9] flex items-center justify-center rounded font-bold">
                          A
                        </div>
                        <div className="text-[16px] text-[#6C7C93]">
                          {/* <span className="font-semibold text-gray-900">A</span>{' '} */}
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {totalPages > 0 && (
                  <div className="flex justify-end items-center gap-2 mt-6">
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
                              ? 'bg-[#25AFF4] text-white'
                              : 'bg-gray-100 text-[#344256] hover:bg-gray-200'
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

              <div className="bg-white rounded-xl pb-2">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-outfit font-semibold text-gray-900">Customer Reviews</h3>
                  <span className="text-gray-500 text-sm">{getreviews.count} reviews</span>
                </div>
                <div className="space-y-6">

                  {getreviews?.data?.length > -1 ? (
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

                          <p className="text-[#627084] text-sm">{review.reviewText}</p>
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

              <div className="bg-[#11A4D41A] rounded-[20px] shadow-sm p-6 mt-6">
                <h3 className="text-xl font-medium text-[#333333] mb-4">Leave a Reply</h3>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Write your review"
                  className="w-full p-3 rounded-lg mb-3 min-h-32 focus-visible:outline-none placeholder:text-[#6C7C93]"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    placeholder="Name *"
                    className="p-3 rounded-lg focus-visible:outline-none placeholder:text-[#6C7C93]"
                  />
                  <input
                    type="email"
                    value={reviewEmail}
                    onChange={(e) => setReviewEmail(e.target.value)}
                    placeholder="Email *"
                    className="p-3 rounded-lg focus-visible:outline-none placeholder:text-[#6C7C93]"
                  />
                </div>

                <div className="mb-2 mt-4">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Your Rating
                  </label>

                  <div className="flex gap-2 py-">
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
              </div>
              <div className="mt-4">
                <button className="px-4 md:px-8 py-3 text-sm md:text-base bg-[#FA832E] text-white font-semibold rounded-lg shadow-[0_5px_8px_-1px_#0000001A] transition-all duration-200 hover:bg-[#11A4D4]"
                  onClick={() => submitReview()}
                >
                  Submit Review
                </button>
              </div>
            </div>

            <div className="space-y-6 mt-2 lg:mt-6">



              <div className="bg-white rounded-[25px] border border-[#ECEFF4] shadow-[0px_2px_6px_-2px_#1317200A] p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-[#11A4D4]" />
                  <h3 className="font-semibold text-[#222222]">Business Hours</h3>
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
                        <span className="text-[#627084] capitalize">{day}</span>

                        {schedule.closed ? (
                          <span className="text-[#222222]">Closed</span>
                        ) : (
                          <span className="text-[#222222]">
                            {formatTime(schedule.start)} – {formatTime(schedule.end)}
                          </span>
                        )}
                      </div>
                    );
                  })}

                </div>

              </div>


              <div className="bg-white rounded-[25px] border border-[#ECEFF4] shadow-[0px_2px_6px_-2px_#1317200A] p-6">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-[#11A4D4]" />
                  <h3 className="font-semibold text-[#222222]">Service Area</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(business?.serviceAreas || []).map((area, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[#EBF6FA] text-[#11A4D4] rounded-full text-sm"
                    >
                      {area}
                    </span>
                  ))}

                </div>
              </div>


            </div>
          </div>
        </section>


        <section className="py-6 mt-6 lg:py-20 px-4 sm:px-6 lg:px-8 mx-auto bg-[#E4EBF14D]">

          <div className="max-w-[1090px] mx-auto">

            <div className="text-center mb-4 lg:mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
                Check out some related services
              </h2>
              <p className="text-[#627084] text-base">
                Get your professional service page up and running in four simple steps
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
              {services.map((service, index) => (
                <div key={index} className="bg-white rounded-[25px] shadow-[0px_4px_12px_-2px_#13172014] border border-[#ECEFF4] hover:shadow-md transition-shadow p-6 relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#11A4D41A] rounded-full flex items-center justify-center text-[#11A4D4]">
                        {service.icon}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900">{service.title}</h3>
                          {service.trending && <span className="text-orange-500 bg-[#FA832E1A] px-2 py-1 rounded text-xs">🔥</span>}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[#627084] mt-1">
                          <Users className="w-4 h-4" />
                          <span>{service.professionals} pros</span>
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>{service.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-[#627084] text-sm mb-4">{service.description}</p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {service.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-[#EBF6FA] text-[#11A4D4] rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="absolute bottom-4 left-0 right-0 px-6">
                    <button className="mt-4 text-[#11A4D4] hover:text-[#11A4D4] font-medium text-sm flex items-center w-full">
                      View Providers <ArrowRight className="ms-1 mt-0.5 w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>

    </div>
  );
};

export default Service;