import React, { useEffect } from "react";
import ReactLoading from "react-loading";
import { useGlobalContext } from "../../context";
import HomeLogic from "./HomeLogic";
import Post from "./Post";
import "../../styles/Home.css";

function Homie() {
  const { setPage } = useGlobalContext();
  const { loading, posts } = HomeLogic(0);

  return (
    <main className="home">
      {loading ? (
        <div className="center mt-5">
          <ReactLoading type="bars" color="rgb(140, 138, 146)" width="10%" />
        </div>
      ) : (
        <>
          {posts &&
            posts.map((item, index) => <Post postInfo={item} key={index} />)}
        </>
      )}
    </main>
  );
}

export default Homie;
