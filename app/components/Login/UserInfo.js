import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import style from './Login.scss';
import classNames from 'classnames/bind';

const css = classNames.bind(style);

const UserInfo = ({ userName, onFacebookOut, cartNumber }) => {
  return (
    <div>
      <div className={ css('user-name') } >{ userName }</div>
      <div>
        <Link to="/carrito" className={ css('cart', 'material-icons') }>
          shopping_cart
          <span className={ css('cart-number') }>{ cartNumber }</span>
        </Link>
      </div>
      <div className={ css('fb-logout') } onClick={ onFacebookOut }>Logout</div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    cartNumber: state.cart.length
  };
};

export default connect(mapStateToProps, null)(UserInfo);
