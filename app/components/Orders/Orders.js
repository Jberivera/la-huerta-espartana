import React from 'react';
import style from './Orders.scss';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';

const css = classNames.bind(style);

import { getDateValue } from '../../js/view/datepicker';

function Order ({ orders }) {
  return (
    <div className={ css('orders') }>
      <h1 className={ css('h1', 'orders__header') }>Pedidos</h1>
      <div className={ css('section-wrapper', 'orders__section-wrapper') }>
        <ul className={ css('orders__items-container') }>
          {
            Object.keys(orders).map((item, i) => {
              return (
                <li key={i} className={ css('orders__item-list') }>
                  <div className={ css('orders--col') }>{ getDateValue(new Date(orders[item].date)) }</div>
                  <div className={ css('orders--col') }>{ getDateValue(new Date(orders[item].dateOfDelivery)) }</div>
                  <div className={ css('orders--col') }>{orders[item].total}</div>
                </li>
              );
            })
          }
        </ul>
      </div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    orders: state.orders
  };
};

export default connect(mapStateToProps, null)(Order);
