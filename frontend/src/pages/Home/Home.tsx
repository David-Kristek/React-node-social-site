import React, { useEffect } from "react";

import { useGlobalContext } from "../../context";
import HomeLogic from "./HomeLogic";
import Post from "./Post";
import "../../styles/Home.css";

function Homie() {
  const { setPage } = useGlobalContext();
  const { loading, posts } = HomeLogic();

  return (
    <main className="home">
      {loading ? (
        "loading"
      ) : (
        <>{posts && posts.map((item, index) => 
        <Post postInfo={item} key={index}/>
        )}</>
      )}
    </main>
  );
}

export default Homie;
