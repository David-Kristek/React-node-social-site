import { useState, useEffect } from "react";
import { useGlobalContext } from "../../context";
import { getPosts } from "../../api/post";

type ArrowClass = "display" | "display-0";

function HomeLogic(imgCount: number) {
  const { setPage, setNavigator, user } = useGlobalContext();
  const [posts, setPosts] = useState<Post[]>();
  const [loading, setLoading] = useState(true);
  const [imgIndex, setImgIndex] = useState(0);
  const [rightArrow, setRightArrow] = useState<ArrowClass>();
  const [leftArrow, setLeftArrow] = useState<ArrowClass>("display-0");
  useEffect(() => {
    fetchPost();
    setPage("posts");
    setNavigator("posts|");
  }, []);

  const fetchPost = () => {

    getPosts().then((res) => {
      console.log("fetched");
      if (!res) return;
      setPosts(res.data);
      setLoading(false);
    });
  };
  const toRight = () => {
    setImgIndex((index) => index + 1);
    if (imgIndex + 2 === imgCount) setRightArrow("display-0");
    setLeftArrow("display");
  };
  const toLeft = () => {
    console.log("display");
    setImgIndex((index) => index - 1);
    if (imgIndex - 1 === 0) setLeftArrow("display-0");
    setRightArrow("display");
  };

  return { loading, posts, imgIndex, toRight, toLeft, rightArrow, leftArrow };
}

export default HomeLogic;
