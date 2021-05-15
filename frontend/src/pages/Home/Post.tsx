import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import {
  faChevronRight,
  faChevronLeft,
  faMapMarkedAlt,
  faHeart,
  faComment,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import "../../styles/Home.css";
import User from "../../components/User";
import HomeLogic from "./HomeLogic";
import { useGlobalContext } from "../../context";
import PostLogic from "./PostLogic";
import Comment from "./Comment";

interface Props {
  postInfo: Post;
}

function Post({ postInfo }: Props) {
  const { imgIndex, toRight, toLeft, rightArrow, leftArrow } = HomeLogic(
    postInfo.images.length
  );
  const {
    liked,
    likeCount,
    like,
    date,
    shorterLocationLabel,
    addComment,
    comments,
  } = PostLogic({
    postInfo,
  });
  const { user } = useGlobalContext();
  const [showComments, setShowComments] = useState(false);
  const inputCom = useRef<HTMLInputElement>(null);

  return (
    <div className="post">
      <div className="top">
        <User user={postInfo.createdByUser} />
        <div className="right">
          <span className="pr-3">{date}</span>
          <span className="pl-2">
            {postInfo.location && postInfo.location.label.length > 30 ? (
              <>
                <FontAwesomeIcon icon={faMapMarkedAlt} size="lg" />{" "}
                {shorterLocationLabel()}
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faMapMarkedAlt} size="lg" />{" "}
                {postInfo.location.label}
              </>
            )}
          </span>
        </div>
      </div>
      <div className="center">
        {postInfo.images.length > 1
          ? postInfo.images.map((image, index) => {
              var position = "";
              if (index === imgIndex) position = "active";
              if (index === imgIndex + 1) position = "right";
              if (index === imgIndex - 1) position = "left";
              return (
                <img
                  key={index}
                  src={process.env.PUBLIC_URL + "/uploads/" + image}
                  className={position}
                />
              );
            })
          : postInfo.images.length > 0 && (
              <img
                src={process.env.PUBLIC_URL + "/uploads/" + postInfo.images[0]}
                className="active"
              />
            )}
      </div>
      {postInfo.images.length > 1 && (
        <>
          <FontAwesomeIcon
            icon={faChevronLeft}
            size="5x"
            className={`arrow leftArrow ${leftArrow}`}
            onClick={toLeft}
          />
          <FontAwesomeIcon
            icon={faChevronRight}
            size="5x"
            className={`arrow rightArrow ${rightArrow}`}
            onClick={toRight}
          />
        </>
      )}
      <div className="bottom">
        <div className="left">
          <div className="htop">
            <h3 className="font1">{postInfo.name}</h3>
            {postInfo.categories &&
              postInfo.categories.map((item, index) => (
                <div className="category" key={index}>
                  {item.name}
                </div>
              ))}
          </div>
          <p className="font3">{postInfo.description}</p>
        </div>
        <div className="right">
          <span className="font2">{likeCount}</span>
          <FontAwesomeIcon
            icon={faHeart}
            size="2x"
            className={liked ? "heart" : "heart heart-unactive"}
            onClick={like}
          />
          <span className="font2">{comments ? comments.length : 0}</span>
          <FontAwesomeIcon
            icon={faComment}
            size="2x"
            className="comment-icon comment-icon-unactive"
            onClick={() => {
              setShowComments((curShow) => !curShow);
            }}
          />
        </div>
      </div>
      {showComments && (
        <div className="comments-box">
          {comments &&
            comments.map((item, index) => (
              <Comment
                text={item.text ?? ""}
                key={index}
                user={item.commentedByUser}
              />
            ))}
          <form
            className="mr-1 mt-3"
            onSubmit={(e) => {
              addComment(e, inputCom.current?.value);
              if(inputCom.current?.value) inputCom.current.value = ""; 
            }}
          >
            <input
              type="text"
              ref={inputCom}
              className="input small-input no-radius-border-right"
              placeholder="Add comment"
              style={{ width: "50%" }}
            />
            <Button
              variant="primary"
              type="submit"
              className="no-radius-border-left"
            >
              <FontAwesomeIcon icon={faPaperPlane} size="lg" />
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Post;
