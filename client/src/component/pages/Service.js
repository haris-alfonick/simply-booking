import React, { useState } from 'react';
import { Hammer, Wrench, Zap, Star, MapPin, Users, User, Clock, ChevronRight, MessageCircle, Phone, Mail, Upload, Image, FileText, MapPinIcon } from 'lucide-react';
import Footer from '../footer/Footer';
import Navbar from '../navbar/Navbar';
const Service = () => {
    const [reviewText, setReviewText] = useState('');
    const [reviewName, setReviewName] = useState('');
    const [reviewEmail, setReviewEmail] = useState('');
    const [isFormVisible, setIsFormVisible] = useState(false);

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

    const recentWork = [
        "/api/placeholder/400/300",
        "/api/placeholder/400/300",
        "/api/placeholder/400/300"
    ];

    const reviews = [
        {
            name: "Sarah Johnson",
            service: "Pipe Restoration",
            avatar: "S",
            rating: 5,
            time: "2 weeks ago",
            text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
        },
        {
            name: "Michael Chen",
            service: "Pipe Restoration",
            avatar: "M",
            rating: 5,
            time: "1 month ago",
            text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
        },
        {
            name: "Emily Rodriguez",
            service: "Pipe Restoration",
            avatar: "E",
            rating: 4,
            time: "1 month ago",
            text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
        }
    ];

    const faqs = [
        {
            question: "Do you provide emergency plumbing services on weekends?",
            answer: "Yes, we provide 24/7 emergency plumbing services including weekends and holidays. Just call our hotline!"
        },
        {
            question: "Do you provide emergency plumbing services on weekends?",
            answer: "Yes, we provide 24/7 emergency plumbing services including weekends and holidays. Just call our hotline!"
        },
        {
            question: "Do you provide emergency plumbing services on weekends?",
            answer: "Yes, we provide 24/7 emergency plumbing services including weekends and holidays. Just call our hotline!"
        },
        {
            question: "Do you provide emergency plumbing services on weekends?",
            answer: "Yes, we provide 24/7 emergency plumbing services including weekends and holidays. Just call our hotline!"
        }
    ];

    const businessHours = [
        { day: "Monday - Friday", hours: "8:00 AM - 6:00 PM" },
        { day: "Saturday", hours: "9:00 AM - 4:00 PM" },
        { day: "Sunday", hours: "Closed" }
    ];

    const serviceAreas = ["Downtown", "Midtown", "North Side", "Business District"];

    return (
        <>
        <Navbar />

            {isFormVisible && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="min-w-[30%] mx-auto shadow-lg mt-10 mb-20">
                        <div className="text-start bg-cyan-500 text-white p-6 rounded-t-lg">
                            <div className="text-2xl font-semibold mb-6">
                                Request a Quote
                                <div className="text-sm text-white">Fill in your details and we will get back to you shortly</div>
                            </div>
                        </div>

                        <form className="mx-auto p-6 bg-white shadow-md rounded-b-lg">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 ">
                                <div className="mb-4">
                                    <label htmlFor="name" className="flex block text-sm font-medium text-gray-700 items-center">
                                        <User className='text-cyan-500 h-4 w-4 mr-1' />
                                        Name
                                    </label>
                                    <input type="text" id="name" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="email" className="flex block text-sm font-medium text-gray-700 items-center">
                                        <Mail className='text-cyan-500 h-4 w-4 mr-1' />
                                        Email
                                    </label>
                                    <input type="email" id="email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="phone" className="flex block text-sm font-medium text-gray-700 items-center">
                                        <Phone className='text-cyan-500 h-4 w-4 mr-1' />
                                        Phone
                                    </label>
                                    <input type="text" id="phone" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="service" className="flex block text-sm font-medium text-gray-700 items-center">
                                        <Wrench className='text-cyan-500 h-4 w-4 mr-1' />
                                        Select Service
                                    </label>
                                    <select id="service" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                        <option>Junk Removal</option>
                                        <option>Furniture Delivery</option>
                                        <option>Appliance Assembly</option>
                                        <option>Moving Services</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="address" className="flex block text-sm font-medium text-gray-700 items-center">
                                    <MapPinIcon className='text-cyan-500 h-4 w-4 mr-1' />
                                    Address
                                </label>
                                <input type="text" id="address" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="details" className="flex block text-sm font-medium text-gray-700 items-center">
                                    <FileText className='text-cyan-500 h-4 w-4 mr-1' />
                                    Describe your problem
                                </label>
                                <textarea id="details" rows="4" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="dropzone-file" className="flex block text-sm font-medium text-gray-700 items-center">
                                    <Image className='text-cyan-500 h-4 w-4 mr-1' />
                                    Upload Photo (Optional)
                                </label>
                                <div className="flex items-center justify-center w-full">
                                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 rounded-lg bg-neutral-secondary-medium border border-dashed border-default-strong rounded-base cursor-pointer hover:bg-neutral-tertiary-medium">
                                        <div className="flex flex-col items-center justify-center text-body pt-5 pb-6">
                                            <Upload />
                                            <span className="font-semibold">Drag and drop an image here</span>
                                            <p className="text-xs">or click to browse from your device</p>
                                        </div>
                                        <input id="dropzone-file" type="file" className="hidden" />
                                    </label>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <button type="button" className="bg-white text-gray-800 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors" onClick={() => { toggleForm() }}>
                                    Cancel
                                </button>

                                <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="min-h-screen bg-white">


                <section className="bg-white">

                    <div className="bg-cyan-500 h-80"></div>
                    <div className="p-8 relative max-w-7xl mx-auto">
                        <div className="absolute -top-12 left-8 bg-white p-4 rounded-lg shadow-md">
                            <div className="bg-cyan-500 w-24 h-24 rounded-lg flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                                Elite
                            </div>
                        </div>
                        <div className="mt-14">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">Elite Plumbing Services</h3>
                                    <p className="text-gray-500 flex items-center mt-1">
                                         Los Angeles, CA
                                    </p>
                                    <div className="flex items-center mt-2">
                                        <div className="flex text-orange-400">★★★★★</div>
                                        <span className="text-sm text-gray-500 ml-2">(128 reviews)</span>
                                    </div>
                                </div>
                                <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600" onClick={toggleForm}>
                                    Request a Quote
                                </button>
                            </div>
                            <p className="text-gray-600 mb-6">
                                Professional plumbing services with over 15 years of experience. We specialize in residential and
                                commercial plumbing, including repairs, installations, and emergency services. Available 24/7 for your
                                plumbing needs.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                                <div className="text-center p-4 bg-gray-50 rounded-lg flex gap-2 items-center">
                                    <div className="text-cyan-500 mb-2 h-8 w-8 flex items-center justify-center rounded-lg bg-gray-200">
                                        <Phone />
                                    </div>
                                    <div className="mx-2">
                                        <div className="text-xs text-gray-500">Phone</div>
                                        <div className="font-medium">(555) 123-4567</div>
                                    </div>
                                </div>

                                <div className="text-center p-4 bg-gray-50 rounded-lg flex gap-2 items-center">
                                    <div className="text-cyan-500 h-8 w-8 flex items-center justify-center rounded-lg bg-gray-200">
                                        <Mail />
                                    </div>
                                    <div className="mx-2">
                                        <div className="text-xs text-gray-500">Email</div>
                                        <div className="font-medium">info@elite.com</div>
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
                                    <div className="flex justify-between items-center p-4 bg-gray-50 border border-gray-200 rounded-lg">
                                        <span className="font-medium">Emergency Repairs</span>
                                        <span className="text-gray-600">Starting at $99</span>
                                    </div>
                                    <div className="flex justify-between items-center p-4 bg-gray-50 border border-gray-200 rounded-lg">
                                        <span className="font-medium">Drain Cleaning</span>
                                        <span className="text-gray-600">Starting at $79</span>
                                    </div>
                                    <div className="flex justify-between items-center p-4 bg-gray-50 border border-gray-200 rounded-lg">
                                        <span className="font-medium">Water Heater Installation</span>
                                        <span className="text-gray-600">Starting at $499</span>
                                    </div>
                                    <div className="flex justify-between items-center p-4 bg-gray-50 border border-gray-200 rounded-lg">
                                        <span className="font-medium">Pipe Replacement</span>
                                        <span className="text-gray-600">Custom Quote</span>
                                    </div>
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
                                {recentWork.map((work, index) => (
                                    <div key={index} className="aspect-video rounded-lg overflow-hidden bg-gray-200">
                                        <img src={work} alt={`Work ${index + 1}`} className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>

                            <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-200">
                                <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                                    <h3 className="text-xl font-bold text-gray-900 ">Questions & Answers (5)</h3>
                                </div>
                                <div className="space-y-4">
                                    {faqs.map((faq, index) => (
                                        <div key={index} className="border-b border-gray-200 pb-4 last:border-0 ">
                                            <div className="flex gap-3 mb-2">
                                                <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center flex-shrink-0">
                                                    <MessageCircle className="w-4 h-4 text-white" />
                                                </div>
                                                <p className="font-medium text-gray-900">{faq.question}</p>
                                            </div>
                                            <div className="flex gap-3 ml-9">
                                                <div className="text-sm text-gray-600">
                                                    <span className="font-semibold text-gray-900">A</span> {faq.answer}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-center gap-2 mt-6">
                                    <button className="w-8 h-8 bg-cyan-500 text-white rounded flex items-center justify-center">1</button>
                                    <button className="w-8 h-8 bg-gray-100 text-gray-700 rounded flex items-center justify-center hover:bg-gray-200">2</button>
                                    <button className="w-8 h-8 bg-gray-100 text-gray-700 rounded flex items-center justify-center hover:bg-gray-200">
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-bold text-gray-900">Customer Reviews</h3>
                                    <span className="text-gray-500 text-sm">127 reviews</span>
                                </div>
                                <div className="space-y-6">
                                    {reviews.map((review, index) => (
                                        <div key={index} className="flex gap-4 border border-gray-200 rounded-lg p-4">
                                            <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-700 font-semibold flex-shrink-0 ">
                                                {review.avatar}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between mb-1">
                                                    <div>
                                                        <h4 className="font-semibold text-gray-900">{review.name}</h4>
                                                        <p className="text-sm text-gray-500">{review.service}</p>
                                                    </div>
                                                    <span className="text-sm text-gray-500">{review.time}</span>
                                                </div>
                                                <div className="flex gap-1 mb-2">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                                        />
                                                    ))}
                                                </div>
                                                <p className="text-gray-600 text-sm">{review.text}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full mt-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50">
                                    Load More Reviews
                                </button>
                            </div>

                            <div className="bg-gray-50 rounded-xl shadow-sm p-6 mt-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Leave a Reply</h3>
                                <textarea
                                    value={reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                    placeholder="Write your review"
                                    className="w-full p-3 border border-gray-300 rounded-lg mb-4 min-h-32 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                />
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        value={reviewName}
                                        onChange={(e) => setReviewName(e.target.value)}
                                        placeholder="Name *"
                                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                    />
                                    <input
                                        type="email"
                                        value={reviewEmail}
                                        onChange={(e) => setReviewEmail(e.target.value)}
                                        placeholder="Email *"
                                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                    />
                                </div>
                                <div className="mt-4">
                                    <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 rounded-lg shadow-md transition-colors">
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
                                    {businessHours.map((schedule, index) => (
                                        <div key={index} className="flex justify-between text-sm">
                                            <span className="text-gray-600">{schedule.day}</span>
                                            <span className="font-medium text-gray-900">{schedule.hours}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>


                            <div className="bg-white shadow-sm p-6 rounded-[25px] border border-gray-200">
                                <div className="flex items-center gap-2 mb-4">
                                    <MapPin className="w-5 h-5 text-cyan-500" />
                                    <h3 className="font-semibold text-gray-900">Service Area</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {serviceAreas.map((area, index) => (
                                        <span key={index} className="px-3 py-1 bg-cyan-50 text-cyan-600 rounded-full text-sm">
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
                                            {service.icon}
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