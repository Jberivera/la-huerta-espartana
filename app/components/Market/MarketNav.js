import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import style from './Market.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router';
import {
  filterChange
} from '../../actions/action-creators';

const css = classNames.bind(style),
  AFFIX_TOP = 216;

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
      affix(nav, {
        offsetTop: AFFIX_TOP,
        fixTop: 60
      });
    }
  }

  filterHandler (e) {
    const { target } = e,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
      filterName = target.getAttribute('data-filter');

    filterName && this.props.filterChange(filterName);

    if (scrollTop > AFFIX_TOP + 50) {
      window.scrollTo(0, AFFIX_TOP);
    }
  }

  render () {
    const { cart, filterChange, filter } = this.props;

    return (
      <div className={ css('market__nav-container') }>
        <div className={ css('market__nav') } ref={ this.affixNav }>
          <div className={ css('market__filters') } onClick={ this.filterHandler }>
            <div className={ css('market__filters-container') }>
              <span className={ css('market__filter', filter === 'all' && 'market__filter--active') } data-filter='all'>Todos</span>
              <span className={ css('market__filter', filter === 'verduras' && 'market__filter--active') } data-filter='verduras'>Verduras</span>
              <span className={ css('market__filter', filter === 'granos' && 'market__filter--active') } data-filter='granos'>Granos</span>
            </div>
          </div>
          <div className={ css('market__shopping-cart') }>
            <span className={ css('market__total-cart') }>{ `$ ${getTotal(cart)}` }</span>
            <ShoppingCartBtn />
          </div>
        </div>
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
