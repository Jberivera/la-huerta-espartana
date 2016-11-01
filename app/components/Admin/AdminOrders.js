import React, { Component } from 'react';
import style from './Admin.scss';
import classNames from 'classnames/bind';

const css = classNames.bind(style);

import { getDateValue } from '../../js/view/datepicker';

const today = new Date();
today.setHours(0, 0, 0, 0);

const tomorrow = new Date();
tomorrow.setHours(0, 0, 0, 0);
tomorrow.setDate(today.getDate() + 1);

function AdminOrders ({ detailHandler, orders, menuHandler }) {
  return (
    <div className={ css('section-wrapper', 'admin__section-wrapper', 'admin--order-section') }>
      <div className={ css('admin__orders-menu') } onClick={ menuHandler }>
        <div className={ css('admin__btn', 'btn--primary', 'js-btn') } data-btn={ today.getTime() }>Hoy</div>
        <div className={ css('admin__btn', 'btn--primary', 'js-btn') } data-btn={ tomorrow.getTime() }>Mañana</div>
        <div className={ css('admin__search-wrapper') }>
          <input type="date"
            className={ css('admin__search-input', 'js-input') } />
          <i className={ css('material-icons', 'admin__search-icon', 'js-search') }>search</i>
        </div>
      </div>
      <ul onClick={ detailHandler }>
        <li className={ css('admin__item-list') }>
          <div className={ css('col', 'admin__date') }>Fecha Pedido</div>
          <div className={ css('col', 'admin__date') }>Fecha Entrega</div>
          <div className={ css('col', 'admin__direction') }>Dirección</div>
          <div className={ css('col', 'admin__total') }>Total</div>
          <div className={ css('col', 'admin__detail') }></div>
        </li>
        {
          orders && Object.keys(orders).map((key, i) => {
            return (
              <li key={i} className={ css('admin__item-list') }>
                <div className={ css('col', 'admin__date') }>{ getDateValue(new Date(orders[key].date)) }</div>
                <div className={ css('col', 'admin__date') }>{ getDateValue(new Date(orders[key].dateOfDelivery)) }</div>
                <div className={ css('col', 'admin__direction') }>{ `${orders[key].direction.main} (${orders[key].direction.aditional})` }</div>
                <div className={ css('col', 'admin__total') }>{ `$${orders[key].total}` }</div>
                <div className={ css('col', 'admin__detail') }>
                  <span className={ css('admin__detail-link', 'admin--detail') } data-key={ key }>Detalle</span>
                </div>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
}

export default AdminOrders;
