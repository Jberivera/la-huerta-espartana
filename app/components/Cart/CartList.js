import React, { Component } from 'react';
import style from './Cart.scss';
import classNames from 'classnames/bind';

const css = classNames.bind(style);

import getTotal from '../../js/utils/composed/getCurrency-reduceTotal';

function CartList ({ cart, carHandler, removeFromCarHandler }) {
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
                <div className={ css('cart__group', 'cart--center', !item.count && 'cart--delete') }
                    data-item={ JSON.stringify({
                      productName: item.productName,
                      id: item.id }) }>
                  <i className={ css('cart__remove', 'material-icons') } data-handler="remove" onClick={ carHandler }>remove_circle_outline</i>
                  <span className={ css('market__cart-count') }>{ item.count }</span>
                  <i className={ css('cart__add', 'material-icons') } data-handler="add" onClick={ carHandler }>add_circle_outline</i>
                  <i className={ css('cart__delete', 'material-icons') } onClick={ removeFromCarHandler }>delete</i>
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
        <div className={ css('cart__total', 'cart--col', 'cart--total-account') }>
          <div className={ css('cart__group', 'cart--right') }>
            <span className={ css('cart__total-text') }>{ `$${getTotal(cart)}` }</span>
          </div>
        </div>
      </li>
    </ul>
  );
}

export default CartList;
