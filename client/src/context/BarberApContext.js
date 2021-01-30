import React,{useState, createContext} from 'react'

export const BarberApContext = createContext();

export const BarberApContextProvider = props => {
    const [apointment, setApointment] = useState([])
    return(
        <BarberApContext.Provider value={{apointment, setApointment}}>
            {props.children}
        </BarberApContext.Provider>
    )
}