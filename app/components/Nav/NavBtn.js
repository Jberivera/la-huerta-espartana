import React from 'react';
import style from './Nav.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router';

const css = classNames.bind(style);

const mq = window.matchMedia('(min-width: 640px)');

function NavBtn({ label, checked, to, pathname, btnBackground, onClick, className }) {

  function onClickHandler() {
    if (!mq.matches) {
      setTimeout(() => {
        var hamburger = document.querySelector('#hamburger');
        hamburger.checked = false;
      }, 250);
    }
    if (typeof onClick === 'function') {
      onClick();
    }
  }

  return (
    <li className={ css('nav__menu-item', className, pathname ? 'active' : null) } onClick={ onClickHandler }>
      <label className={ css('nav__menu-label', 'btn') }>
        <Link to={ to } className={ css('nav__menu-btn', 'link-top') } >
          { btnBackground
            ?
            <img src={ btnBackground } className={ css('nav__btn-background', 'link-top') }></img>
            :
            <div className={ css('nav__btn-background', 'link-top') }></div>
          }
          <div className={ css('nav__btn-slide', 'link-top') }></div>
          <p className={ css('nav__label-name', 'link-top') }>{ label }</p>
        </Link>
      </label>
    </li>
  );
}

export default NavBtn;
