import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "./Card";

export default function Location() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState([]);
  let { dimension, type } = info;
  let [number, setNumber] = useState(1);
  let [results, setResults] = useState([]);
  let fetchUrl = `https://rickandmortyapi.com/api/location/${number}`;

  useEffect(() => {
    (async function () {
      const { data } = await axios.get(fetchUrl);
      setInfo(data);
      let result = await Promise.all(
        data.residents.map((x) => {
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
        <h5 className="text-center mb-3 text-black font-bold text-lg">
          Dimension: {dimension === "" ? "Unknown" : dimension}
        </h5>
        <h6 className="text-primary text-black font-bold text-lg">Type: {type === "" ? "Unknown" : type}</h6>
        <div className="input-group mb-3">
          <select
            onChange={(e) => setNumber(e.target.value)}
            className="form-select block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            id="Location"
          >
            <option value="1">Choose...</option>
            {[...Array(126).keys()].map((x, index) => {
              return (
                <option key={index} value={x + 1}>
                  {"Location"} - {x + 1}
                </option>
              );
            })}
          </select>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Location List</h2>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {results.map(character => (
            <Card
              key={character.id}
              data={character}
              url="location"
            />
          ))}
        </div>
        <div className="md:flex md:items-center mt-10">
          <div className="md:w-1/3">
            <button
              className="shadow bg-gray-500 hover:bg-gray-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={() => navigate(-1)}>
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}