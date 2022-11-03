import React, { Component } from 'react';
import './Product.css';

class Product extends Component {
    state = { 
        mainImage: 0,
        attributes: {},
        cartItems: []
    }

    handleClick = (i) => {
        this.setState({mainImage: i})
    }

    handleAddToCart =(inStock) => {
        if(inStock) {
            this.props.handleCartItems(this.props.data, this.state.attributes);
        }
    }


    render() { 
        return ( 
            <div className='app-product'>
                <div className='app-product-gallery'>
                    <div className='app-product-gallery-1'>
                        <div className={this.props.data.inStock?'app-product-gallery-side':'app-product-gallery-side app-product-container-outOfStock'} >
                            {
                                this.props.data.gallery.map((photo, i) => {
                                    return <img onClick={() => this.handleClick(i)} className={this.props.cartDropdown?'app-product-gallery-side-photo app-photo-blur':'app-product-gallery-side-photo'} alt='side' key={i} src={photo}></img>
                                })
                            }
                        </div>
                        <div className={this.props.data.inStock?'app-product-gallery-main':'app-product-gallery-main app-product-container-outOfStock'}>
                            <h5 className={this.props.data.inStock?'app-product-out-of-stock-false':'app-productPage-out-of-stock-true'}>OUT OF STOCK</h5>
                            <img alt='main' className={this.props.cartDropdown?'app-product-gallery-main-photo app-photo-blur':'app-product-gallery-main-photo'} src={this.props.data.gallery[this.state.mainImage]}></img>
                        </div>
                    </div>
                </div>
                <div className='app-product-info'>
                    <h1 className='app-product-info-brand'>{this.props.data.brand}</h1>
                    <h3 className='app-product-info-name'>{this.props.data.name}</h3>
                    {
                        this.props.data.attributes.map((attribute) => {
                            return <div key={attribute.id} className='app-product-info-attribute'>
                                        <label className='app-product-info-attribute-label'>{attribute.name.toUpperCase()}:</label>
                                        <div className='app-product-info-attribute-values'>
                                            {
                                                attribute.items.map((size, i) => {
                                                    if(attribute.type === 'swatch') {
                                                        return <div
                                                                    onClick={() => this.setState({attributes: {...this.state.attributes,[`${attribute.name}`]: i}})} 
                                                                    className={`app-product-info-attribute-value ${i===this.state.attributes[attribute.name]&&"app-product-info-attribute-vlue--selected"}`} 
                                                                    key={size.id}
                                                                    style={{ background: `${size.value}` }}>
                                                                </div>
                                                    } else {
                                                        return  <div
                                                                    onClick={() => this.setState({attributes: {...this.state.attributes,[`${attribute.name}`]: i}})} 
                                                                    className={`app-product-info-attribute-value ${i===this.state.attributes[attribute.name]&&"app-product-info-attribute-value--selected"}`} 
                                                                    key={size.id}>
                                                                        {size.value}
                                                                </div>
                                                    }
                                                })
                                            }
                                        </div>
                                    </div>
                        })
                    }
                    
                    <div className='app-product-info-price'>
                        <label className='app-product-info-attribute-label'>PRICE:</label>
                        <div className='app-product-info-price-value'>
                            {this.props.currency + this.props.data.prices.filter(curr => curr.currency.symbol === this.props.currency)[0].amount}
                        </div>
                    </div>
                    <div className='app-product-info-button'>
                        <button onClick={() => this.handleAddToCart(this.props.data.inStock)} disabled={!Object.keys(this.state.attributes).length} className='app-product-info-button--addToCart'>ADD TO CART</button>
                    </div>
                    <div className='app-product-info-description' dangerouslySetInnerHTML={{ __html: this.props.data.description }}>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Product;