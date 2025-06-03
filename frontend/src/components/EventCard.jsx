import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { IoPersonCircleSharp } from "react-icons/io5";
import { MdOutlinePlace } from "react-icons/md";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
const EventCard = () => {
    return (
        <div className="card bg-base-100 w-60 shadow-sm border-cyan-300 border-2 p-2">

            <div >
                <h2 className="card-title">Event Title</h2>
                <p className="text-xs">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi sunt nemo odio illum est tempora.</p>
            </div>
            <div className="carousel w-full h-28 mt-2 rounded-md">
                <div id="item1" className="carousel-item w-full">
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp"
                        className="w-full" />
                </div>
                <div id="item2" className="carousel-item w-full">
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp"
                        className="w-full" />
                </div>
                <div id="item3" className="carousel-item w-full">
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
                        className="w-full" />
                </div>
                <div id="item4" className="carousel-item w-full">
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp"
                        className="w-full" />
                </div>
            </div>
            <div className="flex w-full justify-center gap-2 py-2">
                <a href="#item1" className="btn btn-xs">1</a>
                <a href="#item2" className="btn btn-xs">2</a>
                <a href="#item3" className="btn btn-xs">3</a>
                <a href="#item4" className="btn btn-xs">4</a>
            </div>
            

            <div className="flex items-center gap-4 ">
                <p className="flex items-center justify-center text-lg">
                    <button >
                        <AiOutlineLike />
                    </button>
                    <span>10</span>
                </p>
                <p className="flex items-center justify-center text-lg">
                    <button >
                        <AiOutlineDislike />
                    </button>
                    <span>2</span>
                </p>

            </div>


            <div className="flex items-center gap-2 mt-2">
                <IoPersonCircleSharp className="text-3xl" />
                <div>
                    <p className="text-xs">Ritisha Gupta</p>
                    <p className="text-xs">ritu@gmail.com</p>
                </div>

            </div>
            <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center">
                    <MdOutlinePlace />
                    <p className="text-xs">Mumbai</p>
                </div>
                <div className="flex items-center">
                    <HiOutlineCalendarDateRange />
                    <p className="text-xs">10-06-2025</p>
                </div>
            </div>

        </div>
    )
}

export default EventCard
