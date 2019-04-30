import React from 'react';
import './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawToggle from '../SideDraw/DrawToggle/DrawToggle';


const Toolbar = (props)=>{
    return(
        <header className ="Toolbar">
            <DrawToggle clicked = {props.drawToggleClicked}/>
            <div className="AdjustedLogo">
                <Logo />    
            </div>
                
            <nav className ="DesktopOnly">
                <NavigationItems />
            </nav>
        </header>

    );
}

export default Toolbar