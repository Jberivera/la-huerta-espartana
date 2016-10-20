import React from 'react';
import style from './Orders.scss';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { Link } from 'react-router';

const css = classNames.bind(style);

import { getDateValue } from '../../js/view/datepicker';

function Orders ({ orders, children }) {

  return (
    <div className={ css('orders') }>
      <h1 className={ css('h1', 'orders__header') }>Pedidos</h1>
      <div className={ css('section-wrapper', 'orders__section-wrapper') }>
        <ul className={ css('orders__items-container') }>
          <li className={ css('orders__item-list') }>
            <div className={ css('col', 'orders__date') }>Fecha Pedido</div>
            <div className={ css('col', 'orders__date') }>Fecha Entrega</div>
            <div className={ css('col', 'orders__direction') }>Dirección</div>
            <div className={ css('col', 'orders__total') }>Total</div>
            <div className={ css('col', 'orders__detail') }></div>
          </li>
          {
            Object.keys(orders).map((key, i) => {
              return (
                <li key={i} className={ css('orders__item-list') }>
                  <div className={ css('col', 'orders__date') }>{ getDateValue(new Date(orders[key].date)) }</div>
                  <div className={ css('col', 'orders__date') }>{ getDateValue(new Date(orders[key].dateOfDelivery)) }</div>
                  <div className={ css('col', 'orders__direction') }>{ `${orders[key].direction.main} (${orders[key].direction.aditional})` }</div>
                  <div className={ css('col', 'orders__total') }>{ `$${orders[key].total}` }</div>
                  <div className={ css('col', 'orders__detail') }>
                    <Link to={ children && children.props.params.pedidoId === key ? '/pedidos' : `/pedido/${key}` } className={ css('orders__detail-link') }>Detalle</Link>
                  </div>
                </li>
              );
            })
          }
        </ul>
      </div>
      <div className={ css('section-wrapper', 'orders__section-wrapper') }>
        { children }
      </div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    orders: state.orders
  };
};

export default connect(mapStateToProps, null)(Orders);
