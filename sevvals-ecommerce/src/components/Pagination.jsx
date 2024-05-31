function Pagination({ currentPage, totalPages, onPageChange }) {
  const handleFirstPage = () => {
    onPageChange(1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleLastPage = () => {
    onPageChange(totalPages);
  };

  const handlePageClick = (page) => {
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`px-7 py-7 border tracking-widest shadow-sm ${
            currentPage === i
              ? "bg-blue-500 text-white"
              : "bg-white text-blue-500"
          }`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-center mt-4">
      <button
        onClick={handleFirstPage}
        className="px-6 py-7 border shadow-sm bg-white text-blue-500 tracking-widest"
      >
        First
      </button>
      <button
        onClick={handlePreviousPage}
        className="px-2 py-7 border shadow-sm bg-white text-blue-500 tracking-widest"
      >
        Previous
      </button>
      {renderPageNumbers()}
      <button
        onClick={handleNextPage}
        className="px-4 py-7 border shadow-sm bg-white text-blue-500 tracking-widest"
      >
        Next
      </button>
      <button
        onClick={handleLastPage}
        className="px-4 py-7 border shadow-sm bg-white text-blue-500 tracking-widest"
      >
        Last
      </button>
    </div>
  );
}

export default Pagination;
