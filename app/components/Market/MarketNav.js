import React from 'react';
import { connect } from 'react-redux';
import style from './Market.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router';

const css = classNames.bind(style);

import ShoppingCartBtn from '../GlobalBtns/ShoppingCartBtn';

import getTotal from '../../js/utils/composed/getCurrency-reduceTotal';

function MarketNav ({ cart }) {

  return (
    <div className={ css('market-nav') }>
      <span>{ `$ ${getTotal(cart)}` }</span>
      <span className={ css('shopping-cart') }>
        <ShoppingCartBtn />
      </span>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    cart: state.cart.map((item) => {
      return Object.assign({}, item, state.inventory[item.id]);
    })
  };
};

export default connect(mapStateToProps, null)(MarketNav);
