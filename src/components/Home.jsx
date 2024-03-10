import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import CharacterList from "./CharacterList";
import { UserContext } from "./../contexts/userContext";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { search } = useContext(UserContext);

  // Pagination code...
  let [pageNumber, updatePageNumber] = useState(1);
  let [fetchedData, updateFetchedData] = useState([]);
  let { info, results } = fetchedData;
  let fetchUrl = `https://rickandmortyapi.com/api/character/?page=${pageNumber}${search && `&name=${search}`}`;

  useEffect(() => {
    (function () {
      axios.get(fetchUrl)
        .then((e) => {
          updateFetchedData(e.data);
          setLoading(false);
        })
        .catch(((err) => {
          const { response: { data: { error } } } = err;
          window.alert(error);
        }));
    })();
  }, [fetchUrl]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="bg-white">
      <CharacterList data={results} />

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