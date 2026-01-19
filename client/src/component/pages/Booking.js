
import React, { useEffect, useState } from 'react';
import { Phone, Mail, MapPin, Clock, Globe, FileText, Plus, Trash2, Check, ArrowLeft, ArrowRight, Star, Wrench, Camera, Building2, Lightbulb, Stars } from 'lucide-react';
import { API_BASE_URL, checkDomainAvailability, generateUniqueDomain, saveBusinessData } from '../api/Api';
import { showError, showSuccess } from '../utils/toast';
import axios from 'axios';

const StepIndicator = ({ currentStep, steps }) => {
  currentStep = currentStep - 2;
  return (
    <div className="flex items-center justify-center mb-8 gap-4">
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${currentStep > step ? 'bg-green-500 text-white' :
            currentStep === step && currentStep < 4 ? 'bg-blue-500 text-white' : currentStep === 4 ? 'bg-green-500 text-white' :
              'bg-gray-600 text-white'
            }`}>
            {currentStep > step ? <Check size={20} /> : step}
          </div>
          {index < steps.length - 1 && (<div className="w-12 h-0.5 bg-green-300" />)}
        </React.Fragment>
      ))}
    </div>
  )
};

const BusinessInfoStep = ({ formData, updateField, newServiceArea, addServiceArea, toggleDay, handleFileUpload,
  setCurrentStep, currentStep, removeServiceArea, setNewServiceArea, updateHours, saveToLocalStorage }) => {
  const validateStep = () => {
    console.log(formData)
    if (!formData.businessName || !formData.businessName.trim()) {
      showError('Business name is required');
      return false;
    }
    if (!formData.phoneNumber || !formData.phoneNumber.trim()) {
      showError('Phone number is required');
      return false;
    }
    if (!formData.email || !formData.email.trim()) {
      showError('Email is required');
      return false;
    }
    if (!formData.cityTown || !formData.cityTown.trim()) {
      showError('City/Town is required');
      return false;
    }
    if (!(formData.businessLogo instanceof File)) {
      showError('logo is required');
      return false;
    }

    if (!(formData.businessCoverPhoto instanceof File)) {
      showError('Cover photo is required');
      return false;
    }

    return true;
  };

  const handleNext = async () => {
    if (!validateStep()) return;

    saveToLocalStorage();

    if (formData.businessName && !formData.domain) {
      try {
        const response = await fetch(API_BASE_URL + '/businesses/generate-domain', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ businessName: formData.businessName })
        });
        const data = await response.json();
        updateField('domain', data.domain);
      } catch (error) {
        console.error('Error generating domain:', error);
      }
    }
    setCurrentStep(currentStep + 1);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-lg p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-2">Set Up Your Business</h1>
      <p className="text-gray-600 mb-8">Tell us about your business</p>

      <div className="flex items-center mb-4">
        <div className="w-28 h-28 border-2 border-dashed border-blue-300 rounded-3xl p-2 cursor-pointer hover:border-blue-400 transition">
          <label className="cursor-pointer flex flex-col items-center justify-center h-full">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileUpload("businessLogo", e.target.files[0])}
            />
            {formData.businessLogo ? (
              <img
                src={formData.businessLogo instanceof File ? URL.createObjectURL(formData.businessLogo) : formData.businessLogo}
                alt="Logo"
                className="w-full h-full object-cover rounded-2xl"
              />
            ) : (
              <>
                <Camera className="text-blue-500 mb-1" size={40} />
                <p className="text-sm text-blue-500">Logo</p>
              </>
            )}
          </label>
        </div>
        <div className="text-start ms-4">
          <p className="font-semibold">Business Logo</p>
          <p className="text-sm text-gray-500">At least 200×200px</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="flex items-center text-sm font-medium mb-2">
            <Building2 className="mr-2 text-blue-500" size={18} />
            Business Name <span className="text-red-500 ml-1">*</span>
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
            Phone Number <span className="text-red-500 ml-1">*</span>
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
            Email <span className="text-red-500 ml-1">*</span>
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
            City / Town <span className="text-red-500 ml-1">*</span>
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
        <input
          type="text"
          placeholder="Add service area"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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

      <div className="mb-6">
        <label className="flex items-center text-sm font-medium mb-2">
          <FileText className="mr-2 text-blue-500" size={18} />
          Description <span className="text-gray-400 ml-1">(optional)</span>
        </label>
        <textarea
          placeholder="Tell customers about your business..."
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
          <div key={day} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-2">
            <button
              type="button"
              onClick={() => toggleDay(day)}
              className={'px-3 py-1 rounded-xl font-medium text-sm w-24 text-center transition ' + (!hours.closed ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500')}
            >
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </button>
            {!hours.closed ? (
              <div className="flex items-center gap-2">
                <input
                  type="time"
                  value={hours.start}
                  onChange={(e) => updateHours(day, 'start', e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 w-32"
                />
                <span className="text-gray-500">to</span>
                <input
                  type="time"
                  value={hours.end}
                  onChange={(e) => updateHours(day, 'end', e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 w-32"
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
          <p className="font-semibold">Upload Cover Photo <span className="text-red-500">*</span></p>
          {formData.businessCoverPhoto ? (
            <p className="text-sm text-green-600 mt-2">
              {formData.businessCoverPhoto instanceof File ? formData.businessCoverPhoto.name : 'Cover photo selected'}
            </p>
          ) : (
            <p className="text-sm text-blue-500">Recommended: 1200×400px</p>
          )}
        </label>
      </div>

      <hr />

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={() => handleNext()}
          className="bg-cyan-500 text-white px-6 py-2 rounded-lg hover:bg-cyan-600 flex items-center gap-1"
        >
          Next: Choose Domain<ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

const DomainStep = ({ formData, updateField, currentStep, setCurrentStep, saveToLocalStorage }) => {
  const [checking, setChecking] = useState(false);
  const [available, setAvailable] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (!formData.businessName) return;

    const fetchDomains = async () => {
      try {
        const response = await fetch(API_BASE_URL + '/businesses/generate-domainss', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ businessName: formData.businessName })
        });

        if (response.ok) {
          const data = await response.json();
          setSuggestions(data.suggestions || []);
        }
      } catch (error) {
        console.error('Error fetching domains:', error);
      }
    };

    fetchDomains();
  }, []);
  const checkAvailability = async () => {
    if (!formData.domain) return;

    setChecking(true);
    try {
      const result = await checkDomainAvailability(formData.domain);
      console.log(result.available)
      setAvailable(result.available);
    } catch (error) {
      console.error('Error checking domain:', error);
    }
    setChecking(false);
  };

  const validateStep = () => {
    if (!formData.domain || !formData.domain.trim()) {
      showError('Domain is required');
      return false;
    }
    if (available === false) {
      showError('This domain is taken');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    saveToLocalStorage();
    setCurrentStep(currentStep + 1);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <h1 className="text-3xl font-bold mb-2">Choose Your Domain</h1>
      <p className="text-gray-600 mb-8">Your public booking link</p>

      <label className="block text-sm font-medium mb-2">Domain <span className="text-red-500">*</span></label>
      <div className="flex items-center border-4 border-double border-blue-500 rounded-lg overflow-hidden mb-4">
        <span className="px-4 py-3 bg-gray-50 text-blue-600 font-medium border-r">simplybooking.org/</span>
        <input
          type="text"
          placeholder="your-business"
          className="flex-1 px-4 py-3 focus:outline-none"
          value={formData.domain}
          onChange={(e) => {
            updateField('domain', e.target.value);
            setAvailable(null);
          }}
          onBlur={checkAvailability}
        />
      </div>

      {checking && <p className="text-sm text-gray-500 mb-4">Checking...</p>}
      {available === true && <p className="text-sm text-green-600 mb-4">✓ Available!</p>}
      {available === false && <p className="text-sm text-red-600 mb-4">✗ Taken</p>}

      {suggestions.length > 0 && (
        <div className="mb-6 bg-gray-100 rounded-lg p-6">
          <p className="text-sm text-gray-600 mb-2">Suggestions</p>
          {suggestions.slice(0, 3).map((sug, i) => (
            <div key={i} className="flex items-center text-sm text-gray-600 bg-white p-2 rounded mb-2">
              <Globe className="mr-2" size={16} />simplybooking.org/{sug}
            </div>
          ))}
        </div>
      )}

      <hr className="my-6" />

      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => {
            saveToLocalStorage();
            setCurrentStep(currentStep - 1);
          }}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-bold py-2"
        >
          <ArrowLeft size={20} />Back
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={available === false}
          className="bg-cyan-500 text-white px-6 py-2 rounded-lg hover:bg-cyan-600 flex items-center gap-1 disabled:opacity-50"
        >
          Add Services<ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};



const AddServicesStep = ({ formData, addService, updateService, removeService, currentStep, setCurrentStep, saveToLocalStorage }) => {
  const validateStep = () => {
    if (!formData.services[0].name || !formData.services[0].name.trim()) {
      showError('At least one service required');
      return false;
    }

    for (let i = 0; i < formData.services.length; i++) {
      const svc = formData.services[i];
      if (!svc.name || !svc.name.trim()) {
        showError('Service ' + (i + 1) + ' name required');
        return false;
      }
      if (!svc.customPrice && (!svc.price || isNaN(parseFloat(svc.price)))) {
        showError('Service ' + (i + 1) + ' needs price');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    saveToLocalStorage();
    setCurrentStep(currentStep + 1);
  };

  return (
    <div>
      <StepIndicator steps={[1, 2, 3]} currentStep={currentStep} />
      <div className="mt-6 max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-2">Add Services</h1>
        <p className="text-gray-600 mb-8">Add your services with pricing</p>

        {formData.services.map((svc, idx) => (
          <div key={idx} className="border p-4 rounded-lg mb-4">
            <div className="flex items-center gap-4 mb-4">
              <span className="w-8 h-8 flex items-center justify-center rounded-2xl bg-cyan-100 text-cyan-600 font-semibold">
                {idx + 1}
              </span>
              <input
                type="text"
                placeholder="Service name"
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={svc.name}
                onChange={(e) => updateService(idx, 'name', e.target.value)}
              />
              <button
                type="button"
                onClick={() => removeService(idx)}
                disabled={formData.services.length === 1}
                className="text-gray-400 hover:text-red-500"
              >
                <Trash2 size={20} />
              </button>
            </div>

            <div className="flex items-center gap-4 pl-12">
              <input
                type="text"
                placeholder="50.00"
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 "
                value={svc.price}
                onChange={(e) => updateService(idx, "price", e.target.value)}
                disabled={!svc.customPrice}
              />
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={svc.customPrice}
                  onChange={(e) => updateService(idx, "customPrice", e.target.checked)}
                />
                <span className="text-sm">Custom Price</span>
              </label>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addService}
          className="w-full border-2 border-dashed border-blue-300 text-blue-500 py-3 rounded-lg hover:bg-blue-50 flex items-center justify-center gap-2"
        >
          <Plus size={20} /> Add Service
        </button>

        <hr className="my-6" />

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => {
              saveToLocalStorage();
              setCurrentStep(currentStep - 1);
            }}
            className="flex items-center gap-2 text-gray-700 font-bold"
          >
            <ArrowLeft size={20} />Back
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="bg-cyan-500 text-white px-8 py-2 rounded-lg hover:bg-cyan-600"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};



const QuestionnaireStep = ({ formData, addQuestion, updateQuestion, removeQuestion, currentStep, setCurrentStep, saveToLocalStorage }) => {

  const validateStep = () => {
    if (!formData.questions[0].question || !formData.questions[0].question.trim()) {
      showError('At least one Quesion and answer is required');
      return false;
    }

    for (let i = 0; i < formData.questions.length; i++) {
      const svc = formData.questions[i];
      if (!svc.question || !svc.question.trim()) {
        showError('Question ' + (i + 1) + ' Question required');
        return false;
      }
      if (!svc.answer || !svc.answer.trim()) {
        showError('answer ' + (i + 1) + ' answer price');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    saveToLocalStorage();
    setCurrentStep(currentStep + 1);
  };
  const handleBack = () => {
    saveToLocalStorage();
    setCurrentStep(currentStep - 1);
  };
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
            <div className='flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 sm:pl-12'>
              <textarea
                placeholder="Enter Your Answer (optional)"
                rows="3"
                className="w-full sm:flex-1 px-4 py-2 border border-gray-300 rounded-lg
                              focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={question.answer}
                onChange={(e) => updateQuestion(index, 'answer', e.target.value)}
              />
            </div>
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
            onClick={() => handleBack()}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-bold py-2 rounded-lg hover:bg-white transition">
            <ArrowLeft size={20} />Back</button>
          <button
            type="button"
            onClick={() => handleNext()}
            className="ml-auto bg-cyan-500 text-white px-4 md:px-3 lg:px-4 py-2 rounded-lg hover:bg-cyan-600 flex items-center gap-1">
            Save Service</button>
        </div>
      </div>

    </div>
  )
};

const ServiceCreatedStep = ({ formData, currentStep, setCurrentStep, saveToLocalStorage }) => {
  const handleNext = () => {
    saveToLocalStorage();
    setCurrentStep(currentStep + 1);
  };

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
          onClick={() => handleNext()}
          className="w-full py-3 rounded-lg hover:bg-gray-100 flex items-center justify-center gap-2 mb-4">
          Continue to Preview <ArrowRight size={20} className='mt-1' /></button>

      </div>
    </div>
  )
};

const PreviewStep = ({ formData, currentStep, setCurrentStep, saveToLocalStorage, submitFormData }) => {

  const handleNext = () => {
    saveToLocalStorage();
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    saveToLocalStorage();
    setCurrentStep(currentStep - 1);
  };

  return (

    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <h1 className="text-3xl font-bold mb-2">Preview Your Page</h1>
      <p className="text-gray-600 mb-8">This is how your customers will see your booking page.</p>

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-600 to-cyan-400 relative">
          <div className="absolute -bottom-8 left-8 w-20 h-20 bg-white rounded-lg border-4 border-white flex items-center justify-center">

            {formData?.businessLogo && (
              <img
                src={
                  formData.businessLogo instanceof File
                    ? URL.createObjectURL(formData.businessLogo)
                    : formData.businessLogo
                }
                alt="Business Logo"
                className="w-full h-full object-cover rounded-lg"
              />

            )}
          </div>
        </div>
        <div className="p-6 pt-12">

          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">{formData.businessName || 'Your Business'}</h2>
              <p className="text-sm text-gray-600 flex items-center gap-1 mb-2">
                <MapPin size={14} />
                {formData.cityTown || 'Your City'}
              </p>

              <div className="flex items-center mt-2">
                <div className="flex text-orange-400">★★★★★</div>
                <span className="text-sm text-gray-500 ml-2">(128 reviews)</span>
              </div>
            </div>
            <button className="bg-orange-500 text-xs text-white px-4 py-2 rounded-lg hover:bg-orange-600" onClick={() => submitFormData()}>
              Request a Quote
            </button>
          </div>

          <p className="text-gray-700 mb-6">
            {formData.businessDescription || 'Your business description will appear here...'}
          </p>


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <div className="text-center px-2 py-1 bg-gray-50 rounded-lg flex gap-2 items-center">
              <div className="text-cyan-500 h-8 w-8 flex items-center justify-center rounded-lg bg-gray-200">
                <Phone />
              </div>
              <div className="min-w-0">
                <div className="text-xs text-gray-500 text-start">Phone</div>
                <div className="text-sm">{formData.phoneNumber}</div>
              </div>
            </div>

            <div className="text-center px-2 py-1 bg-gray-50 rounded-lg flex gap-2 items-center">
              <div className="text-cyan-500 h-8 w-8 flex items-center justify-center rounded-lg bg-gray-200 shrink-0">
                <Mail />
              </div>

              <div className="min-w-0">
                <div className="text-xs text-gray-500 text-start">Email</div>
                <div className="text-sm break-all">
                  {formData.email}
                </div>
              </div>
            </div>


            <div className="text-center px-2 py-1 bg-gray-50 rounded-lg flex gap-2 items-center">
              <div className="text-cyan-500 h-8 w-8 flex items-center justify-center rounded-lg bg-gray-200">
                <Clock />
              </div>
              <div className="min-w-0">
                <div className="text-xs text-gray-500 text-start">Hours</div>
                <div className="text-sm">24/7 Available</div>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-4">Our Services</h3>
          <div className="space-y-1">
            {formData.services.length > 0 && formData.services[0].name ? (
              <div className="grid grid-cols-2 gap-3">
                {formData.services.map((service, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center px-4 py-3 rounded-lg border border-gray-200"
                  >
                    <span className="font-medium">{service.name}</span>
                    <span className="text-gray-600">
                      {service.customPrice ? 'Custom Quote' : `$${service.price || '0'}`}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center py-4">No services added yet</p>
            )}

          </div>
        </div>
      </div>
      <div className="max-w-3xl mx-auto mt-6 flex justify-between items-center">
        <button
          type="button"
          onClick={() => handleBack()}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-bold py-2 rounded-lg hover:bg-white transition">
          <ArrowLeft size={20} />Back</button>
        <button
          type="button"
          onClick={() => handleNext()}
          className="ml-auto bg-cyan-500 text-white px-4 md:px-3 lg:px-4 py-2 rounded-lg hover:bg-cyan-600 flex items-center gap-1">
          Next: Choose Plan</button>
      </div>
    </div>
  )
};

const RelatedImage = ({
  formData = {},
  currentStep,
  setCurrentStep = () => { },
  saveToLocalStorage = () => { },
  handleFileUpload = () => { },
}) => {


  const validateStep = () => {
    if (!formData.image1 || !(formData.image1 instanceof File)) {
      showError('Image 1 is required');
      return false;
    }

    if (!formData.image2 || !(formData.image2 instanceof File)) {
      showError('Image 2 is required');
      return false;
    }

    if (!formData.image3 || !(formData.image3 instanceof File)) {
      showError('Image 3 is required');
      return false;
    }

    return true;
  };


  const handleNext = async () => {
    if (!validateStep()) return;

    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    saveToLocalStorage();
    setCurrentStep(currentStep - 1);
  };

  return (
    <div>
      <StepIndicator steps={[1, 2, 3]} currentStep={currentStep} />

      <div className="lg:mt-[100px]">
        <div className="mb-6 max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-2">Business Related Image</h1>
          <label className="block text-sm font-medium mb-4">Add 3 Images</label>

          {[1, 2, 3].map((i) => {
            const fieldName = `image${i}`;
            const imageValue = formData?.[fieldName];

            return (
              <div
                key={i}
                className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center mb-6 cursor-pointer hover:border-blue-400 transition"
              >
                <label className="cursor-pointer block">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"

                    onChange={(e) => handleFileUpload(fieldName, e.target.files[0])}
                  />

                  {imageValue ? (
                    <img
                      src={
                        imageValue instanceof File
                          ? URL.createObjectURL(imageValue)
                          : imageValue
                      }
                      alt={`Business Image ${i}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="text-center">
                      <Camera className="text-blue-500 mb-1 mx-auto" size={40} />
                      <p className="text-sm text-blue-500">
                        Upload Image {i} - at least 200×200px
                      </p>
                    </div>
                  )}
                </label>
              </div>
            );
          })}

          <div className="max-w-3xl mx-auto mt-6 flex justify-between items-center gap-4">
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-bold py-2 px-4 rounded-lg hover:bg-gray-100 transition"
            >
              <ArrowLeft size={20} />
              Back
            </button>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleNext}
                className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition"
              >
                Save Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const PricingStep = ({ currentStep, setCurrentStep, submitFormData }) => {
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
            <p className="text-gray-600">Per dayth</p>
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
            <button className=" bg-cyan-500 text-white py-2 px-4 rounded-lg hover:bg-cyan-600 flex items-center justify-center gap-1" onClick={() => setCurrentStep(currentStep - 1)}>
              Next: Choose Plan
              <ArrowRight size={20} className='mt-1' />
            </button>
            <button className=" bg-cyan-500 text-white py-2 px-4 rounded-lg hover:bg-cyan-600 flex items-center justify-center gap-1" onClick={() => submitFormData()}>
              Submit</button>
          </div>


        </div>
      </div>
    </div>
  )
};

