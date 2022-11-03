import React, { Component } from 'react';
import './CartItem.css';

class CartItem extends Component {
    state = {
        photos: []
    }

    componentDidMount = () => {
        this.setState({photos: []});
        this.props.data.map(() => {
            this.setState(prevState => ({
                photos: [...prevState.photos, 0]
              }))
        })
    }

    handleLeftCange = (j,m) => {
        let newArr = [...this.state.photos];
        if(newArr[j]===0){
            newArr[j] = m-1;
            this.setState({photos: [...newArr]})
        } else {
            newArr[j] = newArr[j]-1;
            this.setState({photos: [...newArr]})
        }
    }
    handleRightCange = (j,m) => {
        let newArr = [...this.state.photos];
        if(newArr[j]===m-1){
            newArr[j] = 0;
            this.setState({photos: [...newArr]})
        } else {
            newArr[j] = newArr[j]+1;
            this.setState({photos: [...newArr]})
        }
    }

    handleDecrement = (item,j) => {
        this.props.handleDec(item);
        if(item.q-1 === 0) {
            console.log(this.state.photos);
            this.setState({
                photos: this.state.photos.filter((item,i) => i!==j)
            });
        }
    }

    render() {
        if(this.props.data.length>0){
        return (
            <div className=''>
                {
                    this.props.data.map((item,j) => {
                       return <div key={item.id} className={`app-${this.props.nameOfClass}-item`}>
                            <div className={`app-${this.props.nameOfClass}-item-left`}>
                                <div>
                                    <h1 className={`app-${this.props.nameOfClass}-item-brand`}>{item.brand}</h1>
                                    <h1 className={`app-${this.props.nameOfClass}-item-name`}>{item.name}</h1>
                                </div>
                                <div className={`app-${this.props.nameOfClass}-item-price`}>
                                    <div className={`app-${this.props.nameOfClass}-item-price-value`}>
                                        {this.props.currency + item.price.filter(curr => curr.currency.symbol === this.props.currency)[0].amount.toFixed(2)}
                                    </div>
                                </div>
                                {
                                    item.attributes.map((attribute) => {
                                        return <div key={attribute.id} className={`app-${this.props.nameOfClass}-item-attribute`}>
                                                    <label className={`app-${this.props.nameOfClass}-item-attribute-label`}>{attribute.name}:</label>
                                                    <div className={`app-${this.props.nameOfClass}-item-attribute-values`}>
                                                        {
                                                            attribute.items.map((size, i) => {
                                                                if(attribute.type === 'swatch') {
                                                                    return <div
                                                                                className={`app-${this.props.nameOfClass}-item-attribute-color-value ${i===item.selectedAttributes[attribute.name]&&`app-${this.props.nameOfClass}-item-attribute-color-value--selected`}`}
                                                                                key={size.id}
                                                                                style={{ background: `${size.value}` }}>
                                                                            </div>
                                                                } else {
                                                                    return  <div
                                                                                className={`app-${this.props.nameOfClass}-item-attribute-value ${i===item.selectedAttributes[attribute.name]&&`app-${this.props.nameOfClass}-item-attribute-value--selected`}`}
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
                            </div>
                            <div className={`app-${this.props.nameOfClass}-item-increment-decrement`}>
                                <div className={`app-${this.props.nameOfClass}-item-increment-decrement-symbol`} onClick={() => this.props.handleInc(item)}>+</div>
                                <div>{item.q}</div>
                                <div className={`app-${this.props.nameOfClass}-item-increment-decrement-symbol`} onClick={() => this.handleDecrement(item,j)}>-</div>
                            </div>
                            <div className={`app-${this.props.nameOfClass}-item-image`}>
                                {
                                    this.props.nameOfClass==="cartPage"? <div className='app-cartPage-changePhoto'>
                                        <button onClick={() => this.handleLeftCange(j,item.photos.length)} className='app-cartPage-changePhoto-left'>{'<'}</button>
                                        <button onClick={() => this.handleRightCange(j,item.photos.length)} className='app-cartPage-changePhoto-right'>{'>'}</button>
                                    </div>: <></>
                                }
                                <img alt='main' className={this.props.nameOfClass==="cartPage"?this.props.cartDropdown?`app-${this.props.nameOfClass}-item-photo app-photo-blur`:`app-${this.props.nameOfClass}-item-photo`:`app-${this.props.nameOfClass}-item-photo`} src={this.props.nameOfClass==="cartPage"?item.photos[this.state.photos[j]]:item.photos[0]}></img>
                            </div>
                        </div>
                    })
                }
                </div>
        );
        }
    }
}
 
export default CartItem;