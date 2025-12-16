import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from './AuthContext';
import useAxiosSecure from '../useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const SearchPage = () => {
    const [alldivisions, setalldivisions] = useState([])
    const [alldistricts, setalldistricts] = useState([])
    const [active, setactive] = useState(false)
    const axiosSecure = useAxiosSecure()
    const {
        register,
        handleSubmit,
        watch,
    } = useForm()
    const [currentpage, setcurrentpage] = useState(0)
    const limit = 8
    const [filtereddata, setfiltereddata] = useState(null)
    // var div,dis,bg='';
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
        setactive(true)
        //div=data.divisions
        // dis=data.district
        setfiltereddata({
            bloodgroup: data.bloodgroup,
            division: data.divisions,
            district: data.district
        })
    }
    // useEffect(() => {
    //     console.log('filtereddata updated:', filtereddata)
    // }, [filtereddata])
    const { data: response = { data: [], totalCount: 0 }, isLoading } = useQuery({
        queryKey: ['users', currentpage, filtereddata],
        enabled: !!filtereddata,
        queryFn: async () => {
            const params = new URLSearchParams({
                limit,
                skip: currentpage * limit,
                filterbydivision: filtereddata.division,
                filterbydistrict: filtereddata.district,
                filterbygroup: filtereddata.bloodgroup
            }).toString()

            const res = await axiosSecure.get(`/searchusers?${params}`)

            //const res = await axiosSecure.get(`/searchusers/?limit=${limit}&skip=${currentpage * limit}&filterbydivision=${filtereddata.division}&filterbydistrict=${filtereddata.district}&filterbygroup=${filtereddata.bloodgroup}`)
            return res.data
        }
    })

    const items = response.data;
    // console.log(items)
    const total = Math.ceil(response.totalCount / limit || 0)

    return (
        <div className="pt-24 min-h-screen   bg-gradient-to-b from-[#f6f1eb] to-[#e9dfd4]">
            <div className="w-full max-w-4xl px-4 mx-auto mb-10">
                <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-200 p-6 md:p-8">


                    <div className="text-center mb-6">
                        <h2 className="text-2xl md:text-3xlfont-extrabold text-[#12372A]">
                            Find Blood Donors
                        </h2>
                        <p className="mt-2 text-gray-600 text-sm md:text-base">
                            Search donors by blood group and location
                        </p>
                        <div className="w-20 h-1 bg-amber-400 mx-auto mt-4 rounded-full"></div>
                    </div>


                    <form
                        onSubmit={handleSubmit(search)

                        }
                        className="grid  grid-cols-1 md:grid-cols-2 gap-5"
                    >

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
                                <option >Pick a division</option>
                                {alldivisions.map((x, i) => (
                                    <option key={i} value={x.name}>{x.name}</option>
                                ))}
                            </select>
                        </div>
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
                                <option >Pick a district</option>
                                {districts(selecteddistrict).map((x, i) => (
                                    <option key={i} value={x}>{x}</option>
                                ))}
                            </select>
                        </div>

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
            <div>
                {
                    active && <>
                        {
                            isLoading ? (
                                <div className="flex flex-col items-center justify-center py-20">
                                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-amber-400 mb-4"></div>
                                    <p className="text-gray-700 text-lg font-medium">Loading donors...</p>
                                </div>

                            ) :
                                (response.totalCount > 0) ? (
                                    <div className='pb-10'>

                                        <div className="pt-4 px-2 sm:px-4 md:px-10 lg:px-15 overflow-x-auto">
                                            <div className="overflow-x-auto border rounded-md border-amber-400">
                                                <table className="table w-full bg-[#edf4e5] text-sm sm:text-base">
                                                    <thead>
                                                        <tr className="bg-[#12372A] text-white text-[14px] sm:text-[16px] md:text-[18px] font-md">
                                                            <th></th>
                                                            <th> Name</th>
                                                            <th> Email</th>
                                                            < th className='mx-auto'> Location</th>
                                                            {/* <th>District</th> */}
                                                            <th className='mx-auto'>Blood Group</th>
                                                            <th>Date & time</th>
                                                            {/* <th>Status</th> */}

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {items.map((x, i) => (
                                                            <tr key={x._id}>
                                                                <th>{i + 1}</th>
                                                                <td>{x.name}</td>
                                                                <td>{x.email}</td>
                                                                <td className='mx-auto'>{x.district}, {x.divisions}</td>
                                                                <td className='mx-auto' > <div >{x.bloodgroup}</div></td>
                                                                <td>{new Date(x.createdAt).toLocaleString()}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div className="flex flex-wrap justify-center pt-3 pb-10 gap-2">
                                                {[...Array(total).keys()].map((i) => (
                                                    <button
                                                        onClick={() => setcurrentpage(i)}
                                                        className={`btn ${i == currentpage ? "bg-[#edf4e5]  border-amber-300 text-[#124925]" : "text-white bg-[#436850]"}  text-sm sm:text-base`}
                                                        key={i}
                                                    >
                                                        {i + 1}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex justify-center items-center h-64 px-2 sm:px-4">
                                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md rounded-xl p-6 sm:p-8 text-center w-full max-w-xs sm:max-w-sm">
                                            <svg
                                                className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mb-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 17v-6h6v6m2 4H7a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                />
                                            </svg>
                                            <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                                No Data Found
                                            </h2>
                                            <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                                                Please check back later or submit a new request.
                                            </p>
                                        </div>
                                    </div>
                                )}

                    </>
                }

            </div>

        </div>

    );
};

export default SearchPage;