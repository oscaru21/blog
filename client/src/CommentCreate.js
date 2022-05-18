import React, { useContext, useState } from "react";
import axios from "axios";
import { postsContext } from "./Context";

function CommentCreate({ postId }) {
  const [content, setContent] = useState("");
  const {fetchPosts} = useContext(postsContext)

  const onSubmit = async (e) => {
    e.preventDefault();

    await axios.post(`http://posts.com/posts/${postId}/comments`, { content });

    fetchPosts()

    setContent("");
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>New Comment</label>
          <input
            type="text"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default CommentCreate;
