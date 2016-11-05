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
import FindAndEdit from './FindAndEdit';
import AddProduct from './AddProduct';
import Overlay from './Overlay';
import AdminOrders from './AdminOrders';
import AdminFilters from './AdminFilters';

class Admin extends Component {
  constructor (props) {
    super(props);
    this.getAdmin = this.getAdmin.bind(this);
    this.searchProductHandler = this.searchProductHandler.bind(this);
    this.updateProductHandler = this.updateProductHandler.bind(this);
    this.hideMessageHandler = this.hideMessageHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
    this.addProductFormHandler = this.addProductFormHandler.bind(this);
    this.changeMenuHandler = this.changeMenuHandler.bind(this);
    this.detailHandler = this.detailHandler.bind(this);
    this.closeOverlayHandler = this.closeOverlayHandler.bind(this);
    this.saveFiltersHandler = this.saveFiltersHandler.bind(this);
    setOrder = setOrder.bind(this);

    this.state = {
      section: 'Pedidos'
    };
  }

  menuHandler (e) {
    const { target } = e;

    if (target.classList.contains('js-btn')) {
      const dataBtn = Number(target.getAttribute('data-btn'));

      setOrder(dataBtn);
    }

    if (target.classList.contains('js-search')) {
      const value = target.parentNode.querySelector('.js-input').value.replace(/-/g, '/');
      if (value) {
        const date = new Date(value);
        date.setHours(0, 0, 0, 0);
        setOrder(date.getTime());
      }
    }
  }

  getAdmin (snapshot) {
    const admin = snapshot.val();

    this.setState({
      admin: admin
    });

    if (admin) {
      const date = new Date();
      date.setHours(0, 0, 0, 0);

      database.ref('orders')
        .orderByChild('dateOfDelivery')
        .equalTo(date.getTime())
        .limitToFirst(20)
        .once('value')
        .then((snapshot) => {
          this.setState({
            orders: snapshot.val()
          });
        });
    }
  }

  addProductFormHandler (e) {
    const { productName, price, units, imgUrl, type } = e.target;
    const { getInventoryAsync } = this.props;
    const data = {
      productName: productName.value,
      price: price.value,
      units: units.value,
      imgUrl: imgUrl.value,
      type: type.value
    };

    database.ref('inventory/data').push(data, getInventoryAsync);

    resetInputFields(productName, price, units, imgUrl, type);
    e.preventDefault();
  }

  updateProductHandler (e) {
    const { search } = this.state;
    const { uid, inventory, getInventoryAsync } = this.props;
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
      }, {}), getInventoryAsync);
    }

    resetInputFields(productName, price, units, imgUrl, type);
    e.preventDefault();
  }

  searchProductHandler (e) {
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

  hideMessageHandler (e) {
    this.setState({
      message: null
    });
  }

  deleteHandler (e) {
    const { message, search } = this.state;
    const {
      _inputProductName,
      _inputProductPrice,
      _inputProductUnits,
      _inputProductImg,
      _inputProductType
    } = this;

    e.preventDefault();
    if (!search) return;

    if (!message || !message.deleteToggle) {
      this.setState({
        message: {
          type: 'btn--danger',
          deleteToggle: true,
          text: ['click de nuevo en el boton para borrar', <br key="br" />, 'click en este mensaje para cancelar']
        }
      });
      return;
    }

    this.setState({
      search: null,
      message: {
        type: 'btn--success',
        deleteToggle: false,
        text: 'Se elimino permanentemente'
      }
    });

    resetInputFields(_inputProductName, _inputProductPrice, _inputProductUnits, _inputProductImg, _inputProductType);
    database.ref(`inventory/data/${search.key}`).remove().then(() => {
      this.props.getInventoryAsync();
    });
    e.preventDefault();
  }

  changeMenuHandler (e) {
    const { target } = e;

    if (target.classList.contains('js-menu')) {
      this.setState({
        section: target.innerHTML
      });
    }
  }

  detailHandler (e) {
    const { target } = e;
    if (target.classList.contains('admin--detail')) {
      document.body.classList.add('stop-scrolling');
      this.setState({
        overlay: target.getAttribute('data-key')
      });
    }
  }

  closeOverlayHandler (e) {
    document.body.classList.remove('stop-scrolling');
    this.setState({
      overlay: null
    });
  }

  saveFiltersHandler (e) {
    const { target } = e;
    const { getInventoryAsync } = this.props;
    const textarea = target.parentNode.querySelector('.js-textarea');
    const valueArray = textAreaValueToArray(textarea.value);

    database.ref(`inventory/filters`).set(valueArray, getInventoryAsync);
  }

  render () {
    const { uid, filters } = this.props;
    const { admin, search, message, section, orders, overlay } = this.state;

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
        <div className={ css('admin__menu') } onClick={ this.changeMenuHandler }>
          <div className={ css('admin__menu-item', 'js-menu') }>Pedidos</div>
          <div className={ css('admin__menu-item', 'js-menu') }>Productos</div>
        </div>
        <div className={ css('admin__module', 'admin__orders-module', section === 'Pedidos' && 'admin--active') }>
          <AdminOrders detailHandler={ this.detailHandler } orders={ orders } menuHandler={ this.menuHandler } />
        </div>
        <div className={ css('admin__module', 'admin__products-module', section === 'Productos' && 'admin--active') }>
          <div className={ css('section-wrapper', 'admin__section-wrapper') }>
            { FindAndEdit.call(this, { search, filters, message }) }
          </div>
          <div className={ css('section-wrapper', 'admin__section-wrapper') }>
            <AddProduct addProduct={ this.addProductFormHandler } filters={ filters } />
          </div>
          <div className={ css('section-wrapper', 'admin__section-wrapper') }>
            <AdminFilters filters={ filters } saveFilters={ this.saveFiltersHandler } />
          </div>
        </div>
        <Overlay overlay={ overlay } order={ orders && orders[overlay] } closeOverlay={ this.closeOverlayHandler } />
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

let setOrder = function (value) {
  database.ref('orders')
    .orderByChild('dateOfDelivery')
    .equalTo(value)
    .limitToFirst(20)
    .once('value')
    .then((snapshot) => {
      this.setState({
        orders: snapshot.val()
      });
    });
}

function textAreaValueToArray (value) {
  return [ 'todos', ...value.split('\n')
    .map((val) => val.trim())
    .filter((val) => val)];
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
