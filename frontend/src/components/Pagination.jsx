import { useState } from "react";

const Pagination = () => {
    const [selectedPage, setSelectedPage] = useState("1");

    return (
        <div className="join my-5 flex items-center justify-center">
            {["1", "2", "3", "4"].map((page) => (
                <input
                    key={page}
                    className="join-item btn btn-square"
                    type="radio"
                    name="pagination"
                    aria-label={page}
                    value={page}
                    checked={selectedPage === page}
                    onChange={() => setSelectedPage(page)}
                />
            ))}
        </div>
    );
};

export default Pagination;
