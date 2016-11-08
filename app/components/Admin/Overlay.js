import React, { Component } from 'react';
import style from './Admin.scss';
import classNames from 'classnames/bind';

const css = classNames.bind(style);

import getCurrency from '../../js/utils/getCurrency';
import { getDateValue } from '../../js/view/datepicker';

function Overlay ({ overlay, order, closeOverlay }) {
  const list = order && order.list;

  return (
    overlay
    ?
    <div className={ css('admin__overlay') }>
      <i className={ css('material-icons', 'admin__close-detail') } onClick={ closeOverlay }>highlight_off</i>
      <div className={ css('admin__overlay-container') }>
        <div className={ css('admin__user-info') }>Cliente: { order.userName }</div>
        <div className={ css('admin__user-info') }>Tel: { order.direction.tel }</div>
        <ul className={ css('admin__items-container', 'admin--overlay-first') }>
          <li className={ css('admin__item-list') }>
            <div className={ css('col', 'admin__date') }>Fecha Pedido</div>
            <div className={ css('col', 'admin__date') }>Fecha Entrega</div>
            <div className={ css('col', 'admin__direction') }>Dirección</div>
            <div className={ css('col', 'admin__total') }>Total</div>
            <div className={ css('col', 'admin__detail') }></div>
          </li>
          <li className={ css('admin__item-list') }>
            <div className={ css('col', 'admin__date') }>{ getDateValue(new Date(order.date)) }</div>
            <div className={ css('col', 'admin__date') }>{ getDateValue(new Date(order.dateOfDelivery)) }</div>
            <div className={ css('col', 'admin__direction') }>{ `${order.direction.main} (${order.direction.aditional})` }</div>
            <div className={ css('col', 'admin__total') }>{ `$${order.total}` }</div>
          </li>
        </ul>
        <div className={ css('admin__detail-wrapper') }>
          <ul className={ css('admin__items-container') }>
            <li className={ css('admin__item-list', 'admin--detail-item-list') }>
              <div className={ css('col', 'admin--detail-item') }>Producto</div>
              <div className={ css('col', 'admin--detail-item') }>Precio</div>
              <div className={ css('col', 'admin--detail-item') }>Cantidad</div>
            </li>
            {
              list && list.map((item, i) => {
                return (
                  <li key={ `detail-${i}` } className={ css('admin__item-list') }>
                    <div className={ css('col', 'admin--detail-item') }>{ item.productName }</div>
                    <div className={ css('col', 'admin--detail-item') }>{ `$${getCurrency(item.price)}` }</div>
                    <div className={ css('col', 'admin--detail-item') }>{ item.count }</div>
                  </li>
                );
              })
            }
          </ul>
        </div>
      </div>
    </div>
    :
    <div></div>
  );
}

export default Overlay;
