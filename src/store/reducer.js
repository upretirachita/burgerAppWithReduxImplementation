import *  as actionTypes from './action';

const initialState = {
    ingredients:{
        salad:0,
        bacon:0,
        meat:0,
        cheese:0
    },
    totalPrice : 5
};

const INGREDIENTS_PRICE ={
    salad:0.5,
    bacon:1,
    cheese:0.4,
    meat:1.6
}

const reducer = (state = initialState , action ) =>{
    switch(action.type){
        case actionTypes.ADD_INGREDIENT: {
            return{
                    ...state,
                    ingredients :{
                        ...state.ingredients,
                        [action.ingredientName]:state.ingredients[action.ingredientName] + 1
                    },
                    totalPrice:state.totalPrice + INGREDIENTS_PRICE[action.ingredientName]
            }
        }
        case actionTypes.REMOVE_INGREDIENT: {
            return{
                    ...state,
                        ingredients :{
                            ...state.ingredients,
                            [action.ingredientName]:state.ingredients[action.ingredientName] -1
                        },
                        totalPrice:state.totalPrice - INGREDIENTS_PRICE[action.ingredientName]

            }
        }
        default:
        return state;
    }

    
};

export default reducer ;