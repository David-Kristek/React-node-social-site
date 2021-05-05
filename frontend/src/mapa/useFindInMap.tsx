import { useState, useEffect } from "react";

const useFindInMap = (word : string) => {
  const [words, setWords] = useState(word);
  const [result, setResult] = useState<any>()
  const [loading, setLoading] = useState(true); 
  const odpoved = (geocoder: any) => {
    if (!geocoder.getResults()[0].results.length) {
      setResult(null); 
      return;
    }
    var vysledky = geocoder.getResults()[0].results;
    var data = [];
    while (vysledky.length) {
      /* Zobrazit všechny výsledky hledání */
      var item = vysledky.shift();
      data.push(
        item.label + " (" + item.coords.toWGS84(2).reverse().join(", ") + ")"
      );
    }
    alert(data.join("\n"));
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
        if (word) {
          find(word, window.SMap);
        }
      });
      setLoading(false);

      return () => {
        document.body.removeChild(script);

      };
    };
    const script = document.createElement("script");
    script.src = "https://api.mapy.cz/loader.js";
    script.async = true;
    script.onload = onload;
    document.body.appendChild(script);
  }, [word]);

  return words;
};

export default useFindInMap;