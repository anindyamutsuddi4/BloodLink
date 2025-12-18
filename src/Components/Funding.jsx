import React, { use, useState } from 'react';
import { motion } from "framer-motion";
import { AuthContext } from './AuthContext';
import useAxiosSecure from '../useAxiosSecure';
import { GrFormPreviousLink } from "react-icons/gr";
const Funding = () => {
    const [flag, setflag] = useState(false)
    const { user } = use(AuthContext)
    const axiosSecure = useAxiosSecure()
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
        <div className="min-h-screen flex pt-17 justify-center bg-[#eee7df]">
            <div className="relative w-full sm:w-[320px] md:w-[300px]">
                {!flag && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <div
                            className="
            bg-[#12372A]
            px-4 pt-11 pb-2
            h-auto sm:h-[115px]
            w-full sm:w-[270px]
            mx-auto
            rounded-b-3xl
            border-amber-400 border-2
            flex justify-center
          "
                        >
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
                        className="absolute top-0 left-0 w-full"
                    >
                        <div
                            className="
            bg-[#12372A]
            py-3
            h-auto sm:h-[235px]
            px-4 sm:px-5
            rounded-b-3xl
            border-amber-400 border-2
          "
                        >
                            <button
                                onClick={() => setflag(false)}
                                className="text-white w-10 h-8 pl-2 pr-2  rounded-md mb-2 text-center items-center flex bg-[#595e25]  text-xl md:text-2xl"
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


    );
};

export default Funding;