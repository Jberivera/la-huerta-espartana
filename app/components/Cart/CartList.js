import React, { Component } from 'react';
import style from './Cart.scss';
import classNames from 'classnames/bind';

const css = classNames.bind(style);

import getTotal from '../../js/utils/composed/getCurrency-reduceTotal';

function CartList ({ cart }) {
  return (
    <ul className={ css('cart__item-container') }>
      <li className={ css('cart__item-list') }>
        <div className={ css('cart__product-name', 'cart--col') }>Producto</div>
        <div className={ css('cart__count', 'cart--col') }>Cantidad</div>
        <div className={ css('cart__price', 'cart--col') }>Precio</div>
        <div className={ css('cart__total', 'cart--col') }>Total</div>
      </li>
      {
        cart.map((item, i) => {
          return (
            <li key={ i } className={ css('cart__item-list') }>
              <div className={ css('cart__product-name', 'cart--col') }>{ `${item.productName} ${item.units}` }</div>
              <div className={ css('cart__count', 'cart--col') }>{ item.count }</div>
              <div className={ css('cart__price', 'cart--col') }>{ `${item.price.toString().replace(/(\d{3})$/g, '.$1')}` }</div>
              <div className={ css('cart__total', 'cart--col') }>{ item.price * item.count }</div>
            </li>
          );
        })
      }
      <li className={ css('cart__item-list') }>
        <div className={ css('cart__total-title', 'cart--col') }>Total</div>
        <div className={ css('cart__total', 'cart--col', 'cart__total-account') }>{ `$ ${getTotal(cart)}` }</div>
      </li>
    </ul>
  );
}

export default CartList;
