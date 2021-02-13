import React from 'react'
import CustomerRegistration from '../components/CustomerRegistration'
import CustomersLogin from '../components/CustomersLogin'
import Header from '../components/Header'
import LoginOrSignup from '../components/LoginOrSignup'
const Home = () => {
    return (
        <div>
                    <Header/>
                    <CustomersLogin/>
                    <CustomerRegistration/>
        </div>
    )
}

export default Home
