import { useEffect, useState } from 'react'
import Switch from '../Switch/Switch';
import "./index.scss";
import usersService from '../../services/usersService';
import { Link } from 'react-router-dom';

const SettingsMenu = ({currentConfig, changeConfig}) => {
  const [username, setUsername] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem("user-token");
    if (token === null) return;

    usersService.validateToken(token).then(result => {
      if (result) {
        setIsLogged(true);
        setUsername(localStorage.getItem("username"));
      }
    })
  }, [])

  const signOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("username");
    localStorage.removeItem("user-token");    
    window.location.reload();
  }

  return (
    <div className={settingsMenuOpen ? "settings-container-open" : "settings-container-closed"}>
        <form action="">
          <div className="switch-group">
              <p>Disable Animations</p> <Switch onSwitch={() => changeConfig({...currentConfig, disableAnimations: !currentConfig.disableAnimations})}/>
          </div>
          <div className="switch-group">
              <p>Hide noun Group</p> <Switch onSwitch={() => changeConfig({...currentConfig, hideNounGroup: !currentConfig.hideNounGroup})}/>
          </div>
          {isLogged ? 
          <div className="button-group">
            <p>{username}.</p>
            <button onClick={signOut}>Logout</button>
          </div> :
          <div className="button-group">
              <Link to={"/login"}><button>Login</button></Link>
              <Link to={"/signUp"}><button>Sign up</button></Link>
          </div>          
        }
        </form>
        <div className="settings-btn" onClick={() => setSettingsMenuOpen(!settingsMenuOpen)}>
          <img src="/gear.svg" alt=""  className="gear"/>
        </div>
    </div>
  )
}

export default SettingsMenu