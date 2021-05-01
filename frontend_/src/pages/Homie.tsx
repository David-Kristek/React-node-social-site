import React, { useEffect } from 'react'
import { useGlobalContext } from '../context';
function Homie() {
    const { setPage, page } = useGlobalContext();

    useEffect(() => {
        setPage("home");
        console.log(page);
    }, []);

    return (
        <div><h1>Homie</h1></div>
    )
}

export default Homie
