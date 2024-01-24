import { createContext, useEffect, useReducer, useState } from "react";

const PostListContext = createContext({
  postlist: [],
  addPost: () => {},
  fetching: false,
  onGetPostsBtn: () => {},
  deletePost: () => {},
});
export default PostListContext;

export const PostListReducer = (currPostList, action) => {
  let newPostsList = currPostList;
  if (action.type === "ADD_POST") {
    newPostsList = [action.payload.post, ...currPostList];
  } else if (action.type === "GET_POSTS") {
    newPostsList = action.payload.posts;
  } else if (action.type === "DEL_POST") {
    newPostsList = currPostList.filter((post) => post.id !== action.postId);
  }
  return newPostsList;
};

export const PostListContextProvider = ({ children }) => {
  const [postlist, dispatchpostList] = useReducer(PostListReducer, []);
  const [fetching, setFetching] = useState(false);

  const addPost = (post) => {
    dispatchpostList({
      type: "ADD_POST",
      payload: {
        post,
      },
    });
  };

  const onGetPostsBtn = (posts) => {
    dispatchpostList({
      type: "GET_POSTS",
      payload: {
        posts,
      },
    });
  };

  const deletePost = (postId) => {
    dispatchpostList({
      type: "DEL_POST",
      postId,
    });
  };

  useEffect(() => {
    setFetching(true);
    const controller = new AbortController();
    const signal = controller.signal;
    fetch("https://dummyjson.com/posts", { signal })
      .then((res) => res.json())
      .then((data) => {
        onGetPostsBtn(data.posts);
        setFetching(false);
      });

    return () => {
      console.log("cleaning up useeffect");
      controller.abort();
    };
  }, []);

  return (
    <PostListContext.Provider
      value={{ postlist, addPost, deletePost, onGetPostsBtn, fetching }}
    >
      {children}
    </PostListContext.Provider>
  );
};
