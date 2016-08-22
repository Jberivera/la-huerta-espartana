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
    const { cart, filterChange, filter } = this.props;

    return (
      <div className={ css('market__nav') } ref={ this.affixNav }>
        <span className={ css('market__filters') } onClick={ this.filterHandler }>
          <div className={ css('market__filters-container') }>
            <span className={ css('market__filter', filter === 'all' && 'active') } data-filter='all'>Todos</span>
            <span className={ css('market__filter', filter === 'verduras' && 'active') } data-filter='verduras'>Verduras</span>
            <span className={ css('market__filter', filter === 'granos' && 'active') } data-filter='granos'>Granos</span>
          </div>
        </span>
        <span className={ css('market__shopping-cart') }>
          <span className={ css('market__total-cart') }>{ `$ ${getTotal(cart)}` }</span>
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
    }),
    filter: state.filters
  };
};

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
  filterChange
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MarketNav);
