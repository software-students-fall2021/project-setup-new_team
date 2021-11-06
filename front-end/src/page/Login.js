import React from 'react'
import { Link } from 'react-router-dom';
// import logo from './logo.svg';
import './Login.css'
/*import Button from '@material-ui/core/Button';*/

{/* to be completed when backend supports login*/}
const getLoginMessage = (loginPressed) => {
    if(!loginPressed){return "";}
    let res = "We noticed you pressed our button ";
    for(let i = 1; i < loginPressed; i++){
        res += "again ";
    } 
    res += "but we haven't set it up yet!";
    return res;
}
const Login = (props) => {
  const [loginPressed, setLoginPressed] = React.useState(false);
  {/* to be completed when backend supports login*/}
  const handle_login = () => {
        setLoginPressed(loginPressed + 1);
        console.log("trying");
  }
  return (
    <div>
        {/*shows username and password entry in center of page with Material UI*/}
        <div className="login-container">
            <div className="login-form">
                    <div className="login-header">
                        Login
                    </div>
                    {/*should be in a form when backend added */}
                    <input type="text" placeholder="username"/> 
                    <input type="password" placeholder="password"/>
                    {/*<Button variant="contained"
                            color="primary"
                            onClick={handle_login}>
                                Login
                    </Button> add MUI button later*/}
                    <button onClick={handle_login}> Login </button>
                    <p>No account yet? Why not? <Link to="/register">Create an account</Link></p>
                    <br/>
                    <p>{getLoginMessage(loginPressed)}</p>
            </div>
        </div>
    </div>

  )
}

export default Login