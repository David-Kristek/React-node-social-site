import { Table, Button } from "react-bootstrap";
import { approveCategory, deleteCategory } from "../../../../api/admin";
import InfoBox from "../InfoBox";
import CategoriesLogic from "./CategoriesLogic";
function Categories() {
  const {
    loading,
    approvedCategories,
    notApprovedCategories,
    addCategoryForm,
    categoryInput,
    approveCategoryBt,
    deleteCategoryBt,
  } = CategoriesLogic();
  if (loading) return <p className="heading">Categoires</p>;

  return (
    <div>
      <p className="heading">Categoires</p>
      <div className="infoBoxesBox">
        <InfoBox
          text="Number of approved categories"
          number={approvedCategories ? approvedCategories.length : 0}
          background="#14C399"
          color="white"
        />
        <InfoBox
          text="Number of categories to approve"
          number={notApprovedCategories ? notApprovedCategories.length : 0}
          background="#145AC3"
          color="white"
        />
      </div>
      <p>Add category</p>
      <form
        onSubmit={(e) => {
          addCategoryForm(e);
        }}
      >
        <input
          type="text"
          className="input small-input no-radius-border-right"
          ref={categoryInput}
        />
        <Button
          variant="success"
          className="no-radius-border-left"
          type="submit"
        >
          Confirm
        </Button>
      </form>
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
          {approvedCategories &&
            approvedCategories.map((category, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>{category.name}</td>
                <td>
                  {category.createdByUser
                    ? category.createdByUser.name
                    : "user deleted"}
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => {
                      deleteCategoryBt(category._id);
                    }}
                  >
                    Remove category
                  </Button>
                </td>
              </tr>
            ))}
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
          {notApprovedCategories &&
            notApprovedCategories.map((category, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>{category.name}</td>
                <td>
                  {category.createdByUser
                    ? category.createdByUser.name
                    : "user deleted"}
                </td>
                <td>
                  <Button
                    variant="success"
                    onClick={() => {
                      approveCategoryBt(category._id);
                    }}
                  >
                    Approve category
                  </Button>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => {
                      deleteCategoryBt(category._id);
                    }}
                  >
                    Remove category
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Categories;
