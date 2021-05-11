import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport, faUser } from "@fortawesome/free-solid-svg-icons";

//logic
const userStyles = {
  display: "flex",
};

function User() {
  return (
    <div style={userStyles}>
      {/* podminka pokud je tu obrazek */}
      <FontAwesomeIcon icon={faUser} size="lg" />
      <p className="pl-2">David Křístek</p>
    </div>
  );
}

export default User;
