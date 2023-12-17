import "./postPage.css";
import PostList from "../../components/posts/PostList";
import Sidebar from "../../components/sidebar/Sidebar";
import Pagination from "../../components/pagination/Pagination";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, getPostsCount } from "../../redux/apiCalls/postApiCall";
import { getCategories } from "../../redux/apiCalls/categoryApiCall";

const posts_per_page = 3;
const PostsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  const { posts, postCount } = useSelector((state) => state.post);
  const pages = Math.ceil(postCount?.data / posts_per_page);
  useEffect(() => {
    dispatch(getAllPosts(currentPage));
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    dispatch(getPostsCount());
  }, []);

  console.log(postCount?.data);
  console.log(pages);

  useEffect(() => {
    dispatch(getCategories());
    },[])
    
    const {categories} = useSelector(state => state.category)
  return (
    <>
      <section className="post-page">
        <PostList posts={posts?.data} />
        <Sidebar categories={categories?.data} />
      </section>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pages={pages}
      />
    </>
  );
};

export default PostsPage;
