import "./index.scss";

const Navbar = () => {
  return (
    <nav className="navbar">
        <div className="social">
            <a href="" className="instagram"> <img src="/social/instagram.svg" alt="instagram icon" /> </a>
            <a href="" className="linkedin">  <img src="/social/linkedin.svg" alt="linkedin icon" />  </a>
            <a href="" className="github">    <img src="/social/github.svg" alt="github icon" />    </a>
        </div>
        <img src="/logo.svg" alt="" className="logo" />
        <div className="links">
            <a href="" className="nav-link"><p>Play</p></a>
            <a href="" className="nav-link"><p>Leaderboard</p></a>
            <a href="" className="nav-link"><p>Help</p></a>
        </div>
    </nav>
  )
}

export default Navbar