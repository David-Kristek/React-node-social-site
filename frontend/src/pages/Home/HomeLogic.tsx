import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../context";
import { getPosts } from "../../api/post";



function HomeLogic() {
  const { setPage, page, setNavigator } = useGlobalContext();
  const [posts, setPosts] = useState<Post[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPage("home");
    setNavigator("home|");
    getPosts().then(res => {
      if(!res) return; 
      setPosts(res.data)
    })
    setLoading(false)
  }, []);

  return { loading, posts };
}

export default HomeLogic;
