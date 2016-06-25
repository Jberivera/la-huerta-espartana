import React from 'react';
import { connect } from 'react-redux';
import style from './Nav.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router';

const css = classNames.bind(style);

import { Login } from '../';
import Dropdown from './Dropdown';
import NavBtn from './NavBtn';

import affix from '../../js/affix';

const menu = [
  {
    label: 'Mercado',
    to: '/mercado',
    btnBackground: '/app/assets/img/mercado.jpg'
  }
];

const Nav = ({ pathname }) => {
  return (
    <div className={ css('nav') } onClick={ unCheckRadios } ref={(elem) => { affix(elem, 1) }}>
      <div className={ css('nav-logo') }>
        <h1 className={ css('nav-title') }>
          La Huerta Espartana
        </h1>
        <img src="/app/assets/img/logo.png" className={ css('logo-img') }></img>
      </div>
      <ul className={ css('menu') } >
        {
          menu.map((item, i) => {
            return (
              item.to ?
              <NavBtn
                key={ i }
                label={ item.label }
                to={ item.to }
                btnBackground={ item.btnBackground }
                pathname={ pathname === item.to } /> :
              <Dropdown key={ i } label={ item.label } >
                <ul>
                  {
                    item.children.map(({ to, label }, i) => (
                      <li key={ i }>
                        <Link to={ to }>{ label }</Link>
                      </li>
                    ))
                  }
                </ul>
              </Dropdown>
            )
          })
        }
      </ul>
      <Login />
    </div>
  );
};

function unCheckRadios(e) {

  if (e.target.getAttribute('data-uncheck')) {

    const radio = e.target.parentNode.querySelector('input');

    if (radio.checked) {
      radio.checked = false;
      e.preventDefault();
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    pathname: state.routing.locationBeforeTransitions ? state.routing.locationBeforeTransitions.pathname : '/'
  };
};

export { Nav };
export default connect(mapStateToProps, null)(Nav);
