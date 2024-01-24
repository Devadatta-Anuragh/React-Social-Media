import { useContext, useRef } from "react";
import PostListContext from "../store/PostListData";

const CreatePost = () => {
  const { addPost } = useContext(PostListContext);

  const userIdContent = useRef();
  const titleContent = useRef();
  const bodyContent = useRef();
  const reactionsContent = useRef();
  const tagsContent = useRef();

  const handleSubmitBtn = (event) => {
    event.preventDefault();

    const userId = userIdContent.current.value;
    const postTitle = titleContent.current.value;
    const postBody = bodyContent.current.value;
    const reactions = reactionsContent.current.value;
    const tags = tagsContent.current.value.split(" ");

    fetch("https://dummyjson.com/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: postTitle,
        userId: userId,
        postBody: postBody,
        reactions: reactions,
        tags: tags,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        addPost(data);
        console.log(data);
      });
  };
  return (
    <div
      style={{
        marginTop: "50px",
        marginLeft: "385px",
        minWidth: "500px",
        alignContent: "center",
      }}
    >
      <form onSubmit={(event) => handleSubmitBtn(event)}>
        <div className="mb-3">
          <label htmlFor="text" className="form-label">
            Enter your User ID
          </label>
          <input
            type="text"
            ref={userIdContent}
            className="form-control"
            placeholder="UserName@123"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="text" className="form-label">
            Post Title
          </label>
          <input
            type="text"
            ref={titleContent}
            className="form-control"
            placeholder="How are you feeling today!"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="text" className="form-label">
            Post Content
          </label>
          <input
            type="text"
            ref={bodyContent}
            className="form-control"
            placeholder="Tell us more about it!"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="text" className="form-label">
            Reactions
          </label>
          <input
            type="text"
            ref={reactionsContent}
            className="form-control"
            placeholder="Tell us how many people had reacted to this Post!"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="text" className="form-label">
            Tags
          </label>
          <input
            type="text"
            ref={tagsContent}
            className="form-control"
            placeholder="Please enter tags with space"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};
export default CreatePost;
