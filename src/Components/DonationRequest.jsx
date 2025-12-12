import React from 'react';
import { RiGolfBallFill } from "react-icons/ri";
const DonationRequest = () => {
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





        </div>
    );
};

export default DonationRequest;