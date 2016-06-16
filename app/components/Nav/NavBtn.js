import React from 'react';
import style from './Nav.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router';

const css = classNames.bind(style);

function NavBtn({ label, checked, to, pathname }) {
  return (
    <li className={ css('menu-item', pathname ? 'active' : null) }>
      <label className={ css('menu-label', 'btn') }>
        <Link to={ to } className={ css('menu-label-btn') }>{ label }</Link>
      </label>
    </li>
  );
}

export default NavBtn;
