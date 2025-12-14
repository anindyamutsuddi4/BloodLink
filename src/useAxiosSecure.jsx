import React, { use, useEffect } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router';
import { AuthContext } from './Components/AuthContext';
const axiosSecure = axios.create(
    {
        baseURL: 'http://localhost:3000'

    }
)
const useAxiosSecure = () => {
    const { user, logout } = use(AuthContext)
    const navigate = useNavigate()
    useEffect(() => {
        //interceptor request
        const requestinterceptor = axiosSecure.interceptors.request.use((config) => {
            // Do something before request is sent
            config.headers.Authorization = `Bearer ${user?.accessToken}`
            return config;
        })
        //interceptor response
        const resInterceptor = axiosSecure.interceptors.response.use((response) => {
            // Any status code that lie within the range of 2xx cause this function to trigger
            // Do something with response data
            return response;
        }, (error) => {
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error
            const statusCode = error.status
            if (statusCode === 401 || statusCode === 403) {
                logout()
                    .then(() => {
                        navigate('/login')
                    })

            }
            return Promise.reject(error);
        });
        return () => {
            axiosSecure.interceptors.request.eject(requestinterceptor)
            axiosSecure.interceptors.response.eject(resInterceptor)
        }
    }, [user, navigate, logout])
    return axiosSecure
};

export default useAxiosSecure;