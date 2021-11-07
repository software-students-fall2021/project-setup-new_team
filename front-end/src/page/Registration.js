import axios from 'axios';
import React, {useEffect} from 'react'
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
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3000/register', {
      username: event.target.username.value,
      password: event.target.password.value,
      email: event.target.email.value,
      confirm_password: event.target.confirm_password.value
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  return (
    <div>
        {/* gives user registration fields: username, password, confirm password, email*/}
        <div className="register-container">
            <div className="register-form">
                <div className="register-header font-size">
                    Register
                </div>
                {/* form should post data to url when submitted */}
                <form action="http://localhost:3000/register" method="POST" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Username" name="username" required/>
                    <input type="email" placeholder="Email" name="email" required/>
                    <input type="password" placeholder="Password" name="password" required/>
                    <input type="password" placeholder="Confirm Password" name="confirm_password" required/>
                    <input type="submit" value="Register" className="register-button"/>
               </form> 
               {/*
              <button onClick={handle_register} > Register </button> */}
              <p>{getResigistrationMessage(registerPressed)}</p>
                    

              </div>
        </div>
    </div>

  )
}

export default Registration