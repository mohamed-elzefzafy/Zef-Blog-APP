import "./posts.css"
import PostItem from "./PostItem";


const PostList = ({posts}) => {
  
  return (
    <div className="post-list">
    {posts?.map(post => <PostItem post={post} key={post?._id}/>)}
    </div>
  )
}

export default PostList;