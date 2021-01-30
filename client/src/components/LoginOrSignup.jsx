import React from 'react';

import { Link }   from 'react-router-dom';

const LoginOrSignup = () => {

    return (
        <div>
            <button className="btn btn-warning">Login As barbers</button>

            <Link to="/customerslogin">
                <button className="btn btn-danger">Login As customers</button>
            </Link>

        </div>
    )
}

export default LoginOrSignup
