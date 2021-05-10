import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { Button, Spinner, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import "../../App.css";
import "../../styles/Add-post.css";

import useFindInMap from "../../mapa/useFindInMap";
import Mapa from "../../mapa/Map";
import AddLogic from "./AddLogic";

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
  const [findResults, setFindResults] = useState<LocationRes[] | null>();
  const [mapCoors, setMapCoors] = useState<mapCoors | undefined>();
  const [images, setImages] = useState<any>();

  const {
    categories,
    selectCategory,
    formSubmit,
    error,
    msg,
    closeAlert,
    loading,
  } = AddLogic();
  const { setLoactionToFind, result } = useFindInMap();
  const { register, handleSubmit, getValues, setValue, watch } = useForm();
  const watchLocation = watch("location");

  useEffect(() => {
    if (result) {
      setFindResults(result);
    }
  }, [result]);

  useEffect(() => {
    if (watchLocation) setLoactionToFind(watchLocation);
  }, [watchLocation]);

  const selectLocRes = (coors: mapCoors, label: string) => {
    setValue("location", label);
    setFindResults(null);
    setMapCoors(coors);
  };
  const onFileChange = (e: any) => {
    setImages(e.target.files);
  };

  const onSubmit = (data : any) => {
    formSubmit({ data, images, mapCoors });
  };
  return (
    <main className="add-post-box">
      <h1 className="mb-3">New Post</h1>
      <div className="add-post-form">
        <Alert
          variant={`${!!error ? "danger" : ""}${!!msg ? "success" : ""} `}
          onClose={closeAlert}
          show={!!error || !!msg}
          dismissible
        >
          {`${!!error ? error : ""}${!!msg ? msg : ""}`}
        </Alert>
        <form onSubmit={handleSubmit(onSubmit)}>
          <p className="font1">Name</p>
          <input
            type="text"
            className="input name"
            placeholder="Enter name of post"
            {...register("name")}
          />
          <p className="font1">Description</p>
          <textarea
            rows={3}
            className="input"
            placeholder="Enter description  ...."
            {...register("description")}
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
                {...register("location")}
              />
              <Button variant="success" className="check">
                <FontAwesomeIcon icon={faCheck} size="2x" />
              </Button>
              <ul className="help font2">
                {findResults && getValues("location") !== ""
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
          <Button variant="success mt-4 font1" className="upload" type="submit">
            {loading ? (
              <Spinner animation="border" variant="light" />
            ) : (
              "Upload post"
            )}
          </Button>
        </form>
      </div>
    </main>
  );
}

export default Add;
