import { createBrowserRouter } from "react-router";
import Home from "../pages/home";
import About from "../pages/about";
export const router = createBrowserRouter([
    {
        path: '/',
        Component: Home,
    },
    {
        path: '/About',
        Component: About
    }

]);