import React, { use, useState } from 'react';
import { AuthContext } from './AuthContext';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../useAxiosSecure';
import { Mail, MapPin } from 'lucide-react';
import { CgProfile } from 'react-icons/cg';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const MyProfile = () => {
    const { user, loading } = use(AuthContext)
    const [active, setactive] = useState(false)
    const axiosSecure = useAxiosSecure()
    const { refetch, data } = useQuery({
        queryKey: ['users', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`)
            return res.data
        }
    })
    const {
        register,
        handleSubmit,
        isSubmitting
    } = useForm()
    const onsubmit = data => {
        axiosSecure.patch(`/users/${user?.email}`, data)
            .then(res => {
                if (res.data.modifiedCount) {
                    console.log("ok")
                    toast('Data updated successfully')
                    refetch()
                }
            })
            .catch(err => console.error(err));

    }
    if (loading || !data) {
        return <div className="flex justify-center items-center h-screen">
            <span className="loading loading-infinity loading-xl"></span>
        </div>
    }
    return (
        <div className="min-h-screen flex  p-6 bg-[#e2e4e3]">
            <div className="flex w-full max-w-6xl gap-8">
                <div className="w-1/2 flex justify-center pt-30 ">
                    <div className="max-w-[500px] w-[430px] mx-auto p-4">
                        <div className="relative bg-[#947a6c] rounded-3xl shadow-2xl border border-dotted border-primary overflow-hidden">
                         
                            <div className="absolute -inset-1  opacity-20 blur-3xl pointer-events-none" />

                            <div className="relative z-10 p-6  flex flex-col md:flex-row gap-6">
                          
                                <div className="flex-shrink-0">
                                    <div className="w-28 h-28 rounded-full ring-4 ring-white shadow-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                                        {data.avatar ? (
                                            <img
                                                src={data.avatar}
                                                alt={data.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <CgProfile className="w-12 h-12 text-gray-400" />
                                        )}
                                    </div>
                                </div>

                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between">
                                            <h3 className="text-2xl font-bold text-white">{data.name}</h3>
                                            {/* <button onClick={() => setactive(!active)} className="px-4 py-2 bg-primary text-white font-semibold rounded-3xl shadow hover:scale-105 transform transition-transform">
                                                Edit
                                            </button> */}
                                        </div>
                                        <p className="mt-1 text-sm text-white flex items-center gap-2">
                                            <Mail className="w-4 h-4" /> {data.email}
                                        </p>

                                        <div className="mt-3 flex items-center gap-3 text-white">
                                            <MapPin className="w-4 h-4 text-white" />
                                            <div>
                                                <div className="text-sm font-medium text-white">{data.divisions}</div>
                                                <div className="text-xs text-white">District: {data.district}</div>
                                            </div>
                                        </div>

                                        <div className="mt-4">
                                            <span className="inline-block px-3 py-1 rounded-full bg-red-100 text-red-700 font-medium text-sm shadow-sm">
                                                {data.bloodgroup}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* <div className="h-2 animate-bounce bg-gradient-to-r from-[#FCA5A5] via-[#FDE68A] to-[#93C5FD] opacity-30 mt-2" /> */}
                        </div>
                    </div>
                </div>

                {/* Right: Form (50%) */}
                <div className="w-1/2  flex items-start pt-10">
                    <form onSubmit={handleSubmit(onsubmit)} className={`w-full max-w-lg ${active ? ' bg-white focus:border-primary' : 'bg-gray-100 cursor-not-allowed'}  p-6 rounded-3xl shadow-2xl border border-gray-200 space-y-3`}>
                        <div className='flex'>
                            <h2 className={`text-2xl mx-auto font-bold ${active ? 'text-gray-800' : 'text-gray-500 cursor-not-allowed'}  text-center mb-4`}>Update Profile</h2>
                            <button onClick={() => setactive(!active)} className="px-6 text-md py-0  flex-end bg-primary text-white font-semibold rounded-3xl shadow hover:scale-105 transform transition-transform">
                                Edit
                            </button>
                        </div>


                        <input
                            type="text"
                            {...register('name')}
                            defaultValue={data?.name}
                            disabled={!active}
                            className={`w-full p-3 border-b focus:outline-none transition-colors duration-300 ${active ? ' focus:border-primary' : ' text-gray-500 cursor-not-allowed'
                                }`}
                        />
                        <input
                            type="email"
                            {...register('email')}
                            defaultValue={data?.email}
                            disabled={true}
                            className="w-full p-3 border-b focus:outline-none text-gray-500 transition-colors duration-300 cursor-not-allowed
                                "
                        />
                        <input
                            type="text"
                            {...register('divisions')}
                            defaultValue={data?.divisions}
                            disabled={!active}
                            className={`w-full p-3 border-b focus:outline-none transition-colors duration-300 ${active ? 'bg-white focus:border-primary' : 'text-gray-500 cursor-not-allowed'
                                }`}
                        />
                        <input
                            type="text"
                            {...register('district')}
                            defaultValue={data?.district}
                            disabled={!active}
                            className={`w-full p-3 border-b focus:outline-none transition-colors duration-300 ${active ? 'bg-white focus:border-primary' : 'text-gray-500 cursor-not-allowed'
                                }`}
                        />

                        <input
                            type="text"
                            {...register('bloodgroup')}
                            defaultValue={data?.bloodgroup}
                            disabled={!active}
                            className={`w-full p-3 mb-5 border-b focus:outline-none transition-colors duration-300 ${active ? 'bg-white focus:border-primary' : 'text-gray-500 cursor-not-allowed'
                                }`}
                        />

                        <button
                            type="submit"

                            onClick={() => {
                                refetch(),
                                    setactive(!active)
                            }}
                            value={isSubmitting ? "Registerring... " : "Register"}
                            className={`px-4 py-3 rounded-full w-full text-white font-semibold shadow transition-colors duration-300
        ${active ? 'bg-primary hover:bg-[#4b230999]' : 'bg-gray-400 cursor-not-allowed'}
      `}
                        >
                            Update
                        </button>
                    </form>
                </div>

            </div>
        </div>

    );
};

export default MyProfile;