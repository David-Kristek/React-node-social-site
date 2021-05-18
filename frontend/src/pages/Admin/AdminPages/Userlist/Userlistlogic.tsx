import { useState, useEffect } from "react";
import {
  getUsers,
  makeAdmin,
  deleteAdmin,
  deleteUser,
} from "../../../../api/admin";
type specUser = {
  _id: string;
  name: string;
  email: string;
  image: string;
  createdAt: Date;
  password: string;
  admin: {
    isAdmin: boolean;
    mainAdmin: boolean;
  };
};
function Userlistlogic() {
  const [users, setUsers] = useState<specUser[]>();
  const [loading, setLoading] = useState(true);
  const [adminCount, setAdminCount] = useState(0);
  const [fetch, setFetch] = useState(false);

  useEffect(() => {
    getUsers().then((res) => {
      if (!res) return;
      setUsers(res.data);
      setLoading(false);
    });
  }, [fetch]);

  useEffect(() => {
    countAdmin();
  }, [users]);
  const countAdmin = () => {
    if (!users) return;
    console.log(users);
    var num = 0;
    users.forEach((item) => {
      if (item.admin) if (item.admin.isAdmin) num += 1;
    });
    console.log(num);

    setAdminCount(num);
  };
  const afterFetch = (res: any) => {
    if ("msg" in res.data) {
      setFetch((curFetch) => !curFetch);
      //   set alert to msg
    }
  };
  const delAdmin = (id: string) => {
    deleteAdmin(id).then((res) => {
      afterFetch(res);
    });
  };
  const makAdmin = (id: string) => {
    makeAdmin(id).then((res) => {
      afterFetch(res);
    });
  };
  const delUser = (id: string) => {
    deleteUser(id).then((res) => {
      afterFetch(res);
    });
  };

  return { users, loading, adminCount, delAdmin, makAdmin, delUser };
}

export default Userlistlogic;
