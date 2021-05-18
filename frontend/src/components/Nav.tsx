import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";
import "../App.css";
import "../styles/Nav.css";
interface Props {
  setPopup: (str: String) => void;
  setShowPopup: (bl: boolean) => void;
}

function Nav({ setPopup, setShowPopup }: Props) {
  const { page, user, logout } = useGlobalContext();
  const [underline, setUnderline] = useState(page);
  const [once, setOnce] = useState(true);
  const login = () => {
    setPopup("login");
    setShowPopup(true);
    // setPage("log")
  };
  if (page !== "" && once) {
    const pageI = page;
    setUnderline(pageI);
    setOnce(false);
  }
  return (
    <>
      <nav>
        <img src={process.env.PUBLIC_URL + "/images/logo.svg"} />
        <ul>
          <li
            onMouseOver={() => {
              setUnderline("posts");
            }}
            onMouseOut={() => {
              setUnderline(page);
            }}
          >
            <Link to="/">Posts</Link>
          </li>
          <li
            onMouseOver={() => {
              setUnderline("chats");
            }}
            onMouseOut={() => {
              setUnderline(page);
            }}
          >
            <Link to="/chats">Chats</Link>
          </li>
          {user ? (
            <li className="nav-user">
              {user.name}
              {!user.image ? (
                <FontAwesomeIcon icon={faUser} size="lg" />
              ) : (
                <img
                  src={user.image}
                  alt="profile picture"
                  className="nav-profile-pic"
                />
              )}
              <div className="nav-dropdown">
                <ul>
                  <li>
                    <Link to="add">Add post</Link>
                  </li>
                  <li>Settings</li>
                  <li onClick={logout}>Logout</li>
                </ul>
              </div>
            </li>
          ) : (
            <li
              onMouseOver={() => {
                setUnderline("log");
              }}
              onMouseOut={() => {
                setUnderline(page);
              }}
              onClick={login}
            >
              Login
              <FontAwesomeIcon icon={faSignInAlt} size="lg" />
            </li>
          )}
        </ul>
      </nav>
      {/* <span className={`underline ${page}-nav`}></span> */}

      <span className={`underline ${underline}-nav`}></span>
      {/* lagovani mozne vyresit delay pomoci useEffectu a nove classNamys */}
    </>
  );
}

export default Nav;
