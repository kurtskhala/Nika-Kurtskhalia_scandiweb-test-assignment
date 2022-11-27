import React, { Component } from "react";
import { Interweave } from "interweave";
import "./Product.css";

import { request } from 'graphql-request';
import {PRODUCT} from "../../gql/Query";

class Product extends Component {
  state = {
    mainImage: 0,
    attributes: {},
    cartItems: [],
    data: []
  };

  componentDidMount() {
    request({
      url: 'http://localhost:4000/',
      document: PRODUCT,
      variables: {product: this.props.data},
    }).then((data) => (this.setState({data: data})));

  }

  handleClick = (i) => {
    this.setState({ mainImage: i });
  };

  handleAddToCart = (inStock) => {
    if (inStock) {
      this.props.handleCartItems(this.state.data.product, this.state.attributes);
    }
  };

  render() {
    if(this.state.data.product) {
    return (
      <div className="app-product">
        <div className="app-product-gallery">
          <div className="app-product-gallery-1">
            <div
              className={
                this.state.data.product.inStock
                  ? "app-product-gallery-side"
                  : "app-product-gallery-side app-product-container-outOfStock"
              }
            >
              {this.state.data.product.gallery.map((photo, i) => {
                return (
                  <img
                    onClick={() => this.handleClick(i)}
                    className={
                      this.props.cartDropdown
                        ? "app-product-gallery-side-photo app-photo-blur"
                        : "app-product-gallery-side-photo"
                    }
                    alt="side"
                    key={i}
                    src={photo}
                  ></img>
                );
              })}
            </div>
            <div
              className={
                this.state.data.product.inStock
                  ? "app-product-gallery-main"
                  : "app-product-gallery-main app-product-container-outOfStock"
              }
            >
              <h5
                className={
                  this.state.data.product.inStock
                    ? "app-product-out-of-stock-false"
                    : "app-productPage-out-of-stock-true"
                }
              >
                OUT OF STOCK
              </h5>
              <img
                alt="main"
                className={
                  this.props.cartDropdown
                    ? "app-product-gallery-main-photo app-photo-blur"
                    : "app-product-gallery-main-photo"
                }
                src={this.state.data.product.gallery[this.state.mainImage]}
              ></img>
            </div>
          </div>
        </div>
        <div className="app-product-info">
          <h1 className="app-product-info-brand">{this.state.data.product.brand}</h1>
          <h3 className="app-product-info-name">{this.state.data.product.name}</h3>
          {this.state.data.product.attributes.map((attribute) => {
            return (
              <div key={attribute.id} className="app-product-info-attribute">
                <label className="app-product-info-attribute-label">
                  {attribute.name.toUpperCase()}:
                </label>
                <div className="app-product-info-attribute-values">
                  {attribute.items.map((size, i) => {
                    if (attribute.type === "swatch") {
                      return (
                        <div
                          onClick={() =>
                            this.setState({
                              attributes: {
                                ...this.state.attributes,
                                [`${attribute.name}`]: i,
                              },
                            })
                          }
                          className={`app-product-info-attribute-value ${
                            i === this.state.attributes[attribute.name] &&
                            "app-product-info-attribute-vlue--selected"
                          }`}
                          key={size.id}
                          style={{ background: `${size.value}` }}
                        ></div>
                      );
                    } else {
                      return (
                        <div
                          onClick={() =>
                            this.setState({
                              attributes: {
                                ...this.state.attributes,
                                [`${attribute.name}`]: i,
                              },
                            })
                          }
                          className={`app-product-info-attribute-value ${
                            i === this.state.attributes[attribute.name] &&
                            "app-product-info-attribute-value--selected"
                          }`}
                          key={size.id}
                        >
                          {size.value}
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            );
          })}

          <div className="app-product-info-price">
            <label className="app-product-info-attribute-label">PRICE:</label>
            <div className="app-product-info-price-value">
              {this.props.currency +
                this.state.data.product.prices.filter(
                  (curr) => curr.currency.symbol === this.props.currency
                )[0].amount}
            </div>
          </div>
          <div className="app-product-info-button">
            <button
              onClick={() => this.handleAddToCart(this.state.data.product.inStock)}
              disabled={Object.keys(this.state.attributes).length<=0}
              className="app-product-info-button--addToCart"
            >
              ADD TO CART
            </button>
          </div>
          <div className="app-product-info-description">
            <Interweave content={this.state.data.product.description} />
          </div>
        </div>
      </div>
    );
                }
  }

}

export default Product;
