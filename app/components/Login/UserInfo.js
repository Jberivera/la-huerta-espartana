import React from 'react';
import { Link } from 'react-router';
import style from './Login.scss';
import classNames from 'classnames/bind';

const css = classNames.bind(style);

import ShoppingCartBtn from '../GlobalBtns/ShoppingCartBtn';

const UserInfo = ({ userName, onFacebookOut }) => {
  return (
    <div className={ css('user') }>
      <div className={ css('user__name') } >{ userName }</div>
      <div className={ css('user__section') }>
        <ShoppingCartBtn />
      </div>
      <div className={ css('user__section') }>
        <Link to="pedidos" className={ css('user__orders-link', 'link-top') }>Mis Pedidos</Link>
      </div>
      <div className={ css('fb-logout', 'link-top') } onClick={ onFacebookOut }>Logout</div>
    </div>
  );
};

export default UserInfo;
