import React from 'react';
import { connect } from 'react-redux';

import style from './GlobalBtns.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router';

const css = classNames.bind(style);

function ShoppingCartBtn ({ cartNumber }) {

  return (
    <Link to="/carrito" className={ css('cart', 'cart-g', 'material-icons', 'link-top') }>
      shopping_cart
      <span className={ css('cart__number', 'link-top') }>{ cartNumber }</span>
    </Link>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    cartNumber: state.cart.length
  };
};

export default connect(mapStateToProps, null)(ShoppingCartBtn);
