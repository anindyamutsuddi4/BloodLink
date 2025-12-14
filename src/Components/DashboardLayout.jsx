import React, { use } from 'react';
import { NavLink, Outlet } from 'react-router';
import useRole from './useRole';
import { CgProfile } from "react-icons/cg";
import { BiSolidDonateBlood } from "react-icons/bi";
import { AuthContext } from './AuthContext';
import { MdBloodtype } from "react-icons/md";
import { SiFormspree } from "react-icons/si";
import { HiUsers } from "react-icons/hi2";
const DashboardLayout = () => {
    const { role } = useRole()
    const { user } = use(AuthContext)
    console.log(user.displayName)
    //eta kintu object
    return (
        <div className='pt-17'>
            <div className="drawer min-h-screen lg:drawer-open">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col min-h-screen">
                    {/* Navbar */}
                    <nav className="navbar w-full bg-primary text-white ">
                        <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            {/* Sidebar toggle icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                        </label>
                        <div className="px-4">Navbar Title</div>
                    </nav>

                    {/* Page content here */}
                    {/* ********************************* */}
                    <Outlet></Outlet>
                    {/* <div className="p-4">Page Content</div> */}
                </div>

                <div className="drawer-side  text-gray-200 min-h-screen flex flex-col is-drawer-close:overflow-visible">
                    <label htmlFor="my-drawer-4 " aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="flex bg-primary min-h-full  flex-col items-start  is-drawer-close:w-21 is-drawer-open:w-64 hover:is-drawer-open:w-64">
                        {/* Sidebar content here */}
                        <ul className="menu w-full grow">
                            {(role!=="admin"&&role!=="volunteer")&&<>
                           <li>
                                <NavLink to='/dashboard' className="is-drawer-close:tooltip  is-drawer-close:tooltip-right" data-tip="Homepage">
                                    {/* Home icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-5"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                                    <span className="is-drawer-close:hidden">Homepage</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/profile'
                                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                    data-tip="My Profile"
                                >
                                    <CgProfile className="my-1.5 inline-block size-5" />
                                    <span className="is-drawer-close:hidden">My profile</span>
                                </NavLink>
                            </li>
                            {/* <li><NavLink to='/dashboard/myparcels'>My parcels</NavLink></li> */}
                            <li>
                                <NavLink to='/dashboard/my-donation-requests'
                                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                    data-tip="My requested Donation"
                                >
                                    <BiSolidDonateBlood className="my-1.5 inline-block size-6" />
                                    <span className="is-drawer-close:hidden">My requested Donation</span>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to='/dashboard/create-donation-request'
                                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                    data-tip="Request for blood" >
                                    <MdBloodtype className="my-1.5 inline-block size-6" />
                                    <span className="is-drawer-close:hidden">Request for blood</span>
                                </NavLink>
                            </li>   
                            
                            </>}
                          

                            {
                                role == "rider" && <>
                                    <li>
                                        <NavLink to='/dashboard/assigneddelivery' className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                            data-tip="Assigned delivery">
                                            {/* Settings icon */}
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg>
                                            <span className="is-drawer-close:hidden">Assigned delivery</span>
                                        </NavLink>
                                    </li>
                                </>
                            }
                            {//role =admin hoilei ei component gula dekhabe
                                role == "admin" &&
                                <>
                                    <li>
                                        <NavLink to='/dashboard/admin' className="is-drawer-close:tooltip  is-drawer-close:tooltip-right" data-tip="Homepage">
                                            {/* Home icon */}
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-5"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                                            <span className="is-drawer-close:hidden">Homepage</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/dashboard/profile'
                                            className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                            data-tip="My Profile"
                                        >
                                            <CgProfile className="my-1.5 inline-block size-5" />
                                            <span className="is-drawer-close:hidden">My profile</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/dashboard/all-users' className="is-drawer-close:tooltip  is-drawer-close:tooltip-right" data-tip="All users">                                       
                                            <HiUsers className="my-1.5 inline-block size-5" />
                                            <span className="is-drawer-close:hidden">All Users</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/dashboard/all-blood-donation-request'
                                            className="is-drawer-close:tooltip  is-drawer-close:tooltip-right" data-tip="All Requests">
                                            <SiFormspree className="my-1.5 inline-block size-4" />
                                            <span className="is-drawer-close:hidden">All Requests</span>
                                        </NavLink>
                                    </li>
                                  
                                </>

                            }

                            {/* List item */}
                            <li>
                                <NavLink to='/dashboard/paymenthistory' className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                                    data-tip="Payment history">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg>
                                    <span className="is-drawer-close:hidden">Payment history</span>
                                </NavLink>
                            </li>
                        </ul>

                    </div>

                </div>
            </div>

        </div>
    );
};

export default DashboardLayout;