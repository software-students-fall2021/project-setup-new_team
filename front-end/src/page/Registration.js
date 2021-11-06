import React from 'react'
import './Registration.css'
//import { Button } from '@material-ui/core';


const getResigistrationMessage = (registerPressed) => {
  if(!registerPressed){return "";}
  let res = "We noticed you pressed our button ";
  for(let i = 1; i < registerPressed; i++){
      res += "again ";
  }
  res += "but we haven't set it up yet!";
  return res;
}

const Registration = (props) => {
  const [registerPressed, setRegisterPressed] = React.useState(0);
  const handle_register = () => {
    setRegisterPressed(registerPressed + 1);
  }
  return (
    <div>
        {/* gives user registration fields: username, password, confirm password, email*/}
        <div className="register-container">
            <div className="register-form">
                <div className="register-header font-size">
                    Register
                </div>
                <form>
                    <input type="text" placeholder="Username" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <input type="password" placeholder="Confirm Password" />
                    {/*<Button variant="contained" color="primary" onClick={handle_register}>Register</Button>
                          add MUI button later*/}
                          
               </form>
              <button onClick={handle_register} > Register </button>
                <p>{getResigistrationMessage(registerPressed)}</p>
                    

              </div>
        </div>
    </div>

  )
}

export default Registration