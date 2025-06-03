import { Link } from "react-router-dom"
import { RiAccountCircleLine } from "react-icons/ri";
import { MdLogout } from "react-icons/md";
const Avatar = () => {
    return (
        <div>
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className=" m-1">
                    <div className="avatar avatar-placeholder cursor-pointer">
                        <div className="bg-neutral text-neutral-content w-12 rounded-full">
                            <span>SY</span>
                        </div>
                    </div>
                </div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                    <li>
                        <Link to={'/user'}>
                            <RiAccountCircleLine className="text-lg" /><span>Profile</span>
                        </Link>
                    </li>
                    <li>
                        <button className="text-red-500">
                            <MdLogout className="text-lg" /> <span>Logout</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Avatar
