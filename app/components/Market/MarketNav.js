import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import style from './Market.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router';
import {
  filterChange
} from '../../actions/action-creators';

const css = classNames.bind(style);

import ShoppingCartBtn from '../GlobalBtns/ShoppingCartBtn';

import affix from '../../js/view/affix';
import getTotal from '../../js/utils/composed/getCurrency-reduceTotal';

class MarketNav extends Component {
  constructor (props) {
    super(props);
    this.filterHandler = this.filterHandler.bind(this);
  }

  affixNav (nav) {
    if (nav) {
      affix(nav, 217, null, '60px');
    }
  }

  filterHandler (e) {
    const { target } = e;
    const filterName = target.getAttribute('data-filter');
    filterName && this.props.filterChange(filterName);
  }

  render () {
    const { cart, filterChange } = this.props;

    return (
      <div className={ css('market-nav') } ref={ this.affixNav }>
        <span className={ css('filters') } onClick={ this.filterHandler }>
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

const mapStateToProps = (state, ownProps) => {
  return {
    cart: state.cart.map((item) => {
      return Object.assign({}, item, state.inventory[item.id]);
    })
  };
};

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
  filterChange
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MarketNav);
