import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Globe, FileText, Plus, Trash2, Check, ArrowLeft, ArrowRight, Star, Wrench, Camera, Building2, Lightbulb, Stars } from 'lucide-react';



const StepIndicator = ({ currentStep, steps }) => {
  currentStep = currentStep - 2;
  return (
    <div className="flex items-center justify-center mb-8 gap-4">
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${currentStep > step ? 'bg-green-500 text-white' :
            currentStep === step && currentStep < 3 ? 'bg-blue-500 text-white' : currentStep === 3 ? 'bg-green-500 text-white' :
              'bg-gray-600 text-white'
            }`}>
            {currentStep > step ? <Check size={20} /> : currentStep === 3 ? <Check size={20} /> : step}
          </div>
          {index < steps.length - 1 && (<div className="w-12 h-0.5 bg-green-300" />)}
        </React.Fragment>
      ))}
    </div>
  )
};


const BusinessInfoStep = ({ formData, updateField, newServiceArea, addServiceArea, toggleDay,
  handleFileUpload, setCurrentStep, currentStep, removeServiceArea, setNewServiceArea, updateHours

}) => {
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-[20px] shadow-lg p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-2">Set Up Your Business</h1>
      <p className="text-gray-600 mb-8">Tell us about your business so customers can find and book with you.</p>

      <div className="">
        <div className="flex items-center mb-4">
          <div className='w-[110px] h-[110px] border-2 border-dashed border-blue-300 rounded-[20px] p-6 text-center mb-6 cursor-pointer hover:border-blue-400 transition'>
            <label className="cursor-pointer block">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileUpload('businessLogo', e.target.files[0])}
              />
              <Camera className="mx-auto text-blue-500" size={40} />
              {formData.businessLogo ? (
                <p className="text-sm text-green-600 mt-2">{formData.businessLogo.name}</p>
              ) : (
                <p className="text-sm text-blue-500 ">Logo</p>
              )}
            </label>
          </div>
          <div className="text-start ms-4">
            <p className="font-semibold">Business Logo</p>
            <p className="text-sm text-gray-500">Upload a square image, at least 200x200px</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="flex items-center text-sm font-medium mb-2">
              <Building2 className="mr-2 text-blue-500" size={18} />
              Business Name
            </label>
            <input
              type="text"
              placeholder="Your Business Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.businessName}
              onChange={(e) => updateField('businessName', e.target.value)}
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
              onChange={(e) => updateField('phoneNumber', e.target.value)}
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
              onChange={(e) => updateField('email', e.target.value)}
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
              onChange={(e) => updateField('cityTown', e.target.value)}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="flex items-center text-sm font-medium mb-2">
            <MapPin className="mr-2 text-blue-500" size={18} />
            Service Areas
          </label>
          <div className="flex gap-2 mb-2 flex-wrap">
            {formData.serviceAreas.map((area, index) => (
              <span key={index} className="px-3 py-1 bg-gray-100 text-cyan-600 rounded-full text-sm flex items-center gap-2">
                {area}
                <button
                  type="button"
                  onClick={() => removeServiceArea(index)}
                  className="text-cyan-600 hover:text-cyan-800 font-bold"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add service area"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newServiceArea}
              onChange={(e) => setNewServiceArea(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addServiceArea();
                }
              }}
            />
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
            onChange={(e) => updateField('businessDescription', e.target.value)}
          />
        </div>

        <div className="mb-6 bg-gray-100 p-4 rounded-lg">
          <label className="flex items-center text-sm font-medium mb-4">
            <Clock className="mr-2 text-blue-500" size={18} />
            Hours of Operation
          </label>
          {Object.entries(formData.hours).map(([day, hours]) => (
            <div key={day} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4 sm:mb-2 sm:w-full">
              <button
                type="button"
                onClick={() => toggleDay(day)}
                className={`px-3 py-1 rounded-[10px] font-medium text-sm w-16 text-center transition ${!hours.closed ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'}`}
              >
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </button>
              {!hours.closed ? (
                <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
                  <input
                    type="time"
                    value={hours.start}
                    onChange={(e) => updateHours(day, 'start', e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-[10px] focus:ring-2 focus:ring-blue-500 sm:w-32"
                  />
                  <span className="text-gray-500">to</span>
                  <input
                    type="time"
                    value={hours.end}
                    onChange={(e) => updateHours(day, 'end', e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-[10px] focus:ring-2 focus:ring-blue-500 sm:w-32"
                  />
                </div>
              ) : (
                <span className="text-gray-400">Closed</span>
              )}
            </div>
          ))}
        </div>

        <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center mb-6 cursor-pointer hover:border-blue-400 transition">
          <label className="cursor-pointer block">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileUpload('businessCoverPhoto', e.target.files[0])}
            />
            <Camera className="mx-auto text-blue-500 mb-2" size={40} />
            <p className="font-semibold">Upload Cover Photo</p>
            {formData.businessCoverPhoto ? (
              <p className="text-sm text-green-600 mt-2">{formData.businessCoverPhoto.name}</p>
            ) : (
              <p className="text-sm text-gray-500">Recommended: 1200x400px</p>
            )}
          </label>
        </div>
        <hr />

        <div className="max-w-3xl mx-auto mt-6 flex justify-between items-center">
          <button
            type="button"
            onClick={() => setCurrentStep(currentStep - 1)}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-bold py-2 rounded-lg hover:bg-white transition">
            <ArrowLeft size={20} />Back</button>
          <button
            type="button"
            onClick={() => setCurrentStep(currentStep + 1)}
            className="ml-auto bg-cyan-500 text-white px-2 md:px-3 lg:px-4 py-2 rounded-lg hover:bg-cyan-600 flex items-center gap-1">
            Next: Choose Domain<ArrowRight size={18} /></button>
        </div>
      </div>
    </div>
  )
};

const DomainStep = ({ formData, updateField, currentStep, setCurrentStep }) => {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-2">Choose Your Business Domain</h1>
      <p className="text-gray-600 mb-8">This will be your public service booking link</p>

      <label className="block text-sm font-medium mb-2">Your Domain</label>
      <div className="flex items-center border-4 border-double border-blue-500 rounded-lg overflow-hidden mb-4">
        <span className="px-4 py-3 bg-gray-50 text-blue-600 font-medium border-r">
          simplybooking.org/
        </span>
        <input
          type="text"
          placeholder="your-business"
          className="flex-1 px-4 py-3 focus:outline-none"
          value={formData.domain}
          onChange={(e) => updateField('domain', e.target.value)}
        />
      </div>

      <div className="mb-6 bg-gray-100 rounded-[16px] p-6">
        <p className="text-sm text-gray-600 mb-2">Examples</p>
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600 bg-white p-2 rounded-[16px]">
            <Globe className="mr-2" size={16} />
            simplybooking.org/plumberpro
          </div>
          <div className="flex items-center text-sm text-gray-600 bg-white p-2 rounded-[16px]">
            <Globe className="mr-2" size={16} />
            simplybooking.org/smartcleaning
          </div>
          <div className="flex items-center text-sm text-gray-600 bg-white p-2 rounded-[16px]">
            <Globe className="mr-2" size={16} />
            simplybooking.org/fastcleaning
          </div>
        </div>
      </div>

      <div className="flex mb-6 justify-center">
        <span className="mr-1 mt-1 item-center"><Lightbulb className='text-yellow-500' size={16} /></span>
        <p className="text-sm text-gray-700">You can change this later anytime in your settings.</p>
      </div>

      <hr />

      <div className="max-w-3xl mx-auto mt-6 flex justify-between items-center">
        <button
          type="button"
          onClick={() => setCurrentStep(currentStep - 1)}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-bold py-2 rounded-lg hover:bg-white transition">
          <ArrowLeft size={20} />Back</button>
        <button
          type="button"
          onClick={() => setCurrentStep(currentStep + 1)}
          className="ml-auto bg-cyan-500 text-white px-2 md:px-3 lg:px-4 py-2 rounded-lg hover:bg-cyan-600 flex items-center gap-1">
          Add Services<ArrowRight size={18} /></button>
      </div>
    </div>
  )
};

