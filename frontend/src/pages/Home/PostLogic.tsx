import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context";
import { likePost, addCommentF } from "../../api/post";

interface Props {
  postInfo: Post;
}

function SinglePostLogic({ postInfo }: Props) {
  const { user } = useGlobalContext();
  const [likeCount, setlikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [date, setDate] = useState("");
  const [comments, setComments] = useState<Comment[]>();

  useEffect(() => {
    if (user.logged) setLiked(isLiked());
    if (!user.logged) setLiked(false);
    formatDate();
    setlikeCount(postInfo.likedByUsers.length);
    /* @ts-ignore */
    setComments(postInfo.comments);
  }, [user.logged]);

  const formatDate = () => {
    if (!postInfo.createdAt) return;
    let dateObject = new Date(postInfo.createdAt);
    setDate(dateObject.toDateString());
  };

  const shorterLocationLabel = () => {
    let label = postInfo.location.label;
    let labelArr = label.split(",");
    return labelArr[0];
  };

  const isLiked = () => {
    const { likedByUsers } = postInfo;
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
  const addComment = (e: any, text: string | undefined) => {
    e.preventDefault();
    if (!text || !user.logged) return;

    addCommentF(postInfo._id, text).then((res) => {
      if (!res) return;
      if (res.data.msg === "commented") {
        // dodelat komenatare - nutne pridat po co sam uzivatel jeden prida
        if(!comments) return; 
        setComments([
          ...comments,
          {
            text,
            commentedByUser: {
              name: user.name,
              email: "",
              image: user.picture,
              createdAt: null,
            },
          },
        ]);
      }
    });
  };
  return { liked, likeCount, like, date, shorterLocationLabel, addComment };
}

export default SinglePostLogic;
