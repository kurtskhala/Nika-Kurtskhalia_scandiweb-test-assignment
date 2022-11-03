import React from 'react';
import { Categories } from "../../gql/Query";
import { request } from 'graphql-request';
import logo from '../../assets/images/logo.png';
import {NavLink} from "react-router-dom";


import './Header.css';
import Currencies from '../Currencies/Currencies';
import CartDropDown from '../Cart/CartDropDown';


class Header extends React.Component {
    state = { 
        list: []
    }

    componentDidMount() {
        request('http://localhost:4000/', Categories).then((data) => (this.setState({list:data.categories})))
    }

    render() { 
        return(
                <div className='app-header'>
                    <div className='app-header-nav'>
                        {
                            this.state.list.map((category) => {
                                return <NavLink className={({isActive}) => (isActive ? 'active' : 'inactive')} key={category.name} to={`/${category.name}`}>{category.name}</NavLink>
                            })
                        }
                    </div> 
                    <div className='app-header-logo'>
                        <img alt='logo' src={logo}></img>
                    </div>
                    <div className='app-header-rightSide'>
                        <Currencies currency={this.props.currency} handleCurrency={this.props.handleCurrency}/>
                        <CartDropDown referance={this.props.referance} cartDropdown={this.props.cartDropdown} handleCartDropdown={this.props.handleCartDropdown} handleDec={this.props.handleDec} handleInc={this.props.handleInc} currency={this.props.currency} cartItems={this.props.cartItems} handleCartItems={this.props.handleCartItems}/>
                    </div>
                </div>
        )
    }
}
 
export default Header;