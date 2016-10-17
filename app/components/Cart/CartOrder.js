import React, { Component } from 'react';
import style from './Cart.scss';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  addNewOrderAsync
} from '../../actions/inventory-action-creators';

const css = classNames.bind(style);

import getTotal from '../../js/utils/composed/getCurrency-reduceTotal';

class CartOrder extends Component {
  constructor (props) {
    super(props);
    this.addOrderHandler = this.addOrderHandler.bind(this);
  }

  addOrderHandler (e) {
    const { addNewOrderAsync, cart, user, date } = this.props;
    let { uid, direction } = user;
    if (!uid) return;
    if (!this._inputDirection.value) return;

    if (direction && (direction.main === this._inputDirection.value && direction.aditional === this._inputAditional.value)) {
      direction = { noSet: true };
    } else {
      direction = {
        main: this._inputDirection.value,
        aditional: this._inputAditional.value
      };
    }

    addNewOrderAsync({
      total: getTotal(cart),
      date: new Date().toISOString(),
      dateOfDelivery: date,
      list: cart
    }, uid, direction);
  }

  render () {
    let { uid, direction } = this.props.user;
    direction = direction || {};

    return (
      <div className={ css('cart-order') }>
        <div className={ css('cart-order__wrapper') }>
          <div className={ css('cart-order__input-container') }>
            <input id="direction"
              ref={ (c) => this._inputDirection = c }
              defaultValue={ direction.main }
              placeholder="Carrera, Calle, Transversal, Circular"
              className={ css('cart-order__input', 'cart-order--direction') }
              type="text"
              pattern="\S" />
            <label className={ css('cart-order__label') } htmlFor="direction">Dirección</label>
          </div>
          <div className={ css('cart-order__input-container') }>
            <input id="adicional"
              ref={ (c) => this._inputAditional = c }
              defaultValue={ direction.aditional }
              placeholder="Barrio, Unidad, Edificio, Apartamento"
              className={ css('cart-order__input', 'cart-order--aditional') }
              type="text"
              pattern="\S" />
            <label className={ css('cart-order__label') } htmlFor="adicional">Información Adicional</label>
          </div>
          <button className={ css('cart-order__btn') } onClick={ this.addOrderHandler }>Hacer pedido</button>
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
    date: state.date.toISOString(),
    user: state.user.res && { uid: state.user.res.uid, direction: state.user.res.direction }
  };
};

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
  addNewOrderAsync
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CartOrder);
