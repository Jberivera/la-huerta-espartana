import React from 'react';
import style from './Orders.scss';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';

const css = classNames.bind(style);

function Order ({ order }) {
  const { list } = order;

  return (
    <div className={ css('orders__detail-container') }>
      <ul className={ css('orders__items-container') }>
        <li className={ css('orders__item-list', 'orders--detail-item-list') }>
          <div className={ css('col', 'orders--detail-item') }>Producto</div>
          <div className={ css('col', 'orders--detail-item') }>Precio</div>
          <div className={ css('col', 'orders--detail-item') }>Cantidad</div>
        </li>
        {
          list && list.map((item, i) => {
            return (
              <li key={ `detail-${i}` } className={ css('orders__item-list') }>
                <div className={ css('col', 'orders--detail-item') }>{ item.productName }</div>
                <div className={ css('col', 'orders--detail-item') }>{ item.price }</div>
                <div className={ css('col', 'orders--detail-item') }>{ item.count }</div>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    order: state.orders[ownProps.params.pedidoId] || {}
  };
};

export default connect(mapStateToProps, null)(Order);;
