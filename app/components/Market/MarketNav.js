import React, { Component } from 'react';
import { connect } from 'react-redux';
import style from './Market.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router';

const css = classNames.bind(style);

import ShoppingCartBtn from '../GlobalBtns/ShoppingCartBtn';

import affix from '../../js/view/affix';
import getTotal from '../../js/utils/composed/getCurrency-reduceTotal';

class MarketNav extends Component {
  constructor (props) {
    super(props);
  }

  affixNav (nav) {
    if (nav) {
      affix(nav, 217, null, '60px');
    }
  }

  render () {
    const { cart } = this.props;

    return (
      <div className={ css('market-nav') } ref={ this.affixNav }>
        <span className={ css('filters') } onClick={ filterHandler }>
          <div className={ css('filters-container') }>
            <span className={ css('filter') } data-filter='all'>Todos</span>
            <span className={ css('filter') } data-filter='verduras'>Verduras</span>
            <span className={ css('filter') } data-filter='granos'>Granos</span>
          </div>
        </span>
        <span className={ css('shopping-cart') }>
          <span className={ css('total-cart') }>{ `$ ${getTotal(cart)}` }</span>
          <ShoppingCartBtn />
        </span>
      </div>
    );
  }
}

function filterHandler(e) {
  const { target } = e;
  const filterName = target.getAttribute('data-filter');
  console.log(filterName);
}

const mapStateToProps = (state, ownProps) => {
  return {
    cart: state.cart.map((item) => {
      return Object.assign({}, item, state.inventory[item.id]);
    })
  };
};

export default connect(mapStateToProps, null)(MarketNav);
