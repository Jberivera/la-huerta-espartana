import React, { Component } from 'react';
import { connect } from 'react-redux';
import style from './Nav.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';

import {
  getInventoryAsync
} from '../../actions/inventory-action-creators';

const css = classNames.bind(style);

import { Login } from '../';
import NavBtn from './NavBtn';

import affix from '../../js/view/affix';

const menu = [
  {
    label: 'Home',
    to: '/'
  },
  {
    label: 'Mercado',
    to: '/mercado',
    btnBackground: '/app/assets/img/aqua.gif'
  }
];

class Nav extends Component {
  constructor (props) {
    super(props);
  }

  affixNav (nav) {
    if (nav) {
      affix(nav, 63, 1);
    }
  }

  render () {
    const { pathname, getInventoryAsync } = this.props;

    return (
      <div className={ css('nav') } onClick={ unCheckRadios } ref={ this.affixNav } >
        <div className={ css('nav-logo') }>
          <h1 className={ css('nav-title') }>
            La Huerta Espartana
          </h1>
          <Link to="/">
            <img src="/app/assets/img/logo.png" className={ css('logo-img') }></img>
          </Link>
        </div>
        <ul className={ css('menu') } >
          <Login />
          <NavBtn label="Home" to="/" btnBackground="" pathname={ pathname === '/' } className="home-btn" />
          <NavBtn label="Mercado" to="/mercado" btnBackground="/app/assets/img/aqua.gif" pathname={ pathname === '/mercado' } onClick={ getInventoryAsync } />
        </ul>
      </div>
    );
  }
}

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

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
  getInventoryAsync
}, dispatch);

export { Nav };
export default connect(mapStateToProps, mapDispatchToProps)(Nav);
