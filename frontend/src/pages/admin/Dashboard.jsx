import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import EventCard from "../../components/EventCard.jsx";
import Pagination from "../../components/Pagination.jsx";
import { debounce } from "../../utils/Debounce.js";

const Dashboard = () => {
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

  const fetchEvents = async () => {
    try {
      const params = {
        page,
        limit: 5,
        ...(search && { title: search,city }),
        ...(city && { city }),
        ...(date && { date }),
      };

      const response = await axios.get("/api/v1/event/all-events", { params });
      setEvents(response.data?.data?.events || []);
      setTotalPages(response?.data?.meta?.totalPages || 1);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };


  // debounce to delay search input handling
  const debouncedFetchCandidates = useCallback(debounce(fetchEvents, 300), [fetchEvents]);

  useEffect(() => {
     debouncedFetchCandidates();
  }, [search, city, date, page]);

  return (
    <div className="px-10 py-5">
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

      <div className="grid grid-cols-5 gap-5">
        {events.length > 0 ? (
          events.map((event) => <EventCard key={event._id} data={event} />)
        ) : (
          <p className="text-gray-500 col-span-5 text-center">No events found.</p>
        )}
      </div>

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default Dashboard;
