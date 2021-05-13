import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport, faUser } from "@fortawesome/free-solid-svg-icons";

interface Props {
  user: otherUser;
  bold?: boolean; 
}
function User({ user, bold }: Props) {
  const userEl = useRef<HTMLDivElement>(null);

  var userStyles = {
    display: "flex",
    alignItems: "center",
  };
  if(bold)userStyles = {...userStyles, ...{"fontWeight": "bold"}}

  return (
    <div style={userStyles} ref={userEl}>
      {user.image ? (
        <img src={user.image} className="profile-pic" />
      ) : (
        <FontAwesomeIcon icon={faUser} size="lg" />
      )}
      <p className="pl-2">{user.name}</p>
    </div>
  );
}

export default User;
