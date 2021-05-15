import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function AdminPanel({ children }: Props) {
  return <div>
    <div className="admin-nav">
    <img src={process.env.PUBLIC_URL + "/images/logo.svg"} className="logo"/>
        <ul>
            <li>User list</li>
            <li>Categories</li>
            <li>Posts</li>
        </ul>
    </div>
    <div className="topPanel">
        <div className="userBox">
            {/* <User /> */}
        </div>
    </div>
  </div>;
}

export default AdminPanel;
