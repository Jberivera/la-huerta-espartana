import React, { Component } from 'react';
import style from './Cart.scss';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const css = classNames.bind(style);

import getCurrencyReduceTotal from '../../js/utils/composed/getCurrency-reduceTotal';;

class Cart extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    const { cart } = this.props;

    return (
      <div className={ css('cart') }>
        <div className={ css('title') }>{ cart.length ? 'Estos son sus articulos' : 'No hay nada en el carrito' }</div>
        <ul className={ css('item-container') }>
          <li className={ css('item-list') }>
            <span className={ css('product-name', 'col') }>Producto</span>
            <span className={ css('count', 'col') }>Cantidad</span>
            <span className={ css('price', 'col') }></span>
            <span className={ css('units', 'col') }>Precio</span>
            <span className={ css('total', 'col') }>Total</span>
          </li>
          {
            cart.map((item, i) => {
              return (
                <li key={ i } className={ css('item-list') }>
                  <span className={ css('product-name', 'col') }>{ item.productName }</span>
                  <span className={ css('count', 'col') }>{ item.count }</span>
                  <span className={ css('price', 'col') }>{ `${item.price.toString().replace(/(\d{3})$/g, '.$1')}` }</span>
                  <span className={ css('units', 'col') }>{ item.units }</span>
                  <span className={ css('total', 'col') }>{ item.price * item.count }</span>
                </li>
              );
            })
          }
          <li className={ css('item-list') }>
            <span className={ css('product-name', 'col') }>Total</span>
            <span className={ css('count', 'col') }></span>
            <span className={ css('price', 'col') }></span>
            <span className={ css('units', 'col') }></span>
            <span className={ css('total', 'col') }>{ `$ ${getCurrencyReduceTotal(cart)}` }</span>
          </li>
        </ul>
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
