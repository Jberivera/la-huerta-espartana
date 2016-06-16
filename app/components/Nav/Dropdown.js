import React from 'react';
import style from './Nav.scss';
import classNames from 'classnames/bind';

const css = classNames.bind(style);

function Dropdown({ label, children }) {
  return (
    <li className={ css('menu-item') }>
      <label className={ css('menu-label', 'drp') } data-uncheck>
        <span className={ css('menu-label-dropdown') }>{ label }</span>
      </label>
      <div className={ css('dropdown') }>
        { children }
      </div>
    </li>
  );
}

export default Dropdown;
