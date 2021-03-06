import { useState, useEffect } from "react";
import { useGlobalContext } from "../../context";
import { useHistory } from "react-router-dom";
import MainHelper from "../../helpers/mainhelper"; 
import { getCategory } from "../../api/category";
import { addPost } from "../../api/post";

function AddLogic() {
  const { user } = useGlobalContext();
  const [categories, setCategories] = useState<Category[] | null>();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const history = useHistory();

  const {delay} = MainHelper(); 
  const { setPage, page, setNavigator } = useGlobalContext();

  useEffect(() => {
    if (!user) history.push("/");
    setPage("posts");
    setNavigator("posts|add post");
    getCategory().then((res) => {
      if (res) setCategories(res.data);
    });
  }, []);

  const selectCategory = (id: string, value: boolean) => {
    if (value) {
      setSelectedCategories((selectedCategories) => [
        ...selectedCategories,
        id,
      ]);
    } else {
      setSelectedCategories((selectedCategories) =>
        selectedCategories.filter((item) => item !== id)
      );
    }
  };
  const formSubmit = (datas: any) => {
    setLoading(true);
    const { data, mapCoors, images } = datas;
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);

    if (mapCoors) {
      formData.append("location", mapCoors.x.toString());
      formData.append("location", mapCoors.y.toString());
      formData.append("place", data.location);
    }

    if (selectedCategories.length > 0) {
      [...selectedCategories].forEach((item: any, key: number) => {
        formData.append("categories", selectedCategories[key]);
      });
    }
    if (images) {
      [...images].forEach((item: any, key: number) => {
        formData.append("images", images[key]);
      });
    }
    addPost(formData).then((res) => {
      console.log(res);
      if ("err" in res) {
        setMsg("");
        setError(res.err);
      } else if ("msg" in res) {
        setError("");
        setMsg(res.msg);
        delay(3).then(() => {
          history.push("/");
        }); 
      } else {
        setMsg("");
        setError("Something went wrong");
      }
      setLoading(false);
    });
  };
  function closeAlert() {
    setError("");
    setMsg("");
  }

  return {
    categories,
    selectCategory,
    selectedCategories,
    formSubmit,
    error,
    msg,
    closeAlert,
    loading,
    setError,
  };
}

export default AddLogic;
