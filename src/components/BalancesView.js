import React from 'react';
import PropTypes from 'prop-types';

const BalancesView = ({ balances, formatUSD }) => {
  return (
    <div className="balances container">
      {Object.keys(balances).map((code) => (
        <div className="amount" key={code}>
          {formatUSD(balances[code], code)}
          <span className="coin">{code}</span>
        </div>
      ))}
    </div>
  );
};

BalancesView.propTypes = {
  balances: PropTypes.object.isRequired,
};

export default BalancesView;
