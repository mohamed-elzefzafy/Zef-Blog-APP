import { Link, useParams } from "react-router-dom";
import "./category.css";
// import { categories} from "../../dummyData";
import PostList from "../../components/posts/PostList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryPosts } from "../../redux/apiCalls/postApiCall";
import { getOneCategory } from "../../redux/apiCalls/categoryApiCall";


const CategoryPage = () => {
  const dispatch = useDispatch(); 
  const {postsCat} = useSelector(state => state.post);
  const {categoryId} = useParams();


useEffect(() => {
dispatch(getCategoryPosts(categoryId));
window.scrollTo(0, 0);
},[categoryId])


useEffect(() => {
dispatch(getOneCategory(categoryId));
},[categoryId])

const {category} = useSelector(state => state.category)


  return (
    <section className="category">
  {postsCat?.data?.length > 0 ? (<>
    <h1 className="category-title">posts belong to <span>{category?.data?.title}</span> category</h1>
    <PostList posts={postsCat?.data}/>
  </>) : 

(  <> 
  <h2 className="category-notfound"> No Posts for <span>{category?.data?.title}</span> </h2> 
  <Link to="/posts" className="category-notfound-link">
    Go to posts page <i className="bi bi-arrow-right"></i>
  </Link>
  </>)
  
  }
    </section>
  )
}

export default CategoryPage;