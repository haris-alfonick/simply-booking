import { Clock, Mail, MessageCircle, Phone } from 'lucide-react'
import React from 'react'
import Footer from '../footer/Footer'

const Contact = () => {
    return (
        <div>
            <section className="bg-cyan-50 py-8 lg:py-12 xl:py-16 px-4 lg:px-16">

                <div className="max-w-7xl mx-auto text-center">

                    <div className='lg:mt-10'>
                        <h1 className="text-5xl md:text-6xl font-bold text-cyan-500 mb-6">
                            Get in Touch
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            Have question about our platform? We’d love to here from you. Send us a message and we’ll respond as soon as possible.
                        </p>

                    </div>

                </div>
            </section>



            <section className="container mx-auto py-8 lg:py-12 xl:py-16 px-4 lg:px-16">

                <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 md:space-x-8">
                    <div className="flex flex-col items-center text-center">

                        <div className="text-orange-500 mb-2 h-12 w-12 flex items-center justify-center rounded-[50%]  bg-orange-100  "><Phone /></div>
                        <h3 className="text-xl font-semibold text-gray-800">Call Us</h3>
                        <h6 className="text font-semibold text-gray-800">+1 (555) 123-4567</h6>

                        <p className="text-gray-600">Mon-Fri 9am to 6pm EST</p>
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <div className="text-orange-500 mb-2 h-12 w-12 flex items-center justify-center rounded-[50%]  bg-orange-100 ">
                            <Mail />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800">Email Us</h3>
                        <h6 className="text font-semibold text-gray-800">contact@simplybooking.com</h6>

                        <p className="text-gray-600">We respond with in 24 hours</p>
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <div className="text-orange-500 mb-2 h-12 w-12 flex items-center justify-center rounded-[50%]  bg-orange-100 ">
                            <Clock />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800">Business Hours</h3>
                        <h6 className="text font-semibold text-gray-800">Monday - Friday</h6>

                        <p className="text-gray-600">9:00 AM to 6:00 PM EST</p>
                    </div>
                </div>
            </section>




            <section className="bg-white-100 py-8 lg:py-12 xl:py-16 px-4 lg:px-16">
                <div className="container  mx-auto flex flex-col md:flex-row justify-center items-start gap-8">

                    <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex"> <MessageCircle className='me-2 mt-1 text-cyan-500' />Send Us a Message</h2>
                        <form>
                            <div className="mb-4 flex md:flex-row flex-col md:gap-4">

                                <div className="flex-1">
                                    <label htmlFor="full-name" className="block text-gray-600">Full Name</label>
                                    <input
                                        type="text"
                                        id="full-name"
                                        className="w-full p-3 border border-gray-300 rounded-md mt-2"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label htmlFor="email" className="block text-gray-600">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full p-3 border border-gray-300 rounded-md mt-2"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="subject" className="block text-gray-600">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    className="w-full p-3 border border-gray-300 rounded-md mt-2"
                                    placeholder="How can we help you?"
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="message" className="block text-gray-600">Message</label>
                                <textarea
                                    id="message"
                                    className="w-full p-3 border border-gray-300 rounded-md mt-2"
                                    placeholder="Tell us more about your inquiry..."
                                    rows="4"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-orange-500 text-white p-3 rounded-md hover:bg-orange-600 transition-all"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                    <div className="bg-white shadow-lg rounded-lg max-w-md w-full py-8 lg:py-12 xl:py-16 px-4 lg:px-16">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            <div>
                                <p className="font-semibold text-gray-600">How long does it take to set up my business page?</p>
                                <p className="text-gray-500">Most users complete their setup in under 15 minutes.</p>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-600">Can I customize my booking page?</p>
                                <p className="text-gray-500">Yes! You can fully customize colors, branding, and layout.</p>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-600">Is there a free trial available?</p>
                                <p className="text-gray-500">Yes, we offer a 14-day free trial with all features included.</p>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-600">Do you offer refunds?</p>
                                <p className="text-gray-500">We offer a 30-day money-back guarantee on all plans.</p>
                            </div>
                        </div>
                        <button
                            className="mt-4 w-full text-blue-600 font-semibold border border-gray-200 py-2 px-4 rounded hover:underline"
                            onClick={() => alert('View All FAQs clicked!')}
                        >
                            View All FAQs
                        </button>
                    </div>

                </div>

            </section>



            <section className="bg-gray-100 py-8 lg:py-12 xl:py-16 px-4 lg:px-16">
                <div className="container mx-auto px-4 py-16 text-center">
                    <h2 className=" font-bold text-gray-800 mb-4 ">interactive map coming soon</h2>

                </div>
            </section>




            <Footer />

        </div>


    )
}
export default Contact