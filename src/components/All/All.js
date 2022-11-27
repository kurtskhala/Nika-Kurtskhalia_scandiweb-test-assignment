import React, { Component } from 'react';
import './All.css';
import common from '../../assets/images/Common.svg';
import {Link} from "react-router-dom";
import {Query} from '@apollo/client/react/components';
import {GET_PRODUCTS} from "../../gql/Query";


class All extends Component {
    state = {  } 
    render() { 
        return (
            <div className='app-cataloge'>
                <div className='app-categoryName'>
                    <h1 className='app-categoryName-text'>{this.props.data[0].name.toUpperCase()}</h1>
                </div> 
                <div className='app-products'>
                    <div className='app-products-cont'>
                    <Query query={GET_PRODUCTS} variables={{category: this.props.data[0].name}}>
                    { ({loading, error, data}) => {
                        if(loading) return <h1>loading</h1>;
                        if(error) return <h1>error</h1>;
                        return(
                            data.category.products.map((product) => {
                                return  <div className='app-product-cont' key={product.id}>
                                            <div onClick={() => product.inStock&&this.props.handleCartItems(product, [])} className='app-image-cart-logo'>
                                                <img className='app-image-cart-logo-image' alt='cart' src={common}></img>
                                            </div>
                                            <Link to={`/${data.category.name}/${product.id}`}>
                                                <div className={product.inStock?'app-product-container':'app-product-container app-product-container-outOfStock'}>
                                                    <h5 className={product.inStock?'app-product-out-of-stock-false':'app-product-out-of-stock-true'}>OUT OF STOCK</h5>
                                                    <img alt='' className={this.props.cartDropdown?'app-image-blur app-image':'app-image'} src={product.gallery[0]}></img>
                                                    <div className='app-product-text'>{product.name}</div>
                                                    <div className='app-product-price'>{this.props.currency + product.prices.filter(curr => curr.currency.symbol === this.props.currency)[0].amount.toFixed(2)}</div>
                                                </div>
                                            </Link>
                                        </div>
                            })

                        )
                    
                    }
                    }
                    </Query>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default All;