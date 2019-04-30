import React from 'react';
import './SideDraw.css';
import classes from './SideDraw.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxilary/Auxilary'

const SideDraw = (props)=>{
    let attachedClasses = [classes.SideDraw , classes.Close];
    if (props.open){
        attachedClasses = [classes.SideDraw ,classes]
    }
    return(
        <Aux>
            <Backdrop  
            show = {props.open} 
            clicked = {props.closed}/>

            <div className={attachedClasses.join(' ')}>
                    <div className={classes.SideDrawLogo}>
                        <Logo />
                    </div>
                    <nav>
                        <NavigationItems />
                    </nav>
            </div>
       </Aux>
    );
}

export default SideDraw