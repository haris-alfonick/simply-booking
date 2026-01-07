import React from 'react';
import { Calendar, Globe, BarChart3, DollarSign, FileText, Plus, Share2, CheckCircle, Phone, Mail, Clock, Truck, TruckIcon, Wrench, Sofa, Zap, MapPin, ArrowBigRight, Play } from 'lucide-react';
import Footer from '../footer/Footer';

export default function Homepage() {
  const stats = [
    { label: 'Requests This Month', value: '18' },
    { label: 'Job Schedule', value: '18' },
    { label: 'Revenue (This Month)', value: '$3,380' },
    { label: 'New Clients', value: '6' }
  ];

  const jobs = [
    { icon: <TruckIcon className='text-orange-500' />, client: 'Sarah Johnson', service: 'Junk Removal', location: 'Los Angeles, CA', status: 'Confirmed' },
    { icon: <Wrench className='text-orange-500' />, client: 'Mark Davis', service: 'Appliance Assembly', location: 'Anaheim, FL', status: 'Confirmed' },
    { icon: <Sofa className='text-orange-500' />, client: 'Kevin Patel', service: 'Furniture Delivery', location: 'San Francisco, CA', status: 'Confirmed' }
  ];

  const features = [
    {
      icon: <Globe className="w-8 h-8 text-white" />,
      title: 'Build a Professional Page Instantly',
      description: 'Look trusted and organized from day one. Create your business presence in minutes with our intuitive page builder.',
      // bg: 'bg-gradient-to-r from-blue-400 to-white-400'
      bg: 'bg-[linear-gradient(135deg,_#3b82f6_0%,_white_90%)]'

    },
    {
      icon: <Calendar className="w-8 h-8 text-white" />,
      title: 'Smart Booking & Scheduling',
      description: 'Clients request jobs, pick dates, and you manage everything smoothly. Never miss a booking again.',
      bg: 'bg-orange-400'
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-white" />,
      title: 'Full Business Dashboard',
      description: 'Jobs, Clients, Lead Generations, and Scheduling, all in one place',
      bg: 'bg-cyan-500'
    },
    {
      icon: <DollarSign className="w-8 h-8 text-white" />,
      title: 'Very Affordable',
      description: 'At just $0.99/month--with data stored even if payment pauses. No hidden fees, no surprises.',
      // bg: 'bg-gradient-to-r from-orange-400 to-blue-500'

      bg: 'bg-[linear-gradient(135deg,_#f97316_0%,_#3b82f6_90%)]'
    }
  ];

  const process = [
    {
      number: '1',
      icon: <FileText className="w-6 h-6" />,
      title: 'Set Up Your Business Page',
      description: 'Enter your business name, location, contact details, hours, logo, and description.',
      bg: 'bg-[linear-gradient(135deg,_#3b82f6_0%,_white_90%)]'

    },
    {
      number: '2',
      icon: <Plus className="w-6 h-6" />,
      title: 'Add Your Services',
      description: 'Upload a cover photo, description, pricing notes, and add a questionnaire for customers.',
      bg: 'bg-orange-400'
    },
    {
      number: '3',
      icon: <Share2 className="w-6 h-6" />,
      title: 'Share Your Unique Link',
      description: 'You get a custom subdomain such as: yourbusiness.simplybooking.org',
      bg: 'bg-cyan-500'
    },
    {
      number: '4',
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'Receive Requests & Manage Everything',
      description: 'Clients fill the form → you send estimate → they accept → job gets scheduled',
      bg: 'bg-[linear-gradient(135deg,_#f97316_0%,_#3b82f6_90%)]'
    }
  ];

  const pricingPlans = [
    {
      name: 'Unlimited Bookings',
      subtitle: 'Perfect for getting started',
      price: '$5.99',
      features: [
        'Unlimited services',
        'Custom Subdomain',
        'Email Support'
      ],
      popular: false
    },
    {
      name: 'Pro',
      subtitle: 'Most popular for growing businesses',
      price: '$9.99',
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
    {
      name: 'Elite',
      subtitle: 'For established businesses',
      price: '$19.99',
      features: [
        '1000 Requests / month',
        '5 Admin Users',
        'Unlimited Services',
        'Custom Subdomain',
        '24/7 Priority Support',
        'Advanced Analytics',
        'Marketing Tracking',
        'Recurring Bookings',
        'API Access',
        'Custom Branding'
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      <section className=" bg-cyan-50 p-[clamp(1.8rem,6vw,3.5rem)]">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <div className='sm:mt-4 md:mt-10 lg:mt-16 mb-10 rounded-lg'>

            <h1 className=" text-[clamp(1.8rem,6vw,3.5rem)] font-bold text-cyan-500 mb-6 leading-tight">
              Build Your Service<br />Website in Minutes
            </h1>
            <p className=" text-[clamp(0.95rem,3vw,1.25rem)] text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              A simple platform where service businesses can create their own booking page,
              generate leads, manage clients, track jobs, send quotes, and grow, all within minutes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-cyan-500 text-white px-8 py-3 rounded-lg hover:bg-cyan-600 font-medium">
                Create My Page <ArrowBigRight className="inline-block ml-2 h-5 w-5" />
              </button>
              <button className="bg-white text-cyan-500 border-2 border-cyan-500 px-8 py-3 rounded-lg hover:bg-cyan-50 font-medium">
                <Play className="inline-block mr-2" /> Watch Demo
              </button>
            </div>

            <div className='bg-white p-6 mt-7 rounded-lg mb-5 border-0'>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:mt lg:mt-16">
                {stats.map((stat, i) => (
                  <div key={i} className="bg-white rounded-lg p-6 shadow-sm border-2 border-gray-100">
                    <div className="text-sm text-gray-500 mb-2">{stat.label}</div>
                    <div className={`text-[clamp(1.5rem,4vw,2.5rem)] font-bold ${i === 0 ? 'text-cyan-500' : i === 2 ? 'text-cyan-500' : 'text-orange-400'}`}>
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-white  shadow-sm overflow-hidden">
                {jobs.map((job, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 hover:bg-gray-50 border-2 border-gray-100 mt-3 rounded-lg gap-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-orange-100 text-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
                        {job.icon}
                      </div>
                      <div className="text-left">
                        <div className="text-xs text-gray-500">Client</div>
                        <div className="font-medium">{job.client}</div>
                      </div>
                    </div>
                    <div className="text-left">
                      <div className="text-xs text-gray-500">Service</div>
                      <div className="font-medium">{job.service}</div>
                    </div>
                    <div className="text-left">
                      <div className="text-xs text-gray-500">Job Location</div>
                      <div className="font-medium">{job.location}</div>
                    </div>
                    <div className="text-left">
                      <div className="text-xs text-gray-500">Job Status</div>
                      <div className="font-medium">{job.status}</div>
                    </div>
                    <button className="text-cyan-500 font-medium hover:text-cyan-600">Job Status</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      <section className="py-16 bg-white border-radius-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Service Professionals</h2>
          <p className="text-gray-600 mb-12">See what our customers have to say about transforming their businesses</p>
          <div className="grid md:grid-cols-3 gap-8">
            {['of Small Businesses do not have their own website', 'Lost Revenue without online bookings portal', 'of service appointments are booked online'].map((text, i) => (
              <div key={i} className="bg-white border-2 border-gray-100 rounded-lg p-8 font-bold">
                <div className="text-[clamp(1.8rem,6vw,3.5rem)] font-bold text-orange-400 mb-4">30%</div>
                <p className="text-gray-700">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Platform</h2>
            <p className="text-gray-600">Everything you need to run and grow your service business, all in one place</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition border-2 border-gray-100">


                <div className={`${feature.bg} w-14 h-14 rounded-lg flex items-center justify-center mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Process</h2>
            <p className="text-gray-600">Get your professional service page up and running in four simple steps</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {process.map((step, i) => (
              <div key={i} className="text-center border-2 border-gray-100 p-8 rounded-lg">
                <div className='flex items-center gap-1 mb-2 mx-auto sm:mx-auto'>

                  <div className="text-sm text-gray-500 bg-cyan-100 rounded-[50px] h-5 w-5">{step.number}</div>

                  <div className={`${step.bg}  w-16 h-16 rounded-lg flex items-center justify-center mb-4 text-white `}>
                    {step.icon}
                  </div>
                </div>

                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Professional Business Page</h2>
            <p className="text-gray-600">Here's what your customers will see when they visit your page</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-cyan-400 to-cyan-500 h-32"></div>
            <div className="p-8 relative">
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
                      <MapPin className='me-2' /> Los Angeles, CA
                    </p>
                    <div className="flex items-center mt-2">
                      <div className="flex text-orange-400">★★★★★</div>
                      <span className="text-sm text-gray-500 ml-2">(128 reviews)</span>
                    </div>
                  </div>
                  <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600">
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
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="font-medium">Emergency Repairs</span>
                      <span className="text-gray-600">Starting at $99</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="font-medium">Drain Cleaning</span>
                      <span className="text-gray-600">Starting at $79</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="font-medium">Water Heater Installation</span>
                      <span className="text-gray-600">Starting at $499</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="font-medium">Pipe Replacement</span>
                      <span className="text-gray-600">Custom Quote</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="text-center text-gray-500 mt-10">This is how your business page will look to your customers</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-gray-600">Choose the plan that fits your business needs. All plans include data storage even if payment pauses.</p>
            <div className="mt-4 inline-flex items-center px-4 py-2 bg-cyan-50 text-cyan-700 rounded-[12px] text-sm border border-cyan-200">
              {/* 💎 */}
              <Zap className="mr-2" /> Auto-upgrade available if request limit is reached
            </div>
          </div>


          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, i) => (
              <div key={i} className={`rounded-lg p-8 flex flex-col ${plan.popular ? ' border-2 border-cyan-500 shadow-lg' : 'bg-white border-2 border-gray-200'}`}>
                {plan.popular && (
                  <div className="text-center mb-4 mt-[-45px]">
                    <span className="bg-cyan-500 text-white px-4 py-1 rounded-full text-xs font-medium">Most Popular</span>
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{plan.subtitle}</p>
                  <div className="text-4xl font-bold text-gray-900">
                    {plan.price}<span className="text-lg text-gray-500">/month</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center text-gray-700">
                      <span className="text-cyan-500 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  <button className={`w-full py-3 rounded-lg font-medium ${plan.popular ? 'bg-cyan-500 text-white hover:bg-cyan-600' : 'bg-white text-cyan-500 border-2 border-cyan-500 hover:bg-cyan-50'}`}>
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-600 mt-8">
            Need a custom plan? <a href="#" className="text-cyan-500 hover:underline">Contact us</a> for enterprise pricing.
          </p>
        </div>
      </section>

      <Footer />
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 SimplyBooking. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