const AddServicesStep = ({ formData, addService, updateService, removeService, currentStep, setCurrentStep }) => {
  return (
    <div>
      <StepIndicator steps={[1, 2, 3]} currentStep={currentStep} />
      <div className="mt-6 max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-4 lg:p-8">
        <h1 className="text-3xl font-bold mb-2">Add Your Services</h1>
        <p className="text-gray-600 mb-8">Add your services with pricing.You can also seet custom pricing.</p>

        <div className="mb-6">
          <label className="flex items-center text-sm font-medium mb-4">
            <FileText className="mr-2 text-blue-500" size={18} />
            Services & Pricing
          </label>

          {formData.services.map((service, index) => (
            <div key={index} className="border border-gray-300 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-4 mb-4">
                <span className="w-8 h-8 flex items-center justify-center rounded-[16px] bg-cyan-100 text-cyan-600 rounded font-semibold">
                  {index + 1}
                </span>
                <input
                  type="text"
                  placeholder="e.g., Pipe Fitting"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={service.name}
                  onChange={(e) => updateService(index, 'name', e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => removeService(index)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <Trash2 size={20} />
                </button>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 sm:pl-12">
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="e.g., 50.00"
                  className="w-full sm:flex-1 px-4 py-2 border border-gray-300 rounded-lg
               focus:outline-none focus:ring-2 focus:ring-blue-500
               disabled:bg-gray-100 disabled:cursor-not-allowed"
                  value={service.price}
                  onChange={(e) => updateService(index, "price", e.target.value)}
                  disabled={service.customPrice}
                />

                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <div
                    className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${service.customPrice ? "bg-blue-500" : "bg-gray-300"}`}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={service.customPrice}
                      onChange={(e) =>
                        updateService(index, "customPrice", e.target.checked)
                      }
                    />
                    <span
                      className={`absolute top-1/2 left-1 h-4 w-4 bg-white rounded-full shadow transform -translate-y-1/2 transition-transform duration-300 ${service.customPrice ? "translate-x-5" : "translate-x-0"}`}
                    />
                  </div>

                  <span className="text-sm text-gray-600 whitespace-nowrap">
                    Custom Price
                  </span>
                </label>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addService}
            className="w-full border-2 border-dashed border-blue-300 text-blue-500 font-bold bg-blue-50 py-3  lg:mb-20 rounded-lg hover:bg-blue-50 flex items-center justify-center gap-2">
            <Plus size={20} /> Add New Service
          </button>
        </div>

        <hr />
        <div className="max-w-3xl mx-auto mt-6 flex justify-between items-center">
          <button
            type="button"
            onClick={() => setCurrentStep(currentStep - 1)}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-bold py-2 rounded-lg hover:bg-white transition">
            <ArrowLeft size={20} />Back</button>
          <button
            type="button"
            onClick={() => setCurrentStep(currentStep + 1)}
            className="ml-auto bg-cyan-500 text-white px-4 md:px-6 lg:px-8 py-2 rounded-lg hover:bg-cyan-600 flex items-center gap-1">
            Next Step</button>
        </div>

      </div>

    </div>
  )
};

const QuestionnaireStep = ({ formData, addQuestion, updateQuestion, removeQuestion, currentStep, setCurrentStep }) => {
  return (
    <div className="">
      <StepIndicator steps={[1, 2, 3]} currentStep={currentStep} />


      <div className="mb-6 max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">

        <h1 className="text-3xl font-bold mb-2">Build Your Questionnaire</h1>
        <p className="text-gray-600 mb-8">Add questions to gather information from customers</p>
        <label className="block text-sm font-medium mb-4">Add Questions</label>

        {formData.questions.map((question, index) => (
          <div key={index} className="border border-gray-300 rounded-lg p-4 mb-4">
            <p className="font-medium mb-2">Question {String(index + 1).padStart(2, '0')}</p>
            <div className="flex items-center gap-4 mb-4">
              <span className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded font-semibold">
                {index + 1}
              </span>
              <input
                type="text"
                placeholder="Enter Your Question"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={question.question}
                onChange={(e) => updateQuestion(index, 'question', e.target.value)}
              />
              <button
                type="button"
                onClick={() => removeQuestion(index)}
                className="text-gray-400 hover:text-red-500"
              >
                <Trash2 size={20} />
              </button>
            </div>
            <textarea
              placeholder="Enter Your Answer (optional)"
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={question.answer}
              onChange={(e) => updateQuestion(index, 'answer', e.target.value)}
            />
          </div>
        ))}

        <button
          type="button"
          onClick={addQuestion}
          className="w-full border-2 border-dashed border-blue-300 text-blue-500 py-3 rounded-lg hover:bg-blue-50 flex items-center justify-center gap-2"
        >
          <Plus size={20} />
          Add New Question
        </button>

        <div className="max-w-3xl mx-auto mt-6 flex justify-between items-center">
          <button
            type="button"
            onClick={() => setCurrentStep(currentStep - 1)}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-bold py-2 rounded-lg hover:bg-white transition">
            <ArrowLeft size={20} />Back</button>
          <button
            type="button"
            onClick={() => setCurrentStep(currentStep + 1)}
            className="ml-auto bg-cyan-500 text-white px-4 md:px-3 lg:px-4 py-2 rounded-lg hover:bg-cyan-600 flex items-center gap-1">
            Save Service</button>
        </div>
      </div>

    </div>
  )
};

const ServiceCreatedStep = ({ formData, currentStep, setCurrentStep }) => {
  return (
    <div className="max-w-2xl mx-auto  rounded-lg  p-8">
      <StepIndicator steps={[1, 2, 3]} currentStep={currentStep} />
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Stars className="text-green-500" size={40} />
        </div>
        <h1 className="text-3xl font-bold mb-2">Services Created!</h1>
        <p className="text-gray-600">Your services have been added successfully</p>
      </div>

      <div className='bg-white rounded-lg  shadow-lg p-6'>
        <div className="bg-gray-100 rounded-[16px] border  p-6 mb-6">
          <p className="font-semibold mb-2">{formData.services.length} Service(s) Added</p>
          {formData.services.map((service, index) => (
            <p key={index} className="text-sm text-gray-600">
              {service.name || 'Untitled Service'} - ${service.price || 'Custom'}
            </p>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setCurrentStep(3)}
          className="w-full bg-cyan-500 text-white py-3 rounded-lg hover:bg-cyan-600 flex items-center justify-center gap-2 mb-4"
        >
          <Plus size={20} />
          Add Another Service
        </button>

        <button
          type="button"
          onClick={() => setCurrentStep(currentStep + 1)}
          className="w-full py-3 rounded-lg hover:bg-gray-100 flex items-center justify-center gap-2 mb-4">
          Continue to Preview <ArrowRight size={20} className='mt-1' /></button>

      </div>
    </div>
  )
};


const PreviewStep = ({ formData, currentStep, setCurrentStep }) => (
  <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
    <h1 className="text-3xl font-bold mb-2">Preview Your Page</h1>
    <p className="text-gray-600 mb-8">This is how your customers will see your booking page.</p>

    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="h-32 bg-gradient-to-r from-blue-600 to-cyan-400 relative">
        <div className="absolute -bottom-8 left-8 w-20 h-20 bg-white rounded-lg border-4 border-white flex items-center justify-center">
          <Wrench className="text-blue-500" size={32} />
        </div>
      </div>
      <div className="p-8 pt-12">
        <h2 className="text-2xl font-bold mb-2">{formData.businessName || 'Your Business'}</h2>
        <p className="text-sm text-gray-600 flex items-center gap-1 mb-4">
          <MapPin size={14} />
          {formData.cityTown || 'Your City'}
        </p>

        <p className="text-gray-700 mb-6">
          {formData.businessDescription || 'Your business description will appear here...'}
        </p>

        <h3 className="text-xl font-bold mb-4">Our Services</h3>
        <div className="space-y-3">
          {formData.services.length > 0 && formData.services[0].name ? (
            formData.services.map((service, index) => (
              <div key={index} className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="font-medium">{service.name}</span>
                <span className="text-gray-600">
                  {service.customPrice ? 'Custom Quote' : `$${service.price || '0'}`}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center py-4">No services added yet</p>
          )}
        </div>
      </div>
    </div>
    <div className="max-w-3xl mx-auto mt-6 flex justify-between items-center">
      <button
        type="button"
        onClick={() => setCurrentStep(currentStep - 1)}
        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-bold py-2 rounded-lg hover:bg-white transition">
        <ArrowLeft size={20} />Back</button>
      <button
        type="button"
        onClick={() => setCurrentStep(currentStep + 1)}
        className="ml-auto bg-cyan-500 text-white px-4 md:px-3 lg:px-4 py-2 rounded-lg hover:bg-cyan-600 flex items-center gap-1">
        Next: Choose Plan</button>
    </div>
  </div>
);

const PricingStep = () => {
  return (
    <div className="">
      <div className="max-w-2xl mx-auto  rounded-lg  p-8 my-10 text-center">
        <h1 className="text-3xl font-bold text-center mb-2">Complete Setup</h1>
        <p className="text-gray-600 text-center">Start free for 07 days... Cancel anytime.</p>
      </div>

      <div className='max-w-2xl mx-auto bg-white rounded-[20px] shadow-lg p-6 mt-6'>
        <div className=" rounded-lg p-4 flex items-center ">
          <div className="text-center border-2 border-cyan-500 p-12 rounded-[20px]">
            <h4 className="text-gray-600 text-2xl mb-2 font-bold">ALL IN JUST</h4>
            <div className="text-7xl font-bold text-cyan-500 mb-2">$5.99</div>
            <p className="text-gray-600">Per month</p>
          </div>

          <div className="space-y-3 p-4 ">

            <div className="flex items-center gap-3">
              <h2 className='text-xl font-bold'>What is Include In This Price?</h2>
            </div>

            <div className="flex items-center gap-3">
              <ArrowRight className="text-cyan-500" size={20} />
              <span>Unlimited Requests</span>
            </div>
            <div className="flex items-center gap-3">
              <ArrowRight className="text-cyan-500" size={20} />
              <span>Email Support</span>
            </div>
            <div className="flex items-center gap-3">
              <ArrowRight className="text-cyan-500" size={20} />
              <span>Email Support</span>
            </div>
            <div className="flex items-center gap-3">
              <ArrowRight className="text-cyan-500" size={20} />
              <span>No Hidden Fees</span>
            </div>
            <button className=" bg-cyan-500 text-white py-2 px-4 rounded-lg hover:bg-cyan-600 flex items-center justify-center gap-1">
              Next: Choose Plan
              <ArrowRight size={20} className='mt-1' />
            </button>
          </div>


        </div>
      </div>
    </div>
  )
};

const Booking = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: '',
    phoneNumber: '',
    email: '',
    cityTown: '',
    businessLogo: null,
    businessCoverPhoto: null,
    serviceAreas: ['Downtown', 'Midtown'],
    businessDescription: '',
    hours: {
      mon: { start: '09:00', end: '17:00', closed: false },
      tue: { start: '09:00', end: '17:00', closed: false },
      wed: { start: '09:00', end: '17:00', closed: false },
      thu: { start: '09:00', end: '17:00', closed: false },
      fri: { start: '09:00', end: '17:00', closed: false },
      sat: { start: '', end: '', closed: true },
      sun: { start: '', end: '', closed: true }
    },
    domain: '',
    services: [{ name: '', price: '', customPrice: false }],
    questions: [{ question: '', answer: '' }]
  });

  const [newServiceArea, setNewServiceArea] = useState('');
  const totalSteps = 7;


  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field, file) => {
    if (file) {
      updateField(field, file);
    }
  };

  const addServiceArea = () => {
    if (newServiceArea.trim()) {
      updateField('serviceAreas', [...formData.serviceAreas, newServiceArea.trim()]);
      setNewServiceArea('');
    }
  };

  const removeServiceArea = (index) => {
    updateField('serviceAreas', formData.serviceAreas.filter((_, i) => i !== index));
  };

  const toggleDay = (day) => {
    updateField('hours', {
      ...formData.hours,
      [day]: {
        ...formData.hours[day],
        closed: !formData.hours[day].closed
      }
    });
  };

  const updateHours = (day, field, value) => {
    updateField('hours', {
      ...formData.hours,
      [day]: {
        ...formData.hours[day],
        [field]: value
      }
    });
  };

  const addService = () => {
    updateField('services', [...formData.services, { name: '', price: '', customPrice: false }]);
  };

  const updateService = (index, field, value) => {
    const updated = [...formData.services];
    updated[index] = { ...updated[index], [field]: value };
    updateField('services', updated);
  };

  const removeService = (index) => {
    if (formData.services.length > 1) {
      updateField('services', formData.services.filter((_, i) => i !== index));
    }
  };

  const addQuestion = () => {
    updateField('questions', [...formData.questions, { question: '', answer: '' }]);
  };

  const updateQuestion = (index, field, value) => {
    const updated = [...formData.questions];
    updated[index] = { ...updated[index], [field]: value };
    updateField('questions', updated);
  };

  const removeQuestion = (index) => {
    if (formData.questions.length > 1) {
      updateField('questions', formData.questions.filter((_, i) => i !== index));
    }
  };

  const ProgressBar = () => (
    <div className="w-full bg-gray-200 h-1 mb-8 rounded-full overflow-hidden">
      <div
        className="bg-blue-500 h-1 transition-all duration-300"
        style={{ width: `${(currentStep / totalSteps) * 100}%` }}
      />
    </div>
  );

  // ///////////////////////////////////////////////


  const renderStep = () => {
    switch (currentStep) {
      case 1: return <BusinessInfoStep formData={formData} updateField={updateField} newServiceArea={newServiceArea} addServiceArea={addServiceArea} toggleDay={toggleDay} handleFileUpload={handleFileUpload}
        removeServiceArea={removeServiceArea} setNewServiceArea={setNewServiceArea} updateHours={updateHours} currentStep={currentStep} setCurrentStep={setCurrentStep}
/>;
      case 2: return <DomainStep formData={formData} updateField={updateField} currentStep={currentStep} setCurrentStep={setCurrentStep} />;
      case 3: return <AddServicesStep formData={formData} addService={addService} updateService={updateService} removeService={removeService} currentStep={currentStep} setCurrentStep={setCurrentStep} />;
      case 4: return <QuestionnaireStep formData={formData} addQuestion={addQuestion} updateQuestion={updateQuestion} removeQuestion={removeQuestion} currentStep={currentStep} setCurrentStep={setCurrentStep} />;
      case 5: return <ServiceCreatedStep formData={formData} setCurrentStep={setCurrentStep} currentStep={currentStep} />;
      case 6: return <PreviewStep formData={formData} currentStep={currentStep} setCurrentStep={setCurrentStep} />;
      case 7: return <PricingStep />;
      default: return <BusinessInfoStep />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center text-white justify-center">
            S
          </div>
          <h1 className="text-2xl font-bold">SimplyBooking</h1>
          <span className="ml-auto text-sm text-gray-600">Step {currentStep} of {totalSteps} - {currentStep === 1 ? 'Business Info' : currentStep === 2 ? 'Domain' : currentStep === 3 ? 'Services' : currentStep === 4 ? 'Services' : currentStep === 5 ? 'Services' : currentStep === 6 ? 'Preview' : 'Preview'}</span>
        </div>
        <ProgressBar />
        {renderStep()}

      </div>
    </div >
  );
};

export default Booking;











