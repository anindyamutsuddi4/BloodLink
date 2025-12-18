import React from 'react';
import { motion } from "framer-motion";
const Funding = () => {
    return (
        <div className='min-h-screen pt-17 bg-[#eee7df]'>
            <motion.div
                initial={{ opacity: 0, y: -150 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5 }}
            >
                <div className='bg-[#12372A] h-[115px] w-[270px] flex justify-center mx-auto rounded-b-3xl border-amber-400 border-2'>
                    <button className='mx-auto justify-center text-lg px-5 py-5 flex mt-10 font-semibold bg-yellow-400 rounded-full btn'>Give funds</button>
                </div>
            </motion.div>




        </div>
    );
};

export default Funding;