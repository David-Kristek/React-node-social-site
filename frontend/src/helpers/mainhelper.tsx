import React from 'react'

function mainhelper() {
    const delay = (delay: number) => {
        return new Promise((res) => setTimeout(res, delay));
      };
    return {delay}
}

export default mainhelper
