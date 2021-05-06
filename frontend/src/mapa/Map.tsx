import React, { createContext, useEffect, useRef, useState } from "react";
import BaseLayers from "./BaseLayers";
import styled from "styled-components";

export const MapContext = createContext(null);

type mapCoors = {
  x: number;
  y: number;
};

interface MapProps {
  center: { lat: number; lng: number };
  width?: string;
  height?: string;
  zoom?: number;
  baseLayers?: number[];
  children?: React.ReactNode;
  marker?: mapCoors;
}

// Override PreflightCSS presets
const StyledMap = styled.div`
  img {
    max-width: initial !important;
  }
`;

const Map = (props: MapProps) => {
  const [loading, setLoading] = useState(true);
  // useSMap()
  const mapNode = useRef(null);
  const [map, setMap] = useState(null);
  const { width, height, children } = props;
  // const [makerS, setMakerS] = useState<mapCoors | undefined>(props.marker);
  useEffect(() => {
    const onload = () => {
      // @ts-ignore
      window.Loader.async = true;
      // @ts-ignore
      window.Loader.load(null, null, () => {
        setLoading(false);
        const { zoom, center, marker } = props;
        const centerCoords = window.SMap.Coords.fromWGS84(
          center.lng,
          center.lat
        );
        const sMap = new window.SMap(mapNode.current, centerCoords, zoom);
        const l = sMap.addDefaultLayer(BaseLayers.TURIST_NEW);
        l.enable();

        sMap.addDefaultLayer(window.SMap.DEF_BASE).enable();
        sMap.addDefaultControls();

        if (marker) {
          var makrLayer = new window.SMap.Layer.Marker();
          sMap?.addLayer(makrLayer);
          makrLayer.enable();
          const markerCors = window.SMap.Coords.fromWGS84(marker.x, marker.y);
          var newMarker = new window.SMap.Marker(markerCors, false);
          makrLayer?.addMarker(newMarker);
          console.log("marker");
        }
        setMap(sMap);
      });
      return () => {
        document.body.removeChild(script);
      };
    };
    const script = document.createElement("script");
    script.src = "https://api.mapy.cz/loader.js";
    script.async = true;
    script.onload = onload;
    document.body.appendChild(script);
  }, [props.marker]);
  if (loading) {
    return <div>Loading</div>;
  } else {
    return (
      <MapContext.Provider value={map}>
        <StyledMap style={{ width, height }} ref={mapNode}>
          {map && children}
        </StyledMap>
      </MapContext.Provider>
    );
  }
};

Map.defaultProps = {
  width: "100%",
  height: "300px",
  zoom: 13,
  minZoom: 1,
  maxZoom: 21,
  baseLayers: [BaseLayers.TURIST_NEW],
};

export default Map;
