import React from 'react';
import  './Button.css'

const Button = (props)=>{
    return(
        <button 
                className = "Button"
                disabled = {props.disabled}
                className = {props.btnType}
                onClick ={props.clicked}>
                {props.children}
        </button>

    );
}

export default Button