const fetchRates = (coins) => async (dispatch) => {
  console.log(process);
  const coinsFetch = coins.map((type) =>
    fetch(
      `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=${type}&market=USD&apikey=QBFWIZ18NKRR75MT`
    )
  );

  const coinsPromises = await Promise.all(coinsFetch);

  coinsPromises.map(async (data) => {
    const coinData = await data.json();
    const [metaData, rateData] = Object.values(coinData);

    const [coinCode, lastUpdate] = [
      Object.values(metaData)[1],
      Object.values(metaData)[5],
    ];

    const coinValue = Object.values(rateData[lastUpdate.split(' ')[0]])[0];
    console.log(coinCode, lastUpdate, coinValue);

    dispatch({
      type: 'FETCH_RATES',
      payload: {
        [coinCode]: coinValue,
      },
    });
  });
};

const inputsHandler = (
  inputName,
  { value: inputValue },
  updateAmount = false
) => (dispatch) => {
  dispatch({
    type: 'TOGGLE_COIN',
    payload: { [inputName]: inputValue },
    updateAmount,
    coinSelected: inputValue,
  });
};

const buySellCoinHandler = (coinPrice, isBuying) => (dispatch) => {
  dispatch({
    type: isBuying ? 'BUY_COIN' : 'SELL_COIN',
    coinPrice,
  });
};

export { fetchRates, inputsHandler, buySellCoinHandler };
