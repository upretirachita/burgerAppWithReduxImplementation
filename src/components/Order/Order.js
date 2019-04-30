import React from 'react';
import './Order.css';


const Order = (props)=>{
    const ingredients = [];
    for ( let ingredientsName in props.ingredients){
        ingredients.push(
            {
                name:ingredientsName,
                amount:props.ingredients[ingredientsName]
            }
        );
    }
    const ingredientOutput = ingredients.map(ig =>{
        return <span 
                style = {{
                    textTransform:'capitalize',
                    display:'inline-block',
                    margin: '0 8px',
                    border:'1px solid #ccc',
                    padding:'5px'
                    }}
                key = {ig.name}>{ig.name} ({ig.amount}) 
                </span>
    })
    return(
    <div className="Order">
        <p>Ingredients : {ingredientOutput} </p>
        <p>Price : <strong>Euro {Number.parseFloat(props.price).toFixed(2)}</strong></p>
    </div>
    );
}

export default Order