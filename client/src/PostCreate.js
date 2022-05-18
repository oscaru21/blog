import React, { useContext, useState } from "react";
import axios from "axios";
import { postsContext } from "./Context";

function PostCreate() {
  const [title, setTitle] = useState("");
  const {fetchPosts} = useContext(postsContext)

  const onSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://posts.com/posts/create", { title });

    fetchPosts()
    
    setTitle("");
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default PostCreate;
