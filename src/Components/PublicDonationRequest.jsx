import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { RiGolfBallFill } from "react-icons/ri";
import { AuthContext } from './AuthContext';
import useAxiosSecure from '../useAxiosSecure'
import { MdArrowDropDownCircle } from "react-icons/md";
import { useNavigate } from 'react-router';

const PublicDonationRequest = () => {
    // const { user } = use(AuthContext)
    const axiosSecure = useAxiosSecure()
    //const [filter, setFilter] = useState('all');
    const navigate = useNavigate()
    // const [totalpage, settotalpage] = useState(0)
    const [currentpage, setcurrentpage] = useState(0)
    const limit = 8
    const { data: response = { data: [], totalCount: 0 } } = useQuery({
        queryKey: ['requests', currentpage, "pending"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/public/allrequests/?limit=${limit}&skip=${currentpage * limit}&filter=pending`)
            return res.data
        }
    })
    const items = response.data;
    console.log(items)
    const total = Math.ceil(response.totalCount / limit || 0)
    return (
        <div className='min-h-screen pb-5 pt-17 bg-[#E4d8cb]'>
           <div className="w-full flex justify-center relative mt-6 px-3 sm:px-6">
  <div className="w-full max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-4xl mb-8">
    <div
      className="
        relative overflow-hidden
        rounded-3xl
        bg-[#bb797b]
        p-6 sm:p-8 md:p-12
        text-center
        shadow-[0_20px_50px_rgba(0,0,0,0.25)]
        border border-white/20
        backdrop-blur-md
      "
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 pointer-events-none" />
      <div className="inline-block mb-3 px-4 py-1 rounded-full text-xs sm:text-sm font-semibold tracking-wide bg-yellow-400 text-[#25344F]">
        Community Blood Network
      </div>

      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
        All Blood Requests
      </h1>
      <p className="mt-2 sm:mt-3 text-sm sm:text-lg md:text-xl text-white/90 max-w-xl mx-auto">
        Browse verified blood donation requests and help save lives in your community.
      </p>
    </div>
  </div>
</div>


            {/* <div className="ml-4 sm:ml-10 md:ml-20 lg:ml-40">
                <div className="dropdown rounded-2xl dropdown-bottom dropdown-end">
                    <label
                        tabIndex={0}
                        className="btn m-1 bg-[#12372A] text-white rounded-full text-sm sm:text-base"
                    >
                        {filter.charAt(0).toUpperCase() + filter.slice(1)}
                        <MdArrowDropDownCircle className="text-lg sm:text-xl" />
                    </label>
                    <ul
                        tabIndex={0}
                        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32 sm:w-36"
                    >
                        {["all", "pending", "inprogress", "done", "cancelled"].map((status) => (
                            <li key={status}>
                                <button
                                    onClick={() => {
                                        setFilter(status);
                                        setcurrentpage(0);
                                    }}
                                    className="w-full text-left text-sm sm:text-base"
                                >
                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div> */}
            {response.totalCount > 0 ? (
                <div>

                    <div className="pt-4 px-2 sm:px-4 md:px-10 lg:px-15 overflow-x-auto">
                        <div className="overflow-x-auto border rounded-xl border-amber-400">
                            <table className="table w-full bg-[#edf4e5] text-sm sm:text-base">
                                <thead>
                                    <tr className="bg-[#12372A] text-white text-[14px] sm:text-[16px] md:text-[18px] font-md">
                                        <th></th>
                                        <th>Recipient Name</th>
                                        < th className='mx-auto'> Location</th>
                                        {/* <th>District</th> */}
                                        <th className='mx-auto'>Blood Group</th>
                                        <th>Date & time</th>
                                        {/* <th>Status</th> */}
                                        <th className='text-center'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((x, i) => (
                                        <tr key={x._id}>
                                            <th>{i + 1}</th>
                                            <td>{x.recipientname}</td>
                                            <td className='mx-auto'>{x.recipientdistrict}, {x.recipientdivision}</td>
                                            {/* <td></td> */}
                                            <td className='mx-auto' > <div >{x.bloodgroup}</div></td>
                                            <td>{x.donationDate},{x.donationTime}</td>
                                            <td>
                                                <div className='flex gap-1 justify-center'>
                                                    <button onClick={() => navigate(`/dashboard/request-details/${x._id}`)} className='btn rounded-full text-black bg-yellow-300'>View</button>

                                                    {/* <button onClick={() => {
                                                                modalRef.current.showModal()
                                                                setdeleteid(x._id)
                                                            }} className='btn rounded-full text-white bg-red-800'>Delete</button> */}
                                                    {/* {
                                                        (x.status == "inprogress") &&
                                                        <div className='flex gap-1'> <button onClick={() => changedata2(x._id)} className='btn rounded-full text-white bg-gray-400'>Cancel</button>
                                                            <button onClick={() => changedata(x._id)} className='btn rounded-full text-white bg-green-700'>Done</button></div>
                                                    } */}

                                                </div>

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex flex-wrap justify-center pt-3 gap-2">
                            {[...Array(total).keys()].map((i) => (
                                <button
                                    onClick={() => setcurrentpage(i)}
                                    className={`btn ${i == currentpage ? "bg-[#edf4e5]  border-amber-300 text-[#124925]" : "text-white bg-[#436850]"}  text-sm sm:text-base`}
                                    key={i}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center h-64 px-2 sm:px-4">
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md rounded-xl p-6 sm:p-8 text-center w-full max-w-xs sm:max-w-sm">
                        <svg
                            className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mb-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 17v-6h6v6m2 4H7a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                        </svg>
                        <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
                            No Data Found
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                            Please check back later or submit a new request.
                        </p>
                    </div>
                </div>
            )}
            {/*         
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
                    </dialog> */}


        </div >
    );
};

export default PublicDonationRequest;