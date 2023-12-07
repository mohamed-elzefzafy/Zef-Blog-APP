import "./pagination.css"

const Pagination = () => {
  return (
    <div className="pagination">
      <div className="page previous">previous</div>
    {[1 , 2 , 3 , 4 ,5].map((page) =>
    <div key={page} className="page">{page}</div>)
    }
      <div className="page next">next</div>
    </div>
  )
}

export default Pagination;