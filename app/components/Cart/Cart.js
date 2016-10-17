import React, { Component } from 'react';
import style from './Cart.scss';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const css = classNames.bind(style);

import { setInputValue } from '../../js/view/datepicker';
import {
  addToCar,
  removeFromCar
} from '../../actions/action-creators';

import DatePick from '../DatePick/DatePick';
import CartList from './CartList';
import CartOrder from './CartOrder';
import EmptyCart from './EmptyCart';

class Cart extends Component {
  constructor (props) {
    super(props);

    this.carHandler = this.carHandler.bind(this);
    this.removeFromCarHandler = this.removeFromCarHandler.bind(this);
  }

  carHandler (e) {
    const { target } = e;
    const itemContainer = target.parentNode;
    const plus = target.getAttribute('data-handler') === 'add' ? 1 : -1;
    let item = itemContainer.getAttribute('data-item');
    item = JSON.parse(item);
    item.count = findCount(this.props.cart, item.id) + plus;

    if (item.count === 0) {
      this.props.addToCar(item);
      itemContainer.classList.add(css('cart--delete'));
    } else if (item.count > 0) {
      this.props.addToCar(item);
      itemContainer.classList.remove(css('cart--delete'));
    }
  }

  removeFromCarHandler (e) {
    const { target } = e;
    const itemContainer = target.parentNode;
    let item = itemContainer.getAttribute('data-item');
    item = JSON.parse(item);
    this.props.removeFromCar(item);
  }

  render () {
    const { cart, date, message } = this.props;

    if (!cart.length) return (<EmptyCart message={ message } />);

    return (
      <div className={ css('cart') }>
        <h1 className={ css('h1', 'cart__header') }>Carrito</h1>
        <div className={ css('cart__message') }>Revise sus articulos y seleccione una fecha de entrega</div>
        <div className={ css('section-wrapper', 'cart__section-wrapper', 'cart--list') }>
          <CartList cart={ cart } carHandler={ this.carHandler } removeFromCarHandler={ this.removeFromCarHandler }/>
        </div>
        <div className={ css('section-wrapper', 'cart__section-wrapper', 'cart--two-items') }>
          <DatePick date={ date } />
          <CartOrder />
          <div className={ css('cart__date-picker') }>
            <div className={ css('cart__date-mobile') }>
              <label className={ css('cart__date-label') }>Seleccione una fecha de entrega</label>
              <input className={ css('cart__date-input') } type="date" defaultValue={ setInputValue(date) } />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function findCount(cart, i) {
  const cartItem = cart.find((cartItem) => cartItem.id === i);

  return cartItem ? cartItem.count : 1;
}

const mapStateToProps = (state, ownProps) => {
  return {
    cart: state.cart.map((item) => {
      return Object.assign({}, item, state.inventory[item.id]);
    }),
    date: state.date,
    message: state.message
  };
};

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
  addToCar,
  removeFromCar
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
