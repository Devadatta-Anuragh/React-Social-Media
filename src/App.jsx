import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import CreatePost from "./components/CreatePost";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PostContainer from "./components/PostsContainer";
import Sidebar from "./components/Sidebar";
import { PostListContextProvider } from "./store/PostListData";

function App() {
  const [selectedTab, setselectedTab] = useState("Home");

  return (
    <PostListContextProvider>
      <div>
        <Header></Header>
        <div
          style={{
            display: "flex",
            // justifyContent: "space-between",
            // flexWrap: "wrap",
          }}
        >
          <Sidebar
            selectedTab={selectedTab}
            setselectedTab={setselectedTab}
          ></Sidebar>

          {selectedTab === "Home" ? (
            <PostContainer></PostContainer>
          ) : (
            <CreatePost></CreatePost>
          )}
        </div>

        <Footer></Footer>
      </div>
    </PostListContextProvider>
  );
}

export default App;
