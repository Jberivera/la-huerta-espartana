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
              <div className={ css('cart__product-name', 'cart--col') }>
                <div className={ css('cart__group') }>
                  <img className={ css('cart__item-thumbnail') } src={ item.imgUrl }></img>
                  <span>{ `${item.productName} - ${item.units}` }</span>
                </div>
              </div>
              <div className={ css('cart__count', 'cart--col') }>
                <div className={ css('cart__group', 'cart--center') }>
                  { item.count }
                </div>
              </div>
              <div className={ css('cart__price', 'cart--col') }>
                <div className={ css('cart__group', 'cart--right') }>
                  { `$${item.price.toString().replace(/(\d{3})$/g, '.$1')}` }
                </div>
              </div>
              <div className={ css('cart__total', 'cart--col') }>
                <div className={ css('cart__group', 'cart--right') }>
                  { `$${item.price * item.count}` }
                </div>
              </div>
            </li>
          );
        })
      }
      <li className={ css('cart__item-list') }>
        <div className={ css('cart__total-title', 'cart--col') }>
          <div className={ css('cart__group') }>
            Total
          </div>
        </div>
        <div className={ css('cart__total', 'cart--col', 'cart__total-account') }>
          <div className={ css('cart__group', 'cart--right') }>
            { `$${getTotal(cart)}` }
          </div>
        </div>
      </li>
    </ul>
  );
}

export default CartList;
