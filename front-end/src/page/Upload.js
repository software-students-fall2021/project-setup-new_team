//Keeping this page empty for now, really dependant on backend
//Simple design, will fill in when we do backend
import React from "react";
import './Upload.css'


const Upload = props => {
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>x</span>
        {props.content}
      </div>
    </div>
  );
};
 
export default Upload;