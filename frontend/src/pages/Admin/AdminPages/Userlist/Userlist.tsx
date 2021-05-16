import React from "react";
import { Table, Button } from "react-bootstrap";
import InfoBox from "../InfoBox";
function Userlist() {
  return (
    <div>
      <p className="heading">Current users</p>
      <div className="infoBoxesBox">
        <InfoBox text="Number of users" number="4" background="#65CA6F" />
        <InfoBox
          text="Number of admins"
          number="1"
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
          {/* set value - useForm */}
          <tr>
            <td>1</td>
            <td>
              <input type="text" value="David Kristek" className="adm-input" />
            </td>
            <td>david.kristek05@gmail.com</td>
            <td>12.5. 2021</td>
            <th>image</th>
            <th>Google</th>
            <th>Main admin</th>
            <th>
              <Button variant="primary">Make admin</Button>
            </th>
            <th>
              <Button variant="danger">Remove user</Button>
            </th>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default Userlist;
