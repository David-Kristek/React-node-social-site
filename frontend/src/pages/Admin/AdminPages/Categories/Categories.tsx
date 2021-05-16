import React from "react";
import { Table, Button } from "react-bootstrap";
import InfoBox from "../InfoBox";

function Categories() {
  return (
    <div>
      <p className="heading">Categoires</p>
      <div className="infoBoxesBox">
        <InfoBox
          text="Number of approved categories"
          number="4"
          background="#14C399"
          color="white"
        />
        <InfoBox
          text="Number of categories to approve"
          number="1"
          background="#145AC3"
          color="white"
        />
      </div>
      <p>Add category</p>
      <input type="text" className="input small-input no-radius-border-right" />
      <Button variant="success" className="no-radius-border-left">Confirm</Button>
      <p>Approved categories</p>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Created</th>
            <th>Remove category</th>
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
      <p>Categories to approve</p>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Created</th>
            <th>Approve category</th>
            <th>Remove category</th>
          </tr>
        </thead>
        <tbody>
          {/* set value - useForm */}
          <tr>
            <td>1</td>
            <td>Kolo</td>
            <td>David Kristek</td>
            <th>
              <Button variant="success">Approve category</Button>
            </th>
            <th>
              <Button variant="danger">Remove category</Button>
            </th>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default Categories;
