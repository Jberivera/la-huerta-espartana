import React, { Component } from 'react';
import style from './Cart.scss';
import classNames from 'classnames/bind';

const css = classNames.bind(style);

function EmptyCart () {
  return (
    <div className={ css('cart') }>
      <h1 className={ css('cart__header') }>Carrito</h1>
    </div>
  );
}

export default EmptyCart;
