import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const postsContext = createContext();

function Context({ children }) {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    const response = await axios.get("http://posts.com/posts");

    setPosts(response.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <postsContext.Provider
      value={{
        posts,
        fetchPosts,
      }}
    >
      {children}
    </postsContext.Provider>
  );
}

export default Context;
