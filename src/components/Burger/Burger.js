import React from 'react';
import './Burger.css';
import BurgerIngredient from './BurgerIngedrent/BurgerIngredient';



const Burger = (props)=>{
    console.log("Burger.js",props)
    let transformendIngredients = Object.keys(props.ingredients).map(ingKey=>{//outer tlement map
        return [...Array(props.ingredients[ingKey])].map((_,i)=>{//inner map of props
               return  <BurgerIngredient key={ingKey +i} type ={ingKey}/>
        })
    })
    .reduce((arr,el)=>{
        return arr.concat(el)
    },[])
    console.log("transformedIngredent",transformendIngredients)
    if (transformendIngredients.length === 0){
        transformendIngredients = <p>Please start adding ingredients!</p>
    }
    return(
       <div className="Burger">
            <BurgerIngredient type ="bread-top"/>
            {transformendIngredients}
            <BurgerIngredient type ="bread-bottom"/>
       </div>
    );
}

export default Burger