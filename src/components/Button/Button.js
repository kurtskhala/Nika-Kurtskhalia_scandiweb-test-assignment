import React, { Component } from 'react';
import './Button.css';

class Button extends Component {
    state = {  } 
    render() { 
        return (
            <button className='app-button'>{this.props.name}</button>
        );
    }
}
 
export default Button;