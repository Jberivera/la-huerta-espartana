import React from 'react';
import style from './Nav.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router';

const css = classNames.bind(style);

function NavBtn({ label, checked, to, pathname, btnBackground, onClick, className }) {

  function onClickHandler() {
    onClick();
  }

  return (
    <li className={ css('menu-item', className, pathname ? 'active' : null) } onClick={ onClickHandler }>
      <label className={ css('menu-label', 'btn') }>
        <Link to={ to } className={ css('menu-label-btn') }>
          { btnBackground ?
            <img src={ btnBackground } className={ css('btn-background') }></img> :
            <div className={ css('btn-background') }></div>
          }
          <div className={ css('btn-slide') }></div>
          <p className={ css('label-name') }>{ label }</p>
        </Link>
      </label>
    </li>
  );
}

export default NavBtn;
