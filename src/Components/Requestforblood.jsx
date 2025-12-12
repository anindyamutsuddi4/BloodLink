import React, { use, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FaTint } from "react-icons/fa";
import { BsFillHeartPulseFill } from "react-icons/bs";
import useAxiosSecure from '../useAxiosSecure';
const Requestforblood = () => {
    const { user } = use(AuthContext);
    const [alldivisions, setalldivisions] = useState([])
    const [alldistricts, setalldistricts] = useState([])
    const { register, handleSubmit, watch } = useForm();
    const axiosSecure = useAxiosSecure()
    useEffect(() => {
        fetch('/Divisions.json').then(res => res.json())
            .then(res => {
                // console.log(res)
                setalldivisions(res)
            })
    }, [])
    useEffect(() => {
        fetch('/Districts.json').then(res => res.json())
            .then(res => {
                //  console.log(res)
                setalldistricts(res)
            })
    }, [])
    const selecteddistrict = watch('divisions')

    const districts = name => {
        const da = alldivisions.find(x => x.name == name)
        if (!da) return [];
        const data = alldistricts.filter(x => x.division_id == da.id)
        const data2 = data.map(x => x.name)
        // console.log(data2)
        return data2
    }

    const onSubmit = data => {
        console.log(data);

        const userinfo = {
            email: user.email,
            name: user.displayName,
            recipientname: data.recipientName,
            recipientdistrict: data.district,
            recipientdivision: data.divisions,
            hospital: data.hospital,
            fulladdress: data.fulladdress,
            bloodgroup: data.bloodgroup,
            data: data.date,
            time: data.time,
            requestMessage: data.requestMessage,
        }
        // send data to backend via axios/axiosSecure
        axiosSecure.post('/requests', userinfo)
            .then(res => {
                if (res.data.insertedId) {
                    console.log("request created at database")
                    toast.success("Blood request submitted successfully!");
                }
            })
            .catch(error => console.log(error))
    }
    return (
        <div className='bg-[#f0e2e2] relative pt-19'>

            <FaTint className="w-23 h-23 text-red-900 absolute right-15 top-4" />
            <BsFillHeartPulseFill className="w-30 h-30 -rotate-9 animate-pulse text-red-900 absolute right-258 top-57" />
            <div className="text-center mb-8">
                <h1 className="text-4xl text-gray-800 sm:text-5xl lg:text-6xl font-extrabold bg-clip-text  drop-shadow-lg">
                    Request Blood, Save Lives
                </h1>
                <p className="mt-3 text-lg sm:text-xl text-primary max-w-2xl mx-auto">
                    Fill out the form below to request blood for someone in need. Your request can make a difference—every drop counts.
                </p>
            </div>

            <div className="min-h-screen pt-5 flex justify-center items-start bg-[#f0e2e2] p-6">

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full z-1 max-w-2xl bg-white rounded-3xl shadow-2xl p-6 space-y-4 border border-amber-500"
                >
                    <h2 className="text-3xl font-bold text-amber-400 text-center mb-4">
                        Blood Request Form
                    </h2>
                    <div className="flex gap-4">
                        <input
                            type="text"
                            value={user?.displayName || ''}
                            readOnly
                            className="flex-1 p-3 border rounded-lg bg-gray-100 cursor-not-allowed"
                            placeholder="Requester Name"
                        />
                        <input
                            type="email"
                            value={user?.email || ''}
                            readOnly
                            className="flex-1 p-3 border rounded-lg bg-gray-100 cursor-not-allowed"
                            placeholder="Requester Email"
                        />
                    </div>
                    <input
                        type="text"
                        {...register('recipientName')}
                        placeholder="Recipient Name"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        required
                    />
                    <div className="flex gap-4">
                        <select {...register('divisions')} required defaultValue="Pick a division" className="select flex-1">
                            <option disabled={true}>Pick a division</option>
                            {
                                alldivisions.map((x, i) => <option key={i} value={x.name}>{x.name}</option>)
                            }

                        </select>
                        <select {...register('district')} required defaultValue="Pick a district" className="select flex-1 text-black">
                            <option disabled={true}>Pick a district</option>
                            {
                                districts(selecteddistrict).map((x, i) => <option key={i} value={x.name}>{x}</option>)
                            }
                        </select>
                    </div>
                    <input
                        type="text"
                        {...register('hospital')}
                        placeholder="Hospital Name"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        required
                    />

                    <input
                        type="text"
                        {...register('fulladdress')}
                        placeholder="Full Address"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        required
                    />
                    <select {...register('bloodgroup')} required
                        defaultValue="select your blood group" className="select p-3 rounded-md border shadow-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 col-span-1 md:col-span-2">
                        <option >Select your blood group</option>
                        {
                            ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((x, i) => <option key={i} value={x}>{x}</option>)
                        }

                    </select>
                    <div className="flex gap-4">
                        <input
                            type="date"
                            {...register('donationDate')}
                            className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            required
                        />
                        <input
                            type="time"
                            {...register('donationTime')}
                            className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            required
                        />
                    </div>

                    <textarea
                        {...register('requestMessage')}
                        placeholder="Request Message"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 h-32 resize-none"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full py-3 bg-primary text-white font-semibold rounded-3xl shadow hover:bg-red-700 transition-colors"
                    >
                        Submit Request
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Requestforblood;