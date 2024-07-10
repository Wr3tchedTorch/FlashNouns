import { Navbar } from "./components"
import { Route, Routes } from "react-router-dom";
import { Login, Play, SignUp } from "./pages";
import "./app.scss";
import { useEffect, useState } from "react";
import usersService from "./services/usersService";
import nounService from "./services/nounService";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [nouns, setNouns] = useState([]);
  
  const fetchNouns = async () => {
    const data = await nounService.getNouns();
    setNouns(data);
  }
  
  useEffect(() => {
    fetchNouns();

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
        <Route path="/" element={<Play nouns={nouns}/>} />
        { !isLogged &&
          <Route path="/login" element={<Login/>} /> }
        { !isLogged &&
          <Route path="/signUp" element={<SignUp/>} /> }          
      </Routes>
    </>
  )
}

export default App