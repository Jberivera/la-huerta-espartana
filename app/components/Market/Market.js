import React from 'react';
import style from './Market.scss';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';

const css = classNames.bind(style);

import Hero from '../Hero/Hero';

const Market = ({ count, onClick, inventory }) => {
  return (
    <div className={ css('market') }>
      <Hero backgroundUrl="url(http://artelista.s3.amazonaws.com/obras/big/0/9/7/5913365016626755.jpg)" />
      <ul className={ css('market-container') }>
        {
          inventory.map((item, i) => {
            return (
              <li key={i} className={ css('market-item') }>
                <p>{item.productName}</p>
                <p>{`$${item.price.toString().replace(/(\d{3})$/g, '.$1')} ${item.units}`}</p>
              </li>
            );
          })
        }
      </ul>
    </div>

  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    inventory: [ ...state.inventory ]
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch({ type: 'INCREMENT' });
    }
  };
};

export { Market };
export default connect(mapStateToProps, mapDispatchToProps)(Market);
