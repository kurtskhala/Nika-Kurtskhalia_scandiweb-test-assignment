import React, { Component } from 'react';
import CartItem from './CartItem';
import './CartPage.css';

class CartPage extends Component {
    render() { 
        if(this.props.cartItems.length>0){
            return (
                <div className=''>
                    <h1 className='app-cartPage-title'>Cart</h1>
                    <CartItem cartDropdown={this.props.cartDropdown} nameOfClass='cartPage' handleDec={this.props.handleDec} handleInc={this.props.handleInc} currency={this.props.currency} data={this.props.cartItems} />
                    <div className='app-cartPage-info'>
                        <span className='app-cartPage-info-label'>Tax 21%:</span>
                        <span className='app-cartPage-info-value'>{`${this.props.currency} ${(Math.round(this.props.cartItems.reduce((acc, obj) => { return acc + obj.price.filter(curr => curr.currency.symbol === this.props.currency)[0].amount*obj.q*0.21 }, 0)* 100) / 100).toFixed(2)}`}</span>
                    </div>
                    <div className='app-cartPage-info'>
                        <span className='app-cartPage-info-label'>Quantity:</span>
                        <span className='app-cartPage-info-value'>{`${this.props.cartItems.reduce(function (acc, obj) { return acc + obj.q; }, 0)}`}</span>
                    </div>
                    <div className='app-cartPage-info'>
                        <span className='app-cartPage-info-label'>Total:</span>
                        <span className='app-cartPage-info-value'>{`${this.props.currency} ${(Math.round(this.props.cartItems.reduce((acc, obj) => { return acc + obj.price.filter(curr => curr.currency.symbol === this.props.currency)[0].amount*obj.q*1.21 }, 0)* 100) / 100).toFixed(2)}`}</span>
                    </div>
                    <button className='app-button app-cartPage-button'>Order</button>
                </div>
            );
            }
        }
    }
 
export default CartPage;