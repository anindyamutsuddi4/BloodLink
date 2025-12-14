import React, { use, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from './AuthContext';

//import DocumentMeta from 'react-document-meta';
const Login = () => {

    const navigate = useNavigate()
    //  if (!user) {
    //     return (
    //         <div className='flex items-center justify-center h-screen'>
    //             <span className="loading loading-infinity  loading-xl"></span>
    //         </div>
    //     )

    // }
    // const meta = {
    //     title: "Login to EcoTrack"
    // }
    // const nav = () => {
    //     if (user) { navigate('/') }
    // }
    const { signinuser, setuser, resetpass } = use(AuthContext)
    const handlelogin = (e) => {
        e.preventDefault()
        signinuser(e.target.email.value, e.target.password.value)
            .then(res => {
                //console.log(res.user)
                setuser(res.user)
                // toast("Login successful!")
                navigate(`${location.state ? location.state : "/"}`)
            }
            )
            .catch(error => {
                console.log(error.message)
                //toast('Do registration first')
            }
            )
    }
    const location = useLocation()
  
    const handlepass = (e) => {
        e.preventDefault()
        resetpass(e.target.email.value)
            .then(() => {
                // toast("Please check your email")
            })
            .catch((error) => {
                console.log(error)
            });

    }
    const [flip, setflip] = useState(false)
    const button = () => {
        setflip(!flip)
    }
    return (
        // <DocumentMeta {...meta}>
        <div className='bg-[#17483d] h-screen flex justify-center pt-36  '>
            {
                flip ?
                    (<div className='items-center  flex flex-col'>
                        <p className='text-[42px] font-semibold font-sans text-center'>Forgot Your Password?</p>
                        <p className='text-center mb-5'>Reset it here</p>
                        <form onSubmit={handlepass}>
                            <fieldset className="fieldset  bg-base-200 border-base-300 rounded-box w-xs border p-4">

                                <label className="label">Email</label>
                                <input type="email" required name="email" className="input" placeholder="Email" />

                                <button type="submit" className="btn btn-neutral mt-4">Reset password</button>
                            </fieldset>
                        </form>
                        <p onClick={button} className='underline text-center'>Go Back</p>
                    </div>)


                    :
                    <div className="flex justify-center md:mt-24 lg:mb-0 md:mb-30 items-center w-full px-6 py-6 sm:px-8 sm:py-8 md:px-1 md:py-5 backdrop-blur-xl bg-white/10 shadow-2xl border-2 border-yellow-500 mt-10  lg:mt-4 rounded-3xl max-w-[400px] mx-auto">
                        <form onSubmit={handlelogin}>
                            <fieldset className="fieldset bg-base-200 border-base-300 shadow-md rounded-box border p-6 sm:p-4 w-full">
                                <legend className="fieldset-legend text-xl sm:text-2xl text-yellow-500">Sign In</legend>

                                <label className="label text-sm sm:text-base">Email</label>
                                <input type="email" name="email" className="input input-sm sm:input-md" placeholder="Email" />

                                <label className="label text-sm sm:text-base">Password</label>
                                <input required type="password" name="password" className="input input-sm sm:input-md" placeholder="Password" />

                                <button type="submit" className="btn btn-neutral mt-4 bg-[#17483d] w-full btn-sm sm:btn-md">Sign In</button>

                                <Link className='text-center block mt-1 text-xs sm:text-sm' to="/register">Doesn't have an account?<span className='text-indigo-700'> Sign Up</span></Link>

                                <p onClick={button} className='text-center underline  text-sm sm:text-sm'>Forgot Password?</p>

                        

                            </fieldset>
                        </form>
                    </div>

            }

        </div>
        // </DocumentMeta>
    );
};

export default Login;