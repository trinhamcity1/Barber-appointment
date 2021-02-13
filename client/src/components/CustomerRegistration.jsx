import React, { useState} from 'react'
import Axios from 'axios'
const CustomerRegistration = () => {
    const [customer_name, setCustomerName] = useState("");
    const [customer_password, setCustomerPassword] = useState("");
const register = () => {
        Axios.post("http://localhost:3001/api/v1/createcustomer", {
            customer_name: customer_name,
            customer_password: customer_password,
        }).then((response)=>{
            console.log(response)
        })
    }
    return (
        <div className= "App">
            <div className="registration">
                <div className="container">
                <h1> Customer Registration </h1>
                <div className="container"><label>Username</label>
                <input type="text" onChange={(e)=>{setCustomerName(e.target.value);}}/>

                </div>
                <div className="container">
                <label>Password</label>
                <input type="text" onChange={(e)=>{setCustomerPassword(e.target.value);}}/>
                </div>
                <button onClick={register}> Register</button>
                </div>
            </div>
        </div>
    )
}

export default CustomerRegistration