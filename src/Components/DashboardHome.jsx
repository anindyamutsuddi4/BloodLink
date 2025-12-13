import React, { use, useState } from 'react';
import { AuthContext } from './AuthContext';
import useAxiosSecure from '../useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { NavLink, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useRef } from "react";
import { BsFillPinFill } from "react-icons/bs";
import { RiEditCircleFill } from "react-icons/ri";
const DashboardHome = () => {
    const { user } = use(AuthContext)

    const [deleteid, setdeleteid] = useState(0)
    const modalRef = useRef(null);

    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    // const [filter, setFilter] = useState('all');
    // const [totalpage, settotalpage] = useState(0)
    //  const [currentpage, setcurrentpage] = useState(0)
    const limit = 3
    const { refetch, data: response = { data: [], totalCount: 0 } } = useQuery({
        queryKey: ['users', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/requests/${user.email}?limit=${limit}`)
            return res.data
        }
    })

    const changedata = id => {
        const data = { status: "done" }
        axiosSecure.patch(`/requests/${id}`, data)
            .then(res => {
                if (res.data.modifiedCount) {
                    //console.log("ok")
                    toast('Status is updated successfully')
                    refetch()
                }
            })
            .catch(err => console.error(err));
    }
    const changedata2 = id => {
        const data = { status: "cancelled" }
        axiosSecure.patch(`/requests/${id}`, data)
            .then(res => {
                if (res.data.modifiedCount) {
                    //console.log("ok")
                    toast('Status is updated successfully')
                    refetch()
                }
            })
            .catch(err => console.error(err));
    }
    const deleterequest = id => {
        axiosSecure.delete(`/requests/${id}`)
            .then(res => {
                if (res.data.deletedCount) {
                    //console.log("ok")
                    toast('Request deleted successfully')
                    refetch()
                }
            })
            .catch(err => console.error(err));
    }
    const items = response.data;

    return (
        <div>
            <section className="text-white flex justify-center">
                <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:pt-12 pb-16 z-10">
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

            {/* <BsFillPinFill className='lg:absolute lg:ml-70 lg:z-1 lg:right-70 lg:text-red-800 lg:text-5xl lg:top-82'/>
            <RiEditCircleFill className='lg:absolute lg:ml-70 lg:z-1 lg:right-53 lg:text-red-800 lg:text-3xl lg:top-135'/>
            <img className='h-0 w-0 lg:h-50 lg:w-35 lg:ml-70  lg:absolute lg:right-51 lg:-rotate-59 lg:top-86' src="/public/d2e51c6215d3305a451d1f922f72e3e7.jpg" alt="" /> */}
            {
                response.totalCount > 0 &&
                <div>
                    <div
                        className="max-w-md sm:max-w-xl mx-5 md:mx-10 lg:max-w-4xl   px-6 py-5 rounded-t-2xl shadow-2xl bg-[#A66253]  bg-cover bg-center"
                    //style={{ backgroundImage: "url('254df386e48ff8180ee6a9588401a995.jpg')" }}
                    >
                        <div className="text-center flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <h2 className="text-xl mx-auto justify-center text-center flex sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                                    Here are all your recent requests
                                </h2>
                                <p className="mt-1 mx-auto  justify-center flex text-center text-white/90 sm:text-sm md:text-base">
                                    Check the status of your recent blood donation requests below. Every action matters!
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto mx-5 md:mx-10 border rounded-xl border-amber-400">
                        <table className="table w-full bg-[#edf4e5] text-sm sm:text-base">
                            <thead>
                                <tr className="bg-[#12372A] text-white text-[14px] sm:text-[16px] md:text-[18px] font-md">
                                    <th></th>
                                    <th>Recipient Name</th>
                                    <th>Division</th>
                                    <th>District</th>
                                    <th>Blood Group</th>
                                    <th>Date & time</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((x, i) => (
                                    <tr key={x._id}>
                                        <th>{i + 1}</th>
                                        <td>{x.recipientname}</td>
                                        <td>{x.recipientdivision}</td>
                                        <td >{x.recipientdistrict}</td>
                                        <td >{x.bloodgroup}</td>
                                        <td >{x.donationDate} {x.donationTime}</td>
                                        <td >{x.status}</td>
                                        <td>
                                            <div className='flex gap-1 justify-center'>
                                                <button onClick={() => navigate(`/dashboard/request-details/${x._id}`)} className='btn rounded-full bg-amber-300'>View</button>
                                                <button onClick={() => navigate(`/dashboard/patch-request/${x._id}`)} className='btn rounded-full bg-amber-300'>Edit</button>
                                                <button onClick={() => {
                                                    modalRef.current.showModal()
                                                    setdeleteid(x._id)
                                                }} className='btn rounded-full text-white bg-red-800'>Delete</button>
                                                {
                                                    (x.status == "inprogress") &&
                                                    <div className='flex gap-1'> <button onClick={() => changedata2(x._id)} className='btn rounded-full text-white bg-gray-400'>Cancel</button>
                                                        <button onClick={() => changedata(x._id)} className='btn rounded-full text-white bg-green-700'>Done</button></div>
                                                }
                                            </div>

                                        </td>
                                    </tr>
                                ))


                                }
                            </tbody>
                        </table>
                    </div>

                    <div><NavLink to='/dashboard/my-donation-requests'><button className='btn bg-amber-300 mx-auto flex mt-5 rounded-full font-semibold text-md'>View all requests</button></NavLink></div>
                </div>
            }
            <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Confirm action</h3>
                    <p className="py-4">Are you sure you want to delete?</p>
                    <div className="modal-action">
                        <button
                            className="btn bg-red-700 text-white"
                            onClick={() => modalRef.current.close()}
                        >
                            Cancel
                        </button>
                        <button
                            className="btn bg-green-700 text-white"
                            onClick={() => {
                                // do something
                                deleterequest(deleteid)
                                modalRef.current.close();
                            }}
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </dialog>

        </div>
    );
};

export default DashboardHome;