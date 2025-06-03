import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar.jsx"

const HomeLayout = () => {
    return (
        <div>
            <Navbar />
            <Outlet/>
        </div>
    )
}

export default HomeLayout
