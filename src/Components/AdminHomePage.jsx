import React, { use } from 'react';
import { AuthContext } from './AuthContext';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../useAxiosSecure';


const AdminHomePage = () => {
    const { user } = use(AuthContext)
    const axiosSecure = useAxiosSecure()
    const {  data: response = { data: [], totalCount: 0 } } = useQuery({
        queryKey: ['users', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get("/allusers")
            return res.data
        }
    })
    const {  data: response2 = { data: [], totalCount: 0 } } = useQuery({
        queryKey: ['requests', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get("/allrequests")
            return res.data
        }
    })
    //console.log(data)
    //console.log(totalrequests)
  
    return (
        <div className='bg-[#BFC0AB] min-h-screen'>
            <section className="text-white flex justify-center">
                <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:pt-12 pb-14 z-10">
                    <div className="bg-[#12372A] backdrop-blur-md rounded-3xl p-6 sm:p-12 shadow-2xl border border-white/10">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 gap-4 text-center sm:text-left">
                            {/* Icon */}
                            <div className="flex-shrink-0 mx-auto sm:mx-0">
                                <div className="w-20 h-20 rounded-full bg-white/10 ring-2 ring-white/20 flex items-center justify-center">
                                    <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 21s-6-4.35-8-7.5A5 5 0 0 1 9 6c1.6 0 2.4.9 3 2 .6-1.1 1.4-2 3-2a5 5 0 0 1 5 7.5C18 16.65 12 21 12 21z" />
                                    </svg>
                                </div>
                            </div>

                            {/* Text Content */}
                            <div className="flex flex-col items-center sm:items-start">
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                                    Welcome to <span className="text-amber-300">BloodLink</span>, {user.displayName}.
                                </h1>
                                <p className="mt-3 text-lg sm:text-xl text-white/90 max-w-2xl">
                                    Here every drop you give becomes a <span className="font-semibold text-amber-100">lifeline</span>.
                                </p>

                                <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center sm:justify-start">
                                    <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-400 text-[#521D20] font-semibold shadow hover:scale-[1.02] transition-transform">
                                        Donate Now
                                    </button>
                                    <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-white/90 bg-white/5 hover:bg-white/10 transition">
                                        Learn More
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="w-full flex justify-center px-4 sm:px-6 lg:px-8 mb-7">
                <div className="text-center max-w-3xl">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#12372A]">
                        Our Impact at a Glance
                    </h2>

                    <div className="w-16 sm:w-20 h-1 bg-[#436850] mx-auto mt-4 rounded-full"></div>
                </div>
            </div>


            <div className="max-w-6xl border-b-2 border-gray-600 mx-auto px-4 pb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:px-7">

                    <div className="relative bg-[#8E988F]
                                rounded-full h-24 flex items-center justify-center shadow-lg
                                transform hover:scale-105 transition-transform duration-300">
                        <span className="text-white font-semibold text-lg md:text-xl">Total Users: {response.totalCount}</span>
                    </div>

                    <div className="relative bg-[#A2A684]
                                rounded-full h-24 flex items-center justify-center shadow-lg
                                transform hover:scale-105 transition-transform duration-300">
                        <span className="text-white font-semibold text-lg md:text-xl">Ongoing </span>

                    </div>
                    <div className="relative bg-[#966A62]
                                rounded-full h-24 flex items-center justify-center shadow-lg
                                transform hover:scale-105 transition-transform duration-300">
                        <span className="text-white font-semibold text-lg md:text-xl">Total Requests: { response2.totalCount}</span>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default AdminHomePage;