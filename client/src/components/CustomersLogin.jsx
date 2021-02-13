import React, { useState} from 'react'
import Axios from 'axios'
import Card from 'react-bootstrap/Card'
const CustomersLogin = () => {
    const [customer_name, setCustomerName] = useState("");
    const [customer_password, setCustomerPassword] = useState("");
    const [loginStatusName, setLoginStatusName] = useState("");
    const [loginStatusCusid, setLoginStatusCusid] = useState("");
// const login = () => {
//     Axios.post("http://localhost:3001/api/v1/customerlogin", {
//         customer_name: customer_name,
//         customer_password: customer_password,
//     }).then((response)=>{
//         console.log(response)
//     })
// }

const login = () => {
    Axios.post("http://localhost:3001/api/v1/customerlogin", {
        customer_name: customer_name,
        customer_password: customer_password,
    }).then((response)=>{
        if (response.data.status){
            setLoginStatusName(response.data.status)
        }else {
            setLoginStatusName(response.data.results[0].customer_name)
            setLoginStatusCusid(response.data.results[0].customer_id)
        }
        console.log(response)
    })
}
    return (
        <div className= "App">
            <div className="login">
                <div className="container">
                <h1> Customer Login </h1>
                <div className="container"><label>Username</label>
                <input type="text" onChange={(e)=>{setCustomerName(e.target.value);}}/>
                </div>
                <div className="container">
                <label>Password</label>
                <input type="password" onChange={(e)=>{setCustomerPassword(e.target.value);}}/>

                </div>
                <button onClick={login}> Register</button> 

<div>
<Card style={{ width: '8rem' }}>
  <Card.Body>
    <Card.Title>{loginStatusName}</Card.Title>
    <Card.Subtitle className="mb-2 text-muted">{loginStatusCusid}</Card.Subtitle>

    {/* <Card.Link href="#">Card Link</Card.Link>
    <Card.Link href="#">Another Link</Card.Link> */}
  </Card.Body>
</Card>
</div>
                </div>
             
            </div>
        </div>
    )
}

export default CustomersLogin
