import { useQuery } from '@tanstack/react-query';
import React, { use } from 'react';
import { AuthContext } from './AuthContext';
import useAxiosSecure from '../useAxiosSecure';

const useStatus = () => {
  const { user } = use(AuthContext)
    const axiosSecure = useAxiosSecure()
    const { isLoading, data: status = 'active' } = useQuery({
        queryKey: ['user-status', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/userStatus/${user?.email}`)
            return res.data?.status
        }

    })
    return { isLoading, status };
};

export default useStatus;