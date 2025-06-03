import AddEvent from "../../components/AddEvent.jsx"
import EventCard from "../../components/EventCard.jsx"
import Pagination from "../../components/Pagination.jsx"

const Dashboard = () => {
  return (
    <div className="px-10 py-5">
      <div className="my-5 flex items-center justify-between gap-10">
        <label className="input">
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input type="search" required placeholder="Search by Title or City" />
        </label>

        <div className="flex items-center justify-center gap-2">
          <input type="date" className="input" />
          <select defaultValue="Pick a color" className="select">
            <option disabled={true}>Choose city</option>
            <option>Mumbai</option>
            <option>Delhi</option>
            <option>Pune</option>
          </select>
        </div>

        <AddEvent />

      </div>
      <div className="grid grid-cols-5 gap-5 ">
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
      </div>
      <Pagination/>
    </div>
  )
}

export default Dashboard
