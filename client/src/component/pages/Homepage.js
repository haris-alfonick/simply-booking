import React from 'react'
import { Calendar, Globe, BarChart3, DollarSign, FileText, Plus, Share2, CheckCircle, Phone, Mail, Clock, TruckIcon, Wrench, Sofa, Zap, MapPin, ArrowBigRight, Play, Clock1, ArrowRight, Star, Stars, Check } from 'lucide-react'
import Footer from '../footer/Footer'
import Navbar from '../navbar/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import furniture from '../../images/furniture.png'
import garbage from '../../images/garbage.png'
import spanner from '../../images/spanner.png'
// import  spannar  from '../../images/spannar.png'

export default function Homepage() {
  const navigate = useNavigate()
  const stats = [
    { label: 'Requests This Month', value: '18' },
    { label: 'Job Schedule', value: '18' },
    { label: 'Revenue (This Month)', value: '$3,380' },
    { label: 'New Clients', value: '6' }
  ]

  const jobs = [
    {
      icon: <img src={garbage} />,
      client: 'Sarah Johnson',
      service: 'Junk Removal',
      location: 'Los Angeles, CA',
      status: 'Confirmed'
    },
    {
      icon: <img src={spanner} />,
      client: 'Mark Davis',
      service: 'Appliance Assembly',
      location: 'Anaheim, FL',
      status: 'Confirmed'
    },
    {
      icon: <img src={furniture} />,
      client: 'Kevin Patel',
      service: 'Furniture Delivery',
      location: 'San Francisco, CA',
      status: 'Confirmed'
    }
  ]

  const features = [
    {
      icon: <Globe className='w-8 h-8 text-white' />,
      title: 'Build a Professional Page Instantly',
      description:
        'Look trusted and organized from day one. Create your business presence in minutes with our intuitive page builder.',
      // bg: 'bg-gradient-to-r from-blue-400 to-white-400'
      bg: 'bg-[linear-gradient(135deg,_#11A4D4_0_0%,_white_90%)]'
    },
    {
      icon: <Calendar className='w-8 h-8 text-white' />,
      title: 'Smart Booking & Scheduling',
      description:
        'Clients request jobs, pick dates, and you manage everything smoothly. Never miss a booking again.',
      bg: 'bg-orange-400'
    },
    {
      icon: <BarChart3 className='w-8 h-8 text-white' />,
      title: 'Full Business Dashboard',
      description:
        'Jobs, Clients, Lead Generations, and Scheduling, all in one place',
      bg: 'bg-[linear-gradient(135deg,_#0A5B76_0%,_#11A4D4_99%)]'
    },
    {
      icon: <DollarSign className='w-8 h-8 text-white' />,
      title: 'Very Affordable',
      description:
        'At just $0.99/month--with data stored even if payment pauses. No hidden fees, no surprises.',
      // bg: 'bg-gradient-to-r from-orange-400 to-blue-500'

      bg: 'bg-[linear-gradient(135deg,_#FA832E_0%,_#11A4D4_90%)]'
    }
  ]

  const process = [
    {
      number: '1',
      icon: <FileText className='w-6 h-6' />,
      title: 'Set Up Your Business Page',
      description:
        'Enter your business name, location, contact details, hours, logo, and description.',
      bg: 'bg-[linear-gradient(135deg,_#11A4D4_0%,_white_90%)]'
    },
    {
      number: '2',
      icon: <Plus className='w-6 h-6' />,
      title: 'Add Your Services',
      description:
        'Upload a cover photo, description, pricing notes, and add a questionnaire for customers.',
      bg: 'bg-orange-400'
    },
    {
      number: '3',
      icon: <Share2 className='w-6 h-6' />,
      title: 'Share Your Unique Link',
      description:
        'You get a custom subdomain such as: yourbusiness.simplybooking.org',
      bg: 'bg-[linear-gradient(135deg,_#0A5B76_0%,_#11A4D4_99%)]'
    },
    {
      number: '4',
      icon: <CheckCircle className='w-6 h-6' />,
      title: 'Receive Requests & Manage Everything',
      description:
        'Clients fill the form → you send estimate → they accept → job gets scheduled',
      bg: 'bg-[linear-gradient(135deg,_#11A4D4_0%,_#FA832E_90%)]'
    }

  ]

  const pricingPlans = [

    {
      name: 'Pro',
      subtitle: 'Most popular for growing businesses',
      price: '$5.99',
      features: [
        '100 Requests / month',
        '2 Admin Users',
        'Up to 10 Services',
        'Custom Subdomain',
        'Priority Email Support',
        'Advanced Analytics',
        'Marketing Tracking',
        'Recurring Bookings'
      ],
      popular: true
    },

  ]


  const texts = [
    { text: 'of Small Businesses do not have their own website', per: '30%' },
    { text: 'Lost Revenue without online bookings portal', per: '37%' },
    { text: 'of service appointments are booked online', per: '46%' }
  ]

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

      <section className=" sm:p-0 lg:p-6 md:p-[clamp(0.5rem,6vw,1rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mt-4 md:mt-10 lg:mt-16 mb-10">


            <h1 className="text-[clamp(1.8rem,6vw,3.5rem)] text-[#11A4D4] mb-4 leading-[1.1] sm:leading-[1.05] font-outfit font-semibold align-center">
              Build Your Service
              <br />
              Website in Minutes
            </h1>
            <p
              className="font-arial regular text-[clamp(0.95rem,3vw,1.25rem)] text-[#627084] mb-4 lg:mb-8 max-w-3xl mx-auto leading-[1.4]">
              A simple platform where service businesses can create their own booking
              page, generate leads, manage clients, track jobs, send quotes, and grow
              all within minutes.
            </p>

            <div className="flex gap-2 sm:gap-4 justify-center max-w-[465px] mx-auto">
              <button
                onClick={() => navigate("/signup")}
                className="bg-[linear-gradient(135deg,#11A4D4_0%,#25AFF4_50%,#5ACCF2_100%)] inter text-white px-3 sm:px-8 py-2 sm:py-3 rounded-lg font-medium hover:opacity-90 transition"
              >

                <span className="sm:hidden flex items-center gap-1">
                  Create
                  <ArrowRight className="h-4 w-4" />
                </span>
                <span className="hidden sm:flex items-center gap-2">
                  Create My Page
                  <ArrowRight className="h-5 w-5" />
                </span>
              </button>

              <button
                className=" bg-white text-cyan-500  inter medium border-2 border-cyan-500 px-3 sm:px-8 py-2 sm:py-3 rounded-lg font-medium hover:bg-cyan-50">
                <span className="sm:hidden">
                  <Play className="h-4 w-4" />
                </span>
                <span className="hidden sm:flex items-center gap-2">
                  <Play className="h-4 w-4" />
                  Watch Demo
                </span>
              </button>
            </div>
            <div className='bg-[#F9F8F8] max-md:p-4 py-10 px-6 mt-7 rounded-lg mb-2 '>
              <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
                {stats.map((stat, i) => (
                  <div
                    key={i}
                    className='bg-[#F5F5F5] rounded-[12px] p-3 text-center sm:text-start shadow-sm border-2 border-[#2222221A]'
                  >
                    <div className='text-sm text-[#A9A7A7] dm font-semibold fs-16'>{stat.label}</div>
                    <div
                      className={`text-[clamp(1.5rem,4vw,2.5rem)] font-bold ${i === 0
                        ? 'text-[#45A8E0]'
                        : i === 2
                          ? 'text-[#45A8E0]'
                          : 'text-[#FA832E]'
                        }`}
                    >
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-2 overflow-hidden bg-[#F9F8F8]">
                {jobs.map((job, i) => (
                  <div
                    key={i}
                    className="bg-[#F5F5F5] flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border-2 border-[#2222221A] mt-3 rounded-lg gap-4 hover:bg-gray-50 shadow-sm"
                  >
                    <div className="flex items-start space-x-4 w-full lg:w-[20%]">
                      <div className="w-10 h-10 p-2 bg-[#E1EDEB] rounded-full flex items-center justify-center font-bold">
                        {job.icon}
                      </div>
                      <div className="text-left">
                        <div className="text-2xs text-[#A9A7A7] font-semibold">Client</div>
                        <div className="text-sm lg:text-lg font-semibold text-[#555555]">{job.client}</div>
                      </div>
                    </div>

                    <div className="text-left w-full lg:w-[20%]">
                      <div className="text-2xs text-[#A9A7A7] font-semibold">Service</div>
                      <div className="text-sm lg:text-lg font-semibold text-[#555555]">{job.service}</div>
                    </div>

                    <div className="text-left w-full lg:w-[20%]">
                      <div className="text-2xs text-[#A9A7A7] font-semibold">Job Location</div>
                      <div className="text-sm lg:text-lg font-semibold text-[#555555]">{job.location}</div>
                    </div>

                    <div className="text-left w-full lg:w-[20%]">
                      <div className="text-2xs text-[#A9A7A7] font-semibold">Job Status</div>
                      <div className="text-sm lg:text-lg font-semibold text-[#555555]">{job.status}</div>
                    </div>

                    <button className="text-[#1C88AC] text-sm lg:text-lg font-semibold bg-[#E0F3F6] rounded-lg w-fit px-6 py-2 sm:px-4 sm:py-3 mt-4 sm:mt-0">
                      Job Status
                    </button>
                  </div>
                ))}
              </div>

            </div>



          </div>
        </div>
      </section>

      <section className="md:py-16 py-8 bg-[#E4EBF14D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-[clamp(1.5rem,4.5vw,2.25rem)] font-semibold text-[#222222] mb-4 leading-tight font-outfit">
            Trusted by Service Professionals
          </h1>

          <p className="text-[#627084] text-sm mb-6 lg:mb-12 font-arial">
            See what our customers have to say about transforming their businesses
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-6">
            {texts.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-[12px] px-2 py-3 sm:p-4 font-semibold flex flex-col items-center text-center"
              >
                <div className="text-[clamp(1.2rem,5vw,2rem)] font-bold text-orange-400 mb-1 sm:mb-2">
                  {item.per}
                </div>
                <p className="leading-[1.2] text-sm sm:text-base lg:text-lg">{item.text}</p>
              </div>
            ))}
          </div>

        </div>
      </section>


      <section className='md:py-16 py-8 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-6 lg:mb-12'>
            <h1 className=" text-[clamp(1.5rem,4.5vw,2.25rem)] font-semibold text-black mb-4 font-outfit fs-54 leading-tight">
              Why Choose Our Platform
            </h1>
            <p className=' text-sm inter text-center text-[#627084] regular fs-26 mb-6 lg:mb-12' >
              Everything you need to run and grow your service business, all in
              one place
            </p>
          </div>
          <div className='grid md:grid-cols-2 sm:grid-cols-1 lg:gap-8 gap-4'>
            {features.map((feature, i) => (
              <div
                key={i}
                className="bg-white rounded-lg p-4 md:p-8 shadow-sm hover:shadow-md transition-all border-2 border-[#D9E0E8]">

                <div
                  className={`${feature.bg} w-14 h-14 rounded-lg flex items-center justify-center mb-4`}
                >
                  {feature.icon}
                </div>
                <h3 className='sm:text-xl text-[#222222] mb-3 font-semibold font-outfit'>
                  {feature.title}
                </h3>
                <p className='text-[#627084] font-arial'>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='py-4 md:py-8 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <div className='text-center mb-6 lg:mb-12'>
            <h1 className=" text-[clamp(1.5rem,4.5vw,2.25rem)] font-bold text-gray-900 mb-4 leading-tight">
              Our Process
            </h1>
            <p className='text-gray-600 text-sm mb-6 lg:mb-12 px-5' >
              Get your professional service page up and running in four simple
              steps
            </p>
          </div>
          <div className='grid lg:grid-cols-4 sm:grid-cols-2 lg:gap-8 gap-4'>

            {process.map((step, i) => (
              <div
                key={i}
                className='border-2 border-gray-100 px-4 py-6 rounded-lg'
              >
                <div className='flex items-center gap-2 mb-2 mx-auto sm:mx-auto'>
                  <div className='text-sm content-center text-center text-[#11A4D4] bg-[#11A4D41A] rounded-[50px] h-7 w-7 font-bold'>
                    {step.number}
                  </div>

                  <div
                    className={`${step.bg}  w-16 h-16 rounded-lg flex items-center justify-center mb-4 text-white `}
                  >
                    {step.icon}
                  </div>
                </div>

                <h3 className='font-semibold text-gray-900 mb-2 font-outfit'>{step.title}</h3>
                <p className='text-[16px] text-[#627084] font-arial'>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='md:py-16 py-8 bg-[linear-gradient(135deg, rgba(215, 244, 254, 0.05) 0%, rgba(235, 248, 253, 0.628358) 30.44%, #F8FAFC 50%, rgba(215, 244, 254, 0.05) 100%)]'>
        <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h1 className=" text-[clamp(1.5rem,4.5vw,2.25rem)] font-bold text-gray-900 mb-4 leading-tight">
              Your Professional Business Page
            </h1>
            <p className='text-gray-600 text-sm mb-6 lg:mb-12' >
              Here's what your customers will see when they visit your page
            </p>
          </div>
          <div className='bg-white rounded-lg shadow-2xl overflow-hidden'>
            <div className='bg-[linear-gradient(135deg,#11A4D4_0%,#25AFF4_50%,#43BFF3_78.31%,#5ACCF2_100%)] rounded-lg sm:h-32 h-24'></div>
            <div className='md:p-8 pt-1 p-4 relative'>
              <div className='absolute -top-12 left-8 bg-white p-2 sm:p-4 rounded-lg shadow-md'>
                <div className="bg-[linear-gradient(135deg,#11A4D4_0%,#25AFF4_100%)] sm:w-24 w-16 sm:h-24 h-16 rounded-lg flex items-center justify-center text-white text-2xl font-semibold font-inter shadow-lg">
                  Elite
                </div>
              </div>
              <div className='mt-14'>
                <div className='flex justify-between items-start mb-4 max-sm:flex-col max-sm:gap-4'>
                  <div>
                    <h3 className='text-2xl font-semibold font-outfit text-gray-900'>
                      Elite Plumbing Services
                    </h3>
                    <p className='text-gray-500 flex items-center mt-1 font-arial'>
                      <MapPin className='me-2' height={18} width={18} /> Los
                      Angeles, CA
                    </p>
                    <div className='flex items-center mt-2'>
                      <div className='flex text-orange-400 text-sm'>★★★★★</div>
                      <span className='text-sm text-gray-500 ml-2'>
                        (128 reviews)
                      </span>
                    </div>
                  </div>
                  <button className='bg-gradient-to-r from-orange-500 to-orange-300 text-white px-6 py-2 rounded-lg hover:bg-orange-600'>
                    Request a Quote
                  </button>
                </div>
                <p className='text-[#627084] sm:text-[18px] mb-6'>
                  Professional plumbing services with over 15 years of
                  experience. We specialize in residential and commercial
                  plumbing, including repairs, installations, and emergency
                  services. Available 24/7 for your plumbing needs.
                </p>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 bg-[#E4EBF14D] rounded-lg'>
                  <div className='text-center p-4  rounded-lg flex gap-2 items-center'>
                    <div className='text-[#11A4D4] bg-[#11A4D41A] p-2 h-10 w-10 flex items-center justify-center rounded-lg'>
                      <Phone />
                    </div>

                    <div className='mx-2 text-start'>
                      <div className='text-xs text-[#627084] font-arial'>Phone</div>
                      <div className='font-medium font-inter'>(555) 123-4567</div>
                    </div>
                  </div>

                  <div className='text-center p-4 rounded-lg flex gap-2 items-center'>
                    <div className='text-[#11A4D4] bg-[#11A4D41A] p-2 h-10 w-10 flex items-center justify-center rounded-lg'>
                      <Mail />
                    </div>
                    <div className='mx-2 text-start'>
                      <div className='text-xs text-[#627084] font-arial'>Email</div>
                      <div className='font-medium font-inter'>info@elite.com</div>
                    </div>
                  </div>

                  <div className='text-center p-4 rounded-lg flex gap-2 items-center'>
                    <div className='text-[#11A4D4] bg-[#11A4D41A] p-2 h-10 w-10 flex items-center justify-center rounded-lg'>
                      <Clock />
                    </div>
                    <div className='mx-2 text-start'>
                      <div className='text-xs text-[#627084] font-arial'>Hours</div>
                      <div className='font-medium font-inter'>24/7 Available</div>
                    </div>
                  </div>
                </div>

                <div >
                  <h4 className='font-bold text-gray-900 mb-4'>Our Services</h4>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div className="flex justify-between items-center p-4 bg-[#FFFFFF] border border-[#D9E0E8] rounded-lg">
                      <span className='font-arial text-[#222222]'>Emergency Repairs</span>
                      <span className='text-[#627084] font-arial'>Starting at $99</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-[#FFFFFF] border border-[#D9E0E8] rounded-lg">
                      <span className='font-arial text-[#222222]'>Drain Cleaning</span>
                      <span className='text-[#627084] font-arial'>Starting at $79</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-[#FFFFFF] border border-[#D9E0E8] rounded-lg">
                      <span className='font-arial text-[#222222]'>
                        Water Heater Installation
                      </span>
                      <span className='text-[#627084] font-arial'>Starting at $499</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-[#FFFFFF] border border-[#D9E0E8] rounded-lg">
                      <span className='font-arial text-[#222222]'>Pipe Replacement</span>
                      <span className='text-[#627084] font-arial'>Custom Quote</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className='text-center text-[#627084] font-inter mt-10'>
            <Stars className='inline mr-2 text-yellow-300 w-4 h-4' />
            This is how your business page will look to your customers
          </p>
        </div>
      </section>

      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="text-center mb-6 md:mb-10">
            <h2 className="text-2xl md:text-xl font-bold text-[#222222] mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className=" text-gray-600 sm:mb-4 max-w-2xl mx-auto">
              Choose the plan that fits your business needs. All plans include data storage even if payment pauses.
            </p>
            <div className="mt-4 md: inline-flex items-center px-4 rounded-xl py-2 bg-[#D7F4FE] text-[#222222] text-sm border border-[#11A4D433]">
              <Clock1 className="mr-2 text-base text-[#11A4D4]" /> 07 Day Free Trial
            </div>
          </div>

          <div className=" flex items-center justify-center">
            {pricingPlans.map((plan, i) => (
              <div
                key={i}
                className={`rounded-lg p-4 md:p-8 flex flex-col w-[362.671875px] h-[600px] mx-auto ${plan.popular
                  ? 'border-2 border-[#11A4D4] shadow-lg shadow-[#5ACCF24D]'
                  : 'bg-white border-2 border-gray-200'
                  }`}
              >
                {plan.popular && (
                  <div className="text-center mb-4 md:mt-[-45px] mt-[-30px]">
                    <span className="bg-gradient-to-r from-[#11A4D4] to-[#5ACCF4] text-white px-4 py-1 rounded-full text-xs font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-[#222222] mb-2">{plan.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{plan.subtitle}</p>
                  <div className="text-4xl font-bold text-[#222222]">
                    {plan.price}
                    <span className="text-lg text-[#627084]">/month</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center text-[#627084]">
                      <span className="text-[#11A4D4] bg-[#11A4D41A] rounded-full p-1 mr-2"><Check className='w-5 h-5' /></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  <button
                    className={`w-full py-3 rounded-lg font-medium shadow-lg shadow-[#5ACCF24D] ${plan.popular
                      ? 'bg-gradient-to-r from-[#11A4D4] to-[#5ACCF2] text-white'
                      : 'bg-[linear-gradient(135deg, #11A4D4 0%, #25AFF4 50%, #5ACCF2 100%)] text-white border-2 border-[#11A4D4] hover:bg-[#11A4D4] hover:text-white'
                      }`}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-600 mt-8">
            Need a custom plan?{' '}
            <Link to="/contact" className="text-[#11A4D4] hover:text-[#0A7EC2] hover:underline">
              Contact us
            </Link>{' '}
            for enterprise pricing.
          </p>
        </div>
      </section>


      <Footer />
      {/* <footer className='bg-gray-900 text-gray-400 md:py-8 py-3'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center  text-sm'>
          <p>&copy; 2024 SimplyBooking. All rights reserved.</p>
        </div>
      </footer> */}
    </div>
  )
}
