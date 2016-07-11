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

class Market extends Component {
  constructor (props) {
    super(props);
    this.addToCarHandler = this.addToCarHandler.bind(this);
  }

  addToCarHandler (e) {
    let item = e.currentTarget.parentNode.getAttribute('data-Item');
    item = JSON.parse(item);
    this.props.addToCar(item);
  }

  render () {
    const { count, onClick, inventory } = this.props;

    return (
      <div className={ css('market') }>
        <Hero backgroundUrl="url(http://artelista.s3.amazonaws.com/obras/big/0/9/7/5913365016626755.jpg)" />
        <ul className={ css('market-container') }>
          {
            inventory.map((item, i) => {
              return (
                <li key={i} className={ css('market-item') }>
                  <div className={ css('item-container') }
                    data-Item={ JSON.stringify({
                      productName: item.productName,
                      id: i
                    }) }>
                    <img src={item.imgUrl} className={ css('item-image') } />
                    <p className={ css('item-name') }>{item.productName}</p>
                    <p className={ css('item-price') }>{`$${item.price.toString().replace(/(\d{3})$/g, '.$1')} ${item.units}`}</p>
                    <div className={ css('add-btn') } onClick={ this.addToCarHandler } >Agregar Producto</div>
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

const mapStateToProps = (state, ownProps) => {
  return {
    inventory: [ ...state.inventory ]
  };
};

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
  addToCar,
  removeFromCar
}, dispatch);

export { Market };
export default connect(mapStateToProps, mapDispatchToProps)(Market);
