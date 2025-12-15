import React, { use } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from './AuthContext';

const Home = () => {
    const navigate = useNavigate()
    const { user } = use(AuthContext)
    return (
        <div className='text-black pt-16 bg-[#eee7df] min-h-screen'>

            <section className="relative bg-gradient-to-r from-[#17483d] to-[#0f2f28] text-white overflow-hidden">

                <div className="absolute -top-20 -left-20 w-96 h-96 bg-amber-400/20 rounded-full filter blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-red-400/20 rounded-full filter blur-2xl animate-pulse"></div>
                <div className="container mx-auto px-6 lg:px-60 py-24 lg:py-32 relative z-10 flex flex-col lg:flex-row items-center gap-10">

                    <div className="flex-1 text-center lg:text-left">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-yellow-300 mb-6">
                            Donate Blood. Save Lives.
                        </h1>
                        <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8">
                            Join our community of heroes. Every donation counts. Find donors or register to become one.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                            {user ? (
                                <button
                                    onClick={() => navigate("/dashboard")}
                                    className="btn bg-amber-300 text-gray-900 font-semibold rounded-full px-6 py-3 shadow-lg hover:scale-105 transform transition duration-300"
                                >
                                    My Dashboard
                                </button>
                            ) : (
                                <button
                                    onClick={() => navigate("/register")}
                                    className="btn bg-amber-300 text-gray-900 font-semibold rounded-full px-6 py-3 shadow-lg hover:scale-105 transform transition duration-300"
                                >
                                    Join as a Donor
                                </button>
                            )}

                            <button
                                onClick={() => navigate("/searchpage")}
                                className="btn bg-white text-[#17483d] font-semibold rounded-full px-6 py-3 shadow-lg hover:scale-105 transform transition duration-300"
                            >
                                Search Donors
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 flex justify-center lg:justify-end">
                        {/* <img
                            src="/public/6924ac9115cf56dca98f75f23af6d235.jpg"
                            alt="Blood Donation Illustration"
                            className="w-full hover:scale-98 max-w-md lg:max-w-lg lg:h-[450px] rounded-3xl lg:w-[370px] animate-fadeIn"
                        /> */}
                        <div className="carousel carousel-vertical rounded-box h-[450px]">
                            <div className="carousel-item h-full w-full max-w-md lg:max-w-lg lg:h-[450px] rounded-3xl lg:w-[370px] animate-fadeIn">
                                <img src="/6924ac9115cf56dca98f75f23af6d235.jpg" />
                            </div>
                            <div className="carousel-item h-full w-full max-w-md lg:max-w-lg lg:h-[450px] rounded-3xl lg:w-[370px] animate-fadeIn">
                                <img src="/431276becfcf338b7207c8b3d130996b.jpg" />
                            </div>
                            <div className="carousel-item h-full w-full max-w-md lg:max-w-lg lg:h-[450px] rounded-3xl lg:w-[370px] animate-fadeIn">
                                <img src="/c3aa801d048163010d920aa4e2e7ff20.jpg" />
                            </div>
                            <div className="carousel-item h-full w-full max-w-md lg:max-w-lg lg:h-[450px] rounded-3xl lg:w-[370px] animate-fadeIn">
                                <img src="/1d8d9cd7be757af8ba51e672959d886b.jpg" />
                            </div>
                            <div className="carousel-item h-full w-full max-w-md lg:max-w-lg lg:h-[450px] rounded-3xl lg:w-[370px] animate-fadeIn">
                                <img src="/97909de05a595ed860c8abe7a95787f2.jpg" />
                            </div>


                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-gradient-to-b from-[#f6f1eb] to-[#e9dfd4] py-16 sm:py-20 px-4 sm:px-6 lg:px-12">
  <div className="max-w-7xl mx-auto">

    {/* Heading */}
    <div className="text-center max-w-3xl mx-auto mb-12">
      <h2 className="text-3xl border-b-4 pb-5 border-b-yellow-200 sm:text-4xl md:text-5xl font-extrabold text-[#12372A] leading-tight">
        Our Intentions behind this platform
      </h2>
      {/* <p className="mt-4 text-base sm:text-lg text-gray-600">
        Why we built this platform
      </p> */}
    </div>
    <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-200 p-6 sm:p-10 lg:p-14">
      
      <p className="text-center text-lg sm:text-xl md:text-2xl font-medium text-gray-800 max-w-4xl mx-auto leading-relaxed">
        We created this platform with one clear purpose —  
        <span className="text-[#17483d] font-semibold">
          to connect people who are willing to donate blood with those who need it most, without delay.
        </span>
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">

        <div className="rounded-2xl border border-amber-300 p-6 text-center hover:shadow-lg transition">
          <div className="text-3xl mb-3"></div>
          <h3 className="font-semibold text-lg text-gray-800 mb-2">
            Faster Access
          </h3>
          <p className="text-sm text-gray-600">
            Reduce delays by directly connecting donors and recipients in urgent moments.
          </p>
        </div>

        <div className="rounded-2xl border border-amber-300 p-6 text-center hover:shadow-lg transition">
          <div className="text-3xl mb-3"></div>
          <h3 className="font-semibold text-lg text-gray-800 mb-2">
            Trusted Requests
          </h3>
          <p className="text-sm text-gray-600">
            Clear and verified information to build confidence and transparency.
          </p>
        </div>

        <div className="rounded-2xl border border-amber-300 p-6 text-center hover:shadow-lg transition">
          <div className="text-3xl mb-3"></div>
          <h3 className="font-semibold text-lg text-gray-800 mb-2">
            Simple Process
          </h3>
          <p className="text-sm text-gray-600">
            No complexity. Just the information needed to take action quickly.
          </p>
        </div>

        <div className="rounded-2xl border border-amber-300 p-6 text-center hover:shadow-lg transition">
          <div className="text-3xl mb-3"></div>
          <h3 className="font-semibold text-lg text-gray-800 mb-2">
            Human Impact
          </h3>
          <p className="text-sm text-gray-600">
            Turning compassion into real-life impact, one donation at a time.
          </p>
        </div>

      </div>
      <div className="mt-14 text-center max-w-4xl mx-auto">
        <p className="text-lg sm:text-xl italic text-gray-700">
          “Saving a life shouldn’t depend on luck or reach —  
          it should depend on care, connection, and timely action.”
        </p>
      </div>

    </div>
  </div>
</section>

            <section className="bg-[#f6f1ea] py-16 px-4 sm:px-8 lg:px-20">
                <div className="max-w-7xl mx-auto text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17483d] mb-3">
                        Why Choose Our Platform?
                    </h2>
                    <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
                        We connect donors and patients with trust, speed, and compassion.
                        Every feature is built to save lives efficiently.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition duration-300">
                        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-red-100 text-red-600 text-2xl mb-4">
                            🩸
                        </div>
                        <h3 className="text-xl font-bold text-[#17483d] mb-2">
                            Verified Blood Requests
                        </h3>
                        <p className="text-gray-600 text-sm sm:text-base">
                            Every donation request is carefully reviewed to ensure authenticity and urgency.
                        </p>
                    </div>
                    <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition duration-300">
                        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-green-100 text-green-600 text-2xl mb-4">
                            ⚡
                        </div>
                        <h3 className="text-xl font-bold text-[#17483d] mb-2">
                            Fast & Easy Matching
                        </h3>
                        <p className="text-gray-600 text-sm sm:text-base">
                            Quickly find donors or patients based on blood group and location.
                        </p>
                    </div>
                    <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition duration-300">
                        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-600 text-2xl mb-4">
                            🔒
                        </div>
                        <h3 className="text-xl font-bold text-[#17483d] mb-2">
                            Secure & Private
                        </h3>
                        <p className="text-gray-600 text-sm sm:text-base">
                            Your personal data is protected with modern security standards.
                        </p>
                    </div>
                    <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition duration-300">
                        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-2xl mb-4">
                            🏥
                        </div>
                        <h3 className="text-xl font-bold text-[#17483d] mb-2">
                            Patient-Friendly System
                        </h3>
                        <p className="text-gray-600 text-sm sm:text-base">
                            Patients and donors stay connected with clear request details.
                        </p>
                    </div>
                    <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition duration-300">
                        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 text-2xl mb-4">
                            ❤️
                        </div>
                        <h3 className="text-xl font-bold text-[#17483d] mb-2">
                            Community Driven
                        </h3>
                        <p className="text-gray-600 text-sm sm:text-base">
                            Built by people who care — every donor becomes a lifesaver.
                        </p>
                    </div>
                    <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition duration-300">
                        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-teal-100 text-teal-600 text-2xl mb-4">
                            📊
                        </div>
                        <h3 className="text-xl font-bold text-[#17483d] mb-2">
                            Smart Dashboard
                        </h3>
                        <p className="text-gray-600 text-sm sm:text-base">
                            Track your donations, requests, and impact in one place.
                        </p>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;