const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    if (totalPages <= 1) return null;

    return (
        <div className="join my-5 flex items-center justify-center">
            {pages.map((page) => (
                <button
                    key={page}
                    className={`join-item btn btn-square ${page === currentPage ? "btn-active" : ""
                        }`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
