import { useState } from 'react'
import Switch from '../Switch/Switch';
import "./index.scss";

const SettingsMenu = () => {
  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false);

  return (
    <div className={settingsMenuOpen ? "settings-container-open" : "settings-container-closed"}>
        <form action="">
          <div className="switch-group">
              <p>Disable Animations</p> <Switch />
          </div>
          <div className="switch-group">
              <p>Disable Animations</p> <Switch />
          </div>
          <div className="switch-group">
              <p>Disable Animations</p> <Switch />
          </div>
          <div className="button-group">
              <button>Login</button>
              <button>Sign Up</button>
          </div>
        </form>
        <div className="settings-btn" onClick={() => setSettingsMenuOpen(!settingsMenuOpen)}>
          <img src="/gear.svg" alt=""  className="gear"/>
        </div>
    </div>
  )
}

export default SettingsMenu