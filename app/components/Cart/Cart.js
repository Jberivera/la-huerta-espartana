import React, { Component } from 'react';
import style from './Cart.scss';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const css = classNames.bind(style);

import getTotal from '../../js/utils/composed/getCurrency-reduceTotal';

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
            <div className={ css('product-name', 'col') }>Producto</div>
            <div className={ css('count', 'col') }>Cantidad</div>
            <div className={ css('price', 'col') }></div>
            <div className={ css('units', 'col') }>Precio</div>
            <div className={ css('total', 'col') }>Total</div>
          </li>
          {
            cart.map((item, i) => {
              return (
                <li key={ i } className={ css('item-list') }>
                  <div className={ css('product-name', 'col') }>{ item.productName }</div>
                  <div className={ css('count', 'col') }>{ item.count }</div>
                  <div className={ css('price', 'col') }>{ `${item.price.toString().replace(/(\d{3})$/g, '.$1')}` }</div>
                  <div className={ css('units', 'col') }>{ item.units }</div>
                  <div className={ css('total', 'col') }>{ item.price * item.count }</div>
                </li>
              );
            })
          }
          <li className={ css('item-list') }>
            <div className={ css('product-name', 'col') }>Total</div>
            <div className={ css('count', 'col') }></div>
            <div className={ css('price', 'col') }></div>
            <div className={ css('units', 'col') }></div>
            <div className={ css('total', 'col') }>{ `$ ${getTotal(cart)}` }</div>
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
