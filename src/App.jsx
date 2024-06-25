import { Navbar } from "./components"
import "./app.scss";
import { Route, Routes } from "react-router-dom";
import { Login, Play } from "./pages";

function App() {
  return (
    <>        
      <Navbar />      
      <Routes>
        <Route path="/" element={<Play/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </>
  )
}

export default App