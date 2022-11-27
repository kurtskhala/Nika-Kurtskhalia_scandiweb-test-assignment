import React, { Component } from 'react';
import { request } from 'graphql-request';
import { Curr } from "../../gql/Query";
import VectorDown from '../../assets/images/Vector.svg';
import VectorUp from '../../assets/images/VectorUp.svg';
import './Currencies.css';


class Currencies extends Component {
    state = {
        currencies: [],
        currency: '',
        clicked: false
    } 

    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
      }
    
      componentDidMount() {
        request('http://localhost:4000/', Curr).then((data) => (this.setState({currencies:data.currencies})))
        document.addEventListener("mousedown", this.handleClickOutside);
        if(JSON.parse(window.localStorage.getItem('currency'))){
          console.log(JSON.parse(window.localStorage.getItem('currency')));
          this.setState({currency: JSON.parse(window.localStorage.getItem('currency'))});
        } else if(this.state.currencies.length>0&&!JSON.parse(window.localStorage.getItem('currency'))) {
          this.setState({currency: this.state.currencies[0].symbol});
        }
      }
    
      componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
      }
    
      handleClickOutside(event) {
        if(this.state.clicked){
          if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            this.setState({clicked : false})
          }
        }
      }

    handleClick = (event) => {
        this.setState({currency: event.target.getAttribute("data-value")});
        this.props.handleCurrency(event);
        this.setState({clicked : false})
    }
    handleDropClick = () => {
        this.setState({clicked : !this.state.clicked})
    }
    render() { 
        return (
                <div ref={this.wrapperRef} className='app-header-currencies' value={this.state.currency} >
                    <div className='app-header-currencies--selected' onClick={this.handleDropClick}>
                        <span>{this.state.currency}</span>
                        {this.state.clicked?<img alt='vector' src={VectorUp}></img>:<img alt='vector' src={VectorDown}></img>}
                    </div>
                    {this.state.clicked &&
                        <div className='app-header-currencies--items' >
                            {
                                this.state.currencies.map((currency) => {
                                    return <div className={currency.symbol!==this.state.currency?'app-header-currencies--item':'app-header-currencies--item-selected'} data-value={currency.symbol} onClick={this.handleClick} key={currency.label}>{`${currency.symbol} ${currency.label}`}</div>
                                  
                                })
                            }
                        </div>
                    }
                </div>
        );
    }
}
 
export default Currencies;