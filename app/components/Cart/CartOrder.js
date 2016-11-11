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

import Message from '../Message/Message';

class CartOrder extends Component {
  constructor (props) {
    super(props);
    this.addOrderHandler = this.addOrderHandler.bind(this);
    this.hideMessageHandler = this.hideMessageHandler.bind(this);

    this.state = {
      message: null
    };
  }

  addOrderHandler (e) {
    const { addNewOrderAsync, cart, user, date, validDate } = this.props;
    let { uid, direction, name } = user;

    if (!uid) {
      requestUserLogin();
      return this.setState({
        message: {
          type: 'btn--warning',
          text: 'Necesitas crear una cuenta primero'
        }
      });
    }

    if (!this._inputDirection.value || !this._inputTel.value) {
      return this.setState({
        message: {
          type: 'btn--warning',
          text: 'La dirección y el telefono son campos necesarios'
        }
      });
    }

    if (direction && (direction.main === this._inputDirection.value && direction.aditional === this._inputAditional.value && direction.tel === this._inputTel.value)) {
      direction = { noSet: true };
    } else {
      direction = {
        main: this._inputDirection.value,
        aditional: this._inputAditional.value,
        tel: this._inputTel.value
      };
    }

    if (validDate) {
      addNewOrderAsync({
        total: getTotal(cart),
        dateOfDelivery: date,
        userName: name,
        list: removeImgUrl(cart),
        direction: {
          main: this._inputDirection.value,
          aditional: this._inputAditional.value,
          tel: this._inputTel.value
        }
      }, uid, direction);
    } else {
      this.setState({
        message: {
          type: 'btn--warning',
          text: 'Seleccione una de las fechas validas en azul'
        }
      });
    }
  }

  hideMessageHandler (e) {
    this.setState({
      message: null
    });
  }

  render () {
    let { uid, direction } = this.props.user;
    const { message } = this.state;
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
          <div className={ css('cart-order__input-container') }>
            <input id="tel"
              ref={ (c) => this._inputTel = c }
              defaultValue={ direction.tel }
              className={ css('cart-order__input') }
              type="text"
              pattern="\S"
              title="Teléfono" />
            <label className={ css('cart-order__label') } htmlFor="tel">Teléfono</label>
          </div>
          <button className={ css('cart-order__btn') } onClick={ this.addOrderHandler }>Hacer pedido</button>
        </div>
        <Message message={ message } messageHandler={ this.hideMessageHandler } />
      </div>
    );
  }
}

function removeImgUrl (array) {
  return array.map((obj) => {
    return obj.imgUrl = null, obj;
  });
}

function requestUserLogin () {
  const account = document.querySelector('.js-account');
  let animationHandler;

  account.classList.add('active-account');

  if (typeof animationHandler !== 'function') {
    animationHandler = function () {
      account.classList.remove('active-account');
      account.removeEventListener('animationend', animationHandler);
      animationHandler = undefined;
    };
    account.addEventListener('animationend', animationHandler);
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    cart: state.cart.map((item) => {
      return Object.assign({}, item, state.inventory.data[item.id]);
    }),
    validDate: state.date.valid,
    date: state.date.delivery.getTime(),
    user: (state.user.res && { uid: state.user.res.uid, name: state.user.res.name, direction: Object.assign({}, state.user.res.direction) }) || {}
  };
};

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
  addNewOrderAsync
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CartOrder);
