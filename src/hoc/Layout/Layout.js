import React,{Component} from 'react';
import Aux from '../Auxilary/Auxilary';
import './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDraw from '../../components/Navigation/SideDraw/SideDraw';


class Layout extends Component{
    state = {
        showSideDraw:false
    }
    sideDrawCloseHandler = () =>{
        this.setState({
            showSideDraw:false
        });
    }
    
    sideDrawToggleHandler = () =>{
        this.setState( (prevState) => {
           return {showSideDraw:!prevState.showSideDraw}
        });
    }

    render() {
        return(
            <Aux>
                <Toolbar 
                drawToggleClicked = {this.sideDrawToggleHandler} />
                <SideDraw  
                open = {this.state.showSideDraw}
                closed = {this.sideDrawCloseHandler} />
                <main className="Content"> 
                {this.props.children}
                </main>
            </Aux>
        );
    
    }
}

export default Layout