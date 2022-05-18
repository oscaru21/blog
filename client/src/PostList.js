import React, { useContext, useEffect, useRef } from "react";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";
import {postsContext} from "./Context";

function PostList() {
  const {posts} = useContext(postsContext)
  // const [posts, setPosts] = useState({});

  // const fetchPosts = async () => {
  //   const response = await axios.get("http://localhost:4002/posts");

  //   setPosts(response.data);
  // };

  // useEffect(() => {
  //   fetchPosts()
  // }, []);

  const renderedPost = Object.values(posts).map((post) => (
    <div
      className="card"
      key={post.id}
      style={{ width: "30%", marginBottom: "20px" }}
    >
      <div className="card-body">
        <h3>{post.title}</h3>
        <CommentList comments={post.comments}/>
        <CommentCreate postId={post.id}/>
      </div>
    </div>
  ));
  return <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPost}
  </div>;
}

export default PostList;
