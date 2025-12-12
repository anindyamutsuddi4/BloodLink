import { createBrowserRouter } from "react-router";
import Root from "./Components/Root";
import Home from "./Components/Home";
import Register from "./Components/Register";
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
        }]
    },
]);