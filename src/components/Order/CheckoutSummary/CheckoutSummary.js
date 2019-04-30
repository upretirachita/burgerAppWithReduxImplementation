import React from 'react';
import './CheckoutSummary.css';
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button';

const CheckoutSummary = (props) => {
    return(
        <div className ="CheckoutSummary">
            <h2>We hope you enjoy your meal!!</h2>
            <div style ={{width:'100%', margin:'auto'}}>
                <Burger ingredients = {props.ingredients}/>
            </div>
                <Button  
                btnType ="Danger"
                clicked ={props.checkoutCanclled}>
                CANCEL 
                </Button>
                <Button 
                 btnType ="Success"
                 clicked ={props.checkoutContinued}>
                 CONTINUE </Button>
        </div>
    );

}

export default CheckoutSummary;