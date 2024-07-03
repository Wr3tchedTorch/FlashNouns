import "./index.scss"

const Switch = ({onClick}) => {  
  return (
    <label className="switch" onClick={() => onClick}>
        <input type="checkbox"/>
        <span className="slider round"></span>
    </label>
  )
}

export default Switch