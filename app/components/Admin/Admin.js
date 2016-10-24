import React, { Component } from 'react';
import style from './Admin.scss';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const css = classNames.bind(style);

import { database } from '../../js/api';

import {
  addToCar,
  removeFromCar
} from '../../actions/action-creators';

class Admin extends Component {
  constructor (props) {
    super(props);
    this.getAdmin = this.getAdmin.bind(this);

    this.state = {};
  }

  getAdmin (snapshot) {
    this.setState({
      admin: snapshot.val()
    });
  }

  addProduct (e) {
    const { productName } = e.target;

    console.log(productName);
    e.preventDefault();
  }

  render () {
    const { uid, filters } = this.props;
    const { admin } = this.state;

    if (uid && !admin) {
      database
        .ref(`users/${uid}/is_admin`)
        .once('value')
        .then(this.getAdmin);
    }

    return (
      admin
      ?
      <div className={ css('admin') }>
        <h1 className={ css('h1', 'admin__header') }>Admin</h1>
        <div className={ css('section-wrapper', 'admin__section-wrapper') }>
          <div className={ css('admin__search-wrapper') }>
            <input type="text" placeholder="Nombre del producto" className={ css('admin__search-input') } />
            <i className={ css('material-icons', 'admin__search-icon') }>search</i>
          </div>
          <form id="add-product" noValidate onSubmit={ this.addProduct }>
            <h2 className={ css('admin__form-header') }>Editar producto</h2>
          </form>
        </div>
        <div className={ css('section-wrapper', 'admin__section-wrapper') }>
          <form id="add-product" noValidate onSubmit={ this.addProduct }>
            <h2 className={ css('admin__form-header') }>Agregar nuevo producto en el inventario</h2>
            <div className={ css('admin__input-container') }>
              <input id="add-product__name"
                className={ css('admin__input') }
                type="text"
                pattern="\S"
                name="productName"
                title="Nombre del producto" />
              <label className={ css('admin__label') } htmlFor="add-product__name">Nombre del producto</label>
            </div>
            <div className={ css('admin__input-container') }>
              <input id="add-product__price"
                className={ css('admin__input') }
                type="text"
                pattern="\S"
                name="productPrice"
                title="Precio del producto" />
              <label className={ css('admin__label') } htmlFor="add-product__price">Precio</label>
            </div>
            <div className={ css('admin__input-container') }>
              <input id="add-product__units"
                className={ css('admin__input') }
                type="text"
                pattern="\S"
                name="productUnits"
                title="Unidades del producto" />
              <label className={ css('admin__label') } htmlFor="add-product__units">Unidades</label>
            </div>
            <div className={ css('admin__input-container') }>
              <input id="add-product__imgUrl"
                className={ css('admin__input') }
                type="text"
                pattern="\S"
                name="productImageUrl"
                title="Imagen del producto" />
              <label className={ css('admin__label') } htmlFor="add-product__imgUrl">Imagen URL</label>
            </div>
            <div className={ css('admin__input-container') }>
              <select name="productType" className={ css('admin__select') }>
                {
                  Object.keys(filters).slice(1).map((key) => {
                    return (
                      <option key={ key } value={ filters[key] }>{ filters[key] }</option>
                    );
                  })
                }
              </select>
            </div>
            <input type="submit" className={ css('admin__submit') } value="Agregar"/>
          </form>
        </div>
      </div>
      :
      <div></div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    filters: state.inventory.filters,
    uid: state.user.res && state.user.res.uid
  };
};

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
  addToCar,
  removeFromCar
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
