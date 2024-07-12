import { useState } from "react";
import { MdMenu } from "react-icons/md";
import { RxCross1 as RxCross2 } from "react-icons/rx";
import { Link, useLocation } from "react-router-dom";
import "./index.scss";

const Navbar = () => {
  const [menuState, setMenuState] = useState(false);
  const location = useLocation().pathname;  
  console.log(location);

  return (
    <nav className="navbar">
        <div className="social">
            <a href="https://www.instagram.com/ericericeri_/" target="_blank" className="instagram"> <img src="/social/instagram.svg" alt="instagram icon" /> </a>
            <a href="https://www.linkedin.com/in/eric-moura-dev/" target="_blank" className="linkedin">  <img src="/social/linkedin.svg" alt="linkedin icon" />  </a>
            <a href="https://github.com/Wr3tchedTorch" target="_blank" className="github">    <img src="/social/github.svg" alt="github icon" />    </a>
        </div>
        <img src="/logo.svg" alt="" className="logo" />
        <div className={`links collapsed ${menuState ? "swing-in-top-fwd" : "swing-out-top-bck"}`}>
            <div className="social social-collapsed">
              <a href="https://www.instagram.com/ericericeri_/" target="_blank" className="instagram"> <img src="/social/instagram.svg" alt="instagram icon" /> </a>
              <a href="https://www.linkedin.com/in/eric-moura-dev/" target="_blank" className="linkedin">  <img src="/social/linkedin.svg" alt="linkedin icon" />  </a>
              <a href="https://github.com/Wr3tchedTorch" target="_blank" className="github">    <img src="/social/github.svg" alt="github icon" />    </a>
            </div>
            <Link to="/" className={"nav-link " + (location === "/" && "active")}><p>Play</p></Link>
            <Link to="/leaderboard" className={"nav-link " + (location === "/leaderboard" && "active")}><p>Leaderboard</p></Link>
            <Link to="/help" className={"nav-link " + (location === "/help" && "active")}><p>Help</p></Link>
        </div>
        {menuState ? 
          <RxCross2 size={40} className="menu-button" onClick={() => setMenuState(false)}/> :
          <MdMenu size={40} className="menu-button" onClick={() => setMenuState(true)}/>
        }
    </nav>
  )
}

export default Navbar