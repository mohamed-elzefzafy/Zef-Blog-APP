import { useParams } from "react-router-dom";
import "./category.css";
import { posts } from "../../dummyData";
import PostList from "../../components/posts/PostList";
import { useEffect } from "react";

const CategoryPage = () => {
useEffect(() => {
window.scrollTo(0, 0);
},[])
  const {category} = useParams()
  console.log(category);
  return (
    <section className="category">
     <h1 className="category-title">posts belong to <span>{category}</span> category</h1>
     <PostList posts={posts}/>
    </section>
  )
}

export default CategoryPage;