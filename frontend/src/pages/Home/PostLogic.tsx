import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context";
import { likePost } from "../../api/post";

interface Props {
  postInfo: Post;
}

function SinglePostLogic({ postInfo }: Props) {
  const { user } = useGlobalContext();
  const [likeCount, setlikeCount] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user.logged) setLiked(isLiked());
    if (!user.logged) setLiked(false);
    setlikeCount(postInfo.likedByUsers.length); 
  }, [user.logged]);



  const isLiked = () => {
    const { likedByUsers } = postInfo;
    const uses = likedByUsers.filter((userL) => userL.email == user.email);
    if (likedByUsers.filter((userL) => userL.email == user.email).length > 0)
      return true;
    return false;
  };
  const like = () => {
    likePost(postInfo._id).then((res) => {
      if (!res) return;
      if ("data" in res && "msg" in res.data) {
        
        if (res.data.msg === "like") {
          setLiked(true);
          setlikeCount((curLikeCount) => curLikeCount + 1);
        }
        
        if (res.data.msg === "unlike") {
          setLiked(false);
          setlikeCount((curLikeCount) => curLikeCount - 1);
        }
      }
    });
  };
  return { liked, likeCount, like };
}

export default SinglePostLogic;
