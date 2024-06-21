import "./index.scss";

const Navbar = () => {
  return (
    <nav className="navbar">
        <div className="social">
            <a href="https://www.instagram.com/ericericeri_/" target="_blank" className="instagram"> <img src="/social/instagram.svg" alt="instagram icon" /> </a>
            <a href="https://www.linkedin.com/in/eric-moura-368b4724b/" target="_blank" className="linkedin">  <img src="/social/linkedin.svg" alt="linkedin icon" />  </a>
            <a href="https://github.com/Wr3tchedTorch" target="_blank" className="github">    <img src="/social/github.svg" alt="github icon" />    </a>
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