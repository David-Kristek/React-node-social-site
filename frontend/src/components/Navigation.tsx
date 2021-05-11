import React, { useState, useEffect, ReactNode } from "react";
import { Link } from "react-router-dom"; 
import { useGlobalContext } from "../context";
import "../App.css";
function Navigator() {
  const { navigator } = useGlobalContext();
  const [navAr, setNavAr] = useState<string[]>();
  const [content, setContent] = useState<ReactNode>();
  function capitalizeFirstLetter(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  useEffect(() => {
    setNavAr(navigator.split("|"));
  }, [navigator]);
  useEffect(() => {
    let a = 0; 
    if (navAr) {
      var load = navAr.map((item, key, arr) => {
        a++; 
        let href = "";
        switch (item) {
          case "home":
            href = "/";
            break;
          case "add post":
            href = "/add";
            break;

          default:
            href = item;
        }
        item = capitalizeFirstLetter(item);
        if (arr.length - 1 === key) {
          return (
            <Link key={a} to={href} className="link font2">
              {item}
            </Link>
          );
        }
        return (
          <span key={a} >
            <Link key={a} to={href} className="link font2">
              {item}
            </Link>{" "}
            {" >"}
          </span>
        );
      });
      setContent(load);
    }
  }, [navAr]);
  return <div className="navigator">{content}</div>;
}

export default Navigator;
