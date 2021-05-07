import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { useGlobalContext } from "../context";
import { Button, Spinner, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { getCategory } from "../api/category";
import "../App.css";
import "../styles/Add-post.css";
import useFindInMap from "../mapa/useFindInMap";
import Mapa from "../mapa/Map";
import { addPost } from "../api/post";
import axios from "axios";
interface Categories {
  name: string;
  _id: string;
  approved: boolean;
}
type mapCoors = {
  x: number;
  y: number;
};
interface LocationRes {
  coords: mapCoors;
  label: string;
  id: number;
}
interface Props {
  setPopup: (str: string | null) => void;
  setShowPopup: (bl: boolean) => void;
}

function Add({ setPopup, setShowPopup }: Props) {
  const { setPage, page, setNavigator } = useGlobalContext();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState<Categories[] | null>(null);
  const [location, setLocation] = useState("");
  const [findResults, setFindResults] = useState<LocationRes[] | null>();
  const [mapCoors, setMapCoors] = useState<mapCoors | undefined>();
  const [images, setImages] = useState<any>();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const { setLoactionToFind, result } = useFindInMap();

  useEffect(() => {
    setPage("home");
    setNavigator("home|add post");
    getCategory().then((res) => {
      if (res) {
        const filCategory = res.data.filter(
          (item: any) => item.approved === true
        );
        setCategories(filCategory);
      }
    });
  }, []);
  useEffect(() => {
    if (result) {
      setFindResults(result);
    }
  }, [result]);
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
  const selectLocRes = (coors: mapCoors, label: string) => {
    setLocation(label);
    setFindResults(null);
    setMapCoors(coors);
  };
  const onFileChange = (e: any) => {
    setImages(e.target.files);
  };
  const delay = (delay: number) => {
    return new Promise((res) => setTimeout(res, delay));
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (mapCoors) {
      formData.append("location", mapCoors.x.toString());
      formData.append("location", mapCoors.y.toString());
    }
    if (selectedCategories.length > 0) {
      [...selectedCategories].forEach((item: any, key: number) => {
        formData.append("categories", selectedCategories[key]);
      });
    }
    if (images) {
      [...images].forEach((item: any, key: number) => {
        //DODELAT MOZNA
        formData.append("images", images[key]);
      });
    }
    addPost(formData).then((res) => {
      if ("err" in res) {
        setMsg("");
        setError(res.err);
      } else if ("msg" in res) {
        setError("");
        setMsg(res.err);
        //timeuot 5s pak redirect
      } else {
        setMsg("");
        setError("Something went wrong");
      }
      setLoading(false);
    });
  };
  return (
    <main className="add-post-box">
      <h1 className="mb-3">New Post</h1>
      <div className="add-post-form">
        <Alert
          variant={`${!!error ? "danger" : ""}${!!msg ? "success" : ""} `}
          onClose={() => {
            setError("");
            setMsg("");
          }}
          show={!!error || !!msg}
          dismissible
        >
          {`${!!error ? error : ""}${!!msg ? msg : ""}`}
        </Alert>
        <p className="font1">Name</p>
        <input
          type="text"
          className="input name"
          placeholder="Enter name of post"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <p className="font1">Description</p>
        <textarea
          rows={3}
          className="input"
          placeholder="Enter description  ...."
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></textarea>
        <div className="d-flex justify-content-between">
          <p className="font1">Choose categories: </p>
          <p
            className="font2 link"
            onClick={() => {
              setPopup("addCategory");
              setShowPopup(true);
            }}
          >
            Add category
          </p>
        </div>
        <div className="category-box">
          {categories ? (
            categories.map((category, index) => (
              <div key={index}>
                {category.name}
                <input
                  type="checkbox"
                  className="checkmark"
                  onChange={(e) => {
                    selectCategory(category._id, e.target.checked);
                  }}
                />
              </div>
            ))
          ) : (
            <ReactLoading
              type={"cylon"}
              height={50}
              width={375}
              color="white"
              className="loading-cat"
            />
          )}
        </div>
        <p className="font1">Add location</p>
        <div className="fl-between">
          <div style={{ width: "100%" }}>
            <input
              type="text"
              className="input map-inp"
              placeholder="Enter name of location or area"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                setLoactionToFind(e.target.value);
              }}
            />
            <Button variant="success" className="check">
              <FontAwesomeIcon icon={faCheck} size="2x" />
            </Button>
            <ul className="help font2">
              {findResults && location !== ""
                ? findResults.slice(0, 3).map((item, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        selectLocRes(item.coords, item.label);
                      }}
                    >
                      {item.label}
                    </li>
                  ))
                : ""}
            </ul>
          </div>
          <div className="map">
            {mapCoors ? (
              <Mapa
                height="100%"
                center={{ lat: mapCoors.y, lng: mapCoors.x }}
                zoom={11}
                marker={mapCoors}
              />
            ) : (
              <Mapa
                height="100%"
                center={{ lat: 50.0755, lng: 14.4378 }}
                zoom={5}
              />
            )}
          </div>
        </div>
        <p className="font1">Add photos</p>

        <input
          type="file"
          name="imgCollection"
          onChange={onFileChange}
          multiple
        />

        <p className="font2 mt-1">0 photos uploaded</p>
        <div className="photos"></div>
        <Button
          variant="success mt-4 font1"
          className="upload"
          onClick={onSubmit}
        >
          {loading ? (
            <Spinner animation="border" variant="light" />
          ) : (
            "Upload post"
          )}
        </Button>
      </div>
    </main>
  );
}

export default Add;
