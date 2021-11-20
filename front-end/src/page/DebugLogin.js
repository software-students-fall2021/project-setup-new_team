import React, { useEffect } from 'react'
import axios from 'axios';
import jwt from 'jsonwebtoken';


const DebugLogin = (props) => {
    const jwtToken = localStorage.getItem("loginToken")
    const decodedToken = jwt.decode(jwtToken)

    const [status, setStatus] = React.useState("login failed");
    const [postStatus, setPostStatus] = React.useState("");
    useEffect(() => {
        if(!jwtToken){
            setStatus("there's no token");
            return;
        }
        axios.get('http://localhost:3000/logintest',{
            headers: { Authorization: `JWT ${jwtToken}` },
          })
            .then(res => {
                setStatus(res.data.status);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])
    
    const handleSubmit = (event) => {
        event.preventDefault();
        //send data to server
        axios.post('http://localhost:3000/logintest', {
            message: event.target.message.value
        }, {
            headers: { Authorization: `JWT ${jwtToken}` },
        })
        .then(function (response) {
            setPostStatus(response.data.status)
        })
        .catch(err => {
            setPostStatus("message didn't get through");
            console.log(err);
        })
    }
    return (
        <div> 
            {status} 
            <br/>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Message" name="message" required/>
                <br/>
                <input type="submit" value="Send it!" className="login-button"/>
            </form>
            {postStatus}
            {postStatus ? <br/> : null}
            {jwtToken && <>
            Your name is {decodedToken.username} <br/>
            Your id is {decodedToken.id} <br/>
            </>}
        </div>
        
    )
}

export default DebugLogin