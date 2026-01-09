import { ArrowBigRight, Star, Stars } from 'lucide-react'
import React from 'react'

const Footer = () => {
  return (
    <div>
      <section className='md:py-20 py-10 bg-gradient-to-br from-cyan-400 to-cyan-600'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white'>
          <div className='mb-4 text-sm p-2 w-full flex justify-center'>
            <span className='flex border border-white rounded-[20px] py-2 px-5'>
              <Stars className='w-4 h-4 me-1' />
              Free Setup • No Credit Card Required
            </span>
          </div>

          <h2 className='sm:text-4xl text-3xl font-bold mb-6'>
            Ready to Launch Your
            <br />
            Business Page?
          </h2>
          <p className='sm:text-xl mb-8 text-cyan-50'>
            Join thousands of service professionals who are growing their
            businesses with our platform. Start free today.
          </p>
          <button className='bg-orange-500 text-white px-4 sm:px-8 sm:py-4 py-3 rounded-lg hover:bg-orange-600 font-medium text-lg'>
            Build My Page (Free Setup) →
          </button>
          <div className='mt-6 text-sm text-cyan-50'>
            <ul className='list-disc pl-5 flex md:flex-row lg:flex-row justify-center  max-[475px]:[&_li]:m-auto max-[475px]:[&_li]:w-fit max-[475px]:flex-col sm:gap-4 gap-2'>
              <li className='ms-3'>No credit card needed</li>
              <li className='ms-3'>Setup in minutes</li>
              <li className='ms-3'>Cancel anytime</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Footer
