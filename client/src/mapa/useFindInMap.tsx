import { useState, useEffect } from "react";

const useFindInMap = () => {
  const [loactionToFind, setLoactionToFind] = useState("");
  const [result, setResult] = useState<any>();
  const [loading, setLoading] = useState(true);
  const odpoved = (geocoder: any) => {
    if (!geocoder.getResults()[0].results.length) {
      setResult(null);
      return;
    }
    const res = geocoder.getResults()[0].results;
    setResult(res);
  };
  const find = (place: string, smapa: any) => {
    if (smapa) {
      var geocode = new smapa.Geocoder(place, odpoved, {
        bbox: [
          smapa.Coords.fromWGS84(12.09, 51.06),
          smapa.Coords.fromWGS84(18.87, 48.55),
        ],
      });
    }
  };
  useEffect(() => {
    const onload = () => {
      // @ts-ignore
      window.Loader.async = true;
      // @ts-ignore
      window.Loader.load(null, null, () => {
        if (loactionToFind) {
          find(loactionToFind, window.SMap);
        }
      });
      setLoading(false);
    };

    const script = document.createElement("script");
    script.src = "https://api.mapy.cz/loader.js";
    script.async = true;
    script.onload = onload;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [loactionToFind]);
  return { setLoactionToFind, result };
};

export default useFindInMap;
