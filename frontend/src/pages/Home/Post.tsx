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
function Post() {
  return (
    <div className="post">
      <div className="top">
        <User />
        <div className="right">
          <span className="pr-3">10.5. 2021</span>
          <FontAwesomeIcon icon={faMapMarkedAlt} size="lg" />
          {/* pokud je adresa tak -  */}
          <span className="pl-2">Praha hl. m.</span>
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
            <h3 className="font1">Procházka Prahou </h3>
            <div className="category">Výlet</div>
            <div className="category">Dovolená</div>
          </div>
          <p className="font3">
            V létě jsme se rozhodli projít se letní Prahou. Šli jsme kolem ...{" "}
          </p>
        </div>
        <div className="right">
          {" "}
          <span className="font2">5</span>
          <FontAwesomeIcon icon={faHeart} size="2x" className="heart heart-unactive" />
          <span className="font2">1</span>
          <FontAwesomeIcon icon={faComment} size="2x" className="comment comment-unactive"/>
        </div>
      </div>
    </div>
  );
}

export default Post;
