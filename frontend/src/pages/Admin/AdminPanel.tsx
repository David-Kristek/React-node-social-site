import { ReactNode, useEffect, useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { Badge } from "react-bootstrap";
import "../../styles/Admin.css";
import User from "../../components/User";
import { categoryAlert } from "../../api/admin";
import { useGlobalContext } from "../../context";

interface Props {
  children: ReactNode;
}

function AdminPanel({ children }: Props) {
  const location = useLocation();
  const [categoriesAlert, setCategoriesAlert] = useState(0);
  const { user } = useGlobalContext();
  const history = useHistory();
  useEffect(() => {
    if (user) {
      if (!user?.admin) {
        history.push("/");
      }
    }
    categoryAlert().then((res) => {
      if (!res) return;
      if ("msg" in res.data) setCategoriesAlert(res.data.msg);
    });
  }, []);
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
                {categoriesAlert !== 0 ?? (
                  <Badge variant="danger" className="ml-2">
                    {categoriesAlert}
                  </Badge>
                )}
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
