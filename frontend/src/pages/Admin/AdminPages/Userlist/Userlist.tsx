import React from "react";
import { Table, Button } from "react-bootstrap";
import InfoBox from "../InfoBox";
import UserListLogic from "./Userlistlogic";

function Userlist() {
  const { loading, adminCount, delAdmin, makAdmin, delUser, users } =
    UserListLogic();
  if (loading)
    return (
      <div>
        <p className="heading">Current users</p>
      </div>
    );
  return (
    <div>
      <p className="heading">Current users</p>
      <div className="infoBoxesBox">
        <InfoBox
          text="Number of users"
          number={users ? users.length : 0}
          background="#65CA6F"
        />
        <InfoBox
          text="Number of admins"
          number={adminCount}
          background="#1426C4"
          color="white"
        />
      </div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Email</th>
            <th>Created at</th>
            <th>Profile image</th>
            <th>Login type</th>
            <th>Admin</th>
            <th>Admin action</th>
            <th>Remove user</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((tableuser, index) => {
              const dateObject = new Date(tableuser.createdAt);
              const date = dateObject.toDateString();
              const loginType =
                tableuser.password === "google-log" ? "google" : "this page";
              const admin = tableuser.admin
                ? tableuser.admin.isAdmin
                  ? tableuser.admin.mainAdmin
                    ? "main admin"
                    : "admin"
                  : "user"
                : "user";
              return (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{tableuser.name}</td>
                  <td>{tableuser.email}</td>
                  <td>{tableuser.createdAt}</td>
                  <th>
                    <img src={tableuser.image} className="profile-pic" />
                  </th>
                  <th>{loginType}</th>
                  <th>{admin}</th>
                  <th>
                    {admin === "admin" ? (
                      <Button
                        variant="primary"
                        onClick={() => {
                          delAdmin(tableuser._id);
                        }}
                      >
                        Remove admin
                      </Button>
                    ) : admin === "main admin" ? (
                      "No action avivable"
                    ) : (
                      <Button
                        variant="primary"
                        onClick={() => {
                          makAdmin(tableuser._id);
                        }}
                      >
                        Make admin
                      </Button>
                    )}
                  </th>
                  <th>
                    <Button
                      variant="danger"
                      onClick={() => {
                        delUser(tableuser._id);
                      }}
                    >
                      Remove user
                    </Button>
                  </th>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
}

export default Userlist;
