import React from 'react';

const PaymentCancelled = () => {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#eee7df] p-4">
  <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 max-w-md w-full text-center border border-red-300">
    <h2 className="text-xl sm:text-2xl font-semibold text-red-600 mb-4">
      Payment Cancelled
    </h2>
    <p className="text-gray-700">
      Your payment was cancelled. Please try again later.
    </p>
  </div>
  
</div>

    );
};

export default PaymentCancelled;