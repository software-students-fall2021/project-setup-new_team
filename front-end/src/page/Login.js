import React, { useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
// import logo from './logo.svg';
import './Login.css'


const Login = (props) => {
  const [loginMessage, setLoginMessage] = React.useState('');
  const [response, setResponse] = React.useState('');
  const [redirect, setRedirect] = React.useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    //send data to server
    axios.post('http://localhost:3000/login', {
      username: event.target.username.value,
      password: event.target.password.value
    })
    .then(function (response) {
      //give success message
      console.log(response);
      setResponse(response.data);
    })
    .catch(function (error) {
      //give error message
      console.log(error);
      setLoginMessage(error.response.data.error)
    });
  }

  useEffect(() => {
    if(response.success && response.token){
      setLoginMessage("Success! You will be redirected shortly.")
      localStorage.setItem("loginToken", response.token)
      setRedirect(true)
      //TODO: redirect to user page
    }
  }, [response])
  return (
    <div>
        {/*shows username and password entry in center of page with Material UI*/}
        <div className="login-container">
            <div className="login-form">
                    <div className="login-header">
                        Login
                    </div>
                    {/* form to post data to back-end when submitted */}
                    <form action="http://localhost:3000/login" method="POST" onSubmit={handleSubmit}>
                            <input type="text" placeholder="Username" name="username" required/>
                            <br/>
                            <input type="password" placeholder="Password" name="password" required/>
                            <br/>
                            <input type="submit" value="Login" className="login-button"/>
                    </form> 
                    <p>No account yet? Why not? <Link to="/register">Create an account</Link></p>
                    <br/>
                    <p>{loginMessage}</p>
                    {redirect ? <meta http-equiv="refresh" content={`0; url=/user`} />: null}
            </div>
        </div>
    </div>

  )
}

export default Login