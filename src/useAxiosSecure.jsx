import React, { use, useEffect } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router';
import { AuthContext } from './Components/AuthContext';
const axiosSecure = axios.create(
    {
        baseURL: 'http://localhost:3000'
        //http://localhost:3000/ last / remove korechi
    }
)
const useAxiosSecure = () => {
    const { user } = use(AuthContext)
    const navigate = useNavigate()
    useEffect(() => {
        //intercept request
        const requestinterceptor = axiosSecure.interceptors.request.use(function (config) {
            // Do something before request is sent
            config.headers.Authorization = `Bearer ${user?.accessToken}`
            return config;
        })
        axios.interceptors.response.use(function onFulfilled(response) {
            // Any status code that lie within the range of 2xx cause this function to trigger
            // Do something with response data
            return response;
        }, (error) => {
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error
            const statusCode = error.status
            if (statusCode === 401 || statusCode === 403) {
                //logout
                navigate('/login')
            }
            return Promise.reject(error);
        });
        return () => {
            axiosSecure.interceptors.request.eject(requestinterceptor)
        }
    }, [user, navigate])
    return axiosSecure
};

export default useAxiosSecure;