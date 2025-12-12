import React, { use } from 'react';
import { AuthContext } from './AuthContext';

const DashboardHome = () => {
    const { user } = use(AuthContext)
    return (
        <div>
            <section className=" text-white">
                <div className="max-w-6xl mx-auto px-6 py-10 sm:py-18">
                    <div className="bg-white/6 backdrop-blur-md rounded-3xl p-8 sm:p-12 shadow-2xl border border-white/10">
                        <div className="flex items-center gap-6">
                            <div className="flex-shrink-0">
                                <div className="w-20 h-20 rounded-full bg-white/10 ring-2 ring-white/20 flex items-center justify-center">
                                    <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 21s-6-4.35-8-7.5A5 5 0 0 1 9 6c1.6 0 2.4.9 3 2 .6-1.1 1.4-2 3-2a5 5 0 0 1 5 7.5C18 16.65 12 21 12 21z" />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                                    Welcome to <span className="text-amber-300">BloodLink </span>, {`${user.displayName}`}.
                                </h1>
                                <p className="mt-3 text-lg sm:text-xl text-white/90 max-w-2xl">
                                    Here every drop you give becomes a <span className="font-semibold text-amber-100">lifeline</span>.
                                </p>

                                <div className="mt-6 flex gap-3">
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
        </div>
    );
};

export default DashboardHome;