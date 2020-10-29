import React, { Component } from 'react';
import BalancesView from './BalancesView';
import SelectorView from './SelectorView';
import { connect } from 'react-redux';
import {
  fetchRates,
  inputsHandler,
  buySellCoinHandler,
} from '../state/actions';

class CryptoCurrency extends Component {
  componentDidMount() {
    const coins = ['ETH', 'DOGE', 'BTC'];
    this.props.fetchRates(coins);
    this.fetcher = setInterval(
      (_) => this.props.fetchRates(coins),
      5 * 60 * 1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.fetcher);
  }

  formatUSD(money, code) {
    return code === 'USD'
      ? '$' + money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
      : money;
  }

  render() {
    console.log(this.props);
    const { coinAmount, coinSelection, balances, xRates } = this.props;
    const usdBalance = balances.USD;
    const coinBalance = balances[coinSelection];
    const coinPrice = coinAmount * xRates[coinSelection];

    return (
      <div className="main container">
        <div className="topbar">crypto trade</div>
        <div className="data container">
          <BalancesView balances={balances} formatUSD={this.formatUSD} />
          <div className="controls container">
            <div
              className="quantity wrapper"
              data-convertion={this.formatUSD(coinPrice, 'USD')}
            >
              <input
                type="number"
                className="input"
                value={coinAmount}
                min="1"
                onChange={(e) =>
                  this.props.inputsHandler('coinAmount', e.target)
                }
                placeholder="Amount"
              />
            </div>
            <SelectorView handler={this.props.inputsHandler} rates={xRates} />
          </div>
        </div>
        <div className="buttons container">
          <button
            className="button buy-button"
            onClick={(_) => this.props.buySellCoinHandler(coinPrice, true)}
            disabled={usdBalance < coinPrice}
          >
            Buy Coin
          </button>
          <button
            className="button sell-button"
            onClick={(_) => this.props.buySellCoinHandler(coinPrice, false)}
            disabled={coinBalance < coinAmount || coinAmount < 1}
          >
            Sell Coin
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ reducer }) => reducer;

export default connect(mapStateToProps, {
  fetchRates,
  inputsHandler,
  buySellCoinHandler,
})(CryptoCurrency);
