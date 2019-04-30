import React,{Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner'
import axios from '../../../axiosOrder';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component{
    state = {
        controls:{},
        orderForm: {
                name:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Your Name'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                    },
                street:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Street'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                    },
                zipCode:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'zipCode'
                    },
                    value:'',
                    validation:{
                        required:true,
                        minLength:5,
                        maxLength:5
                    },
                    valid:false,
                    touched:false
                    },
                city:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'City'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                    },
                email:{
                    elementType:'input',
                    elementConfig:{
                        type:'email',
                        placeholder:'Your Email'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                    },
                deliveryMethod:{
                    elementType:'select',
                    elementConfig:{
                        options: [
                            {value:'fastest', displayValue:'Fastest'},
                            {value:'cheapest', displayValue:'Cheapest'}
                        ]
                    },
                    value:'',
                    validation:{},
                    valid:true
                    }
        },
        formIsValid:false,
        loading:false
    }
    checkValidity = ( value, rules) => {
        let isValid = true ;
        if (!rules){
            return true;
        }
        if(rules.required){
            isValid = value.trim() !== '' && isValid ;
        }
        if (rules.minLength){
            isValid = value.length >= rules.minLength && isValid ;
        }
        if (rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid ;

    }
    orderHandler = (event) => {
        event.preventDefault();
        //console.log("fromContacdata",this.props.ingredients);
        this.setState({loading:true});
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value ;
        }

         const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData 
            }
            axios.post('/orders.json',order)
                .then(response=> {
                    this.setState({
                        loading:false
                        });
                    this.props.history.push('/');
                    })

                .catch(error=>{
                    this.setState({loading:false
                    });
             });
    }
    handleChange = (e , inputIdentifier) => {
        console.log("input from contact",e.target.value);
        const updateOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
           ...updateOrderForm[inputIdentifier]
        };
        updatedFormElement.value = e.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value , updatedFormElement.validation)
        updatedFormElement.touched = true;
        updateOrderForm[inputIdentifier] = updatedFormElement ;
        console.log("forValidation",updatedFormElement)
        let formIsValid = true;
        for (let inputIdentifier in updateOrderForm){
            formIsValid = updateOrderForm[inputIdentifier].valid && formIsValid
        }
        this.setState({
            orderForm:updateOrderForm,
            formIsValid:formIsValid
        });
    }
    render(){
        const formElementArray = [];
        for (let key in this.state.orderForm){
            formElementArray.push({
                id:key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit = {this.orderHandler}>
                    {formElementArray.map(formElement =>(
                        <Input 
                        key = {formElement.id}
                        elementType = {formElement.config.elementType}
                        elementConfig = {formElement.config.elementConfig} 
                        value = {formElement.config.value} 
                        invalid = {!formElement.config.valid}
                        shouldValidate ={formElement.config.validation}
                        touched = {formElement.config.touched}
                        handleChange = {(e) => this.handleChange(e,formElement.id)}
                        />
                    ))}
                   <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if (this.state.loading){
            form = <Spinner />
        }
        return(
            <div className="ContactData">
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;