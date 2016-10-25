import React, { Component } from 'react';
import style from './Admin.scss';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const css = classNames.bind(style);

import { database } from '../../js/api';
import latinize from '../../js/utils/latinize';

import {
  getInventoryAsync
} from '../../actions/inventory-action-creators';

class Admin extends Component {
  constructor (props) {
    super(props);
    this.getAdmin = this.getAdmin.bind(this);
    this.searchProduct = this.searchProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.handlerHideMessage = this.handlerHideMessage.bind(this);

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
    const { search } = this.state;
    const { uid, inventory } = this.props;
    const { productName, price, units, imgUrl, type } = e.target;

    const inputData = {
      productName: productName.value,
      price: price.value,
      units: units.value,
      imgUrl: imgUrl.value,
      type: type.value
    };

    if (search && search.key) {
      const changes = whichHasChanged(inventory[search.key], inputData);

      database.ref(`inventory/data/${search.key}`).update(changes.reduce((a, b) => {
        return a[b] = inputData[b], a;
      }, {}));
      this.props.getInventoryAsync();
    }

    resetInputFields(productName, price, units, imgUrl, type);
    e.preventDefault();
  }

  searchProduct (e) {
    let value = this._inputSearch.value;
    const { inventory } = this.props;

    if (!value) return;
    value = latinize(value.toLowerCase());

    let search = Object.keys(inventory).find((key) => {
      return latinize(inventory[key].productName.toLowerCase()) === value;
    });

    if (!search) {
      search = searchByRegex(value, inventory);
    }
    setSearch.call(this, search, inventory);
  }

  handlerHideMessage (e) {
    this.setState({
      message: null
    });
  }

  render () {
    const { uid, filters } = this.props;
    const { admin, search, message } = this.state;

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
          <span className={ css('admin__message-wrapper') }>{ (message && <span className={ css('admin__message', message.type) } onClick={ this.handlerHideMessage }>{ message.text }<i className={ css('material-icons', 'admin__message-close') }>backspace</i></span>) || '' }</span>
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
                name="price"
                title="Precio del producto" />
              <label className={ css('admin__label') } htmlFor="update-product__price">Precio</label>
            </div>
            <div className={ css('admin__input-container') }>
              <input id="update-product__units"
                className={ css('admin__input') }
                ref={ (c) => this._inputProductUnits = c }
                type="text"
                pattern="\S"
                name="units"
                title="Unidades del producto" />
              <label className={ css('admin__label') } htmlFor="update-product__units">Unidades</label>
            </div>
            <div className={ css('admin__input-container') }>
              <input id="update-product__imgUrl"
                ref={ (c) => this._inputProductImg = c }
                className={ css('admin__input') }
                type="text"
                pattern="\S"
                name="imgUrl"
                title="Imagen del producto" />
              <label className={ css('admin__label') } htmlFor="update-product__imgUrl">Imagen URL</label>
            </div>
            <div className={ css('admin__input-container') }>
              <select name="type" className={ css('admin__select') } ref={ (c) => this._inputProductType = c }>
                {
                  Object.keys(filters).slice(1).map((key) => {
                    return (
                      <option key={ key } selected={ search && search.type === filters[key] && 'selected' } value={ filters[key] }>{ filters[key] }</option>
                    );
                  })
                }
              </select>
            </div>
            <div className={ css('admin__submit-wrapper', search && 'admin--show') }>
              <input type="submit" className={ css('admin__submit', 'btn--primary') } value="Actualizar"/>
              <input type="submit" className={ css('admin__submit', 'btn--danger') } value="Borrar" onClick={(e) => {
                e.preventDefault();
                console.log('melo');
              }}/>
            </div>
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
                name="price"
                title="Precio del producto" />
              <label className={ css('admin__label') } htmlFor="add-product__price">Precio</label>
            </div>
            <div className={ css('admin__input-container') }>
              <input id="add-product__units"
                className={ css('admin__input') }
                type="text"
                pattern="\S"
                name="units"
                title="Unidades del producto" />
              <label className={ css('admin__label') } htmlFor="add-product__units">Unidades</label>
            </div>
            <div className={ css('admin__input-container') }>
              <input id="add-product__imgUrl"
                className={ css('admin__input') }
                type="text"
                pattern="\S"
                name="imgUrl"
                title="Imagen del producto" />
              <label className={ css('admin__label') } htmlFor="add-product__imgUrl">Imagen URL</label>
            </div>
            <div className={ css('admin__input-container') }>
              <select name="type" className={ css('admin__select') }>
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

function whichHasChanged (obj1, obj2) {
  return Object.keys(obj1).reduce((array, key) => {
    return obj1[key].toString() !== obj2[key] && array.push(key), array;
  }, []);
}

function resetInputFields (...inputs) {
  inputs.forEach((input) => {
    input.value = '';
  });
}

function searchByRegex (value, inventory) {
  const regex = new RegExp(`${value}?`);

  const search = Object.keys(inventory).find((key) => {
    return regex.test(latinize(inventory[key].productName.toLowerCase()));
  });

  if (search || value.length === 4) {
    return search;
  }

  return searchByRegex(value.slice(0, length - 1), inventory);
}

function setSearch (search, inventory) {
  const {
    _inputProductName,
    _inputProductPrice,
    _inputProductUnits,
    _inputProductImg,
    _inputProductType
  } = this;

  if (!search) {
    this.setState({
      search: null,
      message: {
        type: 'btn--warning',
        text: 'Sin resultados'
      }
    });
    resetInputFields(_inputProductName, _inputProductPrice, _inputProductUnits, _inputProductImg, _inputProductType);
    return;
  }
  this.setState({
    search: {
      key: search,
      type: inventory[search].type
    },
    message: null
  });
  _inputProductName.value = inventory[search].productName;
  _inputProductPrice.value = inventory[search].price;
  _inputProductUnits.value = inventory[search].units;
  _inputProductImg.value = inventory[search].imgUrl;
}

const mapStateToProps = (state, ownProps) => {
  return {
    inventory: state.inventory.data,
    filters: state.inventory.filters,
    uid: state.user.res && state.user.res.uid
  };
};

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
  getInventoryAsync
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
