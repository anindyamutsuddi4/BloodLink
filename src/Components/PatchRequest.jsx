import React, { use, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';

import useAxiosSecure from '../useAxiosSecure';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';

const PatchRequest = () => {
    const { id } = useParams()
    const { user } = use(AuthContext)
    const axiosSecure = useAxiosSecure()
    const [alldivisions, setalldivisions] = useState([])
    const [alldistricts, setalldistricts] = useState([])
    const { register, handleSubmit, watch } = useForm()
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
    const selecteddistrict = watch('recipientdivision')

    const districts = name => {
        const da = alldivisions.find(x => x.name == name)
        if (!da) return [];
        const data = alldistricts.filter(x => x.division_id == da.id)
        const data2 = data.map(x => x.name)
        // console.log(data2)
        return data2
    }

    //console.log(id)
    const { refetch, data = [] } = useQuery({
        queryKey: ['users', id],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/requests/details/${id}`)
            return res.data
        }
    })

    const changedata = data => {
        axiosSecure.patch(`/requests/${id}`, data)
            .then(res => {
                if (res.data.modifiedCount) {
                    //console.log("ok")
                    toast('Data updated successfully')
                    refetch()
                }
            })
            .catch(err => console.error(err));

    }
    return (
        <div className='bg-[#d5c6b7] pt-10 pb-10 max-w-screen max-h-screen'>
            <form
                onSubmit={handleSubmit(changedata)}
                className="w-full mx-auto  z-1 max-w-2xl bg-white rounded-3xl shadow-2xl p-6 space-y-4 border-2 border-amber-300"
            >
                <h2 className="text-3xl font-bold text-[#2c6a55] text-center mb-4">
                    Edit Blood Request Form
                </h2>
                {/* <div className="flex gap-4">
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
                    </div> */}
                <input
                    type="text"
                    {...register('recipientname')}
                    defaultValue={data.recipientname}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                 
                />
                <div className="flex gap-4">
                    <select {...register('recipientdivision')} required defaultValue={data.recipientdivision} className="select flex-1">
                        <option disabled={true}>Pick a division</option>
                        {
                            alldivisions.map((x, i) => <option key={i} value={x.name}>{x.name}</option>)
                        }

                    </select>
                    <select {...register('recipientdistrict')} defaultValue={data.recipientdistrict} className="select flex-1 text-black">
                        <option disabled={true}>Pick a district</option>
                        {
                            districts(selecteddistrict).map((x, i) => <option key={i} value={x.name}>{x}</option>)
                        }
                    </select>
                </div>
                <input
                    type="text"
                    {...register('hospital')}
                    defaultValue={data.hospital}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                   
                />

                <input
                    type="text"
                    {...register('fulladdress')}
                    defaultValue={data.fulladdress}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                   
                />
                <select {...register('bloodgroup')} required
                    defaultValue={data.bloodgroup} className="select p-3 rounded-md border shadow-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 col-span-1 md:col-span-2">
                    <option >{data.bloodgroup}</option>
                    {
                        ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((x, i) => <option key={i} value={x}>{x}</option>)
                    }

                </select>
                <div className="flex gap-4">
                    <input
                        type="date"
                        {...register('donationDate')}
                        className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                       
                    />
                    <input
                        type="time"
                        {...register('donationTime')}
                        className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      
                    />
                </div>

                <textarea
                    {...register('requestMessage')}
                    defaultValue={data.requestMessage}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 h-32 resize-none"
                 
                />
                <button
                    type="submit"
                    className="w-full py-3 bg-primary text-white font-semibold rounded-3xl shadow hover:bg-red-700 transition-colors"
                >
                    Submit Changes
                </button>
            </form>
        </div>
    );
};

export default PatchRequest;