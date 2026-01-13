import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, Globe, FileText, Plus, Trash2, Check, ArrowLeft, ArrowRight, Star, Wrench, Camera, Building2, Lightbulb, Stars } from 'lucide-react';

// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

const api = {
  generateDomain: async (businessName) => {
    const res = await fetch(`${API_BASE_URL}/businesses/generate-domain`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ businessName })
    });
    return res.json();
  },

  checkDomain: async (domain) => {
    const res = await fetch(`${API_BASE_URL}/businesses/check-domain/${domain}`);
    return res.json();
  },

  saveBusiness: async (data) => {
    const res = await fetch(`${API_BASE_URL}/businesses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  updateBusiness: async (id, data) => {
    const res = await fetch(`${API_BASE_URL}/businesses/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  uploadImage: async (file, fieldName) => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('fieldName', fieldName);

    const res = await fetch(`${API_BASE_URL}/businesses/upload-image`, {
      method: 'POST',
      body: formData
    });
    return res.json();
  }
};

const StepIndicator = ({ currentStep, steps }) => {
  currentStep = currentStep - 2;
  return (
    <div className="flex items-center justify-center mb-8 gap-4">
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${currentStep > step ? 'bg-green-500 text-white' :
              currentStep === step && currentStep < 3 ? 'bg-blue-500 text-white' :
                currentStep === 3 ? 'bg-green-500 text-white' :
                  'bg-gray-600 text-white'
            }`}>
            {currentStep > step ? <Check size={20} /> : currentStep === 3 ? <Check size={20} /> : step}
          </div>
          {index < steps.length - 1 && (<div className="w-12 h-0.5 bg-green-300" />)}
        </React.Fragment>
      ))}
    </div>
  );
};

const BusinessInfoStep = ({ formData, updateField, newServiceArea, addServiceArea, toggleDay, handleFileUpload, setCurrentStep, currentStep, removeServiceArea, setNewServiceArea, updateHours, saveToLocalStorage }) => {
  const handleNext = async () => {
    saveToLocalStorage();

    // Generate domain suggestion when moving to next step
    if (formData.businessName && !formData.domain) {
      try {
        const { domain } = await api.generateDomain(formData.businessName);
        updateField('domain', domain);
      } catch (error) {
        console.error('Error generating domain:', error);
      }
    }

    setCurrentStep(currentStep + 1);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <h1 className="text-3xl font-bold mb-2">Set Up Your Business</h1>
      <p className="text-gray-600 mb-8">Tell us about your business so customers can find and book with you.</p>

      <div className="flex items-center mb-4">
        <div className="w-28 h-28 border-2 border-dashed border-blue-300 rounded-lg p-2 text-center cursor-pointer hover:border-blue-400 transition">
          <label className="cursor-pointer flex flex-col items-center justify-center h-full">
            <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleFileUpload("businessLogo", e.target.files[0])} />
            {formData.businessLogo ? (
              <img src={typeof formData.businessLogo === 'string' ? formData.businessLogo : URL.createObjectURL(formData.businessLogo)} alt="Logo" className="w-full h-full object-cover rounded-lg" />
            ) : (
              <><Camera className="text-blue-500 mb-1" size={40} /><p className="text-sm text-blue-500">Logo</p></>
            )}
          </label>
        </div>
        <div className="text-start ms-4">
          <p className="font-semibold">Business Logo</p>
          <p className="text-sm text-gray-500">Upload a square image, at least 200×200px</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="flex items-center text-sm font-medium mb-2">
            <Building2 className="mr-2 text-blue-500" size={18} />Business Name
          </label>
          <input type="text" placeholder="Your Business Name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.businessName} onChange={(e) => updateField('businessName', e.target.value)} />
        </div>
        <div>
          <label className="flex items-center text-sm font-medium mb-2">
            <Phone className="mr-2 text-blue-500" size={18} />Phone Number
          </label>
          <input type="tel" placeholder="+1 (555) 000-0000" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.phoneNumber} onChange={(e) => updateField('phoneNumber', e.target.value)} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="flex items-center text-sm font-medium mb-2">
            <Mail className="mr-2 text-blue-500" size={18} />Email
          </label>
          <input type="email" placeholder="contact@business.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.email} onChange={(e) => updateField('email', e.target.value)} />
        </div>
        <div>
          <label className="flex items-center text-sm font-medium mb-2">
            <MapPin className="mr-2 text-blue-500" size={18} />City / Town
          </label>
          <input type="text" placeholder="New York, NY" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.cityTown} onChange={(e) => updateField('cityTown', e.target.value)} />
        </div>
      </div>

      <div className="mb-4">
        <label className="flex items-center text-sm font-medium mb-2">
          <MapPin className="mr-2 text-blue-500" size={18} />Service Areas
        </label>
        <div className="flex gap-2 mb-2 flex-wrap">
          {formData.serviceAreas.map((area, index) => (
            <span key={index} className="px-3 py-1 bg-gray-100 text-cyan-600 rounded-full text-sm flex items-center gap-2">
              {area}
              <button type="button" onClick={() => removeServiceArea(index)} className="text-cyan-600 hover:text-cyan-800 font-bold">×</button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input type="text" placeholder="Add service area" className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={newServiceArea} onChange={(e) => setNewServiceArea(e.target.value)} onKeyPress={(e) => { if (e.key === 'Enter') { e.preventDefault(); addServiceArea(); } }} />
          <button type="button" onClick={addServiceArea} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Add</button>
        </div>
      </div>

      <div className="mb-6">
        <label className="flex items-center text-sm font-medium mb-2">
          <FileText className="mr-2 text-blue-500" size={18} />Business Description <span className="text-gray-400 ml-1">(optional)</span>
        </label>
        <textarea placeholder="Tell customers what makes your business special..." rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.businessDescription} onChange={(e) => updateField('businessDescription', e.target.value)} />
      </div>

      <div className="mb-6 bg-gray-100 p-4 rounded-lg">
        <label className="flex items-center text-sm font-medium mb-4">
          <Clock className="mr-2 text-blue-500" size={18} />Hours of Operation
        </label>
        {Object.entries(formData.hours).map(([day, hours]) => (
          <div key={day} className="flex items-center gap-4 mb-2">
            <button type="button" onClick={() => toggleDay(day)} className={`px-3 py-1 rounded font-medium text-sm w-16 text-center transition ${!hours.closed ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </button>
            {!hours.closed ? (
              <div className="flex items-center gap-2">
                <input type="time" value={hours.start} onChange={(e) => updateHours(day, 'start', e.target.value)} className="px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500" />
                <span className="text-gray-500">to</span>
                <input type="time" value={hours.end} onChange={(e) => updateHours(day, 'end', e.target.value)} className="px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500" />
              </div>
            ) : (
              <span className="text-gray-400">Closed</span>
            )}
          </div>
        ))}
      </div>

      <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center mb-6 cursor-pointer hover:border-blue-400 transition">
        <label className="cursor-pointer block">
          <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload('businessCoverPhoto', e.target.files[0])} />
          <Camera className="mx-auto text-blue-500 mb-2" size={40} />
          <p className="font-semibold">Upload Cover Photo</p>
          {formData.businessCoverPhoto ? (
            <p className="text-sm text-green-600 mt-2">{typeof formData.businessCoverPhoto === 'string' ? 'Uploaded' : formData.businessCoverPhoto.name}</p>
          ) : (
            <p className="text-sm text-gray-500">Recommended: 1200x400px</p>
          )}
        </label>
      </div>

      <hr className="my-6" />

      <div className="flex justify-between items-center">
        <button type="button" onClick={() => setCurrentStep(currentStep - 1)} className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-bold py-2 rounded-lg hover:bg-gray-100 transition">
          <ArrowLeft size={20} />Back
        </button>
        <button type="button" onClick={handleNext} className="bg-cyan-500 text-white px-6 py-2 rounded-lg hover:bg-cyan-600 flex items-center gap-1">
          Next: Choose Domain<ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

