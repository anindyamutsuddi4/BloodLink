import { createBrowserRouter } from "react-router";
import Root from "./Components/Root";
import Home from "./Components/Home";
import Register from "./Components/Register";
import Privateroute from "./Components/Privateroute";
import DashboardLayout from "./Components/DashboardLayout";
import MyProfile from "./Components/MyProfile";
import DonationRequest from "./Components/DonationRequest";
import DashboardHome from "./Components/DashboardHome";
import Requestforblood from "./Components/Requestforblood";
import RequestDetails from "./Components/RequestDetails";
import PatchRequest from "./Components/PatchRequest";
import AdminHomePage from "./Components/AdminHomePage";
import AllUsersDashboard from "./Components/AllUsersDashboard";
import AllDonationRequests from "./Components/AllDonationRequests";
import AdminRoute from "./Components/AdminRoute";
import ForbiddenAccess from "./Components/ForbiddenAccess";
import Login from "./Components/Login";
import VolunteerDonationRequests from "./Components/VolunteerDonationRequests";
import VolunteerDashboard from "./Components/VolunteerDashboard";
import VolunteerRoute from "./Components/VolunteerRoute";
import SearchPage from "./Components/SearchPage";
import PublicDonationRequest from "./Components/PublicDonationRequest";
import Footer from "./Components/Footer";
import Funding from "./Components/Funding";
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
            path: "/login",
            Component: Login
        }, {
            path: "/searchpage",
            Component: SearchPage
        }, {
            path: "/public-donation-request",
            Component: PublicDonationRequest
        }, {
            path: "/fundings",
            element:<Privateroute><Funding></Funding></Privateroute>
        }, {
            path: "/forbidden",
            Component: ForbiddenAccess

        }, {
            path: "/footer",
            Component: Footer
        },
        {
            path: "/dashboard",
            element: <Privateroute><DashboardLayout></DashboardLayout></Privateroute>,
            children: [{
                index: true,
                element: <Privateroute><DashboardHome></DashboardHome></Privateroute>
            },
            {
                path: '/dashboard/profile',
                element: <Privateroute><MyProfile></MyProfile></Privateroute>
            }, {
                path: "/dashboard/my-donation-requests",
                element: <Privateroute><DonationRequest></DonationRequest></Privateroute>
            }, {
                path: "/dashboard/create-donation-request",
                element: <Privateroute><Requestforblood></Requestforblood></Privateroute>
            }, {
                path: "/dashboard/request-details/:id",
                element: <Privateroute><RequestDetails></RequestDetails></Privateroute>
            }, {
                path: "/dashboard/patch-request/:id",
                element: <Privateroute><PatchRequest></PatchRequest></Privateroute>
            }, {
                path: '/dashboard/admin',
                element: <Privateroute><AdminRoute> <AdminHomePage></AdminHomePage></AdminRoute></Privateroute>
            }, {
                path: "/dashboard/all-users",
                element: <Privateroute><AdminRoute><AllUsersDashboard></AllUsersDashboard></AdminRoute></Privateroute>
            }, {
                path: "/dashboard/all-blood-donation-request",
                element: <Privateroute><AdminRoute><AllDonationRequests></AllDonationRequests></AdminRoute></Privateroute>
            }, {
                path: "/dashboard/volunteer/all-blood-donation-request",
                element: <Privateroute><VolunteerRoute> <VolunteerDonationRequests></VolunteerDonationRequests></VolunteerRoute></Privateroute>
            }, {
                path: '/dashboard/volunteer',
                element: <Privateroute><VolunteerRoute> <VolunteerDashboard></VolunteerDashboard></VolunteerRoute></Privateroute>
            }
            ]
        }]
    },
]);