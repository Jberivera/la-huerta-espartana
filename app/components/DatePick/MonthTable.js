import React from 'react';
import { connect } from 'react-redux';

import style from './DatePick.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router';

const css = classNames.bind(style);

function ShoppingCartBtn () {

  return (
    <div className={ css('date__month-table') }>
      <div className={ css('cosiaco') }></div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    cartNumber: state.cart.length
  };
};

export default connect(null, null)(ShoppingCartBtn);
