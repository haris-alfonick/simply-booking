import { Award, BarChart3, Blocks, BlocksIcon, Calendar, CalendarSearch, CircleDotDashed, DollarSign, Eye, Globe, Heart, Settings, Users, Wrench, Zap } from 'lucide-react'
import React from 'react'
import Footer from '../footer/Footer';

const About = () => {


    const process = [
        {
            title: '50K+',
            description: 'services Professionals',
        },
        {
            title: '2M+',
            description: 'Bookings Process',
        },
        {
            title: '98%',
            description: 'Customer Satisfaction',
        },
        {
            title: '24/7',
            description: 'Support available',
        }
    ];


    const features = [
        {
            icon: <Wrench className="w-8 h-8 text-orange-500" />,
            title: 'Build a Professional Page Instantly',
            description: 'Create an optimized landing page for your business, with build-in booking & payment capabilities.',
            bg: 'bg-orange-100'

        },
        {
            icon: <CalendarSearch className="w-8 h-8 text-cyan-500" />,
            title: 'Smart Booking & Scheduling',
            description: 'Real-time online scheduling with an easy-to-use calendar and booking management.',
            bg: 'bg-cyan-100'
        },
        {
            icon: <BlocksIcon className="w-8 h-8 text-orange-500" />,
            title: 'Full Business Dashboard',
            description: 'Easy-to-use dashboard with clear analytics, appointment and clean data.',
            bg: 'bg-orange-100'
        },
        {
            icon: <DollarSign className="w-8 h-8 text-cyan-500" />,
            title: 'Very Affordable',
            description: 'Pay as little as $5.99/mo for full business feature & integration.',
            bg: 'bg-cyan-100'
        }
    ];



    const vision = [
        {
            icon: <CircleDotDashed className="w-8 h-8" />,
            title: 'Our Mission',
            description: 'To democratize technology for service businesses by providing affordable, easy-to-use tools that help them compete and thrive in the digital age',
            bg: 'bg-orange-100',
            textColor: 'text-orange-500' // Ensuring text is dark
        },
        {
            icon: <Eye className="w-8 h-8" />,
            title: 'Our Vision',
            description: 'A world where every service professional has the same powerful business tools as large corporations, leveling the playing field',
            bg: 'bg-cyan-100',
            textColor: 'text-cyan-500' // Ensuring text is dark
        },
    ];



    return (
        <div>
            <section className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5">

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

                    <div className='mt-20'>
                        <h1 className="text-5xl md:text-6xl font-bold text-cyan-500 mb-6">
                            About SimplyBooking
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            we are on a mission to help service professionals build thriving businesses with simple, powerful tools that anyone can use
                        </p>

                    </div>

                </div>
            </section>

            <section className="py-16 bg-white border-radius-lg mt-10 mb-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

                    <div className="grid md:grid-cols-2 gap-8">

                        {vision.map((text, i) => (
                            <div key={i} className="bg-white border-2 border-gray-100 rounded-lg p-8 font-bold shadow-md">
                                <div className={`text-5xl text-start font-bold mb-4 border ${text.bg} ${text.textColor} p-2 rounded-[20px] w-10 h-10 flex items-center justify-center`}>{text.icon}</div>
                                <div className="text-3xl text-start font-bold mb-4">{text.title}</div>
                                <p className="text-xs text-gray-500">{text.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8">
                        {process.map((step, i) => (
                            <div key={i} className="text-center">

                                <h3 className="font-bold text-cyan-500 text-3xl mb-2 ">{step.title}</h3>
                                <p className="text-sm text-gray-600">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            <section className="py-20 bg-white sm:px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
                    <p className="text-lg text-gray-700 mb-6">
                        SimplyBooking was born out of frustration. Our founders, both former service business owners, struggled to find affordable, easy-to-use tools to manage their businesses online.
                    </p>
                    <p className="text-lg text-gray-700 mb-6">
                        Large enterprises had access to powerful booking systems, professional websites, and marketing tools. But small service businesses were left with either expensive solutions or cobbled-together workarounds.
                    </p>
                    <p className="text-lg text-gray-700 mb-6">
                        We believed there had to be a better way. In 2020, we set out to build a platform that would give every service professional—from plumbers to personal trainers—the same powerful tools that big businesses take for granted.
                    </p>
                    <p className="text-lg text-gray-700">
                        Today, SimplyBooking powers over 50,000 service businesses across 5 countries. But we're just getting started. Our mission remains the same: to help service professionals build thriving businesses with simple, powerful tools.
                    </p>
                </div>
            </section>



            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
                        <p className="text-gray-600">Get a professional online presence and grow your business faster than ever before</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        {features.map((feature, i) => (
                            <div key={i} className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition border-2 border-gray-100">


                                <div className={`${feature.bg} w-14 h-14 rounded-[50%] flex items-center justify-center mb-4`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>







            <section className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Our Values</h2>
                <p className="text-center text-gray-500 mb-12">The principles that guide everything we do at SimplyBooking.</p>

                <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 md:space-x-8">
                    <div className="flex flex-col items-center text-center">
                        <div className="mb-4 bg-orange-100 p-2 rounded-[50%] text-orange-500">
                            <Heart />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800">Customer First</h3>
                        <p className="text-gray-600">Every decision we make is guided by what’s best for our customers and their success.</p>
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <div className="mb-4 bg-orange-100 p-2 rounded-[50%] text-orange-500">
                            <Zap />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800">Simplicity</h3>
                        <p className="text-gray-600">We believe powerful tools should be easy to use. Complexity is the enemy of progress.</p>
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <div className="mb-4 bg-orange-100 p-2 rounded-[50%] text-orange-500">
                            <Award />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800">Excellence</h3>
                        <p className="text-gray-600">We strive for excellence in everything we do, from product design to customer support.</p>
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <div className="mb-4 bg-orange-100 p-2 rounded-[50%] text-orange-500">
                            <Users />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800">Community</h3>
                        <p className="text-gray-600">We’re building a community of service professionals who support and learn from each other.</p>
                    </div>
                </div>
            </section>



            <Footer />

        </div>
    )
}

export default About