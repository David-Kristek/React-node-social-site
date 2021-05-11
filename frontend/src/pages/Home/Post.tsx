import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
  faMapMarkedAlt,
  faHeart,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import "../../styles/Home.css";
import User from "../../components/User";
import { isTemplateExpression } from "typescript";

interface Props {
  postInfo: Post;
}

function Post({ postInfo }: Props) {
  console.log(postInfo);
  return (
    <div className="post">
      <div className="top">
        <User />
        <div className="right">
          <span className="pr-3">{postInfo.createdAt}</span>
          <FontAwesomeIcon icon={faMapMarkedAlt} size="lg" />
          {/* pokud je adresa tak -  */}
          {/* https://stackoverflow.com/questions/7443142/how-do-i-format-dates-from-mongoose-in-node-js */}
          <span className="pl-2">
            {postInfo.location && postInfo.location.label}
          </span>
        </div>
      </div>
      <div className="center">
        <img src={process.env.PUBLIC_URL + "/images/image 15.png"} />
        <FontAwesomeIcon
          icon={faChevronLeft}
          size="5x"
          className="arrow leftArrow"
        />
        <FontAwesomeIcon
          icon={faChevronRight}
          size="5x"
          className="arrow rightArrow"
        />
      </div>
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
          <span className="font2">{"likedByUsers" in postInfo ? postInfo.likedByUsers : 0}</span>
          <FontAwesomeIcon
            icon={faHeart}
            size="2x"
            className="heart heart-unactive"
          />
          <span className="font2">0</span>
          <FontAwesomeIcon
            icon={faComment}
            size="2x"
            className="comment comment-unactive"
          />
        </div>
      </div>
    </div>
  );
}

export default Post;
