import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router"
import Home from "./pages/home"
import About from "./pages/about"
import useQsStore from "./store/question"
function App() {
    const { question } = useQsStore()
    return (
        <Router>
            <nav>
                <NavLink to="/home" className="mr-4 w-2.5 bg-fuchsia-500">
                    Home
                </NavLink>
                <NavLink to="/about" className="mr-4">
                    About
                </NavLink>
            </nav>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
            </Routes>
            <div>{question}</div>
        </Router>
    )
}

export default App
