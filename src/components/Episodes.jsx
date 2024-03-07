import { useState, useEffect } from "react";

import axios from "axios";
import Card from "./Card";

export default function Episodes() {
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState([]);
  const [id, setID] = useState(1);
  let [results, setResults] = useState([]);
  let fetchUrl = `https://rickandmortyapi.com/api/episode/${id}`;

  useEffect(() => {
    (async function () {
      const { data } = await axios.get(fetchUrl);
      setInfo(data);
      let result = await Promise.all(
        data.characters.map((x) => {
          return axios.get(x).then((res) => res.data);
        })
      );
      setResults(result);
      setLoading(false);
    })();
  }, [fetchUrl]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Episode List</h2>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {results.map(character => (
            <Card
              key={character.id}
              data={character}
              url="episodes"
            />
          ))}
        </div>
      </div>


    </div>
  )
}