import React,{Component} from 'react';
import {connect} from 'react-redux';
import Aux from '../../hoc/Auxilary/Auxilary'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axiosOrder';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandling from '../../hoc/withErrorHandling/withErroeHandling';
import * as actionTypes from '../../store/action'



class BurgerBuilder  extends Component{
    state = {
      
        purchasing:false,
        loading:false,
        error:false
        }

    componentDidMount (){
        console.log("check",this.props)
        // axios.get('https://burgerapp-20fa8.firebaseio.com/ingredients.json')
        // .then(response =>{
        //     this.setState({
        //         ingredients:response.data
        //     });
        // })
        // .catch(error => {
        //     this.setState({
        //         error:true
        //     })
        // })
    }
    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
        .map(igkey=>{
            return ingredients[igkey];
        })
        .reduce((sum,el)=>{
            return sum+el;
        },0);

            return sum>0
    }

    purchaseHandler = () =>{
        this.setState({purchasing:true});
    }

    purchaseCancelHandler = ()=>{
        this.setState({purchasing:false});
    }
    
    purchaseContinueHandler = () => {
        //alert('You Continue!!');
        // this.setState({loading:true})

        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name:'Rachita Upreti',
        //         address:{
        //             street:'Käkitie 8B 1',
        //             zipCode:'01450',
        //             city:'Vantaa',
        //             country:'Finland'
        //         },
        //         email:'test@gmail.com',
        //         deliveryMethod:'Fastest'
        //     }
        // }
            // axios.post('/orders.json',order)
            //     .then(response=> {
            //         this.setState({
            //             loading:false,
            //             purchasing:false});
            //         })

            //     .catch(error=>{
            //         this.setState({loading:false,
            //         purchasing:false});
            //     });
            const queryParams = [];
            for ( let i in this.state.ingredients){
                queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
            }
            queryParams.push('price=' + this.state.totalPrice)
            const queryString = queryParams.join('&');
            this.props.history.push({
                pathname: '/checkout',
                search:'?' + queryString
            });
     }

   
   
render (){  
    const disableInfo = {
        ...this.props.ings
    };
    for ( let key in disableInfo){
        disableInfo[key] = disableInfo[key] <= 0
    }
    let orderSummary = null;
   
    
    let burger = this.state.error ? <p> Ingredients can't be loaded </p> :<Spinner />
    if (this.props.ings){
             burger =  (
                <Aux>
                        <Burger 
                        ingredients ={this.props.ings}/>
                        
                            <BuildControls 
                            ingredientsAdded ={this.props.onIngredientsAdded}
                            ingredientsReduced ={this.props.onIngredientsRemove}
                            disabled={disableInfo}
                            price = {this.props.price}
                            purchasable ={this.updatePurchaseState(this.props.ings)}
                        ordered ={this.purchaseHandler}/>
                </Aux>
            );
            orderSummary = <OrderSummary 
            ingredients = {this.props.ings}
            purchaseCancelled = {this.purchaseCancelHandler}
            purchaseContinue = {this.purchaseContinueHandler}
            price = {this.props.price}
            />;
    }
    if (this.state.loading){
        orderSummary = <Spinner />
    }
//{salad:true, meat:false /true and so on}
    return (
        <Aux>
            <Modal show={this.state.purchasing}
            modalClosed ={this.purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
            
        </Aux>
    
    );
}
}


const mapsStateToProps = state => {
    return {
            ings: state.ingredients,
            price: state.totalPrice
    };
}

const mapsDispatchToProps = dispatch => {
    return{
        onIngredientsAdded: (ingName)=>dispatch({type:actionTypes.ADD_INGREDIENT, ingredientName:ingName}),
        onIngredientsRemove: (ingName)=>dispatch({type:actionTypes.REMOVE_INGREDIENT, ingredientName:ingName})
    }

}

export default connect(mapsStateToProps,mapsDispatchToProps) (withErrorHandling(BurgerBuilder, axios));