const Booking = () => {
  const [currentStep, setCurrentStep] = useState(3);
  const [newServiceArea, setNewServiceArea] = useState('');

  const [formData, setFormData] = useState({
    businessName: '',
    phoneNumber: '',
    email: '',
    cityTown: '',
    businessLogo: null,
    businessCoverPhoto: null,
    serviceAreas: [],
    businessDescription: '',
    hours: {
      monday: { start: '09:00', end: '17:00', closed: false },
      tuesday: { start: '09:00', end: '17:00', closed: false },
      wednesday: { start: '09:00', end: '17:00', closed: false },
      thursday: { start: '09:00', end: '17:00', closed: false },
      friday: { start: '09:00', end: '17:00', closed: false },
      saturday: { start: '', end: '', closed: true },
      sunday: { start: '', end: '', closed: true },
    },
    domain: '',
    services: [{ name: '', price: '', customPrice: false }],
    questions: [{ question: '', answer: '' }],
    image1: null,
    image2: null,
    image3: null,
    userId: ''
  });

  const totalSteps = 8;

  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user.id || '';

    const saved = localStorage.getItem('bookingFormData');
    const savedStep = localStorage.getItem('bookingCurrentStep');

    if (saved) {
      const parsedData = JSON.parse(saved);
      setFormData({ ...parsedData, userId });
    } else {
      setFormData(prev => ({ ...prev, userId }));
    }

    if (savedStep) {
      setCurrentStep(Number(savedStep));
    }

    setIsHydrated(true); // only after loading from localStorage
  }, []);

  useEffect(() => {
    if (!isHydrated) return; // don't save before hydration
    if (!formData.businessName) return; // optional: only save if valid
    saveToLocalStorage();
  }, [formData, isHydrated]);




  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      if (!(file instanceof File)) {
        resolve(file);
        return;
      }
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error('Failed to read file'));

      reader.readAsDataURL(file);
    });
  };

  const saveToLocalStorage = async () => {
    try {
      const formDataCopy = { ...formData };
      const imageFields = ['businessLogo', 'businessCoverPhoto', 'image1', 'image2', 'image3'];
      for (const field of imageFields) { formDataCopy[field] = await fileToBase64(formData[field]); }
      localStorage.setItem('bookingFormData', JSON.stringify(formDataCopy));
      localStorage.setItem('bookingCurrentStep', String(currentStep));
    } catch (error) {
      console.error('Error saving form data to localStorage:', error);
    }
  };


  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field, file) => {
    if (file) {
      setFormData(prev => ({ ...prev, [field]: file }));
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
      [day]: { ...formData.hours[day], [field]: value }
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


  const submitFormData = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('businessName', formData.businessName);
      formDataToSend.append('phoneNumber', formData.phoneNumber);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('cityTown', formData.cityTown);
      formDataToSend.append('businessDescription', formData.businessDescription);
      formDataToSend.append('domain', formData.domain);
      formDataToSend.append('userId', formData.userId);
      formDataToSend.append('serviceAreas', JSON.stringify(formData.serviceAreas));
      formDataToSend.append('hours', JSON.stringify(formData.hours));
      formDataToSend.append('services', JSON.stringify(formData.services));
      formDataToSend.append('questions', JSON.stringify(formData.questions));

      if (formData.businessLogo) {
        formDataToSend.append('businessLogo', formData.businessLogo);
      }
      if (formData.businessCoverPhoto) {
        formDataToSend.append('businessCoverPhoto', formData.businessCoverPhoto);
      }
      for (let i = 1; i <= 5; i++) {
        if (formData[`image${i}`]) {
          formDataToSend.append(`image${i}`, formData[`image${i}`]);
        }
      }

      const response = await fetch(API_BASE_URL + '/businesses', {
        method: 'POST',
        body: formDataToSend
      });

      const data = await response.json();

      if (response.ok) {
        showSuccess(data.message);
        localStorage.removeItem('bookingFormData');
        localStorage.removeItem('bookingCurrentStep');
      } else {
        showError(data.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      showError('Error submitting form');
    }
  };
  const ProgressBar = () => (
    <div className="w-full bg-gray-200 h-1 mb-8 rounded-full overflow-hidden">
      <div
        className="bg-blue-500 h-1 transition-all duration-300"
        style={{ width: ((currentStep / totalSteps) * 100) + '%' }}
      />
    </div>
  );

  // ///////////////////////////////////////////////

  const renderStep = () => {

    switch (currentStep) {
      case 1: return <BusinessInfoStep formData={formData} updateField={updateField} newServiceArea={newServiceArea} addServiceArea={addServiceArea} toggleDay={toggleDay} handleFileUpload={handleFileUpload}
        removeServiceArea={removeServiceArea} setNewServiceArea={setNewServiceArea} updateHours={updateHours} currentStep={currentStep} setCurrentStep={setCurrentStep} saveToLocalStorage={saveToLocalStorage}
      />;
      case 2: return <DomainStep formData={formData} updateField={updateField} currentStep={currentStep} setCurrentStep={setCurrentStep} saveToLocalStorage={saveToLocalStorage} />;
      case 3: return <AddServicesStep formData={formData} addService={addService} updateService={updateService} removeService={removeService} currentStep={currentStep} setCurrentStep={setCurrentStep} saveToLocalStorage={saveToLocalStorage} />;
      case 4: return <QuestionnaireStep formData={formData} addQuestion={addQuestion} updateQuestion={updateQuestion} removeQuestion={removeQuestion} currentStep={currentStep} setCurrentStep={setCurrentStep} saveToLocalStorage={saveToLocalStorage} />;
      case 5: return <RelatedImage handleFileUpload={handleFileUpload} formData={formData} setCurrentStep={setCurrentStep} currentStep={currentStep} saveToLocalStorage={saveToLocalStorage} />;

      case 6: return <ServiceCreatedStep formData={formData} setCurrentStep={setCurrentStep} currentStep={currentStep} saveToLocalStorage={saveToLocalStorage} />;

      case 7: return <PreviewStep formData={formData} currentStep={currentStep} setCurrentStep={setCurrentStep} saveToLocalStorage={saveToLocalStorage}  />;
      case 8: return <PricingStep currentStep={currentStep} setCurrentStep={setCurrentStep} submitFormData={submitFormData} />;
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
          <span className="ml-auto text-sm text-gray-600">Step {currentStep} of {totalSteps} - {currentStep === 1 ? 'Business Info' : currentStep === 2 ? 'Domain' : currentStep === 3 ? 'Services' : currentStep === 4 ? 'Services' : currentStep === 5 ? 'Services' : currentStep === 6 ? 'Related Image' : currentStep === 6 ? 'Preview' : 'Preview'}</span>
        </div>
        <ProgressBar />
        {renderStep()}
      </div>
    </div >
  );
};

export default Booking;








