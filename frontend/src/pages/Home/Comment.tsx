import React from "react";
import User from "../../components/User";
interface Props {
  user: otherUser;
  text: string;
}

function Comment({ text, user }: Props) {
  return (
    <div className="comment">
      <User user={user} bold/>
      <span className="font3">{text}</span> 
    </div>
  );
}

export default Comment;
