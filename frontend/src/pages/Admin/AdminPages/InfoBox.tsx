import React from 'react'

interface Props {
    text: string, 
    number: string | number,
    color?: string,
    background: string
}

function InfoBox({text, number, color, background} : Props) {
    var boxStyle = {
        backgroundColor: background
    }
    if(color) boxStyle = {...boxStyle, ...{color: color}}; 
    return (
        <div className="infoBox" style={boxStyle}>
            <span className="font3">{text}:</span>
            <span>{number}</span>
        </div>
    )
}

export default InfoBox
