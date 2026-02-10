import { Clock, Mail, Map, MapIcon, MapPin, MessageCircle, Phone, Send } from 'lucide-react'
import React, { useState } from 'react'
import Footer from '../footer/Footer'
import Navbar from '../navbar/Navbar'
import { API_BASE_URL } from '../api/Api'
import { showError, showSuccess } from '../utils/toast'

const Contact = () => {

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      showSuccess("Message sent successfully!");
      setFormData({
        fullName: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      showError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (

    <div className="min-h-screen bg-[linear-gradient(135deg,#F8FAFC_0%,rgba(215,244,254,0.1)_50%,#F8FAFC_100%)] relative overflow-hidden">
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

      /* desktop */
      lg:top-[-115px] lg:right-[-160px]
      lg:w-[320px] lg:h-[320px]
    "
      />
      <Navbar />
      <section className='px-2 md:py-4 lg:p-6 xl:p-8'>
        <div className='max-w-7xl mx-auto px-4 mb-8 sm:px-6 lg:px-8 text-center'>
          <div className='lg:mt-10 lg:mb-16 mb-8'>
            <h1 className="text-[clamp(1.8rem,6vw,3.5rem)] text-[#11A4D4] mb-4 leading-[1.1] sm:leading-[1.05] font-outfit font-semibold align-center">
              Get in Touch
            </h1>
            <p
              className="font-arial regular text-[clamp(0.95rem,3vw,1.25rem)] text-gray-600 mb-8 max-w-3xl mx-auto leading-[1.4]">
              Have question about our platform? We’d love to here from you. Send
              us a message and we’ll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      <section className='bg-white mx-auto py-8 lg:py-12 xl:py-16 px-4 lg:px-16'>
        <div className='max-w-7xl mx-auto sm:px-6 lg:px-8 text-center'>
          {/* <div className=' flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 md:space-x-8'> */}
          {/* <div className='flex flex-col items-center text-center'>
            <div className='text-orange-500 mb-2 h-12 w-12 flex items-center justify-center rounded-[50%]  bg-orange-100  '>
              <Phone />
            </div>
            <h3 className='text-xl font-semibold text-gray-800'>Call Us</h3>
            <h6 className='text font-semibold text-gray-800'>
              +1 (555) 123-4567
            </h6>

            <p className='text-gray-600'>Mon-Fri 9am to 6pm EST</p>
          </div> */}

          <div className=' flex bg-gray-100 w-full p-4 rounded-lg items-center text-start'>
            <div className='text-orange-500 mb-2 h-12 w-12 flex  me-4 items-center justify-center rounded-[50%]  bg-orange-100 '>
              <Mail />
            </div>
            <div >
              <h3 className='text-xl font-semibold text-gray-800'>Email Us</h3>
              <h6 className='text font-semibold text-gray-800'>
                contact@simplybooking.com
              </h6>

              <p className='text-gray-600'>We respond with in 24 hours</p>
            </div>

          </div>

          {/* <div className='flex flex-col items-center text-center'>
            <div className='text-orange-500 mb-2 h-12 w-12 flex items-center justify-center rounded-[50%]  bg-orange-100 '>
              <Clock />
            </div>
            <h3 className='text-xl font-semibold text-gray-800'>
              Business Hours
            </h3>
            <h6 className='text font-semibold text-gray-800'>
              Monday - Friday
            </h6>

            <p className='text-gray-600'>9:00 AM to 6:00 PM EST</p>
          </div> */}
        </div>
      </section>

      <section className='bg-gray-50 mx-auto py-8 lg:py-12 xl:py-16 px-4 lg:px-16'>
        <div className='max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mx-auto sm:px-6 lg:px-8 gap-8'>


          <div className='bg-white shadow-lg rounded-lg p-6 w-full'>
            <h2 className='text-2xl font-semibold text-gray-700 mb-4 flex'>
              {' '}
              <MessageCircle className='me-2 mt-1 text-cyan-500' />
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4 flex md:flex-row flex-col md:gap-4">
                <div className="flex-1">
                  <label htmlFor="fullName" className="block text-gray-600">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md mt-2"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="flex-1">
                  <label htmlFor="email" className="block text-gray-600">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md mt-2"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="subject" className="block text-gray-600">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md mt-2"
                  placeholder="How can we help you?"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-600">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md mt-2"
                  placeholder="Tell us more about your inquiry..."
                  rows="4"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-500 text-white p-3 rounded-md hover:bg-orange-600 transition-all"
              >
                <Send className="inline-block mr-2 w-4 h-4" />
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>

          </div>

          <div className=' w-full'>
            <h2 className='text-2xl font-semibold text-gray-700 mb-4'>
              Frequently Asked Questions
            </h2>
            <div className='space-y-8'>
              <div className=' bg-white p-2 text-sm rounded-lg space-y-2'>
                <p className='font-semibold text-gray-600'>
                  How long does it take to set up my business page?
                </p>
                <p className='text-gray-500'>
                  Most users complete their setup in under 15 minutes.
                </p>
              </div>
              <div className=' bg-white p-2 text-sm rounded-lg space-y-2'>
                <p className='font-semibold text-gray-600'>
                  Can I customize my booking page?
                </p>
                <p className='text-gray-500'>
                  Yes! You can fully customize colors, branding, and layout.
                </p>
              </div>
              <div className=' bg-white p-2 text-sm rounded-lg space-y-2'>
                <p className='font-semibold text-gray-600'>
                  Is there a free trial available?
                </p>
                <p className='text-gray-500'>
                  Yes, we offer a 14-day free trial with all features included.
                </p>
              </div>
              <div className=' bg-white p-2 text-sm rounded-lg space-y-2'>
                <p className='font-semibold text-gray-600'>
                  Do you offer refunds?
                </p>
                <p className='text-gray-500'>
                  We offer a 30-day money-back guarantee on all plans.
                </p>
              </div>
            </div>
            <button
              className='mt-4 w-full text-blue-600 font-semibold border border-gray-200 py-2 px-4 rounded hover:underline'
              onClick={() => alert('View All FAQs clicked!')}
            >
              View All FAQs
            </button>
          </div>


        </div>
      </section>

      <section className='bg-gray-100 py-8 lg:py-12 xl:py-16 px-4 lg:px-16 mb-6 md:mb-12 lg:mb-16'>
        <div className='max-w-7xl mx-auto px-4 py-16 text-center'>
          <MapPin className='w-8 h-8 mx-auto text-gray-500' />
          <h2 className=' font-bold text-gray-500 my-2 '>
            Interactive map coming soon
          </h2>
        </div>
      </section>

      <Footer />
    </div>
  )
}
export default Contact
