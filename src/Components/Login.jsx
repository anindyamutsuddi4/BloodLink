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
    //bg-[#E4d8cb]
    return (
        // <DocumentMeta {...meta}>
       <div className="lg:flex bg-gradient-to-b from-[#f6f1eb] to-[#e9dfd4] min-h-screen pt-8">

  <div
    className="
      flex-1 flex justify-center
      min-h-screen lg:min-h-0
      items-center lg:items-start
      pt-0 lg:pt-16
    "
  >
    {flip ? (
      <div className="items-center flex flex-col">
        <p className="text-[42px] font-semibold font-sans text-center">
          Forgot Your Password?
        </p>
        <p className="text-center mb-5">Reset it here</p>

        <form onSubmit={handlepass}>
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 min-h-[520px] flex flex-col justify-center">
            <label className="label">Email</label>
            <input
              type="email"
              required
              name="email"
              className="input"
              placeholder="Email"
            />

            <button type="submit" className="btn btn-neutral mt-4">
              Reset password
            </button>
          </fieldset>
        </form>

        <p onClick={button} className="underline text-center mt-3 cursor-pointer">
          Go Back
        </p>
      </div>
    ) : (
      <form
        onSubmit={handlelogin}
        className="md:w-[300px] min-h-[520px] md:min-h-[590px] "
      >
        <fieldset className="fieldset md:h-[430px]  my-auto bg-base-200 border-base-300 shadow-md rounded-box border p-6 sm:p-4 w-full min-h-full flex flex-col justify-center">
          <legend className="fieldset-legend text-xl sm:text-2xl text-yellow-500">
            Sign In
          </legend>

          <label className="label text-sm sm:text-base">Email</label>
          <input
            type="email"
            name="email"
            className="input input-sm sm:input-md"
            placeholder="Email"
          />

          <label className="label text-sm sm:text-base">Password</label>
          <input
            required
            type="password"
            name="password"
            className="input input-sm sm:input-md"
            placeholder="Password"
          />

          <button
            type="submit"
            className="btn  mt-4 bg-amber-400 hover:bg-amber-500 rounded-full w-full btn-sm sm:btn-md"
          >
            Sign In
          </button>

          <Link
            className="text-center block mt-1 text-xs sm:text-sm"
            to="/register"
          >
            Doesn't have an account?
            <span className="text-indigo-700"> Sign Up</span>
          </Link>

          <p
            onClick={button}
            className="text-center underline text-sm sm:text-sm mt-2 cursor-pointer"
          >
            Forgot Password?
          </p>
        </fieldset>
      </form>
    )}
  </div>

 
  <div className="hidden flex-1  text-center lg:flex flex-col justify-center px-10 bg-gradient-to-br from-[#17483d] to-[#0f2f28] text-white">
    <h2 className="text-5xl  font-extrabold mb-4 leading-tight text-yellow-300">
      Donate Blood. Save Lives.
    </h2>

    <p className="text-2xl opacity-90 mb-6 px-20">
      Your login connects you to people who need you the most.
      Every request is a chance to be someone’s hero.
    </p>

    <ul className="space-y-3 text-base opacity-95">
      <li>🩸 Verified donation requests</li>
      <li>🏥 Trusted medical connections</li>
      <li>❤️ One login, many lives saved</li>
    </ul>
  </div>

</div>


        // </DocumentMeta>
    );
};

export default Login;