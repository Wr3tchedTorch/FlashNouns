import "./index.scss"

const Switch = ({onSwitch}) => {  
  return (
    <label className="switch">
        <input type="checkbox" onClick={onSwitch}/>
        <span className="slider round"></span>
    </label>
  )
}

export default Switch