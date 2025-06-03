
import Pagination from "../../components/Pagination.jsx";
import EventCard from "./EventCard.jsx";
import ResetPassword from "../user/ResetPassword.jsx";

const Profile = () => {
    return (
        <div className="p-10 ">
            <div className="border-cyan-300 border-2 rounded-md p-5 flex items-center justify-between">

                <div className="flex gap-5">
                    <div className="avatar ">
                        <div className="mask mask-hexagon-2 w-24">
                            <img src="https://img.daisyui.com/images/profile/demo/distracted2@192.webp" />
                        </div>
                    </div>
                    <div >
                        <p className="font-bold">Ritisha Gupta</p>
                        <p className="font-thin">ritisha@gmail.com</p>
                    </div>


                </div>
                <div className="flex items-center justify-center gap-2">
                    <div>
                        <h1>username</h1>
                        <label className="input validator">
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2.5"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </g>
                            </svg>
                            <input
                                type="text"
                                required
                                placeholder="user@1213"
                                disabled
                            />
                        </label>

                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <div>
                            <h1>Password</h1>
                            <label className="input validator">
                                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <g
                                        strokeLinejoin="round"
                                        strokeLinecap="round"
                                        strokeWidth="2.5"
                                        fill="none"
                                        stroke="currentColor"
                                    >
                                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </g>
                                </svg>
                                <input
                                    type="password"
                                    required
                                    placeholder="******"
                                    disabled
                                />
                            </label>
                        </div>

                        <ResetPassword />

                    </div>
                </div>

            </div>

            <h1 className="mt-5 text-3xl w-full border-b-2 border-slate-400">My Events</h1>
            <div className="grid grid-cols-5 gap-10 mt-5  ">
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
            </div>
            <div className="mb-20">
                <Pagination/>
            </div>
        </div>
    )
}

export default Profile
