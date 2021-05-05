import React, { createContext, useEffect, useRef, useState } from "react";
import BaseLayers from "./BaseLayers";
import styled from "styled-components";

export const MapContext = createContext(null);

interface MapProps {
  center: { lat: number; lng: number };
  width?: string;
  height?: string;
  zoom?: number;
  minZoom?: number;
  maxZoom?: number;
  baseLayers?: number[];
  children?: React.ReactNode;
}

// Override PreflightCSS presets
const StyledMap = styled.div`
  img {
    max-width: initial !important;
  }
`;

const Map = (props: MapProps) => {
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState<any>();
  // useSMap()
  const mapNode = useRef(null);
  const [map, setMap] = useState(null);
  const { width, height, children } = props;
  useEffect(() => {
    const onload = () => {
      // @ts-ignore
      window.Loader.async = true;
      // @ts-ignore
      window.Loader.load(null, null, () => {
        setLoading(false);
        if (!map && mapNode) {
          const { zoom, center } = props;
          const centerCoords = window.SMap.Coords.fromWGS84(
            center.lng,
            center.lat
          );
          const sMap = new window.SMap(mapNode.current, centerCoords, zoom);
          const l = sMap.addDefaultLayer(BaseLayers.TURIST_NEW);
          l.enable();

          sMap.addDefaultLayer(window.SMap.DEF_BASE).enable();
          sMap.addDefaultControls();

          var makrLayer = new window.SMap.Layer.Marker();
          sMap?.addLayer(makrLayer);
          makrLayer.enable();

          const coords = window.SMap.Coords.fromWGS84(20, 20);

          var marker = new window.SMap.Marker(coords, false);
          makrLayer?.addMarker(marker);

          // var suggest = new window.SMap.Suggest(input);
          // suggest.urlParams({
          //   // omezeni pro celou CR
          //   bounds: "48.5370786,12.0921668|51.0746358,18.8927040",
          // });
          // suggest.addListener("suggest", function (suggestData: any) {
          //   alert(suggestData.phrase);
          // });
          const odpoved = (geocoder: any) => {
            /* Odpověď */
            if (!geocoder.getResults()[0].results.length) {
              alert("Tohle neznáme.");
              return;
            }

            var vysledky = geocoder.getResults()[0].results;
            var data = [];
            while (vysledky.length) {
              /* Zobrazit všechny výsledky hledání */
              var item = vysledky.shift();
              data.push(
                item.label +
                  " (" +
                  item.coords.toWGS84(2).reverse().join(", ") +
                  ")"
              );
            }
            alert(data.join("\n"));
          };
          var geocode = new window.SMap.Geocoder("Praha", odpoved, {
            bbox: [
              window.SMap.Coords.fromWGS84(12.09, 51.06),
              window.SMap.Coords.fromWGS84(18.87, 48.55),
            ],
          });
          setMap(sMap);
          console.log("calback");
        }
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
  }, []);
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
