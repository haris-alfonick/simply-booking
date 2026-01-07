import React, { useState } from 'react'
import { Calendar, Phone, Mail, MapPin, Clock, Image, FileText, ArrowRight, ArrowLeft } from 'lucide-react';

const Booking = () => {

  const [formData, setFormData] = useState({
    businessName: '',
    phoneNumber: '',
    email: '',
    cityTown: '',
    businessLogo: '',
    businessCoverPhoto: '',
    serviceAreas: ['Downtown', 'Midtown'],
    businessDescription: '',
    hours: {
      mon: { start: '08:00', end: '17:00', closed: false },
      tue: { start: '08:00', end: '17:00', closed: false },
      wed: { start: '08:00', end: '17:00', closed: false },
      thu: { start: '08:00', end: '17:00', closed: false },
      fri: { start: '08:00', end: '17:00', closed: false },
      sat: { start: '', end: '', closed: true },
      sun: { start: '', end: '', closed: true }
    },
    domain: '',
    services: [],
    questions: []
  });

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <h1 className="text-3xl font-bold mb-2">Set Up Your Business</h1>
      <p className="text-gray-600 mb-8">Tell us about your business so customers can find and book with you.</p>

      <div className="mb-6">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6 cursor-pointer hover:border-blue-400 transition">
          <label className="cursor-pointer block">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setFormData({ ...formData, businessLogo: e.target.files[0] })} />

            <Image className="mx-auto text-blue-500 mb-2" size={40} />
            <p className="font-semibold">Business Logo</p>
            <p className="text-sm text-gray-500">
              Upload a square image, at least 200x200px
            </p>
          </label>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="flex items-center text-sm font-medium mb-2">
              <Calendar className="mr-2 text-blue-500" size={18} />
              Business Name
            </label>
            <input
              type="text"
              placeholder="Your Business Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
            />
          </div>
          <div>
            <label className="flex items-center text-sm font-medium mb-2">
              <Phone className="mr-2 text-blue-500" size={18} />
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="+1 (555) 000-0000"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="flex items-center text-sm font-medium mb-2">
              <Mail className="mr-2 text-blue-500" size={18} />
              Email
            </label>
            <input
              type="email"
              placeholder="contact@business.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div>
            <label className="flex items-center text-sm font-medium mb-2">
              <MapPin className="mr-2 text-blue-500" size={18} />
              City / Town
            </label>
            <input
              type="text"
              placeholder="New York, NY"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.cityTown}
              onChange={(e) => setFormData({ ...formData, cityTown: e.target.value })}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="flex items-center text-sm font-medium mb-2">
            <MapPin className="mr-2 text-blue-500" size={18} />
            Service Areas
          </label>
          <div className="flex gap-2 mb-2">
            {formData.serviceAreas.map((area, index) => (
              <span key={index} className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm flex items-center gap-2">
                {area}
                <button className="text-blue-600 hover:text-blue-800">×</button>
              </span>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="flex items-center text-sm font-medium mb-2">
            <FileText className="mr-2 text-blue-500" size={18} />
            Business Description <span className="text-gray-400 ml-1">(optional)</span>
          </label>
          <textarea
            placeholder="Tell customers what makes your business special..."
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.businessDescription}
            onChange={(e) => setFormData({ ...formData, businessDescription: e.target.value })}
          />
        </div>

        <div className="mb-6">
          <label className="flex items-center text-sm font-medium mb-4">
            <Clock className="mr-2 text-blue-500" size={18} />
            Hours of Operation
          </label>
          {Object.entries(formData.hours).map(([day, hours]) => (
            <div key={day} className="flex items-center gap-4 mb-2">
              <span className={`px-3 py-1 rounded font-medium text-sm w-16 text-center ${!hours.closed ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </span>
              {!hours.closed ? (
                <>
                  <input
                    type="time"
                    value={hours.start}
                    onChange={(e) => { setFormData({ ...formData, hours: { ...formData.hours, [day]: { ...hours, start: e.target.value } } }) }}
                    className="px-3 py-1 border border-gray-300 rounded"
                  />
                  <span>to</span>
                  <input
                    type="time"
                    value={hours.end}
                    onChange={(e) => { setFormData({ ...formData, hours: { ...formData.hours, [day]: { ...hours, end: e.target.value } } }) }}
                    className="px-3 py-1 border border-gray-300 rounded"
                  />
                </>
              ) : (
                <span className="text-gray-400">Closed</span>
              )}
            </div>
          ))}
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6 cursor-pointer hover:border-blue-400 transition">
          <label className="cursor-pointer block">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setFormData({ ...formData, businessCoverPhoto: e.target.files[0] })} />

            <Image className="mx-auto text-blue-500 mb-2" size={40} />
            <p className="font-semibold">Upload Cover Photo</p>
            <p className="text-sm text-gray-500">Recommended: 1200x400px</p>

          </label>
        </div>
        <div className="max-w-3xl mx-auto mt-8 flex justify-between">

          <button

            className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
          >
            <ArrowLeft size={20} />
            Back
          </button>

          <button

            className="ml-auto bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 flex items-center gap-2"
          >
            Choose Domain
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Booking