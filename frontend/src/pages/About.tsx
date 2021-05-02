import React, { useEffect } from "react";
import { useGlobalContext } from "../context";
function About() {
  const { setPage } = useGlobalContext();

  useEffect(() => {
    setPage("about");
  }, []);
  return <div>About us</div>;
}

export default About;
