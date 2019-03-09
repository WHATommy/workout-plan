import React from 'react'

const LandingInfo = (props) => {
    return (
        <div className='landingInfo'>
            <img src={props.image}></img>
            <p>{props.info}</p>
        </div>
    )
}

export default LandingInfo