import React, { Component } from 'react';
import style from './Cart.scss';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const css = classNames.bind(style);

import { setInputValue } from '../../js/view/datepicker';

import DatePick from '../DatePick/DatePick';
import CartList from './CartList';
import EmptyCart from './EmptyCart';

class Cart extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    const { cart, date } = this.props;

    if (!cart.length) return (<EmptyCart />);

    return (
      <div className={ css('cart') }>
        <h1 className={ css('cart__header') }>Carrito</h1>
        <div className={ css('cart__message') }>{ 'Revise sus articulos y seleccione una fecha de entrega' }</div>
        <CartList cart={ cart } />
        <div className={ css('cart__date-picker') }>
          <DatePick date={ date } />
          <div className={ css('cart__date-mobile') }>
            <label className={ css('cart__date-label') }>Seleccione una fecha de entrega</label>
            <input className={ css('cart__date-input') } type="date" defaultValue={ setInputValue(date) } />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    cart: state.cart.map((item) => {
      return Object.assign({}, item, state.inventory[item.id]);
    }),
    date: state.date
  };
};

export default connect(mapStateToProps, null)(Cart);