const DomainStep = ({ formData, updateField, currentStep, setCurrentStep, saveToLocalStorage }) => {
  const [checking, setChecking] = useState(false);
  const [available, setAvailable] = useState(null);

  useEffect(() => {
    if (formData.domain) {
      checkAvailability();
    }
  }, []);

  const checkAvailability = async () => {
    if (!formData.domain) return;

    setChecking(true);
    try {
      const result = await api.checkDomain(formData.domain);
      setAvailable(result.available);
    } catch (error) {
      console.error('Error checking domain:', error);
    }
    setChecking(false);
  };

  const handleNext = () => {
    saveToLocalStorage();
    setCurrentStep(currentStep + 1);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <h1 className="text-3xl font-bold mb-2">Choose Your Business Domain</h1>
      <p className="text-gray-600 mb-8">This will be your public service booking link</p>

      <label className="block text-sm font-medium mb-2">Your Domain</label>
      <div className="flex items-center border-4 border-double border-blue-500 rounded-lg overflow-hidden mb-4">
        <span className="px-4 py-3 bg-gray-50 text-blue-600 font-medium border-r">simplybooking.org/</span>
        <input type="text" placeholder="your-business-12" className="flex-1 px-4 py-3 focus:outline-none" value={formData.domain} onChange={(e) => { updateField('domain', e.target.value); setAvailable(null); }} onBlur={checkAvailability} />
      </div>

      {checking && <p className="text-sm text-gray-500 mb-4">Checking availability...</p>}
      {available === true && <p className="text-sm text-green-600 mb-4">✓ Domain available!</p>}
      {available === false && <p className="text-sm text-red-600 mb-4">✗ Domain already taken. Try another one.</p>}

      <div className="mb-6 bg-gray-100 rounded-lg p-6">
        <p className="text-sm text-gray-600 mb-2">Examples</p>
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600 bg-white p-2 rounded">
            <Globe className="mr-2" size={16} />simplybooking.org/plumberpro-12
          </div>
          <div className="flex items-center text-sm text-gray-600 bg-white p-2 rounded">
            <Globe className="mr-2" size={16} />simplybooking.org/smartcleaning-45
          </div>
          <div className="flex items-center text-sm text-gray-600 bg-white p-2 rounded">
            <Globe className="mr-2" size={16} />simplybooking.org/fastcleaning-78
          </div>
        </div>
      </div>

      <div className="flex mb-6 justify-center items-center">
        <Lightbulb className='text-yellow-500 mr-1' size={16} />
        <p className="text-sm text-gray-700">You can change this later anytime in your settings.</p>
      </div>

      <hr className="my-6" />

      <div className="flex justify-between items-center">
        <button type="button" onClick={() => setCurrentStep(currentStep - 1)} className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-bold py-2 rounded-lg hover:bg-gray-100 transition">
          <ArrowLeft size={20} />Back
        </button>
        <button type="button" onClick={handleNext} disabled={available === false} className="bg-cyan-500 text-white px-6 py-2 rounded-lg hover:bg-cyan-600 flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed">
          Add Services<ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

const AddServicesStep = ({ formData, addService, updateService, removeService, currentStep, setCurrentStep, saveToLocalStorage }) => {
  const handleNext = () => {
    saveToLocalStorage();
    setCurrentStep(currentStep + 1);
  };

  return (
    <div>
      <StepIndicator steps={[1, 2, 3]} currentStep={currentStep} />
      <div className="mt-6 max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-2">Add Your Services</h1>
        <p className="text-gray-600 mb-8">Add your services with pricing. You can also set custom pricing.</p>

        <div className="mb-6">
          <label className="flex items-center text-sm font-medium mb-4">
            <FileText className="mr-2 text-blue-500" size={18} />Services & Pricing
          </label>

          {formData.services.map((service, index) => (
            <div key={index} className="border border-gray-300 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-4 mb-4">
                <span className="w-8 h-8 flex items-center justify-center rounded bg-cyan-100 text-cyan-600 font-semibold">
                  {index + 1}
                </span>
                <input type="text" placeholder="e.g., Pipe Fitting" className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={service.name} onChange={(e) => updateService(index, 'name', e.target.value)} />
                <button type="button" onClick={() => removeService(index)} className="text-gray-400 hover:text-red-500">
                  <Trash2 size={20} />
                </button>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 sm:pl-12">
                <input type="text" inputMode="decimal" placeholder="e.g., 50.00" className="w-full sm:flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed" value={service.price} onChange={(e) => updateService(index, "price", e.target.value)} disabled={service.customPrice} />

                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <div className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${service.customPrice ? "bg-blue-500" : "bg-gray-300"}`}>
                    <input type="checkbox" className="sr-only" checked={service.customPrice} onChange={(e) => updateService(index, "customPrice", e.target.checked)} />
                    <span className={`absolute top-1/2 left-1 h-4 w-4 bg-white rounded-full shadow transform -translate-y-1/2 transition-transform duration-300 ${service.customPrice ? "translate-x-5" : "translate-x-0"}`} />
                  </div>
                  <span className="text-sm text-gray-600 whitespace-nowrap">Custom Price</span>
                </label>
              </div>
            </div>
          ))}

          <button type="button" onClick={addService} className="w-full border-2 border-dashed border-blue-300 text-blue-500 font-bold bg-blue-50 py-3 rounded-lg hover:bg-blue-100 flex items-center justify-center gap-2">
            <Plus size={20} /> Add New Service
          </button>
        </div>

        <hr />
        <div className="max-w-3xl mx-auto mt-6 flex justify-between items-center">
          <button type="button" onClick={() => setCurrentStep(currentStep - 1)} className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-bold py-2 rounded-lg hover:bg-gray-100 transition">
            <ArrowLeft size={20} />Back
          </button>
          <button type="button" onClick={handleNext} className="bg-cyan-500 text-white px-6 py-2 rounded-lg hover:bg-cyan-600 flex items-center gap-1">
            Next Step<ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

const QuestionnaireStep = ({ formData, addQuestion, updateQuestion, removeQuestion, currentStep, setCurrentStep, saveToLocalStorage }) => {
  const handleNext = () => {
    saveToLocalStorage();
    setCurrentStep(currentStep + 1);
  };

  return (
    <div>
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
              <input type="text" placeholder="Enter Your Question" className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={question.question} onChange={(e) => updateQuestion(index, 'question', e.target.value)} />
              <button type="button" onClick={() => removeQuestion(index)} className="text-gray-400 hover:text-red-500">
                <Trash2 size={20} />
              </button>
            </div>
            <textarea placeholder="Enter Your Answer (optional)" rows="3" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={question.answer} onChange={(e) => updateQuestion(index, 'answer', e.target.value)} />
          </div>
        ))}

        <button type="button" onClick={addQuestion} className="w-full border-2 border-dashed border-blue-300 text-blue-500 py-3 rounded-lg hover:bg-blue-50 flex items-center justify-center gap-2">
          <Plus size={20} />Add New Question
        </button>

        <div className="max-w-3xl mx-auto mt-6 flex justify-between items-center">
          <button type="button" onClick={() => setCurrentStep(currentStep - 1)} className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-bold py-2 rounded-lg hover:bg-gray-100 transition">
            <ArrowLeft size={20} />Back
          </button>
          <button type="button" onClick={handleNext} className="bg-cyan-500 text-white px-6 py-2 rounded-lg hover:bg-cyan-600 flex items-center gap-1">
            Save Service<ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

const ServiceCreatedStep = ({ formData, currentStep, setCurrentStep, saveToLocalStorage }) => {
  const handleAddAnother = () => {
    saveToLocalStorage();
    setCurrentStep(3);
  };

  const handleContinue = () => {
    saveToLocalStorage();
    setCurrentStep(currentStep + 1);
  };

  return (
    <div className="max-w-2xl mx-auto rounded-lg p-8">
      <StepIndicator steps={[1, 2, 3]} currentStep={currentStep} />
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Stars className="text-green-500" size={40} />
        </div>
        <h1 className="text-3xl font-bold mb-2">Services Created!</h1>
        <p className="text-gray-600">Your services have been added successfully</p>
      </div>

      <div className='bg-white rounded-lg shadow-lg p-6'>
        <div className="bg-gray-100 rounded-lg border p-6 mb-6">
          <p className="font-semibold mb-2">{formData.services.length} Service(s) Added</p>
          {formData.services.map((service, index) => (
            <p key={index} className="text-sm text-gray-600">
              {service.name || 'Untitled Service'} - {service.customPrice ? 'Custom Quote' : `$${service.price || '0'}`}
            </p>
          ))}
        </div>

        <button type="button" onClick={handleAddAnother} className="w-full bg-cyan-500 text-white py-3 rounded-lg hover:bg-cyan-600 flex items-center justify-center gap-2 mb-4">
          <Plus size={20} />Add Another Service
        </button>

        <button type="button" onClick={handleContinue} className="w-full py-3 rounded-lg hover:bg-gray-100 flex items-center justify-center gap-2 mb-4">
          Continue to Preview <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

const PreviewStep = ({ formData, currentStep, setCurrentStep, saveToLocalStorage }) => {
  const handleNext = async () => {
    saveToLocalStorage();
    setCurrentStep(currentStep + 1);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <h1 className="text-3xl font-bold mb-2">Preview Your Page</h1>
      <p className="text-gray-600 mb-8">This is how your customers will see your booking page.</p>

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-600 to-cyan-400 relative">
          {formData.businessCoverPhoto && (
            <img src={typeof formData.businessCoverPhoto === 'string' ? formData.businessCoverPhoto : URL.createObjectURL(formData.businessCoverPhoto)} alt="Cover" className="w-full h-full object-cover" />
          )}
          <div className="absolute -bottom-8 left-8 w-20 h-20 bg-white rounded-lg border-4 border-white flex items-center justify-center">
            {formData.businessLogo ? (
              <img src={typeof formData.businessLogo === 'string' ? formData.businessLogo : URL.createObjectURL(formData.businessLogo)} alt="Logo" className="w-full h-full object-cover rounded-lg" />
            ) : (
              <Building2 className="text-gray-400" size={32} />
            )}
          </div>
        </div>
        <div className="p-8 pt-12">
          <h2 className="text-2xl font-bold mb-2">{formData.businessName || 'Your Business'}</h2>
          <p className="text-sm text-gray-600 flex items-center gap-1 mb-4">
            <MapPin size={14} />{formData.cityTown || 'Your City'}
          </p>

          <p className="text-gray-700 mb-6">{formData.businessDescription || 'Your business description will appear here...'}</p>

          <h3 className="text-xl font-bold mb-4">Our Services</h3>
          <div className="space-y-3">
            {formData.services.length > 0 && formData.services[0].name ? (
              formData.services.map((service, index) => (
                <div key={index} className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-medium">{service.name}</span>
                  <span className="text-gray-600">{service.customPrice ? 'Custom Quote' : `$${service.price || '0'}`}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center py-4">No services added yet</p>
            )}
          </div>

          <div className="mt-6 bg-gray-50 p-4 rounded-lg">
            <p className="text-sm font-semibold mb-2">Your Booking URL:</p>
            <p className="text-blue-600">simplybooking.org/{formData.domain || 'your-domain'}</p>
          </div>
        </div>
      </div>

    </div>
  )
}






const Form = () => {
  return (
    <div>
      <BusinessInfoStep />
    </div>
  )
}

export default Form



// import React, { useState, useRef, useEffect } from 'react'
// import { Mail, ArrowLeft, CheckCircle } from 'lucide-react'
// import axios from 'axios'

// const OTPVerification = ({ email, onSuccess, onBack }) => {
//   const [otp, setOtp] = useState(['', '', '', '', '', '']);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState(false);
//   const [resendLoading, setResendLoading] = useState(false);
//   const [timer, setTimer] = useState(60);
//   const [canResend, setCanResend] = useState(false);

//   const inputRefs = useRef([]);

//   useEffect(() => {
//     // Focus first input on mount
//     inputRefs.current[0]?.focus();
//   }, []);

//   useEffect(() => {
//     if (timer > 0) {
//       const interval = setInterval(() => {
//         setTimer(prev => prev - 1);
//       }, 1000);
//       return () => clearInterval(interval);
//     } else {
//       setCanResend(true);
//     }
//   }, [timer]);

//   const handleChange = (index, value) => {
//     if (!/^\d*$/.test(value)) return;

//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);
//     setError('');

//     // Auto-focus next input
//     if (value && index < 5) {
//       inputRefs.current[index + 1]?.focus();
//     }

//     // Auto-submit when all fields are filled
//     if (newOtp.every(digit => digit !== '') && index === 5) {
//       handleVerify(newOtp.join(''));
//     }
//   };

//   const handleKeyDown = (index, e) => {
//     if (e.key === 'Backspace' && !otp[index] && index > 0) {
//       inputRefs.current[index - 1]?.focus();
//     }
//   };

//   const handlePaste = (e) => {
//     e.preventDefault();
//     const pastedData = e.clipboardData.getData('text').slice(0, 6).split('');
//     if (pastedData.every(char => /^\d$/.test(char))) {
//       const newOtp = [...otp];
//       pastedData.forEach((char, idx) => {
//         if (idx < 6) newOtp[idx] = char;
//       });
//       setOtp(newOtp);
//       if (pastedData.length === 6) {
//         handleVerify(newOtp.join(''));
//       }
//     }
//   };

//   const handleVerify = async (otpCode = otp.join('')) => {
//     if (otpCode.length !== 6) {
//       setError('Please enter all 6 digits');
//       return;
//     }

//     setLoading(true);
//     setError('');

//     try {
//       const response = await axios.post('http://localhost:5000/api/auth/verify-otp', { email, otp: otpCode });

//       if (response.data.success) {
//         setSuccess(true);
//         setTimeout(() => {
//           onSuccess();
//         }, 1500);
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || 'Invalid OTP. Please try again.');
//       setOtp(['', '', '', '', '', '']);
//       inputRefs.current[0]?.focus();
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResend = async () => {
//     setResendLoading(true);
//     setError('');

//     try {
//       const response = await axios.post('http://localhost:5000/api/auth/resend-otp', {
//         email
//       });

//       if (response.data.success) {
//         setTimer(60);
//         setCanResend(false);
//         setOtp(['', '', '', '', '', '']);
//         inputRefs.current[0]?.focus();
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to resend OTP');
//     } finally {
//       setResendLoading(false);
//     }
//   };

//   if (success) {
//     return (
//       <div className='min-h-screen bg-cyan-50 flex items-center justify-center p-4'>
//         <div className='w-full max-w-md'>
//           <div className='bg-white rounded-2xl shadow-lg p-8 text-center'>
//             <div className='w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
//               <CheckCircle className='w-12 h-12 text-green-500' />
//             </div>
//             <h2 className='text-2xl font-bold text-gray-800 mb-2'>Verification Successful!</h2>
//             <p className='text-gray-600'>Your account has been verified. Redirecting...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className='min-h-screen bg-cyan-50 flex items-center justify-center p-4'>
//       <div className='w-full max-w-md'>
//         <div className='flex items-center justify-center mb-8'>
//           <div className='bg-cyan-500 rounded-lg py-2 px-4 shadow-lg'>
//             <span className='text-white text-center text-2xl font-bold'>S</span>
//           </div>
//           <span className='text-3xl font-bold text-gray-700 ml-2'>SimplyBooking</span>
//         </div>

//         <div className='bg-white rounded-2xl shadow-lg p-8'>
//           <button
//             onClick={onBack}
//             className='flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors'
//           >
//             <ArrowLeft className='w-4 h-4 mr-2' />
//             Back
//           </button>

//           <div className='text-center mb-8'>
//             <div className='w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4'>
//               <Mail className='w-8 h-8 text-cyan-500' />
//             </div>
//             <h1 className='text-2xl font-bold text-gray-800 mb-2'>Verify Your Email</h1>
//             <p className='text-gray-600 text-sm'>
//               We've sent a 6-digit code to<br />
//               <span className='font-semibold text-gray-800'>{email}</span>
//             </p>
//           </div>

//           {error && (
//             <div className='mb-6 p-3 bg-red-50 border border-red-200 rounded-lg'>
//               <p className='text-red-600 text-sm text-center'>{error}</p>
//             </div>
//           )}

//           <div className='mb-6'>
//             <div className='flex justify-center gap-3 mb-2'>
//               {otp.map((digit, index) => (
//                 <input
//                   key={index}
//                   ref={el => inputRefs.current[index] = el}
//                   type='text'
//                   maxLength='1'
//                   value={digit}
//                   onChange={(e) => handleChange(index, e.target.value)}
//                   onKeyDown={(e) => handleKeyDown(index, e)}
//                   onPaste={handlePaste}
//                   disabled={loading}
//                   className='w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-cyan-500 focus:outline-none transition-all disabled:bg-gray-100'
//                 />
//               ))}
//             </div>
//           </div>

//           <button
//             onClick={() => handleVerify()}
//             disabled={loading || otp.some(digit => !digit)}
//             className='w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-300 text-white font-semibold py-3 rounded-lg transition-colors shadow-lg shadow-cyan-500/30 mb-4'
//           >
//             {loading ? 'Verifying...' : 'Verify Email'}
//           </button>

//           <div className='text-center'>
//             <p className='text-sm text-gray-600 mb-2'>
//               Didn't receive the code?
//             </p>
//             {canResend ? (
//               <button
//                 onClick={handleResend}
//                 disabled={resendLoading}
//                 className='text-cyan-500 hover:text-cyan-600 font-semibold text-sm disabled:text-cyan-300'
//               >
//                 {resendLoading ? 'Sending...' : 'Resend Code'}
//               </button>
//             ) : (
//               <p className='text-sm text-gray-500'>
//                 Resend code in {timer}s
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default OTPVerification




// import React, { useState } from 'react'

// const Form = () => {
//   const [user, setuser] = useState({
//     fullname: "",
//     email: "",
//     password: ""
//   });
//   const [agreedterms, setAgreedTerms] = useState(false);

//   const [verificationCode, setVerificationCode] = useState("");
//   const [inputCode, setInputCode] = useState("");
//   const [showVerifyPopup, setShowVerifyPopup] = useState(false);

//   // Generate 6 - digit code
//   const generateCode = () => {
//     return Math.floor(100000 + Math.random() * 900000).toString();
//   };

//   const { fullname, email, password } = user;

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setuser({
//       ...user,
//       [name]: value
//     });
//   };

//   const HandleSubmit = async () => {
//     if (!agreedterms) {
//       alert("Please agree to terms");
//       return;
//     }

//     const code = generateCode();
//     setVerificationCode(code);

//     await fetch("http://localhost:5000/send-code", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         email: user.email,
//         code,
//       }),
//     });

//     setShowVerifyPopup(true);
//   };


//   const handleVerify = () => {
//     if (inputCode === verificationCode) {
//       alert("Email verified successfully!");
//       setShowVerifyPopup(false);
//       console.log("User registered:", user);
//       // 👉 navigate("/next-page");
//     } else {
//       alert("Invalid verification code");
//     }
//   };



//   return (
//     <div>
//       {showVerifyPopup && (
//         <div className="popup">
//           <div className="popup-content">
//             <h3>Email Verification</h3>
//             <p>Enter the 6-digit code sent to your email</p>

//             <input
//               className='form-control border p-2 m-4'
//               type="text"
//               maxLength="6"
//               value={inputCode}
//               onChange={(e) => setInputCode(e.target.value)}
//               placeholder="Enter code" />

//             <button className='btn border p-4' onClick={handleVerify}>Verify</button>
//             <button className='btn border p-4' onClick={() => setShowVerifyPopup(false)}>Cancel</button>
//           </div>
//         </div>
//       )}

//       <input  className='form-control border p-2 m-4' name="fullname" value={fullname} onChange={handleInputChange} />
//       <input className='form-control border p-2 m-4' name="email" value={email} onChange={handleInputChange} />
//       <input className='form-control border p-2 m-4' name="password" value={password} onChange={handleInputChange} />

//       <button className='btn border p-4' onClick={HandleSubmit}>Register</button>

//     </div>
//   )
// }

// export default Form