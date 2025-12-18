import React, { use } from 'react';
import { AuthContext } from './AuthContext';
import { NavLink, useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const Navbar = () => {
    const { user, logout } = use(AuthContext)
    const navigate = useNavigate()
    const handlelogout = () => {
        logout().then(() => {
            navigate('/')
            toast("You have successfully logged out")
        })
            .catch(error => console.log(error))
    }
    if (user === undefined) {
        return (
            <div className='flex items-center justify-center h-screen'>
                <span className="loading  loading-xl"></span>
            </div>
        )

    }
    const list = <>
        <li ><NavLink to="/">Home</NavLink></li>
        <li>|</li>
        <li ><NavLink to="/register">Register</NavLink></li>
        <li>|</li>
        <li ><NavLink to="/searchpage">Search</NavLink></li>
        <li>|</li>
        <li ><NavLink to="/public-donation-request">Donation Requests</NavLink></li>
        {(!user) && <li>|</li>}
        {
            (!user) && <li><NavLink to="/login">Login</NavLink></li>
        }
        {(user) && <li>|</li>}
        {
            (user) && <li><NavLink to="/fundings">Fundings</NavLink></li>
        }
        {/* <li ><NavLink to="/fundings">Fundings</NavLink></li> */}

        {/* {
            user && <li><NavLink to='/dashboard'>Dashboard</NavLink></li>
        } */}
        {/* {
            user && <li><NavLink to={`/myactivities/${user.email}`}>My activities</NavLink></li>
        } */}
    </>
    return (
        <div>
            <div className="navbar py-[10px] text-white fixed z-50  bg-white px-6 backdrop-blur-xl">
                <div className="navbar-start ">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="0"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {
                                list
                            }
                        </ul>
                    </div>
                    <div className='flex'>
                        <a className="md:text-2xl flex mx-auto justify-center items-center gap-1 text-xl lg:text-[20px] p-2 px-4 bg-amber-400 rounded-4xl font-bold text-[#521D20]">
                            <img src="/ChatGPT Image Dec 16, 2025, 01_36_20 AM.png" className='md:w-7 md:h-7 w-5 h-5 rounded-full' alt="" /> BloodLink</a>
                        {/* <div className=' text-[11px] md:text-sm pl-3 font-sans font-[400px]'>Join,Act & Grow <span className='font-bold text-[#17483d]'>Green</span> Together</div> */}
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-4 items-center  bg-[#6A040F]  rounded-4xl text-gray-200 font-semibold text-md">
                        {
                            list
                        }
                    </ul>
                </div>
                {/* <div className="navbar-end">
                    {/* <div className="flex-none"> */}


                {
                    user && <div className="dropdown dropdown-bottom navbar-end rounded-full">
                        <div tabIndex={0} role="button" className="btn btn-ghost rounded-full btn-circle avatar "

                        >  <img className="w-10  rounded-full "
                            //className={`hover:${user.displayName}`}
                            alt="Tailwind CSS Navbar component"
                            // src=""
                            src={`${user?.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}`}
                            /></div>
                        <ul
                            tabIndex="-1"
                            className="menu dropdown-content text-black bg-base-200 rounded-box z-1 mt-4 w-52 p-2 shadow-sm">
                            <li><button onClick={handlelogout}>Logout</button></li>
                            <li><NavLink to='/dashboard'>Dashboard</NavLink></li>

                        </ul>
                    </div>
                }


            </div>
        </div >

    );
};

export default Navbar;