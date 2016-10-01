import React, { Component } from 'react';
import style from './Cart.scss';
import classNames from 'classnames/bind';

const css = classNames.bind(style);

function EmptyCart ({ message }) {
  return (
    <div className={ css('cart') }>
      <h1 className={ css('cart__header') }>Carrito</h1>
      <div className={ css('message') }>
      {
        message ?
        <p className={ css(`message__box message--${message.type}`) }>{ message.text }</p>
        :
        <p className={ css('message__box message--error') }>El carrito esta vacio</p>
      }
      </div>
    </div>
  );
}

export default EmptyCart;
