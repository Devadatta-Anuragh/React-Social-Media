import { useContext } from "react";
import { AiFillDelete } from "react-icons/ai";
import PostListContext from "../store/PostListData";
const Post = ({ post }) => {
  const { deletePost } = useContext(PostListContext);
  const handleDelPost = () => {
    if (post && post.id) {
      deletePost(post.id);
    }
  };
  return (
    <div
      className="card"
      style={{
        width: "18rem",
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
      }}
    >
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <span
          className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
          onClick={() => handleDelPost()}
        >
          <AiFillDelete />
        </span>
        <p className="card-text">{post.body}</p>
        {post.tags.map((tag) => (
          <span key={tag} className="badge text-bg-primary">
            {tag}
          </span>
        ))}
        <div className="alert alert-info" role="alert">
          {`This Post has been reacted by ${post.reactions} people`}
        </div>
      </div>
    </div>
  );
};
export default Post;
