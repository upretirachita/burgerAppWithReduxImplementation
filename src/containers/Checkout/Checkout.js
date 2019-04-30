import React,{Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './Contactdata/ContactData';
import {connect} from 'react-redux';

class  Checkout extends Component{

    checkoutCanclledHandler = () => {
        this.props.history.goBack()

    }
    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

render(){
    return(
        <div>
            <CheckoutSummary 
            ingredients ={this.props.ings}
            checkoutCanclled={this.checkoutCanclledHandler}
            checkoutContinued={this.checkoutContinuedHandler}/>
            <Route path ={this.props.match.path + '/contact-data'}
                    component= {ContactData} />

        </div>
    );
}
}

const mapStateToProps = state => {
    return{
        ings:state.ingredients
    }
};

export default connect(mapStateToProps) (Checkout);