import React, {useContext, useEffect, useState} from 'react';

import { useParams, useHistory } from 'react-router-dom';

const LoginOrSignup = () => {
    let history = useHistory()
    const handleSubmit = (e) =>{
                history.push(`/customerslogin`);
        };
    return (
        <div>
                        <button className="btn btn-warning">Login As barbers</button>
                        <button onClick={(e)=> handleSubmit} className="btn btn-danger">Login As customers</button>
        </div>
    )
}

export default LoginOrSignup
