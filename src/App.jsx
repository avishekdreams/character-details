import { Routes, Route } from "react-router-dom";
import CharacterList from './components/CharacterList';
import CharacterDetail from './components/CharacterDetail';
import NavBar from "./components/NavBar";
import Episodes from "./components/Episodes";
import Location from "./components/Location";

function App() {
  return (
    <>
      <div className="App">
        <NavBar />
      </div>
      <Routes>
        <Route path='/' element={<CharacterList />} />
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
