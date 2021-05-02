import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../context";
function Navigator() {
  const { navigator } = useGlobalContext();
  const [navAr, setNavAr] = useState<string[]>();
  useEffect(() => {
    setNavAr(navigator.split("|"))
  }, []);
  return (
    <div>
      {navAr?.map((item, key, arr) => {
        if (arr.length - 1 === key) {
          return item;
        }
        return `${item} >`;
      })}
    </div>
  );
}

export default Navigator;
