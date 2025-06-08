import Pagination from "../../components/Pagination.jsx";
import EventCard from "./EventCard.jsx";
import UpdatePassword from "../user/UpdatePassword.jsx";
import { useGlobalContext } from "../../context/Contexts.jsx";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { debounce } from "../../utils/Debounce.js";

const Dashboard = () => {

    const { user } = useGlobalContext()
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState("");
    const [city, setCity] = useState("");
    const [date, setDate] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const cities = [
        "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata",
        "Pune", "Ahmedabad", "Jaipur", "Surat", "Lucknow", "Kanpur",
        "Indore", "Patna", "Bhopal", "Agra", "Varanasi", "Nagpur"
    ];
    const [loading, setLoading] = useState(false)

    const fetchEvents = async () => {
        try {
            setLoading(true)
            const params = {
                page,
                limit: 5,
                ...(search && { title: search, city }),
                ...(city && { city }),
                ...(date && { date }),
            };

            const response = await axios.get("/api/v1/event/get-user-events", { params });
            setEvents(response.data?.data?.events || []);
            setTotalPages(response?.data?.meta?.totalPages || 1);
            setLoading(false)
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setLoading(false)
        }
    };


    // debounce to delay search input handling
    const debouncedFetchCandidates = useCallback(debounce(fetchEvents, 300), [fetchEvents]);

    useEffect(() => {
        debouncedFetchCandidates();
    }, [search, city, date, page]);


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
                        <p className="font-bold">{user.name}</p>
                        <p className="font-thin">{user.email}</p>
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
                                value={user.username}
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

                        <UpdatePassword userId={user._id} />

                    </div>
                </div>

            </div>

            <h1 className="mt-5 text-3xl w-full border-b-2 border-slate-400">My Events</h1>
            <div className="my-5 flex items-center justify-between gap-10">
                <label className="input">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>
                    <input
                        type="search"
                        placeholder="Search by Title or City"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </label>

                <div className="flex items-center justify-center gap-2">
                    <input
                        type="date"
                        className="input"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <select className="select">
                        <option disabled>Choose city</option>
                        {cities.map((city, index) => (
                            <option key={index} value={city}>{city}</option>
                        ))}
                    </select>
                </div>


            </div>
            <div className="grid grid-cols-5 gap-10 mt-5  ">
                {events.length > 0 ? (
                    events.map((event) => <EventCard key={event._id} data={event} />)
                ) : (
                    <p className="text-gray-500 col-span-5 text-center">No events found.</p>
                )}
            </div>
            <div className="mb-20">
                <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
            </div>
        </div>
    )
}

export default Dashboard
