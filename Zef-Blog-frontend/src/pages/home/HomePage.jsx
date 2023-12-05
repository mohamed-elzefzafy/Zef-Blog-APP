import { Link } from "react-router-dom";
import PostList from "../../components/posts/PostList";
import Sidebar from "../../components/sidebar/Sidebar";
import { categories, posts } from "../../dummyData";
import "./home.css";

const HomePage = () => {

  return (
  <section className="home">
    <div className="home-hero-header">
      <div className="home-hero-header-layout">
        <h1 className="home-title">Welcome to Zef-Blog</h1>
      </div>
    </div>
    <div className="home-latest-post">Latest Posts</div>
    <div className="home-container">
  <PostList posts={posts.slice(0 , 3)}/>
      <Sidebar categories={categories}/>
    </div>
    <div className="home-see-posts-link">
      <Link to="/posts" className="home-link">See All Posts</Link>
    </div>
  </section>
  )
}

export default HomePage;