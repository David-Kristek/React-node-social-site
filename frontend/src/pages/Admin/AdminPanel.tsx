import { ReactNode, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Badge } from "react-bootstrap";
import "../../styles/Admin.css";
import User from "../../components/User";
interface Props {
  children: ReactNode;
}

function AdminPanel({ children }: Props) {
  const location = useLocation();
  return (
    <>
      <div className="d-flex">
        <div className="admin-nav flex-center-col">
          <img
            src={process.env.PUBLIC_URL + "/images/logo.svg"}
            className="logo"
          />
          <ul className="flex-center-col">
            <Link to="/admin" className="full-width">
              <li className={`${location.pathname == "/admin" && "active"}`}>
                User list
              </li>
            </Link>
            <Link to="/admin/categories" className="full-width">
              <li
                className={`${
                  location.pathname === "/admin/categories" && "active"
                }`}
              >
                Categories
                <Badge variant="danger" className="ml-2">
                  2
                </Badge>
              </li>
            </Link>
            <Link to="/admin/posts" className="full-width">
              <li
                className={`${
                  location.pathname === "/admin/posts" && "active"
                }`}
              >
                Posts
              </li>
            </Link>
          </ul>
        </div>
        <div className="full-width">
          <div className="topPanel">
            <h3 className="pl-2">Admine page</h3>
            <div className="userBox">
              <User
                user={{
                  name: "David Křístek",
                  email: "",
                  image: "",
                  createdAt: null,
                }}
                bold
              />
            </div>
          </div>
          <div className="mainBox">{children}</div>
        </div>
      </div>
    </>
  );
}

export default AdminPanel;