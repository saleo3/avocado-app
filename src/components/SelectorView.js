import React from 'react';
import PropTypes from 'prop-types';

const SelectorView = ({ rates, handler }) => {
  return (
    <select
      className="selector"
      onChange={(e) => handler('coinSelection', e.target, true)}
    >
      {Object.keys(rates).map((coinCode) => (
        <option value={coinCode} key={coinCode}>
          {coinCode}
        </option>
      ))}
    </select>
  );
};

SelectorView.propTypes = {
  rates: PropTypes.object.isRequired,
  handler: PropTypes.func.isRequired,
};

export default SelectorView;
