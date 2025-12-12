import { createBrowserRouter } from "react-router";
import Root from "./Components/Root";
import Home from "./Components/Home";
import Register from "./Components/Register";
import Privateroute from "./Components/Privateroute";
import DashboardLayout from "./Components/DashboardLayout";
import MyProfile from "./Components/MyProfile";
export const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        children: [{
            index: true,
            Component: Home
        }, {
            path: "/register",
            Component: Register
        }, {
            path: "/dashboard",
            element: <Privateroute><DashboardLayout></DashboardLayout></Privateroute>,
            children: [{
                path: '/dashboard/profile',
                element: <Privateroute><MyProfile></MyProfile></Privateroute>
            }]
        }]
    },
]);