import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { MdOutlinePlace } from "react-icons/md";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import UpdateEvent from "./UpdateEvent";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import Loader from "../../components/Loader";
const EventCard = ({ data, onEventUpdated }) => {
    const {
        _id,
        title,
        description,
        city,
        date,
        address,
        likes,
        dislikes,
        organizerDetails,
        phone,
        email,
        displayStatus,
        images = [],
    } = data;
    const [loading, setLoading] = useState(false)
    const [copied, setCopied] = useState(false)

    const copyEventURL = (eventId) => {
        const url = `${window.location.origin}/event/${eventId}`;
        navigator.clipboard.writeText(url)
            .then(() => {
                toast.success("Event link copied to clipboard!");
            })
            .catch(() => {
                toast.error("Failed to copy event link.");
            });
        setCopied(true)
    };


    const deleteEvent = async () => {

        try {
            setLoading(true)
            const response = await axios.delete(`/api/v1/event/delete-event/${_id}`)
            if (response?.data?.statusCode === 200) {
                toast.success(response?.data?.message)
            }
            onEventUpdated()
            setLoading(false)
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);

        } finally {
            setLoading(false)
        }
    }

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
            <div className="my-2 flex items-center justify-between">
                <UpdateEvent data={data} onEventUpdated={onEventUpdated} />
                <button
                    onClick={deleteEvent}
                    className="btn btn-error btn-sm font-bold ">

                    {loading ? <><span className="loading loading-xs loading-spinner text-accent"></span></> : "Delete"}
                </button>

                {copied ? <button className="btn btn-dash btn-info btn-sm">Copied</button> : <button onClick={() => copyEventURL(data._id)} className="btn btn-sm btn-info font-bold">Copy URL</button>}


            </div>

        </div>
    )
}

export default EventCard
