import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger
} from "@/components/ui/navigation-menu"
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router"
import Home from "./pages/home"
import Start from "./pages/start"

function App() {
    return (
        <Router>
            <div className="flex h-16 w-full items-center bg-green-400 px-5">
                <NavigationMenu>
                    <NavigationMenuList className="flex items-center gap-2.5">
                        <NavigationMenuItem className="">
                            <Link to="/home">
                                <NavigationMenuTrigger className="bg-green-300 hover:bg-green-600 focus:bg-green-300 data-[state=open]:bg-green-600 data-[state=open]:hover:bg-green-600 data-[state=open]:focus:bg-green-600">
                                    Home
                                </NavigationMenuTrigger>
                            </Link>
                            <NavigationMenuContent className="flex items-center justify-center border-none bg-green-300 md:h-[100px] md:w-[200px]">
                                进入开始随机面试
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link to="/start">
                                <NavigationMenuTrigger className="bg-green-300 hover:bg-green-600 focus:bg-green-300 data-[state=open]:bg-green-600 data-[state=open]:hover:bg-green-600 data-[state=open]:focus:bg-green-600">
                                    Getting Started
                                </NavigationMenuTrigger>
                            </Link>
                            <NavigationMenuContent className="flex items-center justify-center border-none bg-green-300 md:h-[100px] md:w-[200px]">
                                进入查看教程快速开始
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Navigate
                            to="/home"
                            replace
                        />
                    }
                />
                <Route
                    path="/home"
                    element={<Home />}
                />
                <Route
                    path="/start"
                    element={<Start />}
                />
            </Routes>
        </Router>
    )
}

export default App
