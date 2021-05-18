import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context";
import { likePost, addCommentF } from "../../api/post";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://10.0.0.7:5000";
const socket = socketIOClient(ENDPOINT);

interface Props {
  postInfo: Post;
}
interface Cmt {
  text: string | undefined;
  commentedByUser: otherUser;
}

function SinglePostLogic({ postInfo }: Props) {
  const { user } = useGlobalContext();
  const [likeCount, setlikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [date, setDate] = useState("");
  const [comments, setComments] = useState<Cmt[]>();

  useEffect(() => {
    conSocket();
    setLiked(isLiked());
    if (!user) setLiked(false);
    formatDate();
    setlikeCount(postInfo.likedByUsers.length);
    var coms = postInfo.comments.reverse();
    setComments(coms);
  }, [user]);

  const conSocket = () => {
    socket.on("getComments", (comments) => {
      setComments(comments);
    });
    socket.on("getLikeCount", (num: number) => {
      setlikeCount(num);
    });
  };

  const formatDate = () => {
    if (!postInfo.createdAt) return;
    let dateObject = new Date(postInfo.createdAt);
    setDate(dateObject.toDateString());
  };

  const shorterLocationLabel = () => {
    if(!postInfo.location) return; 
    let label = postInfo.location.label;
    let labelArr = label.split(",");
    return labelArr[0];
  };

  const isLiked = () => {
    if(!user) return false; 
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
      socket.emit("likeCount", postInfo._id);
    });
  };
  const addComment = (e: any, text: string | undefined) => {
    e.preventDefault();
    if (!text || !user) return;

    addCommentF(postInfo._id, text).then((res) => {
      if (!res) return;
      if (res.data.msg === "commented") {
        socket.emit("actComment", postInfo._id);
        const newComment = {
          text: text,
          commentedByUser: {
            name: user.name,
            email: user.email,
            image: user.image,
            createdAt: null,
          },
        };
        if (!comments) return;
        setComments([newComment, ...comments]);
      }
    });
  };
  return {
    liked,
    likeCount,
    like,
    date,
    shorterLocationLabel,
    addComment,
    comments,
  };
}

export default SinglePostLogic;
