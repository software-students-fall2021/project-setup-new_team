import React, { useEffect } from 'react'
import jwt from 'jsonwebtoken';

/*
temporary redirect page for Users
TODO: add dynamic links in menu so redirect is unnecessary -A
(not _super_ trivial because update needs to be pushed from login whenever 
    token is updated from any page- but should be doable)
*/
const UserLanding = (props) => {
    
    const jwtToken = localStorage.getItem("loginToken") 
    // ^ synchronous so shouldn't cause timing problems

    const [redir, setRedir] = React.useState("");
    useEffect(() => {
        if(jwtToken){   
            const decoded = jwt.decode(jwtToken);
            setRedir(`user/${decoded.id}`);
        }else{
            setRedir("/login");
        }
    }, [])
    return (

        <div>
            <meta http-equiv="refresh" content={`0; url=${redir}`} />
        </div>
    )

}   

export default UserLanding