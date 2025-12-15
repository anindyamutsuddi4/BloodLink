import React from 'react';

const Footer = () => {
    return (
        <div>
            <div className="bg-[#12372A] text-white py-12 px-6 sm:px-12">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

                    <div className="flex flex-col gap-4">
                        <img src="/public/ChatGPT Image Dec 16, 2025, 01_36_20 AM.png" alt="BloodLink Logo" className="w-18" />
                        <p className="text-gray-300 text-sm">
                            BloodLink connects donors and recipients in need, facilitating verified donations to save lives efficiently.
                        </p>
                        <div className="flex gap-3 mt-2">
                            <a href="#" className="text-gray-300 hover:text-yellow-500 transition">Facebook</a>
                            <a href="#" className="text-gray-300 hover:text-yellow-500 transition">Twitter</a>
                            <a href="#" className="text-gray-300 hover:text-yellow-500 transition">Instagram</a>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h4 className="font-semibold text-lg mb-2">Useful Links</h4>
                        <a href="/donation-requests" className="text-gray-300 hover:text-yellow-500 transition">Donation Requests</a>
                        <a href="/search" className="text-gray-300 hover:text-yellow-500 transition">Search Donors</a>
                        <a href="/register" className="text-gray-300 hover:text-yellow-500 transition">Join as Donor</a>
                        <a href="/campaigns" className="text-gray-300 hover:text-yellow-500 transition">Our Campaigns</a>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h4 className="font-semibold text-lg mb-2">Contact Us</h4>
                        <p className="text-gray-300 text-sm">Phone: +880 1234 567 890</p>
                        <p className="text-gray-300 text-sm">Email: support@bloodlink.com</p>
                        <p className="text-gray-300 text-sm">Address: Dhaka, Bangladesh</p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h4 className="font-semibold text-lg mb-2">Stay Updated</h4>
                        <p className="text-gray-300 text-sm">Subscribe to receive updates on campaigns and donation drives.</p>

                    </div>

                </div>

                <div className="mt-10 border-t border-gray-700 pt-4 text-center text-gray-400 text-sm">
                    © 2025 BloodLink. All rights reserved.
                </div>
            </div>

        </div>
    );
};

export default Footer;