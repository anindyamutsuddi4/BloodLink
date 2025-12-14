
import { useQuery } from '@tanstack/react-query';
import React, { use, useState } from 'react';
import { RiGolfBallFill } from "react-icons/ri";
import { AuthContext } from './AuthContext';
import useAxiosSecure from '../useAxiosSecure'
import { MdArrowDropDownCircle } from "react-icons/md";
import { FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { FiMoreVertical } from "react-icons/fi";
const AllUsersDashboard = () => {
    const { user } = use(AuthContext)
    const axiosSecure = useAxiosSecure()
    const [filter, setFilter] = useState('all');
    // const [totalpage, settotalpage] = useState(0)
    const [currentpage, setcurrentpage] = useState(0)
    const limit = 8
    const { refetch, data: response = { data: [], totalCount: 0 } } = useQuery({
        queryKey: ['users', user?.email, currentpage, filter],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/allusers?limit=${limit}&skip=${currentpage * limit}&filter=${filter}`)
            return res.data
        }
    })
    const updateuserStatus = (id, status) => {
        const data = { status: status }
        axiosSecure.patch(`/userstatus/${id}`, data)
            .then(res => {
                if (res.data.modifiedCount) {
                    //console.log("ok")
                    toast('Status is updated successfully')
                    refetch()
                }
            })
            .catch(err => console.error(err));
    }

    const updateUserRole = (id, role) => {
        const data = { role: role }
        axiosSecure.patch(`/userrole/${id}`, data)
            .then(res => {
                if (res.data.modifiedCount) {
                    //console.log("ok")
                    toast('Status is updated successfully')
                    refetch()
                }
            })
            .catch(err => console.error(err));
    }
    const items = response.data;
    //console.log(items)
    const total = Math.ceil(response.totalCount / limit || 0)
    return (
        <div className='bg-[#BFC0AB] min-h-screen pb-5'>
            <div className="ml-4 sm:ml-10 md:ml-20 lg:ml-40">
                <div className="px-4 py-6 sm:py-8 md:py-10">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#395f50]  text-center sm:text-left">
                        Here are all your users
                    </h1>
                    <p className="mt-2 text-sm sm:text-base text-[#395f50] text-center sm:text-left">
                        Manage users, update roles, and monitor activity from this dashboard.
                    </p>
                </div>

                <div className="dropdown rounded-2xl dropdown-bottom md:mt-3 dropdown-end">
                    <label
                        tabIndex={0}
                        className="btn m-1 bg-[#12372A] text-white rounded-full text-sm sm:text-base"
                    >
                        {filter.charAt(0).toUpperCase() + filter.slice(1)}
                        <MdArrowDropDownCircle className="text-lg sm:text-xl" />
                    </label>
                    <ul
                        tabIndex={0}
                        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32 sm:w-36"
                    >
                        {["all", "active", "blocked"].map((status) => (
                            <li key={status}>
                                <button
                                    onClick={() => {
                                        setFilter(status);
                                        setcurrentpage(0);
                                    }}
                                    className="w-full text-left text-sm sm:text-base"
                                >
                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {response.totalCount > 0 ? (
                <div>

                    <div className="pt-1 px-2 sm:px-4 md:px-10 lg:px-10 overflow-x-auto">
                        <div className="overflow-x-auto border rounded-xl border-amber-400 shadow-lg">
                            <table className="table w-full bg-[#edf4e5] text-sm sm:text-base text-center">
                                <thead>
                                    <tr className="bg-[#12372A] text-white text-[14px] sm:text-[16px] md:text-[18px] font-semibold">
                                        <th>#</th>
                                        <th>Avatar</th>
                                        <th>Email</th>
                                        <th>Name</th>
                                        <th>Role</th>
                                        <th>Status</th>
                                        <th className='lg:pl-24 sm:pl-20 md:pl-14'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((x, i) => (
                                        <tr key={x._id} className="hover:bg-[#e2ebdc] transition-all">
                                            <td className="text-center">{i + 1}</td>
                                            <th> <div className="mask my-auto mask-squircle h-8 w-8"> <img className=' rounded-full' src={x.avatar ? x.avatar : "https://i.ibb.co.com/QFGXqPYV/user-profile-icon-circle-1256048-12499.jpg"} alt="Avatar Tailwind CSS Component" /> </div> </th>
                                            <td className="text-center ">{x.email}</td>
                                            <td className="text-center">{x.name}</td>
                                            <td className="text-center">{x.role}</td>
                                            <td className="text-center">{x.status}</td>
                                            <td className='lg:pl-24 sm:pl-20 md:pl-20'><button className="p-2 rounded hover:bg-gray-100 dropdown dropdown-left dropdown-center">
                                                <FiMoreVertical size={20} />
                                                <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-42 p-2 shadow-sm">
                                                    <li><button onClick={() => updateuserStatus(x._id, "blocked")} className="btn bg-red-700 text-white hover:bg-red-800 transition">Block</button></li>
                                                    <li>     <button onClick={() => updateuserStatus(x._id, "active")} className="btn bg-green-700 text-white hover:bg-green-800 transition">Unblock</button></li>
                                                    <li>    <button onClick={() => updateUserRole(x._id, "volunteer")} className="btn bg-purple-600 text-white hover:bg-purple-700 transition">Make Volunteer</button></li>
                                                    <li>      <button onClick={() => updateUserRole(x._id, "admin")} className="btn bg-blue-800 text-white hover:bg-blue-900 transition">Make Admin</button></li>                                                </ul>
                                            </button></td>
                                            {/* <td className="lg:flex lg:flex-wrap justify-center gap-1 sm:grid sm:grid-cols-2">
                                                <button onClick={() => updateuserStatus(x._id, "blocked")} className="btn bg-red-700 text-white hover:bg-red-800 transition">Block</button>
                                                <button onClick={() => updateuserStatus(x._id, "active")} className="btn bg-green-700 text-white hover:bg-green-800 transition">Unblock</button>
                                                <button onClick={() => updateUserRole(x._id, "volunteer")} className="btn bg-purple-600 text-white hover:bg-purple-700 transition">Make Volunteer</button>
                                                <button onClick={() => updateUserRole(x._id, "admin")} className="btn bg-blue-800 text-white hover:bg-blue-900 transition">Make Admin</button>
                                            </td> */}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex flex-wrap justify-center pt-3 gap-2">
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
        </div>
    );
};

export default AllUsersDashboard;