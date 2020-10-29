import { combineReducers } from 'redux';

// Helper functions
// TODO: move to utils.js
const add = (a, b) => parseFloat(a) + parseFloat(b);
const rest = (a, b) => parseFloat(a) - parseFloat(b);
const addOperands = (a, b) => (fn) => fn(a, b);

const initialState = {
  balances: {
    USD: 25000,
    BTC: 1,
    DOGE: 10,
    ETH: 5,
  },
  xRates: {
    ETH: 0,
    BTC: 0,
    DOGE: 0,
  },
  coinAmount: 1,
  coinSelection: 'ETH',
};

const reducer = (state = initialState, action) => {
  const usdBalance = addOperands(state.balances.USD, action.coinPrice);
  const coinBalance = addOperands(
    state.balances[state.coinSelection],
    state.coinAmount
  );

  switch (action.type) {
    case 'FETCH_RATES':
      return {
        ...state,
        xRates: {
          ...state.xRates,
          ...action.payload,
        },
      };
      break;
    case 'TOGGLE_COIN':
      // if the update is coming from the selector  then update the amount
      // this one is used for both input and select
      //  ? maybe separate them like 'TOGGLE_COIN' and 'UPDATE_AMOUNT'
      return action.updateAmount
        ? {
            ...state,
            ...action.payload,
            coinAmount: state.balances[action.coinSelected],
          }
        : {
            ...state,
            ...action.payload,
          };
      break;
    case 'BUY_COIN':
      return {
        ...state,
        balances: {
          ...state.balances,
          USD: usdBalance(rest),
          [state.coinSelection]: coinBalance(add),
        },
      };
      break;
    case 'SELL_COIN':
      return {
        ...state,
        balances: {
          ...state.balances,
          USD: usdBalance(add),
          [state.coinSelection]: coinBalance(rest),
        },
      };
      break;
    default:
      return state;
  }
};

export default combineReducers({
  reducer,
});
