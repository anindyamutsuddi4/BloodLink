import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../useAxiosSecure';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams()
    const axiosSecure = useAxiosSecure()
    const [paymentinfo, setpaymentinfo] = useState([])
    const sessionId = searchParams.get('session_id')
    useEffect(() => {
        if (sessionId) {
            axiosSecure.post(`/payment-success?session_id=${sessionId}`)
                .then(res => {
                    console.log(res.data)
                    setpaymentinfo({
                        //j response pathabe oikhan theke egula ber kore set kore dicchi
                        transactionId: res.data.transactionId,
                    })
                })
        }
    }, [sessionId, axiosSecure])
    //console.log(sessionId)
    //console.log(transactionId)
    return (
     <div className="min-h-screen flex flex-col items-center justify-center bg-[#eee7df] px-4">
  <div className="bg-white shadow-lg rounded-2xl p-8 sm:p-12 text-center max-w-md w-full border-2 border-amber-400">
    <h1 className="text-2xl sm:text-3xl font-bold text-green-900 mb-4">
      Payment Successful!
    </h1> <p className="text-gray-700 text-base sm:text-lg mb-2">
      Thank you for your contribution.
    </p>
    <p className="text-gray-600 text-sm sm:text-base break-words">
      Transaction ID: <span className="font-mono font-semibold">{paymentinfo.transactionId}</span>
    </p>
    <button
      onClick={() => window.location.href = '/'}
      className="mt-6 w-full bg-yellow-400 text-white font-semibold py-2 rounded-full hover:bg-yellow-500 "
    >
      Back to Home
    </button>
  </div>
</div>

    );
};

export default PaymentSuccess;