import React, { use } from 'react';
import { useNavigate, useParams } from 'react-router';
import { AuthContext } from './AuthContext';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../useAxiosSecure';

const RequestDetails = () => {
    const { id } = useParams()
    const { user } = use(AuthContext)
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    //console.log(id)
    const { data: x = [] } = useQuery({
        queryKey: ['users', id],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/requests/details/${id}`)
            return res.data
        }
    })
    return (
        <div className='bg-[#d5c6b7] h-screen w-screen'>
            <div className="flex sm:ml-5 pl-2 sm:pl-5 justify-center items-start md:gap-4  sm:gap-1 mx-auto pt-4 flex-nowrap">

                <div className="flex-shrink-0 w-[70%] sm:w-[70%] md:w-[48%] lg:w-[400px] max-w-full bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
                    <div className="w-full h-32 sm:h-40 md:h-58 rounded-t-2xl overflow-hidden">
                        <img
                            src={x.picture || "/254df386e48ff8180ee6a9588401a995.jpg"}
                            alt="Recipient"
                            className="w-full h-full animate-pulse object-cover"
                        />
                    </div>
                    <div className="p-4 sm:p-5 md:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-1 sm:gap-0">
                            <h2 className="text-sm sm:text-base md:text-2xl font-bold text-gray-800 dark:text-gray-100 break-words">
                                {x.recipientname}
                            </h2>
                            <span
                                className={`px-2 py-0.5 rounded-full text-xs sm:text-sm font-semibold
            ${x.status === "pending" ? "bg-yellow-200 text-yellow-800" :
                                        x.status === "inprogress" ? "bg-blue-200 text-blue-800" :
                                            x.status === "done" ? "bg-green-200 text-green-800" :
                                                x.status === "cancelled" ? "bg-red-200 text-red-800" : "bg-gray-200 text-gray-800"}`}
                            >
                                {x.status?.charAt(0).toUpperCase() + x.status?.slice(1)}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700 dark:text-gray-300 text-xs sm:text-sm md:text-base">
                            <p className="text-xs sm:text-sm md:text-base"><span className="font-semibold">Requester:</span> {x.name}</p>
                            <p className="text-xs sm:text-sm md:text-base"><span className="font-semibold">Email:</span> {x.email}</p>
                            <p className="text-xs sm:text-sm md:text-base"><span className="font-semibold">Recipient Division:</span> {x.recipientdivision}</p>
                            <p className="text-xs sm:text-sm md:text-base"><span className="font-semibold">Recipient District:</span> {x.recipientdistrict}</p>
                            <p className="sm:col-span-2 text-xs sm:text-sm md:text-base"><span className="font-semibold">Hospital:</span> {x.hospital}</p>
                            <p className="sm:col-span-2 text-xs sm:text-sm md:text-base"><span className="font-semibold">Full Address:</span> {x.fulladdress}</p>
                            <p className="text-xs sm:text-sm md:text-base"><span className="font-semibold">Blood Group:</span> {x.bloodgroup}</p>

                            <div className="flex justify-between col-span-2 items-center gap-4 sm:gap-8">
                                <p className="text-xs sm:text-sm md:text-base">
                                    <span className="font-semibold">Requested At:</span> {new Date(x.createdAt).toLocaleString('en-GB')}
                                </p>
                                <button
                                    className="btn rounded-full bg-amber-300 text-xs sm:text-sm md:text-base"
                                    onClick={() => navigate(-1)}
                                >
                                    Go Back
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-shrink-0 w-[30%] sm:w-[30%] md:w-[48%] lg:w-[380px] chat rounded-3xl chat-start max-w-full">
                    <div className="chat-bubble p-2 sm:p-2 md:p-4 border-t-2 border-r-2 border-amber-300 rounded-r-3xl bg-[#e3eae8] rounded-t-3xl text-[9px] sm:text-[10px] md:text-base">
                        <div className="font-semibold text-black text-[9px] sm:text-[10px] md:text-base">Request Message:</div>
                        <div className='text-red-900 text-[9px] sm:text-sm md:text-base'>{x.requestMessage}</div>
                    </div>
                </div>


            </div>





        </div>
    );
};

export default RequestDetails;