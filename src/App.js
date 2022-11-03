import './App.css';
import React from 'react';
import All from './components/All/All';
import { request } from 'graphql-request';
import { AllInfo, Curr } from "./gql/Query";
import Header from './components/Header/Header';
import {Routes, Route, Navigate} from "react-router-dom";
import Product from './components/Product/Product';
import CartPage from './components/Cart/CartPage';


class App extends React.Component {

  state = { 
    data: [],
    currency : '',
    cartItems : [],
    cartDropdown : false
  }

  constructor(props) {
    super(props);

    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidUpdate() {
    window.localStorage.setItem('cartItems', JSON.stringify(this.state.cartItems));
    window.localStorage.setItem('currency', JSON.stringify(this.state.currency));
  }

  componentDidMount() {
    if(window.localStorage.getItem('cartItems')){
      this.setState({cartItems: JSON.parse(window.localStorage.getItem('cartItems'))});
    }

    if(JSON.parse(window.localStorage.getItem('currency'))){
      this.setState({currency: JSON.parse(window.localStorage.getItem('currency'))});
    } else {
      request('http://localhost:4000/', Curr).then((data) => (this.setState({currency: data.currencies[0].symbol})))
    }
    request('http://localhost:4000/', AllInfo).then((data) => (this.setState({data: data.categories})));
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside(event) {
    if(this.state.cartDropdown){
      if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
        this.setState({cartDropdown : false})
      }
    }
  }

  handleCartDropdown=() => {
    this.setState({cartDropdown: !this.state.cartDropdown});
  }

  

  handleInc = (item) => {
      this.setState(prevState => ({
          cartItems: prevState.cartItems.map(
          obj => (obj.id === item.id ? {...obj,  q: obj.q+1 } : obj)
        )
      }));
  }

  handleDec = (item) => {
      this.setState(prevState => ({
          cartItems: prevState.cartItems.map(
          obj => (obj.id === item.id ? {...obj,  q: obj.q-1 } : obj)
        )
      }));
      if(item.q-1 === 0) {
        this.setState({
          cartItems : this.state.cartItems.filter(data => data.id != item.id)
        })
      }
  }

  handleCartItems = (data, attributes) => {
    let unicID = data.id;
        const selectedAttributes = {};
        for(let attribute of data.attributes) {
            if(attributes.hasOwnProperty(attribute.name)){
                selectedAttributes[attribute.name] = attributes[attribute.name];
                unicID+=attributes[attribute.name];
            } else {
                selectedAttributes[attribute.name] = 0;
                unicID+='0';
            }
        }

        const item = {
            id : unicID,
            q : 1,
            brand : data.brand,
            name : data.name,
            price : data.prices,
            attributes : data.attributes,
            photos: data.gallery,
            selectedAttributes: selectedAttributes
        }
        
        if(this.state.cartItems.find((ite) => ite.id === item.id)){
          this.setState(prevState => ({
              cartItems: prevState.cartItems.map(
              obj => (obj.id === item.id ? {...obj,  q: obj.q+1 } : obj)
            )
          }));
        } else {
          this.setState({cartItems: [...this.state.cartItems, item]});
        }
  }

  handleCurrency = (event) => {
    this.setState({currency: event.target.getAttribute("data-value")});
  }

  render() {
    if(this.state.data.length>0){
      return (
        <div className='container'>
          <div className="app">
            <div className='app-content'>
              <Header referance={this.wrapperRef} cartDropdown={this.state.cartDropdown} handleCartDropdown={this.handleCartDropdown} handleDec={this.handleDec} handleInc={this.handleInc} currency={this.state.currency} cartItems={this.state.cartItems} handleCurrency={this.handleCurrency} handleCartItems={this.handleCartItems}/>
            </div>
            <div className={this.state.cartDropdown? 'app-body app-body-blur': 'app-body'}>
              <Routes>
                {
                  this.state.data.map((category) => {
                    return  <Route key={category.name} path={`/${category.name}`} element={<All cartDropdown={this.state.cartDropdown} handleCartItems={this.handleCartItems} currency={this.state.currency} data={[category]}/>}>
                            </Route>
                  })
                }
                {
                  this.state.data.map((category) => {
                    return category.products.map((product) => {
                      return <Route key={product.id} path= {`/${category.name}/${product.id}`} element={<Product cartDropdown={this.state.cartDropdown} handleCartItems={this.handleCartItems} currency={this.state.currency} data={product} />}></Route>
                    })
                  })
                }
                <Route path='/cart' element={<CartPage cartDropdown={this.state.cartDropdown} handleDec={this.handleDec} handleInc={this.handleInc} currency={this.state.currency} cartItems={this.state.cartItems} />}></Route>
              </Routes>
            </div>
          </div>
        </div>
       );
    }
  }
}
 
export default App;

