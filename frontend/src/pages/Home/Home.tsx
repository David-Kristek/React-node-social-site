import React, { useEffect } from "react";

import { useGlobalContext } from "../../context";
import HomeLogic from "./HomeLogic";
import Post from "./Post"; 
import "../../styles/Home.css"; 

function Homie() {
  const { setPage } = useGlobalContext();
  const { loading } = HomeLogic();

  return (
    <main className="home">
      <Post />
    </main>
  );
}

export default Homie;
