import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Globe, FileText, Plus, Trash2, Check, ArrowLeft, ArrowRight, Star, Wrench, Camera, Building2, Lightbulb, Stars } from 'lucide-react';



const BusinessInfoStep = ({ formData, updateField, newServiceArea, addServiceArea, toggleDay,
  handleFileUpload, setCurrentStep, currentStep, removeServiceArea, setNewServiceArea, updateHours

}) => {
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-[20px] shadow-lg p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-2">Set Up Your Business</h1>
      <p className="text-gray-600 mb-8">Tell us about your business so customers can find and book with you.</p>

      <div className="mb-6">
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
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-4 lg:p-8">
      <h1 className="text-3xl font-bold mb-2">Add Your Services</h1>
      <p className="text-gray-600 mb-8">Add your services with pricing.</p>

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
            <div className="flex items-center gap-4 pl-12">
              <input
                type="text"
                placeholder="e.g., 50.00"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={service.price}
                onChange={(e) => updateService(index, 'price', e.target.value)}
                disabled={service.customPrice}
              />

              <label className="flex items-center cursor-pointer">
                <div
                  className={`relative inline-block w-12 h-7 rounded-full transition-colors duration-300 ${service.customPrice ? "bg-blue-500" : "bg-gray-300"}`}
                >
                  <input
                    type="checkbox"
                    className="absolute opacity-0 w-full h-full"
                    checked={service.customPrice}
                    onChange={(e) => updateService(index, 'customPrice', e.target.checked)}
                  />
                  <span
                    className={`absolute top-1/2 transform -translate-y-1/2 transition-transform duration-300 ms-[2px] w-5 h-5 bg-white rounded-full shadow-md ${service.customPrice ? "translate-x-6" : "translate-x-0"
                      }`}
                  />
                </div>
                <span className="text-sm text-gray-600 ms-2">Custom Price</span>
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
          className="ml-auto bg-cyan-500 text-white px-4 md:px-3 lg:px-4 py-2 rounded-lg hover:bg-cyan-600 flex items-center gap-1">
          Next Step</button>
      </div>
    </div>
  )
};

const QuestionnaireStep = ({ formData, addQuestion, updateQuestion, removeQuestion, currentStep, setCurrentStep }) => {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <h1 className="text-3xl font-bold mb-2">Build Your Questionnaire</h1>
      <p className="text-gray-600 mb-8">Add questions to gather information from customers</p>

      <div className="mb-6">
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
          Save Service</button>
      </div>
    </div>
  )
};

const ServiceCreatedStep = ({ formData, currentStep, setCurrentStep }) => {
  return (
    <div className="max-w-2xl mx-auto  rounded-lg  p-8">
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
          <ArrowRight size={20} />Continue to Preview</button>

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
  const totalSteps = 5;

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











