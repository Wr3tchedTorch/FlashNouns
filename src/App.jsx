import { Navbar } from "./components"
import { Route, Routes } from "react-router-dom";
import { Login, Play, SignUp } from "./pages";
import "./app.scss";
import { useEffect, useState } from "react";
import usersService from "./services/usersService";

function App() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem("user-token");
    if (token === null) return;

    usersService.validateToken(token).then(result => {
      if (result) setIsLogged(true);
    })
  }, []);

  return (
    <>        
      <Navbar />      
      <Routes>
        <Route path="/" element={<Play/>} />
        { !isLogged &&
          <Route path="/login" element={<Login/>} /> }
        { !isLogged &&
          <Route path="/signUp" element={<SignUp/>} /> }          
      </Routes>
    </>
  )
}

export default App