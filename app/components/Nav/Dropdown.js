import React from 'react';
import style from './Nav.scss';
import classNames from 'classnames/bind';

const css = classNames.bind(style);

function Dropdown({ label, children }) {
  return (
    <li className={ css('menu-item') }>
      <input type="radio" className={ css('status-check', 'hidden') } name="nav-menu-dropdown" id={`dropdown-${label}`} />
      <label className={ css('menu-label', 'drp') } data-uncheck htmlFor={`dropdown-${label}`}>
        <span className={ css('menu-label-dropdown') }>{ label }</span>
      </label>
      <div className={ css('dropdown') }>
        { children }
      </div>
    </li>
  );
}

export default Dropdown;
