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
    let { uid, direction, name } = user;
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
      dateOfDelivery: date,
      userName: name,
      list: removeImgUrl(cart),
      direction: {
        main: this._inputDirection.value,
        aditional: this._inputAditional.value
      }
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
              pattern="\S"
              title="Carrera, Calle, Transversal, Circular" />
            <label className={ css('cart-order__label') } htmlFor="direction">Dirección</label>
          </div>
          <div className={ css('cart-order__input-container') }>
            <input id="aditional"
              ref={ (c) => this._inputAditional = c }
              defaultValue={ direction.aditional }
              placeholder="Barrio, Unidad, Edificio, Apartamento"
              className={ css('cart-order__input', 'cart-order--aditional') }
              type="text"
              pattern="\S"
              title="Barrio, Unidad, Edificio, Apartamento" />
            <label className={ css('cart-order__label') } htmlFor="aditional">Información Adicional</label>
          </div>
          <button className={ css('cart-order__btn') } onClick={ this.addOrderHandler }>Hacer pedido</button>
        </div>
      </div>
    );
  }
}

function removeImgUrl (array) {
  return array.map((obj) => {
    return obj.imgUrl = null, obj;
  });
}

const mapStateToProps = (state, ownProps) => {
  return {
    cart: state.cart.map((item) => {
      return Object.assign({}, item, state.inventory.data[item.id]);
    }),
    date: state.date.getTime(),
    user: (state.user.res && { uid: state.user.res.uid, name: state.user.res.name, direction: Object.assign({}, state.user.res.direction) }) || {}
  };
};

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
  addNewOrderAsync
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CartOrder);
