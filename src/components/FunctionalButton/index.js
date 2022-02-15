import React, { useEffect, useState } from 'react'

const PAR = 'par'
const IMPAR = 'impar'

const Button = ({ number, onMount, onUnmount }) => {

    const [numbersManager, setNumbersManager] = useState()

    useEffect(() => {
        setNumbersManager({
            number,
            numberType: number % 2 === 0 ? PAR : IMPAR
        })        
    }, [number])
    
    return (
        <>  
            {JSON.stringify(numbersManager)}
            <button>O número é</button>
        </>
    )
}

export default Button