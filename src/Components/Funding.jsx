import React, { use, useState } from 'react';
import { motion } from "framer-motion";
import { AuthContext } from './AuthContext';
import useAxiosSecure from '../useAxiosSecure';
import { GrFormPreviousLink } from "react-icons/gr";
import useRole from './useRole';
import { useQuery } from '@tanstack/react-query';
const Funding = () => {
    const { role, isLoading } = useRole()
    const [flag, setflag] = useState(false)
    const [currentpage, setcurrentpage] = useState(0)
    const [currentpage2, setcurrentpage2] = useState(0)
    const { user } = use(AuthContext)
    const axiosSecure = useAxiosSecure()
    const limit = 8
    const { data: response = { data: [], totalCount: 0 } } = useQuery({
        queryKey: ['all-payments', currentpage],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/allpayments/?limit=${limit}&skip=${currentpage * limit}`)
            return res.data
        }
    })
    const items = response.data;
    const total = Math.ceil(response.totalCount / limit || 0)
    const { data: response2 = { data: [], totalCount: 0 } } = useQuery({
        queryKey: ['user-payments', currentpage2],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user?.email}?limit=${limit}&skip=${currentpage2 * limit}`)
            return res.data
        }
    })
    const items2 = response2.data;
    const total2 = Math.ceil(response2.totalCount / limit || 0)
    if (!user?.email) {
        alert("User not logged in")
        return
    }
    const handlePayment = async (e) => {
        e.preventDefault()
        // console.log(e.target.money.value)
        const paymentinfo = {
            cost: Number(e.target.money.value),
            senderEmail: user?.email
        }
        const res = await axiosSecure.post('/create-checkout-session', paymentinfo)
        window.location.href = res.data.url
        //console.log(paymentinfo, res)
        //console.log(res.data)
    }
    return (
        <div className="min-h-screen pt-17  bg-[#eee7df]">
            {isLoading && (
                <div className="flex items-center justify-center min-h-[50vh] text-lg font-semibold">
                    Checking permissions...
                </div>
            )}

            <div className="flex justify-center w-full">
                <div className="w-full max-w-[280px] sm:max-w-[300px] md:max-w-[320px]">
                    {!flag && (
                        <motion.div
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <div className="
          bg-[#12372A]
          px-4 pt-11 pb-2
          h-auto sm:h-[115px]
          w-full
          rounded-b-3xl
          border-amber-400 border-2
          flex justify-center
        ">
                                <button
                                    onClick={() => setflag(true)}
                                    className="
              mb-3
              px-5 py-2
              text-base sm:text-lg
              font-semibold
              bg-yellow-400
              rounded-full
            "
                                >
                                    Give funds
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {flag && (
                        <motion.div
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="
          bg-[#12372A]
          py-3
          h-auto sm:h-[235px]
          px-4 sm:px-5
          rounded-b-3xl
          border-amber-400 border-2
        ">
                                <button
                                    onClick={() => setflag(false)}
                                    className="text-white w-10 h-8 pl-2 pr-2 rounded-md mb-2 text-center flex items-center justify-center bg-[#595e25] text-xl md:text-2xl"
                                >
                                    <GrFormPreviousLink />
                                </button>

                                <form
                                    onSubmit={handlePayment}
                                    className="bg-white p-4 sm:p-6 rounded-2xl shadow-md"
                                >
                                    <input
                                        type="number"
                                        min="1"
                                        name="money"
                                        placeholder="Enter amount(in $)"
                                        className="w-full px-3 sm:px-4 py-2 rounded-lg border border-gray-300"
                                        required
                                    />

                                    <button
                                        type="submit"
                                        className="
                w-full
                mt-3
                px-5 py-3
                text-sm sm:text-base
                font-semibold
                bg-yellow-400
                rounded-full
              "
                                    >
                                        Donate
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
            {
                (role === "donor") ? <>
                    {(response2.totalCount > 0) ? (
                        <div className='mt-10'>

                            <div className="pt-4 px-2 sm:px-4 md:px-10 lg:px-15 overflow-x-auto">
                                <div className="overflow-x-auto border rounded-xl border-amber-400">
                                    <table className="table w-full bg-[#edf4e5] text-sm sm:text-base">
                                        <thead>
                                            <tr className="bg-[#12372A] text-white text-[14px] sm:text-[16px] md:text-[18px] font-md">
                                                <th></th>

                                                <th>Email</th>
                                                <th>Donation amount</th>
                                                <th>Date</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {items2.map((x, i) => (
                                                <tr key={x._id}>
                                                    <th>{i + 1}</th>
                                                    <td>{x.email}</td>
                                                    <td>{x.cost}</td>
                                                    <td>{x.date ? new Date(x.date).toLocaleString() : 'N/A'}</td>


                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="flex flex-wrap justify-center pt-3 gap-2">
                                    {[...Array(total2).keys()].map((i) => (
                                        <button
                                            onClick={() => setcurrentpage2(i)}
                                            className={`btn ${i == currentpage2 ? "bg-[#edf4e5]  border-amber-300 text-[#124925]" : "text-white bg-[#436850]"}  text-sm sm:text-base`}
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
                                    Please check back later or Donate fund.
                                </p>
                            </div>
                        </div>
                    )}

                </> : <>

                    {(response.totalCount > 0) ? (
                        <div className='mt-10'>

                            <div className="pt-4 px-2 sm:px-4 md:px-10 lg:px-15 overflow-x-auto">
                                <div className="overflow-x-auto border rounded-xl border-amber-400">
                                    <table className="table w-full bg-[#edf4e5] text-sm sm:text-base">
                                        <thead>
                                            <tr className="bg-[#12372A] text-white text-[14px] sm:text-[16px] md:text-[18px] font-md">
                                                <th></th>

                                                <th>Email</th>
                                                <th>Donation amount</th>
                                                <th>Date</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {items.map((x, i) => (
                                                <tr key={x._id}>
                                                    <th>{i + 1}</th>
                                                    <td>{x.email}</td>
                                                    <td>{x.cost}</td>
                                                    <td>{x.date ? new Date(x.date).toLocaleString() : 'N/A'}</td>


                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="flex flex-wrap justify-center pt-3 mb-2 gap-2">
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
                                    Please check back later.
                                </p>
                            </div>
                        </div>
                    )}
                </>

            }



        </div >


    );
};

export default Funding;