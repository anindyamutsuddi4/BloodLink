import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router';

const Root = () => {
    return (
        <div className='mx-auto'>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default Root;