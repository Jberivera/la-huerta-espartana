import React, { Component } from 'react';
import style from './Cart.scss';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const css = classNames.bind(style);

import getTotal from '../../js/utils/composed/getCurrency-reduceTotal';
import DatePick from '../DatePick/DatePick';

class Cart extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    const { cart } = this.props;

    return (
      <div className={ css('cart') }>
        <div className={ css('cart__title') }>{ cart.length ? 'Estos son sus articulos' : 'No hay nada en el carrito' }</div>
        <ul className={ css('cart__item-container') }>
          <li className={ css('cart__item-list') }>
            <div className={ css('cart__product-name', 'cart--col') }>Producto</div>
            <div className={ css('cart__count', 'cart--col') }>Cantidad</div>
            <div className={ css('cart__price', 'cart--col') }></div>
            <div className={ css('cart__units', 'cart--col') }>Precio</div>
            <div className={ css('cart__total', 'cart--col') }>Total</div>
          </li>
          {
            cart.map((item, i) => {
              return (
                <li key={ i } className={ css('cart__item-list') }>
                  <div className={ css('cart__product-name', 'cart--col') }>{ item.productName }</div>
                  <div className={ css('cart__count', 'cart--col') }>{ item.count }</div>
                  <div className={ css('cart__price', 'cart--col') }>{ `${item.price.toString().replace(/(\d{3})$/g, '.$1')}` }</div>
                  <div className={ css('cart__units', 'cart--col') }>{ item.units }</div>
                  <div className={ css('cart__total', 'cart--col') }>{ item.price * item.count }</div>
                </li>
              );
            })
          }
          <li className={ css('cart__item-list') }>
            <div className={ css('cart__product-name', 'cart--col') }>Total</div>
            <div className={ css('cart__count', 'cart--col') }></div>
            <div className={ css('cart__price', 'cart--col') }></div>
            <div className={ css('cart__units', 'cart--col') }></div>
            <div className={ css('cart__total', 'cart--col') }>{ `$ ${getTotal(cart)}` }</div>
          </li>
        </ul>
        <div className={ css('cart__date-picker') }>
          <DatePick />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    cart: state.cart.map((item) => {
      return Object.assign({}, item, state.inventory[item.id]);
    })
  };
};

export default connect(mapStateToProps, null)(Cart);
