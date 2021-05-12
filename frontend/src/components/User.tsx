import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport, faUser } from "@fortawesome/free-solid-svg-icons";

//logic
const userStyles = {
  display: "flex",
  "align-items": "center", 
};
interface Props {
  user: otherUser; 
}
function User({user} : Props) {
  return (
    <div style={userStyles}>
      {user.image ? (<img src={user.image} className="profile-pic"/>) : (<FontAwesomeIcon icon={faUser} size="lg" />)}
      <p className="pl-2">{user.name}</p>
    </div>
  );
}

export default User;
