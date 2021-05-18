import React from 'react'

function Mainhelper() {
    const delay = (delay: number) => {
        return new Promise((res) => setTimeout(res, delay));
      };
    return {delay}
}

export default Mainhelper; 
