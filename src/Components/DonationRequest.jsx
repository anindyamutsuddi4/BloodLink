import { useQuery } from '@tanstack/react-query';
import React, { use, useState } from 'react';
import { RiGolfBallFill } from "react-icons/ri";
import { AuthContext } from './AuthContext';
import useAxiosSecure from '../useAxiosSecure'
import { MdArrowDropDownCircle } from "react-icons/md";
const DonationRequest = () => {
    const { user } = use(AuthContext)
    const axiosSecure = useAxiosSecure()
    const [filter, setFilter] = useState('all');
    // const [totalpage, settotalpage] = useState(0)
    const [currentpage, setcurrentpage] = useState(0)
    const limit = 2
    const { data: response = { data: [], totalCount: 0 } } = useQuery({
        queryKey: ['users', user?.email, currentpage, filter],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/requests/${user.email}?limit=${limit}&skip=${currentpage * limit}&filter=${filter}`)
            return res.data
        }
    })


    const items = response.data;
    const total = Math.ceil(response.totalCount / limit || 0)
    return (
        <div className='h-screen'>
            <div className="w-full flex justify-center relative mt-5 px-2 sm:px-4">
                <RiGolfBallFill
                    className="w-4 h-4 sm:w-5 sm:h-5 z-1 text-red-900 absolute 
               top-2 sm:top-3 
               right-4 sm:right-28 md:right-52 lg:right-266"
                />
                <RiGolfBallFill
                    className="w-4 h-4 sm:w-5 z-1 sm:h-5 text-red-900 absolute 
               top-2 sm:top-3 
               right-10 sm:right-40 md:right-72 lg:right-88"
                />

                <div className="w-full max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl mb-6 sm:mb-8">
                    <div className="bg-gradient-to-r from-red-600/10 to-red-900/10 
                    backdrop-blur-lg p-6 sm:p-8 md:p-10 rounded-2xl 
                    border border-red-300/20 shadow-lg text-center">

                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-600 tracking-wide">
                            Your Blood Requests
                        </h1>

                        <p className="text-base sm:text-lg md:text-xl text-red-800 mt-1">
                            View and manage all the blood donation requests you’ve submitted.
                        </p>

                    </div>
                </div>
            </div>

  <div className="ml-4 sm:ml-10 md:ml-20 lg:ml-40">
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
                    </div>
            {response.totalCount > 0 ? (
                <div>
                  
                    <div className="pt-4 px-2 sm:px-4 md:px-10 lg:px-15 overflow-x-auto">
                        <div className="overflow-x-auto border rounded-xl border-amber-400">
                            <table className="table w-full bg-[#edf4e5] text-sm sm:text-base">
                                <thead>
                                    <tr className="bg-[#12372A] text-white text-[14px] sm:text-[16px] md:text-[18px] font-md">
                                        <th></th>
                                        <th>Recipient Name</th>
                                        <th>Division</th>
                                        <th>District</th>
                                        <th>Blood Group</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((x, i) => (
                                        <tr key={x._id}>
                                            <th>{i + 1}</th>
                                            <td>{x.recipientname}</td>
                                            <td>{x.recipientdivision}</td>
                                            <td>{x.recipientdistrict}</td>
                                            <td className='mx-auto' > <div >{x.bloodgroup}</div></td>
                                            <td>{x.status}</td>
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



        </div >
    );
};

export default DonationRequest;