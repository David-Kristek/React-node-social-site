import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { useGlobalContext } from '../context';
import "../App.css";
interface Props {
    setPopup: (str: String) => void
    setShowPopup: (bl: boolean) => void
}

function Nav({ setPopup, setShowPopup }: Props) {
    const { page, setPage } = useGlobalContext();
    const [underline, setUnderline] = useState(page);
    const [once, setOnce] = useState(true)
    const login = () => {
        setPopup("login");
        setShowPopup(true); 
        // setPage("log")
    }
    if (page !== "" && once) {
        const pageI = page;
        setUnderline(pageI)
        setOnce(false); 
    }
    return (
        <>
            <nav>
                <img src={process.env.PUBLIC_URL + '/images/logo.svg'} />
                <ul>
                    <li onMouseOver={() => { setUnderline("home") }} onMouseOut={() => { setUnderline(page) }}>Home</li>
                    <li onMouseOver={() => { setUnderline("about") }} onMouseOut={() => { setUnderline(page) }}>About</li>
                    <li onMouseOver={() => { setUnderline("log") }} onMouseOut={() => { setUnderline(page) }} onClick={login}>Login
            <FontAwesomeIcon icon={faSignInAlt} size="lg" />
                    </li>
                </ul>
            </nav>
            {/* <span className={`underline ${page}-nav`}></span> */}

            <span className={`underline ${underline}-nav`}></span>
            {/* lagovani mozne vyresit delay pomoci useEffectu a nove classNamys */}
        </>
    )

}

export default Nav
