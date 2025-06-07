import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/Contexts.jsx"
import { MdLogout } from "react-icons/md";
const Navbar = () => {
  const navigate = useNavigate()

  const { user, logout } = useGlobalContext()

  const handleLogout = () => {
    logout()
    navigate('/')
  }
  return (
    <div className="navbar bg-primary text-primary-content flex items-center justify-between">
      <p className="text-2xl font-bold ml-3 ">SWIPO</p>
      {user ? <>
        <p>Welcome, <span className="font-bold">{user.name}</span></p>
        <button
          onClick={handleLogout}
          className="btn text-white flex items-center justify-center cursor-pointer gap-1 font-bold">
          <MdLogout className="text-xl" /> <span>Logout</span>
        </button>
      </> : ""}

    </div>
  )
}

export default Navbar
