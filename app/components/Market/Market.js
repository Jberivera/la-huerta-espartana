import React, { Component } from 'react';
import style from './Market.scss';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  addToCar,
  removeFromCar
} from '../../actions/action-creators';

const css = classNames.bind(style);

import Hero from '../Hero/Hero';
import MarketNav from './MarketNav';

import getCurrency from '../../js/utils/getCurrency';

class Market extends Component {
  constructor (props) {
    super(props);
    this.addToCarHandler = this.addToCarHandler.bind(this);
    this.removeFromCarHandler = this.removeFromCarHandler.bind(this);
  }

  addToCarHandler (e) {
    const oneBtn = e.currentTarget.classList.contains('add-one-btn');
    let itemContainer, count = 1;

    if (oneBtn) {
      itemContainer = e.currentTarget.parentNode;
      itemContainer.classList.add('added');
    } else {
      itemContainer = e.currentTarget.parentNode.parentNode;
    }

    let item = itemContainer.getAttribute('data-item');
    item = JSON.parse(item);

    item.count = oneBtn ? 1 : findCount(this.props.cart, item.id) + 1;

    this.props.addToCar(item);
  }

  removeFromCarHandler (e) {
    const itemContainer = e.currentTarget.parentNode.parentNode;
    let item = itemContainer.getAttribute('data-item');
    item = JSON.parse(item);

    item.count = findCount(this.props.cart, item.id) - 1;

    if (item.count === 0) {
      this.props.removeFromCar(item);
      itemContainer.classList.remove('added');
    } else {
      this.props.addToCar(item);
    }
  }

  render () {
    const { onClick, inventory, cart, filter } = this.props;

    return (
      <div className={ css('market') }>
        <Hero backgroundUrl="url(http://artelista.s3.amazonaws.com/obras/big/0/9/7/5913365016626755.jpg)" />
        <MarketNav />
        <ul className={ css('market__items-container') }>
          {
            inventory.map((item, i) => {
              return (
                <li key={i} className={ css('market__item', filter === 'all' || item.type === filter || 'market__item--hide') } >
                  <div className={ css('market__item-group', cart.some((cartItem) => cartItem.id === i) && 'added') }
                    data-item={ JSON.stringify({
                      productName: item.productName,
                      id: i
                    }) }>
                    <img src={item.imgUrl} className={ css('market__item-image') } />
                    <p className={ css('market__item-name') }>{item.productName}</p>
                    <p className={ css('market__item-price') }>{`$ ${getCurrency(item.price)} ${item.units}`}</p>
                    <div className={ css('market__add-one-btn', 'add-one-btn') } onClick={ this.addToCarHandler } >Agregar Producto</div>
                    <div className={ css('market__add-remove-container') }>
                      <i className={ css('market__cart-btn', 'material-icons') } onClick={ this.removeFromCarHandler } >remove_shopping_cart</i>
                      <span className={ css('market__cart-count') }>{ findCount(cart, i) }</span>
                      <i className={ css('market__cart-btn', 'material-icons') } onClick={ this.addToCarHandler }>add_shopping_cart</i>
                    </div>
                  </div>
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}

function findCount(cart, i) {
  const cartItem = cart.find((cartItem) => cartItem.id === i);

  return cartItem ? cartItem.count : 1;
}

const mapStateToProps = (state, ownProps) => {
  return {
    inventory: [ ...state.inventory ],
    cart: [ ...state.cart ],
    filter: state.filters
  };
};

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
  addToCar,
  removeFromCar
}, dispatch);

export { Market };
export default connect(mapStateToProps, mapDispatchToProps)(Market);
