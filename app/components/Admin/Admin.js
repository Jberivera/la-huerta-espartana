import React, { Component } from 'react';
import style from './Admin.scss';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const css = classNames.bind(style);

import { database } from '../../js/api';
import latinize from '../../js/utils/latinize';

import {
  addToCar,
  removeFromCar
} from '../../actions/action-creators';

class Admin extends Component {
  constructor (props) {
    super(props);
    this.getAdmin = this.getAdmin.bind(this);
    this.searchProduct = this.searchProduct.bind(this);

    this.state = {};
  }

  getAdmin (snapshot) {
    this.setState({
      admin: snapshot.val()
    });
  }

  addProduct (e) {
    const { productName } = e.target;

    e.preventDefault();
  }

  updateProduct (e) {

    e.preventDefault();
  }

  searchProduct (e) {
    const value = this._inputSearch.value;
    const { inventory } = this.props;

    const search = Object.keys(inventory).find((key) => {
      return latinize(inventory[key].productName.toLowerCase()) === latinize(value.toLowerCase());
    });

    this.setState({
      search: {
        type: inventory[search].type
      }
    });
    this._inputProductName.value = inventory[search].productName;
    this._inputProductPrice.value = inventory[search].price;
    this._inputProductUnits.value = inventory[search].units;
    this._inputProductImg.value = inventory[search].imgUrl;
  }

  render () {
    const { uid, filters } = this.props;
    const { admin, search } = this.state;

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
            <input type="text"
              ref={ (c) => this._inputSearch = c }
              placeholder="Nombre del producto"
              className={ css('admin__search-input') } />
            <i className={ css('material-icons', 'admin__search-icon') } onClick={ this.searchProduct }>search</i>
          </div>
          <form id="update-product" noValidate onSubmit={ this.updateProduct }>
            <h2 className={ css('admin__form-header') }>Editar producto</h2>
            <div className={ css('admin__input-container') }>
              <input id="update-product__name"
                className={ css('admin__input') }
                ref={ (c) => this._inputProductName = c }
                type="text"
                pattern="\S"
                name="productName"
                title="Nombre del producto" />
              <label className={ css('admin__label') } htmlFor="update-product__name">Nombre del producto</label>
            </div>
            <div className={ css('admin__input-container') }>
              <input id="update-product__price"
                className={ css('admin__input') }
                ref={ (c) => this._inputProductPrice = c }
                type="text"
                pattern="\S"
                name="productPrice"
                title="Precio del producto" />
              <label className={ css('admin__label') } htmlFor="update-product__price">Precio</label>
            </div>
            <div className={ css('admin__input-container') }>
              <input id="update-product__units"
                className={ css('admin__input') }
                ref={ (c) => this._inputProductUnits = c }
                type="text"
                pattern="\S"
                name="productUnits"
                title="Unidades del producto" />
              <label className={ css('admin__label') } htmlFor="update-product__units">Unidades</label>
            </div>
            <div className={ css('admin__input-container') }>
              <input id="update-product__imgUrl"
                ref={ (c) => this._inputProductImg = c }
                className={ css('admin__input') }
                type="text"
                pattern="\S"
                name="productImageUrl"
                title="Imagen del producto" />
              <label className={ css('admin__label') } htmlFor="update-product__imgUrl">Imagen URL</label>
            </div>
            <div className={ css('admin__input-container') }>
              <select name="productType" className={ css('admin__select') }>
                {
                  Object.keys(filters).slice(1).map((key) => {
                    return (
                      <option key={ key } selected={ search && search.type === filters[key] && 'selected' } value={ filters[key] }>{ filters[key] }</option>
                    );
                  })
                }
              </select>
            </div>
            <input type="submit" className={ css('admin__submit', 'btn--primary') } value="Actualizar"/>
            <input type="submit" className={ css('admin__submit', 'btn--danger') } value="Borrar" onClick={(e) => {
              e.preventDefault();
              console.log('melo');
            }}/>
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
            <input type="submit" className={ css('admin__submit', 'btn--success') } value="Agregar"/>
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
    inventory: state.inventory.data,
    filters: state.inventory.filters,
    uid: state.user.res && state.user.res.uid
  };
};

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
  addToCar,
  removeFromCar
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
