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

  addOrderHandler () {
    const { addNewOrderAsync, cart, uid, date } = this.props;
    if (!uid) return;

    addNewOrderAsync({
      total: getTotal(cart),
      date: new Date().toISOString(),
      dateOfDelivery: date,
      list: cart
    }, uid);
  }

  render () {
    return (
      <div className={ css('order') }>
        <div className={ css('order__wrapper') }>
          <div>
            <label htmlFor="direction">Dirección</label>
            <input id="direction" type="text" />
          </div>
          <button className={ css('') } onClick={ this.addOrderHandler }>Hacer pedido</button>
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
    uid: state.user.res && state.user.res.uid
  };
};

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
  addNewOrderAsync
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CartOrder);
