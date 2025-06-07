import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { IoIosPerson } from "react-icons/io";
import { MdOutlinePlace } from "react-icons/md";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";

const EventCard = ({ data }) => {
  const {
    title,
    description,
    city,
    date,
    address,
    likes ,
    dislikes ,
    organizerDetails ,
    phone,
    email,
    displayStatus,
    images = [],
  } = data;

  return (
    <div className="card bg-base-100 w-60 shadow-sm border-cyan-300 border-2 p-2">
      <div>
        <h2 className="card-title text-sm">{title}</h2>
        <p className="text-xs line-clamp-3">{description}</p>
      </div>

      {images.length > 0 && (
        <div className="carousel w-full h-28 mt-2 rounded-md overflow-hidden">
          {images.map((image, idx) => (
            <div key={idx} id={`item${idx}`} className="carousel-item w-full">
              <img src={image} alt={`event-img-${idx}`} className="w-full object-cover" />
            </div>
          ))}
        </div>
      )}

      {images.length > 1 && (
        <div className="flex w-full justify-center gap-2 py-2">
          {images.map((_, idx) => (
            <a key={idx} href={`#item${idx}`} className="btn btn-xs">
              {idx + 1}
            </a>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4 mt-2">
        <p className="flex items-center gap-1 text-lg">
          <AiOutlineLike />
          <span>{likes}</span>
        </p>
        <p className="flex items-center gap-1 text-lg">
          <AiOutlineDislike />
          <span>{dislikes}</span>
        </p>
      </div>

      <div className="flex items-center gap-2 mt-2">
        <IoIosPerson  />
        <div>
          <p className="text-xs">{organizerDetails || "N/A"}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-2">
        <div className="flex items-center gap-1">
          <MdOutlinePlace />
          <p className="text-xs">{city}</p>
        </div>
        <div className="flex items-center gap-1">
          <HiOutlineCalendarDateRange />
          <p className="text-xs">{new Date(date).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
