import { createBrowserRouter } from "react-router"
import Home from "../pages/home"
import Start from "../pages/start"
export const router = createBrowserRouter([
    {
        path: "/home",
        Component: Home
    },
    {
        path: "/about",
        Component: Start
    },
    {
        path: "/",
        Component: Home
    }
])
