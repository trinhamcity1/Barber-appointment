import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import CustomersLogin from './components/CustomersLogin';
import { BarberApContext, BarberApContextProvider } from './context/BarberApContext';
import Home from "./routes/Home";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
const App = () => {
    return (
        <BarberApContextProvider>
    <div>
        <Router>
            <Switch>
            <Route exact path="/" component = {Home}/>
            <Route exact path="/login" component = {Login}/>
            <Route exact path="/signup" component = {Signup}/>
            <Route exact path="/customerslogin" component = {CustomersLogin}/>
            </Switch>
        </Router>
    </div>
    </BarberApContextProvider>
    )
}
    
export default App;