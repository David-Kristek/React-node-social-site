import React from "react";
import { Table, Button } from "react-bootstrap";
import InfoBox from "../InfoBox";

function Categories() {
  return (
    <div>
      <p className="heading">Current posts</p>
      <div className="infoBoxesBox">
        <InfoBox
          text="Number of posts"
          number="4"
          background="#65CA6F"
          color="white"
        />
        <InfoBox
          text="Number of pictures"
          number="8"
          background="#14C399"
          color="white"
        />
        <InfoBox
          text="Size of pictures"
          number="60mb"
          background="#145AC3"
          color="white"
        />
      </div>
      <p>Current posts</p>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Created by</th>
            <th>Created at</th>
            <th>Likes</th>
            <th>Number of comments</th>
            <th>Location</th>
            <th>Images</th>
            <th>Categories</th>
            <th>More info</th>
            <th>Remove post</th>
          </tr>
        </thead>
        <tbody>
          {/* set value - useForm */}
          <tr>
            <td>1</td>
            <td>Kolo</td>
            <td>David Kristek</td>
            <th>
              <Button variant="danger">Remove user</Button>
            </th>
          </tr>
        </tbody>
      </Table>
      <p>Deleted posts</p>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Created</th>
            <th>Approve category</th>
          </tr>
        </thead>
        <tbody>
          {/* set value - useForm */}
          <tr>
            <td>1</td>
            <td>Kolo</td>
            <td>David Kristek</td>
            <th>
              <Button variant="success">Add back</Button>
            </th>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default Categories;
