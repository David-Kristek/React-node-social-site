import { useState, useEffect, useRef } from "react";
import {
  getCategories,
  addCategory,
  approveCategory,
  deleteCategory,
} from "../../../../api/admin";

function CategoriesLogic() {
  const [loading, setLoading] = useState(true);
  const [approvedCategories, setApprovedCategories] = useState<Category[]>();
  const [notApprovedCategories, setNotApprovedCategories] =
    useState<Category[]>();
  const [fetch, setFetch] = useState(false);
  const categoryInput = useRef<HTMLInputElement>(null);

  useState<Category[]>();
  useEffect(() => {
    getCategories().then((res) => {
      if (!res) return;
      const categories: Category[] = res.data;
      setApprovedCategories(categories.filter((item) => item.approved));
      setNotApprovedCategories(categories.filter((item) => !item.approved));
      setLoading(false);
    });
  }, [fetch]);

  const addCategoryForm = (e: any) => {
    e.preventDefault();
    if (!categoryInput) return;
    if (!categoryInput.current) return;
    addCategory({ name: categoryInput.current.value }).then((res) => {
      if (!res) return;
      if ("msg" in res.data) reFetch();
    });
  };
  const approveCategoryBt = (id: string) => {
    approveCategory(id).then((res) => {
      if (!res) return;
      if ("msg" in res.data) reFetch();
    });
  };
  const deleteCategoryBt = (id: string) => {
    deleteCategory(id).then((res) => {
      if (!res) return;
      if ("msg" in res.data) reFetch();
    });
  };

  const reFetch = () => {
    setFetch((curFetch) => !curFetch);
  };
  return {
    loading,
    approvedCategories,
    notApprovedCategories,
    addCategoryForm,
    categoryInput,
    approveCategoryBt,
    deleteCategoryBt,
  };
}

export default CategoriesLogic;
