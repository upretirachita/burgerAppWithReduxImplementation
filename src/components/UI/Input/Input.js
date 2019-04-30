import React from 'react';
import  './Input.css';

const Input = (props) => {
    let inputElement = null;
    const InputElement = ['InputElement'];
    const invalidClass = 'Invalid'
    if (props.invalid && props.shouldValidate && props.touched){
        InputElement.push(invalidClass)
        }
    switch (props.elementType){
        case('input'):
        inputElement = 
            <input className= {InputElement.join(' ')}
            {...props.elementConfig} 
            value={props.value}
            onChange={props.handleChange}/>;
        break;
        case('textArea'):
        inputElement = 
            < textarea className={InputElement.join(' ')}
            {...props.elementConfig} 
            value={props.value}
            onChange={props.handleChange}
            />
        break;
        case('select'):
        inputElement = (
                        < select className={InputElement.join(' ')}
                        onChange={props.handleChange}
                        value={props.value}>
                            {props.elementConfig.options.map(option =>(
                                <option key={option.value}  value={option.value}>
                                    {option.displayValue}
                                </option>
                            ))}
                        </ select>);
        break;
        default:
        inputElement = 
            <input className={InputElement.join(' ')}
            {...props.elementConfig} 
            value={props.value}/>
    }
    return(
        <div className={InputElement.join(' ')}>
            <label className="Label">{props.label}</label>
            {inputElement}
        </div>
    );
}

export default Input;