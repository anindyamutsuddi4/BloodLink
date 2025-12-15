import React, { use } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from './AuthContext';

const Home = () => {
    const navigate = useNavigate()
    const { user } = use(AuthContext)
    return (
        <div className='text-black pt-16 bg-[#eee7df] min-h-screen w-full'>

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

            <section className="bg-[#b3abaa] rounded-3xl mt-10  md:mt-20 py-16 sm:py-20 px-4 sm:px-6 lg:mx-22">
                <div className="max-w-7xl mx-auto">

                    <div className="text-center max-w-3xl mx-auto mb-3">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
                            Our Campaigns
                        </h2>
                        <p className="mt-4 text-base sm:text-lg text-gray-100">
                            Initiatives that turn compassion into life-saving action
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:flex flex-col gap-8">
                        <section className="py-10 px-4 sm:px-6 lg:px-12">
                            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 lg:gap-8">
                                <div className="w-full lg:w-[340px] bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition">
                                    <div className="h-48 w-full flex items-center justify-center overflow-hidden rounded-t-3xl">
                                        <img
                                            src="/c33bc33e87255f107cc6613a15db0178.jpg"
                                            alt="Emergency Blood Drive"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                            Emergency Blood Drive
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-4">
                                            Rapid response campaigns organized during critical shortages to connect donors with emergency requests.
                                        </p>
                                        <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-red-100 text-red-700">
                                            Ongoing
                                        </span>
                                    </div>
                                </div>

                                <div className="w-full lg:w-[55%] bg-white/90 backdrop-blur-lg rounded-3xl shadow-md border-2 border-amber-300 p-6 sm:p-8">
                                    <h4 className="text-2xl font-bold text-[#12372A] mb-4">Campaign Description</h4>
                                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6">
                                        This campaign focuses on addressing urgent blood shortages during emergency situations. Our goal is to mobilize donors quickly, ensure verified requests, and reduce response time so that no life is put at risk due to delay.
                                    </p>
                                    <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                                        <div>
                                            <p className="text-sm text-gray-500">Campaign Duration</p>
                                            <p className="text-base font-semibold text-gray-800">June 15 – June 30, 2025</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Coverage</p>
                                            <p className="text-base font-semibold text-gray-800">Nationwide</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="py-10 px-4 sm:px-6 lg:px-12">
                            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 lg:gap-8">

                                <div className="w-full lg:w-[55%] bg-white/90 backdrop-blur-lg rounded-3xl shadow-md border-2 border-amber-300 p-6 sm:p-8">
                                    <h4 className="text-2xl font-bold text-[#12372A] mb-4">Campaign Description</h4>
                                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6">
                                        This campaign focuses on spreading awareness about the importance of blood donation and educating people on eligibility, safety, and myths surrounding the process. Through workshops, digital outreach, and community engagement, we aim to build a culture of regular, voluntary blood donation.
                                    </p>
                                    <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                                        <div>
                                            <p className="text-sm text-gray-500">Campaign Duration</p>
                                            <p className="text-base font-semibold text-gray-800">July 1 – July 31, 2025</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Coverage</p>
                                            <p className="text-base font-semibold text-gray-800">Community & Online</p>
                                        </div>
                                    </div>
                                </div>


                                <div className="w-full lg:w-[340px] bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition">
                                    <div className="h-48 w-full flex items-center justify-center overflow-hidden rounded-t-3xl">
                                        <img
                                            src="/668572265d6f3bb0cac63f4d50fb4bcc.jpg"
                                            alt="Awareness & Education"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Awareness & Education</h3>
                                        <p className="text-sm text-gray-600 mb-4">
                                            Educating communities about safe blood donation, eligibility, and the long-term impact of regular donors.
                                        </p>
                                        <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-amber-100 text-amber-700">
                                            Community
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="py-10 px-4 sm:px-6 lg:px-12">
                            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 lg:gap-8">

                                <div className="w-full lg:w-[340px] bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition">
                                    <div className="h-48 w-full flex items-center justify-center overflow-hidden rounded-t-3xl">
                                        <img
                                            src="/004d2dfe8db5d6280abac6f376c235df.jpg"
                                            alt="Campus & Organization Drives"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Campus & Organization Drives</h3>
                                        <p className="text-sm text-gray-600 mb-4">
                                            Partnering with schools, colleges, and organizations to host structured blood donation events.
                                        </p>
                                        <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-emerald-100 text-emerald-700">
                                            Partnerships
                                        </span>
                                    </div>
                                </div>

                                <div className="w-full lg:w-[55%] bg-white/90 backdrop-blur-lg rounded-3xl shadow-md border-2 border-amber-300 p-6 sm:p-8">
                                    <h4 className="text-2xl font-bold text-[#12372A] mb-4">Campaign Description</h4>
                                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6">
                                        This campaign focuses on collaborating with educational institutions and organizations to organize structured blood donation events. We aim to make donation easier for students and employees, raise awareness, and build a culture of consistent giving within communities.
                                    </p>
                                    <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                                        <div>
                                            <p className="text-sm text-gray-500">Campaign Duration</p>
                                            <p className="text-base font-semibold text-gray-800">August 1 – August 31, 2025</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Coverage</p>
                                            <p className="text-base font-semibold text-gray-800">Campus & Organizations Nationwide</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <div className="mt-14 text-center max-w-4xl mx-auto">
                            <p className="text-lg sm:text-xl italic text-gray-700">
                                “Every campaign is a reminder that saving lives is not a single act — it’s a collective effort.”
                            </p>
                        </div>

                    </div>





                </div>
            </section>
<section className="py-12 px-4 sm:px-6 lg:px-12">
    <div className='text-5xl text-[#5B787F] mx-auto font-extrabold text-center border-t-2 border-amber-300 lg:pt-15 pb-10' >Get in Touch with Us</div>
  <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10">

  
    <div className="flex-1 bg-white rounded-3xl shadow-lg border border-[#5B787F] p-6 sm:p-8">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-[#12372A] mb-6">Contact Us</h2>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Your Name"
          className="input input-bordered w-full rounded-lg p-3 text-sm sm:text-base"
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          className="input input-bordered w-full rounded-lg p-3 text-sm sm:text-base"
          required
        />
        <input
          type="text"
          placeholder="Subject"
          className="input input-bordered w-full rounded-lg p-3 text-sm sm:text-base"
        />
        <textarea
          placeholder="Message"
          className="textarea textarea-bordered w-full rounded-lg p-3 text-sm sm:text-base"
          rows="5"
          required
        ></textarea>
        <button
          type="submit"
          className="btn bg-yellow-400 text-[#17483d] w-full rounded-full mt-2 py-6  hover:bg-[#0f2f28] transition hover:text-white"
        >
          Send Message
        </button>
      </form>
    </div>

    <div className="flex-1 bg-white/90 backdrop-blur-lg rounded-3xl shadow-md border border-[#5B787F]  p-6 sm:p-8 flex flex-col justify-center">
      <h3 className="text-3xl font-bold text-yellow-400 mb-4">Get in Touch</h3>
      <p className="text-gray-700 text-sm sm:text-base mb-4">
        Have questions or need assistance? Reach out to us anytime. We’re here to help.
      </p>
      <div className="flex flex-col gap-3">
        <div>
          <span className="font-semibold text-gray-800">Phone:</span>
          <p className="text-gray-600 text-sm sm:text-base">+880 1234 567 890</p>
        </div>
        <div>
          <span className="font-semibold text-gray-800">Email:</span>
          <p className="text-gray-600 text-sm sm:text-base">support@bloodlink.com</p>
        </div>
        <div>
          <span className="font-semibold text-gray-800">Address:</span>
          <p className="text-gray-600 text-sm sm:text-base">123, Blood Donation Street, Dhaka, Bangladesh</p>
        </div>
      </div>
    </div>

  </div>
</section>


        </div>
    );
};

export default Home;