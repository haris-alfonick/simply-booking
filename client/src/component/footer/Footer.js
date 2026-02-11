import { ArrowBigRight, ArrowRight, Star, Stars } from 'lucide-react'
import React from 'react'

const Footer = () => {
  return (
    <div>
      <section className='py-12 md:py-18 lg:py-24 bg-gradient-to-r from-[#11A4D4] to-[#25AFF4]'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white'>
          <div className='mb-4 text-sm p-2 w-full flex justify-center'>
            <span className='flex border border-[#FFFFFF33] arial rounded-[20px] py-2 px-5 backdrop-filter backdrop-blur-sm'>
              <Stars className='w-4 h-4 me-1' />
              Free Setup • No Credit Card Required
            </span>
          </div>
          <h2 className='text-3xl md:text-6xl lg:text-7xl font-outfit font-semibold mb-6'>
            Ready to Launch Your
            <span className="block">
              Business Page?
            </span>
          </h2>
          <p className='sm:text-xl mb-8 text-cyan-50'>
            Join thousands of service professionals who are growing their
            <span className="block">
              businesses with our platform. Start free today.
            </span>
          </p>

          <button className='bg-[#FA832E] shadow-lg text-white px-4 sm:px-8 sm:py-4 py-3 rounded-lg hover:bg-[#FA832E]/90 font-medium text-sm md:text-lg flex items-center justify-center mx-auto'>
            Build My Page (Free Setup) <ArrowRight className=' font-bold w-5 h-5 ms-2' />
          </button>
          <div className="mt-6 mx-auto text-center flex flex-col gap-4">
            <ul className="mx-auto flex flex-col sm:flex-row gap-2 md:gap-8 text-[#FFFFFFCC] font-arial">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-white rounded-full"></span>
                No credit card needed
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-white rounded-full"></span>
                Setup in minutes
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-white rounded-full"></span>
                Cancel anytime
              </li>
            </ul>

          </div>


        </div>
      </section>
    </div>
  )
}

export default Footer
