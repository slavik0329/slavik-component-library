'use strict';

import React, { Component } from 'react';

let priceInterval;

class BtcTicker extends Component {
  static propTypes = {
    style: React.PropTypes.any,
    currency: React.PropTypes.string
  };

  static defaultProps = {
    currency: "USD"
  };

  constructor (props) {
    super(props);

    this.state = {
      price: null
    };
  }

  componentWillUnmount () {
    clearInterval(priceInterval);
  }

  componentDidMount () {
    this.getPrice();

    priceInterval = setInterval(()=>{
      this.getPrice();
    }, 10000);
  }

  getPrice () {
    fetch("https://blockchain.info/ticker").then(res=>res.json()).then(priceList=>{
      this.setState({
        price: priceList[this.props.currency].last
      });
    });
  }

  getPriceText () {
    if ( !this.state.price ) {
      return "";
    }

    return "$" + this.state.price;
  }

  render() {
    return <div style={this.props.style}>
      <div>{this.getPriceText()}</div>
    </div>;
  }
}

export default BtcTicker;