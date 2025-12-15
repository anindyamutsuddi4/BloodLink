import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from './AuthContext';

const SearchPage = () => {
    const [alldivisions, setalldivisions] = useState([])
    const [alldistricts, setalldistricts] = useState([])
    const {
        register,
        handleSubmit,
        watch,
    } = useForm()

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
        //     console.log(id)
        const da = alldivisions.find(x => x.name == name)
        if (!da) return [];
        const data = alldistricts.filter(x => x.division_id == da.id)
        const data2 = data.map(x => x.name)
        // console.log(data2)
        return data2
    }
    const search = data => {
        console.log(data)
    }
    return (
        <div className="pt-24 h-screen flex justify-center bg-[#E4d8cb]">
            <div className="w-full max-w-4xl px-4">
                <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-200 p-6 md:p-8">

                    {/* Header */}
                    <div className="text-center mb-6">
                        <h2 className="text-2xl md:text-3xlfont-extrabold text-[#12372A]">
                            Find Blood Donors
                        </h2>
                        <p className="mt-2 text-gray-600 text-sm md:text-base">
                            Search donors by blood group and location
                        </p>
                        <div className="w-20 h-1 bg-amber-400 mx-auto mt-4 rounded-full"></div>
                    </div>

                    {/* Form */}
                    <form
                        onSubmit={() => handleSubmit(search)}
                        className="grid grid-cols-1 md:grid-cols-2 gap-5"
                    >
                        {/* Blood Group */}
                        <div className="md:col-span-2 ">
                            <label className="block mb-1 text-sm font-semibold text-gray-700">
                                Blood Group
                            </label>
                            <select
                                {...register('bloodgroup')}
                                required
                                defaultValue="Select your blood group"
                                className="select w-full rounded-xl border-b-gray-300 bg-gray-50 px-4 py-3 text-gray-700
                       focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-b-amber-400"
                            >
                                <option>Select your blood group</option>
                                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((x, i) => (
                                    <option key={i} value={x}>{x}</option>
                                ))}
                            </select>
                        </div>

                        {/* Division */}
                        <div>
                            <label className="block mb-1 text-sm font-semibold text-gray-700">
                                Division
                            </label>
                            <select
                                {...register('divisions')}
                                required
                                defaultValue="Pick a division"
                                className="select w-full rounded-xl border-gray-300 bg-gray-50 px-4 py-3
                       focus:outline-none focus:ring-2 focus:ring-amber-400"
                            >
                                <option disabled>Pick a division</option>
                                {alldivisions.map((x, i) => (
                                    <option key={i} value={x.name}>{x.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* District */}
                        <div>
                            <label className="block mb-1 text-sm font-semibold text-gray-700">
                                District
                            </label>
                            <select
                                {...register('district')}
                                required
                                defaultValue="Pick a district"
                                className="select w-full rounded-xl border-gray-300 bg-gray-50 px-4 py-3 text-gray-800
                       focus:outline-none focus:ring-2 focus:ring-amber-400"
                            >
                                <option disabled>Pick a district</option>
                                {districts(selecteddistrict).map((x, i) => (
                                    <option key={i} value={x.name}>{x}</option>
                                ))}
                            </select>
                        </div>

                        {/* Button */}
                        <div className="md:col-span-2 flex justify-center mt-4">
                            <button
                                type="submit"
                                className="px-8 py-3 rounded-full bg-amber-400 text-[#3B1F0F] font-semibold
                       shadow-md hover:bg-amber-500 hover:scale-[1.02]
                       transition-all duration-200"
                            >
                                Search Donors
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default SearchPage;