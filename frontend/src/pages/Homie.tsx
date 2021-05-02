import React, { useEffect } from 'react'
import { useGlobalContext } from '../context';
function Homie() {
    const { setPage } = useGlobalContext();

    useEffect(() => {
        setPage("home");
    }, []);

    return (
        <div><h1>Homie</h1></div>
    )
}

export default Homie
