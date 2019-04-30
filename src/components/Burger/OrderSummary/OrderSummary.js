import React,{Component} from 'react';
import Aux from '../../../hoc/Auxilary/Auxilary';
import Button from '../../UI/Button/Button';





class OrderSummary extends Component {
    //This could be functional components
    componentWillUpdate () {
        console.log("OrderSummary wil Updates")
    }
    render()
     {
        console.log("orderSummary",this.props)
        const ingredientsSummary = Object.keys(this.props.ingredients)
        .map(igkey=>{
            return (<li key={igkey}>
                   <span style ={{textTransform:'capitalize'}}>{igkey}
                   </span>:{this.props.ingredients[igkey]}
                </li>)
        })
        return(
            <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p><strong>Total Price:{this.props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout !!</p>
            <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
        </Aux>
        )
    }
   
    
}

export default OrderSummary ;