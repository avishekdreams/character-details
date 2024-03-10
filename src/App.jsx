import { Routes, Route } from "react-router-dom";
import CharacterDetail from './components/CharacterDetail';
import Episodes from "./components/Episodes";
import Location from "./components/Location";
import Home from "./components/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/episodes" element={<Episodes />} />
        <Route path="/episodes/:id" element={<CharacterDetail />} />
        <Route path="/location" element={<Location />} />
        <Route path="/location/:id" element={<CharacterDetail />} />
        <Route path='/characters/:id' element={<CharacterDetail />} />
      </Routes>
    </>
  )
}

export default App
