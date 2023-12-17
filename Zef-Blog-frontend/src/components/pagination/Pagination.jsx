import "./pagination.css"

const Pagination = ({currentPage ,setCurrentPage , pages}) => {
  const pagesArray = [] ;
  for (let i = 1 ; i <= pages ; i++) {
    pagesArray.push(i);
  }

  console.log(pagesArray);

  const perviPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }
  const nextPage = () => {
    if (currentPage < pagesArray.length) {
      setCurrentPage(currentPage + 1)
    }
  }
  return (
    <div className="pagination">
      <button className="page previous" onClick={perviPage} disabled={currentPage === 1}>previous</button>
    {pagesArray.map((page) =>
    <div key={page} className={currentPage === page ? "page active" : "page"}  onClick={() => setCurrentPage(page)}>{page}</div>)
    }
      <button onClick={nextPage} className="page next" disabled={currentPage === pagesArray.length}>next</button>
    </div>
  )
}

export default Pagination;