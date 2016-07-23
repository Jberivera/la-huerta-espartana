import React from 'react';
import style from './Market.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router';

const css = classNames.bind(style);

import ShoppingCartBtn from '../GlobalBtns/ShoppingCartBtn';

function MarketNav () {

  return (
    <div className="market-nav">
      <ShoppingCartBtn />
    </div>
  );
}

export default MarketNav;
