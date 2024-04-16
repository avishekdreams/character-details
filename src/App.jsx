import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import CharacterDetail from './components/CharacterDetail';
import NavBar from "./components/NavBar";
import Episodes from "./components/Episodes";
import Location from "./components/Location";
import Home from "./components/Home";
import { UserContext } from "./contexts/userContext";

function App() {
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [pageNumber, updatePageNumber] = useState(1);
  return (
    <>
      <UserContext.Provider value={{ search, setSearch, pageNumber, updatePageNumber }}>
        <div className="App">
          <NavBar pathname={location.pathname} />
        </div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/episodes" element={<Episodes />} />
          <Route path="/episodes/:id" element={<CharacterDetail />} />
          <Route path="/location" element={<Location />} />
          <Route path="/location/:id" element={<CharacterDetail />} />
          <Route path='/characters/:id' element={<CharacterDetail />} />

        </Routes>
      </UserContext.Provider>
    </>
  )
}

export default App
