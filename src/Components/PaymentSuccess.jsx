import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../useAxiosSecure';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams()
    const axiosSecure = useAxiosSecure()
    const sessionId = searchParams.get('session_id')
    useEffect(() => {
        if (sessionId) {
            axiosSecure.post(`/payment-success?session_id=${sessionId}`)
        }
    }, [sessionId, axiosSecure])
    console.log(sessionId)
    return (
        <div className='min-h-screen pt-20 bg-[#eee7df]'>
            payment success

        </div>
    );
};

export default PaymentSuccess;