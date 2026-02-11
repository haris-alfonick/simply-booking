import { Award, BlocksIcon,  CalendarClock, DollarSign, Eye, Heart, Users, Wrench, Zap } from 'lucide-react'
import React from 'react'
import Footer from '../footer/Footer'
import Navbar from '../navbar/Navbar'
import Frame from '../../images/Frame.png'
const About = () => {
  const process = [
    {
      title: '50K+',
      description: 'services Professionals'
    },
    {
      title: '2M+',
      description: 'Bookings Process'
    },
    {
      title: '98%',
      description: 'Customer Satisfaction'
    },
    {
      title: '24/7',
      description: 'Support available'
    }
  ]
// background: #F970151A;

  const features = [
    {
      icon: <Wrench className='w-8 h-8 text-orange-500 border-[#FA832E]' />,
      title: 'Build a Professional Page Instantly',
      description:
        'Create an optimized landing page for your business, with build-in booking & payment capabilities.',
      bg: 'bg-[#F970151A]'
    },
    {
      icon: <CalendarClock  className='w-8 h-8 text-[#11A4D4]' />,
      title: 'Smart Booking & Scheduling',
      description:
        'Real-time online scheduling with an easy-to-use calendar and booking management.',
      bg: 'bg-[#0DA2E71A]'
    },
    {
      icon: <BlocksIcon className='w-8 h-8 text-orange-500 border-[#FA832E]' />,
      title: 'Full Business Dashboard',
      description:
        'Easy-to-use dashboard with clear analytics, appointment and clean data.',
      bg: 'bg-[#F970151A]'
    },
    {
      icon: <DollarSign className='w-8 h-8 text-[#11A4D4] ' />,
      title: 'Very Affordable',
      description:
        'Pay as little as $5.99/mo for full business feature & integration.',
      bg: 'bg-[#0DA2E71A]'
    }
  ]

  const vision = [
    {
      icon: <img src={Frame} />,
      title: 'Our Mission',
      description:
        'To democratize technology for service businesses by providing affordable, easy-to-use tools that help them compete and thrive in the digital age',
      bg: 'bg-orange-100',
      textColor: 'text-orange-500'
    },
    {
      icon: <Eye className='w-8 h-8' />,
      title: 'Our Vision',
      description:
        'A world where every service professional has the same powerful business tools as large corporations, leveling the playing field',
      bg: 'bg-cyan-100',
      textColor: 'text-[#11A4D4]'
    }
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
      <section className='p-2 lg:p-6 xl:p-8'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <div className='mt-8 mb-8 lg:my-16'>
            <h1 className="text-[clamp(1.8rem,6vw,3.5rem)] text-[#11A4D4] mb-4 leading-[1.1] sm:leading-[1.05] font-outfit font-semibold align-center">
              About SimplyBooking
            </h1>
            <p
              className="font-arial regular text-[clamp(0.95rem,3vw,1.25rem)] text-[#627084] mb-8 max-w-3xl mx-auto leading-[1.4]">
              we are on a mission to help service professionals build thriving
              businesses with simple, powerful tools that anyone can use
            </p>
          </div>
        </div>
      </section>

      <section className='py-8 lg:py-12 xl:py-16 px-4 lg:px-16 bg-white border-radius-lg '>
        <div className='max-w-6xl mx-auto text-center'>
          <div className='grid md:grid-cols-2 gap-8'>
            {vision.map((text, i) => (
              <div
                key={i}
                className='bg-white border-2 border-gray-100 rounded-2xl sm:p-8 p-4 font-bold shadow-md'
              >
                <div
                  className={`text-5xl text-start font-bold mb-4 border
                     ${text.bg} ${text.textColor} p-2 rounded-[20px] w-10 h-10 flex items-center justify-center`}
                >
                  {text.icon}
                </div>
                <div className='sm:text-3xl text-xl text-start font-bold mb-4'>
                  {text.title}
                </div>
                <p className='text-start text-[16px] font-arial text-[#627084]'>
                  {text.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='py-8 lg:py-12 xl:py-16 p-4 bg-[#F3F5F74D]'>
        <div className='max-w-6xl mx-auto text-center'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
            {process.map((step, i) => (
              <div key={i} className='text-center'>
                <h3 className='font-bold font-outfit text-[#0DA2E7] text-3xl mb-2 '>
                  {step.title}
                </h3>
                <p className='text-sm font-arial text-[#65758B]'>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='py-8 lg:py-12 xl:py-16 px-4 lg:px-12 bg-white'>
        <div className='max-w-6xl mx-auto text-center px-2 sm:px-4 lg:px-8'>
          <h2 className='md:text-5xl text-3xl font-bold font-outfit text-[#1F2937] mb-6'>
            Our Story
          </h2>
          <p className='sm:text-lg font-arial text-[#65758B] mb-6'>
            SimplyBooking was born out of frustration. Our founders, both former
            service business owners, struggled to find affordable, easy-to-use
            tools to manage their businesses online.
          </p>
          <p className='sm:text-lg font-arial text-[#65758B] mb-6'>
            Large enterprises had access to powerful booking systems,
            professional websites, and marketing tools. But small service
            businesses were left with either expensive solutions or
            cobbled-together workarounds.
          </p>
          <p className='sm:text-lg font-arial text-[#65758B] mb-6'>
            We believed there had to be a better way. In 2020, we set out to
            build a platform that would give every service professional—from
            plumbers to personal trainers—the same powerful tools that big
            businesses take for granted.
          </p>
          <p className='sm:text-lg font-arial text-[#65758B]'>
            Today, SimplyBooking powers over 50,000 service businesses across 5
            countries. But we're just getting started. Our mission remains the
            same: to help service professionals build thriving businesses with
            simple, powerful tools.
          </p>
        </div>
      </section>

      <section className='py-8 lg:py-12 xl:py-16 px-4 lg:px-16 bg-[#E4EBF14D]'>
        <div className='max-w-6xl mx-auto '>
          <div className='text-center mb-12 px-4'>
            <h2 className='md:text-5xl text-3xl font-semibold font-outfit text-[#222222] mb-4'>
              Why Choose Us
            </h2>
            <p className='text-[#627084] font-inter text-xl '>
              Get a professional online presence and grow your business faster
              than ever before
            </p>
          </div>
          <div className='grid md:grid-cols-2 gap-4 lg:gap-8'>
            {features.map((feature, i) => (
              <div
                key={i}
                className='bg-white rounded-lg sm:p-8 p-4 shadow-sm hover:shadow-md transition border-2 border-[#E4EBF14D]'
              >
                <div
                  className={`${feature.bg} w-14 h-14 rounded-[50%] flex items-center justify-center mb-4`}
                >
                  {feature.icon}
                </div>
                <h3 className='sm:text-xl text-[18px] font-semibold font-outfit text-[#222222] mb-3'>
                  {feature.title}
                </h3>
                <p className='text-[#627084] font-arial text-lg'>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='max-w-[1240px] mx-auto py-8 lg:py-12 xl:py-16 px-4 lg:px-16 bg-white'>
        <h2 className='md:text-5xl text-3xl font-bold text-center text-[#222222 font-outfit]'>
          Our Values
        </h2>
        <p className='text-center text-lg text-[#65758B] font-arial mt-4 mb-8 lg:mb-12 lg:max-w-2xl mx-auto'>
          The principles that guide everything we do at SimplyBooking.
        </p>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-between items-center gap-6'>
          <div className='flex flex-col items-center text-center'>
            <div className='mb-4 bg-[#F970151A] p-3 rounded-[50%] text-[#FA832E]'>
              <Heart />
            </div>
            <h3 className='text-lg font-semibold text-[#222222] font-outfit'>
              Customer First
            </h3>
            <p className='text-[#627084] font-arial text-sm'>
              Every decision we make is guided by what’s best for our customers
              and their success.
            </p>
          </div>

          <div className='flex flex-col items-center text-center'>
            <div className='mb-4 bg-[#F970151A] p-3 rounded-[50%] text-[#FA832E]'>
              <Zap />
            </div>
            <h3 className='text-lg font-semibold text-[#222222] font-outfit'>Simplicity</h3>
            <p className='text-[#627084] font-arial text-sm'>
              We believe powerful tools should be easy to use. Complexity is the
              enemy of progress.
            </p>
          </div>

          <div className='flex flex-col items-center text-center'>
            <div className='mb-4 bg-[#F970151A] p-3 rounded-[50%] text-[#FA832E]'>
              <Award />
            </div>
            <h3 className='text-lg font-semibold text-[#222222] font-outfit'>Excellence</h3>
            <p className='text-[#627084] font-arial text-sm'>
              We strive for excellence in everything we do, from product design
              to customer support.
            </p>
          </div>

          <div className='flex flex-col items-center text-center'>
            <div className='mb-4 bg-[#F970151A] p-3 rounded-[50%] text-[#FA832E]'>
              <Users />
            </div>
            <h3 className='text-lg font-semibold text-[#222222] font-outfit'>Community</h3>
            <p className='text-[#627084] font-arial text-sm'>
              We’re building a community of service professionals who support
              and learn from each other.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default About
