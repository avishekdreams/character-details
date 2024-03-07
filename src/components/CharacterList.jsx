import { useState, useEffect } from "react";

import axios from "axios";
import Pagination from "./Pagination";
import Card from "./Card";

export default function CharacterList() {
  const [loading, setLoading] = useState(true);

  // Pagination code...
  let [pageNumber, updatePageNumber] = useState(1);
  let [fetchedData, updateFetchedData] = useState([]);
  let { info, results } = fetchedData;
  let fetchUrl = `https://rickandmortyapi.com/api/character/?page=${pageNumber}`;

  useEffect(() => {
    (async function () {
      const response = await axios.get(fetchUrl);
      updateFetchedData(response.data);
      setLoading(false)
    })();
  }, [fetchUrl]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Character List</h2>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {results.map(character => (
            <Card 
              key={character.id}
              data={character}
              url="characters"
            />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center">
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <Pagination
                info={info}
                pageNumber={pageNumber}
                updatePageNumber={updatePageNumber}
              />
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}