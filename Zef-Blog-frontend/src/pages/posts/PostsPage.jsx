import "./postPage.css";
import PostList from "../../components/posts/PostList";
import { categories, posts } from "../../dummyData";
import Sidebar from "../../components/sidebar/Sidebar";
import Pagination from "../../components/pagination/Pagination";
import { useEffect } from "react";


const PostsPage = () => {
  useEffect(() => {
    window.scrollTo(0 , 0)
  },[])
  return (
  <>
    <section className="post-page">
      <PostList posts={posts}/>
      <Sidebar categories={categories}/>
    </section>
    <Pagination/>
  </>
  )
}

export default PostsPage;