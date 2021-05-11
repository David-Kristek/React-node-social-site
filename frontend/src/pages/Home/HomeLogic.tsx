import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../context";

function HomeLogic() {
  const { setPage, page, setNavigator } = useGlobalContext();

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setPage("home");
    setNavigator("home|");
    console.log("ahoj");
  }, []);

  return { loading };
}

export default HomeLogic;
