import React, { use, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from './AuthContext';
import useAxiosSecure from '../useAxiosSecure';
import { reload } from 'firebase/auth';
import { auth } from '../firebase.init';
import { toast } from 'react-toastify';
const Register = () => {
    const [alldivisions, setalldivisions] = useState([])
    const [alldistricts, setalldistricts] = useState([])
    const [data, setdata] = useState('')
    const axiosSecure = useAxiosSecure()
    const {
        register,
        handleSubmit,
        watch,
        formState: { isSubmitting },
    } = useForm()
    const { user, loading, signupuser, updateuser } = use(AuthContext)
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
    const pass = watch("password");
    const confirmpass = watch("confirmpassword");

    const districts = name => {
        //     console.log(id)
        const da = alldivisions.find(x => x.name == name)
        if (!da) return [];
        const data = alldistricts.filter(x => x.division_id == da.id)
        const data2 = data.map(x => x.name)
        // console.log(data2)
        return data2
    }

    // const districts = alldistricts.map(x => x.division_id)
    //  const uniquedistricts = [...new Set(districts)]
    if (!user || loading) {
        <div>data is loading</div>
    }
    const onsubmit = (data) => {
        // console.log(data)
        setdata('')
        if (pass != confirmpass) {
            setdata("password is incorrect")
            return
        }
        signupuser(data.email, data.password)
            .then(res => {
                console.log(res)
                const userinfo = {
                    email: data.email,
                    name: data.name,
                    avatar: data.avatar,
                    bloodgroup: data.bloodgroup,
                    divisions: data.divisions,
                    district: data.district,
                }
                updateuser({
                    ...(data.name && { displayName: data.name }),
                    ...(data.avatar && { photoURL: data.avatar })
                })
                reload(auth.currentUser)
                console.log(auth.currentUser.displayName, auth.currentUser.photoURL);
                axiosSecure.post('/users', userinfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            toast("Registration successful")
                            //console.log("user created at database")
                        }
                    })
            })
            .catch(error =>
                 console.log(error))

    }
    return (
        <div>
            <div className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-b from-[#f6f1eb] to-[#e9dfd4] p-6">
                <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-10 space-y-8 border border-gray-100">
                    <h2 className="text-3xl font-extrabold text-center text-gray-700 tracking-wide">Create Your Account</h2>

                    <form onSubmit={handleSubmit(onsubmit)} >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <input type="email" {...register('email')} required placeholder="Email" className="p-3 rounded-md border shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />


                            <input type="text" {...register('name')} required placeholder="Full Name" className="p-3 rounded-md border shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />


                            <input type="url" {...register('avatar')} placeholder="Avatar (ImageBB URL)" className="p-3 rounded-md border shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 col-span-1 md:col-span-2" />


                            {/* <legend className="fieldset-legend ">Blood Group</legend> */}
                            <select {...register('bloodgroup')} required defaultValue="select a blood group" className="select p-3 rounded-md border shadow-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 col-span-1 md:col-span-2">
                                <option >Select your blood group</option>
                                {
                                    ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((x, i) => <option key={i} value={x}>{x}</option>)
                                }

                            </select>
                            <div className='flex col-span-1 gap-4 md:col-span-2 '>
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

                            <input type="password"  {...register('password')} required placeholder="Password" className="p-3 rounded-md border shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                            <input type="password"  {...register('confirmpassword')} required placeholder="Confirm Password" className="p-3 rounded-md border shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                            {
                                data
                            }
                        </div>
                        <input className=' w-full mt-4 py-3 bg-[#bb797b] hover:bg-[#4a4138] text-white rounded-3xl text-lg font-semibold shadow-md transition-transform transform hover:scale-[1.02]'
                            type="submit"
                            value={isSubmitting ? "Registerring... " : "Register"} />
                    </form>



                </div>
            </div>
        </div>
    );
};

export default Register;