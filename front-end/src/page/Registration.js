import axios from 'axios';
import React, {useEffect} from 'react'
import './Registration.css'




const Registration = (props) => {
  const [registrationMessage, setRegistrationMessage] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    //send data to server
    axios.post('http://localhost:3000/register', {
      username: event.target.username.value,
      email: event.target.email.value,
      password: event.target.password.value,
      confirm_password: event.target.confirm_password.value
    })
    .then(function (response) {
      //give success message
      console.log(response);
      setRegistrationMessage(response.data.status);
    })
    .catch(function (error) {
      //give error message
      console.log(error);
      setRegistrationMessage(error.response.data.error)
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
                {/* form to post data to back-end when submitted */}
                <form action="http://localhost:3000/register" method="POST" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Username" name="username" required/>
                    <input type="email" placeholder="Email" name="email" required/>
                    <input type="password" placeholder="Password" name="password" required/>
                    <input type="password" placeholder="Confirm Password" name="confirm_password" required/>
                    <input type="submit" value="Register" className="register-button"/>
               </form> 
               {/*
              <button onClick={handle_register} > Register </button> */}
              <p>{registrationMessage}</p>
              </div>
        </div>
    </div>

  )
}

export default Registration