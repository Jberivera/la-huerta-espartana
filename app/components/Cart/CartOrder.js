import React, { Component } from 'react';
import style from './Cart.scss';
import classNames from 'classnames/bind';

const css = classNames.bind(style);

function CartOrder () {
  return (
    <div className={ css('cart__order') }>
    </div>
  );
}

export default CartOrder;
