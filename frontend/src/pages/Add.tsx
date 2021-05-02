import React, { useEffect } from "react";
import { useGlobalContext } from "../context";
function Add() {
  const { setPage, page } = useGlobalContext();
  useEffect(() => {
    setPage("home");
    console.log(page);
  }, []);

  return <div>Add post</div>;
}

export default Add;
