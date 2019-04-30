import React from 'react';
import './BuildControl.css'

const BuildControl = (props) =>{
    console.log(props)
    return(
        <div className="BuildControl">
            <div className="Label">{props.label}</div>
            <button 
            className="Less" 
            onClick={props.ingredientsReduced} 
            disabled ={props.disabled}>Less</button>
            <button className="More" 
            onClick={props.ingredientsAdded}>More</button>
        </div>
    )

}

export default BuildControl