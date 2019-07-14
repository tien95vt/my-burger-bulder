import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png';
import reactLogoImg from '../../assets/images/react_logo.png';
import classes from './Logo.module.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={burgerLogo} alt="My logo" />
        <img src={reactLogoImg} alt="React logo" />
    </div>
);

export default logo;