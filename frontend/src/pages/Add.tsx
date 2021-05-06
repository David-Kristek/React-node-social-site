import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { useGlobalContext } from "../context";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { getCategory } from "../api/category";
import "../App.css";
import "../styles/Add-post.css";
import useFindInMap from "../mapa/useFindInMap";
import Mapa from "../mapa/Map";
interface Categories {
  name: string;
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

function Add() {
  const { setPage, page, setNavigator } = useGlobalContext();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState<Categories[] | null>(null);
  const [location, setLocation] = useState("");
  const [findResults, setFindResults] = useState<LocationRes[] | null>();
  const [mapCoors, setMapCoors] = useState<mapCoors | undefined>();

  const { setLoactionToFind, result } = useFindInMap();
  useEffect(() => {
    setPage("home");
    setNavigator("home|add post");
    getCategory().then((res) => {
      if (res) {
        setCategories(res.data);
      }
    });
  }, []);
  const selectLocRes = (coors: mapCoors, label: string) => {
    setLocation(label);
    setFindResults(null);
    setMapCoors(coors);
    console.log(coors);
  };
  useEffect(() => {
    if (result) {
      setFindResults(result);
    }
  }, [result]);
  return (
    <main className="add-post-box">
      <h1 className="mb-3">New Post</h1>
      <div className="add-post-form">
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
        <p className="font1">Choose categories: </p>
        <div className="category-box">
          {categories ? (
            categories.map((category, index) => (
              <div key={index}>
                {category.name}
                <input type="checkbox" className="checkmark" />
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
        <p className="font1 link">Add photos</p>
        <p className="font2 mt-1">0 photos uploaded</p>
        <div className="photos"></div>
        <Button variant="success mt-4 font1" className="upload">
          Upload post
        </Button>
      </div>
    </main>
  );
}

export default Add;
