import { Link } from "react-router-dom";


const PostItem = ({post}) => {
  return (
    <div className="post-item">
    <div className="post-item-image-wrabber">
      <img src={post.image} alt="post" className="post-item-image" />
    </div>
    <div className="post-item-info-wrabber">
      <div className="post-item-info">
        <div className="post-item-auther">
          <strong>Auther: </strong>
          <Link className="post-item-username" to="/profile/1">{post.user.username}</Link>
        </div>
        <div className="post-item-date">
        {new Date(post.createdAt).toDateString()}
        </div>
      </div>
      <div className="post-items-details">
        <h4 className="post-item-title">{post.title}</h4>
        <Link to="/posts/categories" className="post-item-category">
          {post.category}
        </Link>
      </div>
      <p className="post-item-description">
      {post.category}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Veritatis quis nemo neque natus ex! Rerum ex optio eius 
          sed voluptates, ut eligendi ipsam soluta ducimus veritatis,
           at harum esse eum!
          Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Veritatis quis nemo neque natus ex! Rerum ex optio eius 
          sed voluptates, ut eligendi ipsam soluta ducimus veritatis,
           at harum esse eum!
      </p>
      <Link className="post-item-link" to={`/posts/details/${post._id}`}>Read More...</Link>
    </div>
    </div>
  )
}

export default PostItem;