import React, { Component } from 'react';
import cart from '../../assets/images/cart.svg';
import './CartDropDown.css';
import CartItem from './CartItem';
import {Link} from "react-router-dom";


class CartDropDown extends Component {
    state = { 
        numOfItems: 0
    } 

    
    render() { 
        return (
            <div ref={this.props.referance} className='app-header-cartDropDown' onClick={this.handleClick}>
                <img className='app-header-cartDropDown-logo' onClick={() => this.props.handleCartDropdown()} alt='cart' src={cart}></img>
                {
                    this.props.cartItems.reduce(function (acc, obj) { return acc + obj.q; }, 0)>0?<div className='app-header-cartDropdown-numOfItems'>
                        {this.props.cartItems.reduce(function (acc, obj) { return acc + obj.q; }, 0)}
                    </div>:<div></div>
                }
                <div className={this.props.cartDropdown?'app-header-cartDropDown-container':'app-header-cartDropDown-container-closed'}>
                    <div className='app-header-cartDropDown-bag'>
                        <h6>My Bag,</h6>
                        <h6 className='app-header-cartDropDown-bag-numb'>{`${this.props.cartItems.reduce(function (acc, obj) { return acc + obj.q; }, 0)} items`}</h6>
                    </div>
                    <CartItem nameOfClass='cartDropDown' handleDec={this.props.handleDec} handleInc={this.props.handleInc} currency={this.props.currency} data={this.props.cartItems}/>
                    <div className='app-header-cartDropDown-total'>
                        <h6>Total:</h6>
                        <h6>{` ${this.props.currency} ${(Math.round(this.props.cartItems.reduce((acc, obj) => { return acc + obj.price.filter(curr => curr.currency.symbol === this.props.currency)[0].amount*obj.q }, 0)* 100) / 100).toFixed(2)}`}</h6>
                    </div>
                    <div className='app-header-cartDropDown-buttons'>
                        <Link to='/cart'><button onClick={() => this.props.handleCartDropdown()} className='app-button'>VIEW BAG</button></Link>
                        <button className='app-button'>CHECK OUT</button>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default CartDropDown;