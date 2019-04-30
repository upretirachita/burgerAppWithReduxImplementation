import React,{Component} from 'react';
import Aux from '../../hoc/Auxilary/Auxilary'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axiosOrder';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandling from '../../hoc/withErrorHandling/withErroeHandling';

const INGREDIENTS_PRICE ={
    salad:0.5,
    bacon:1,
    cheese:0.4,
    meat:1.6
}

class BurgerBuilder  extends Component{
    state = {
        ingredients:null,
        totalPrice : 5,
        purchasable:false,
        purchasing:false,
        loading:false,
        error:false
        }

    componentDidMount (){
        console.log("check",this.props)
        axios.get('https://burgerapp-20fa8.firebaseio.com/ingredients.json')
        .then(response =>{
            this.setState({
                ingredients:response.data
            });
        })
        .catch(error => {
            this.setState({
                error:true
            })
        })
    }
    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
        .map(igkey=>{
            return ingredients[igkey];
        })
        .reduce((sum,el)=>{
            return sum+el;
        },0);
        this.setState({
            purchasable:sum>0
        });
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

    addIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAdded = INGREDIENTS_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAdded ;
        this.setState({
            totalPrice:newPrice,
            ingredients:updatedIngredients
        })
        this.updatePurchaseState(updatedIngredients)
    }
    removeIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0){
            return 
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceReduced = INGREDIENTS_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceReduced ;
        this.setState({
            totalPrice:newPrice,
            ingredients:updatedIngredients
        })
        this.updatePurchaseState(updatedIngredients)
    }
render (){  
    const disableInfo = {
        ...this.state.ingredients
    };
    for ( let key in disableInfo){
        disableInfo[key] = disableInfo[key] <= 0
    }
    let orderSummary = null;
   
    
    let burger = this.state.error ? <p> Ingredients can't be loaded </p> :<Spinner />
    if (this.state.ingredients){
             burger =  (
                <Aux>
                        <Burger 
                        ingredients ={this.state.ingredients}/>
                        
                            <BuildControls 
                            ingredientsAdded ={this.addIngredientHandler}
                            ingredientsReduced ={this.removeIngredientHandler}
                            disabled={disableInfo}
                            price = {this.state.totalPrice}
                            purchasable ={this.state.purchasable}
                        ordered ={this.purchaseHandler}/>
                </Aux>
            );
            orderSummary = <OrderSummary 
            ingredients = {this.state.ingredients}
            purchaseCancelled = {this.purchaseCancelHandler}
            purchaseContinue = {this.purchaseContinueHandler}
            price = {this.state.totalPrice}
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


export default withErrorHandling(BurgerBuilder, axios) ;