import { useContext } from "react";
import Post from "./Post";
import PostListContext from "../store/PostListData";
import WelcomeMessage from "./WelcomeMessage";
import LoadingSpinner from "./LoadingSpinner";

const PostContainer = () => {
  const { postlist } = useContext(PostListContext);
  const { fetching } = useContext(PostListContext);

  return (
    <div
      style={{
        minWidth: "500px",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        margin: "15px",
      }}
      className="postscontainer"
    >
      {fetching && <LoadingSpinner></LoadingSpinner>}
      {!fetching && postlist.length === 0 && <WelcomeMessage></WelcomeMessage>}
      {!fetching &&
        postlist.map((post) => <Post key={post.id} post={post}></Post>)}
    </div>
  );
};
export default PostContainer;
