import { Link } from "react-router-dom";
import PostList from "../../components/posts/PostList";
import Sidebar from "../../components/sidebar/Sidebar";
// import { categories  } from "../../dummyData";
import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllPosts } from "../../redux/apiCalls/postApiCall";
import { getCategories } from "../../redux/apiCalls/categoryApiCall";

const HomePage = () => {


const dispatch = useDispatch();

const {posts} = useSelector(state => state.post);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getAllPosts(1));
  },[])


  useEffect(() => {
    dispatch(getCategories());
    },[])
    
    const {categories} = useSelector(state => state.category)


  return (
  <section className="home">
    <div className="home-hero-header">
      <div className="home-hero-header-layout">
        <h1 className="home-title">Welcome to Zef-Blog</h1>
      </div>
    </div>
    <div className="home-latest-post">Latest Posts</div>
    <div className="home-container">
  <PostList posts={posts?.data}/>
      <Sidebar categories={categories?.data}/>
    </div>
    <div className="home-see-posts-link">
      <Link to="/posts" className="home-link">See All Posts</Link>
    </div>
  </section>
  )
}

export default HomePage;