import React, { Component } from 'react';
import style from './Cart.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router';

const css = classNames.bind(style);

function EmptyCart ({ message }) {
  const { link } = message || {};

  return (
    <div className={ css('cart') }>
      <h1 className={ css('cart__header') }>Carrito</h1>
      <div className={ css('message') }>
      {
        message ?
        <p className={ css(`message__box message--${message.type}`) }>
          { message.text }
          { ' ' }
          { link && <Link to={ link.to } className={ css('message__link') }>{ link.text }</Link> }
        </p>
        :
        <p className={ css('message__box message--error') }>
          El carrito esta vacio, dirígete al <Link to='/mercado' className={ css('message__link') }>Mercado</Link>
        </p>
      }
      </div>
    </div>
  );
}

export default EmptyCart;
