import React, { Component } from 'react';
import style from './Admin.scss';
import classNames from 'classnames/bind';

const css = classNames.bind(style);

function AddProduct ({ filters, addProduct }) {
  return (
    <form id="add-product" noValidate onSubmit={ addProduct }>
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
                <option key={ `add-${key}` } value={ filters[key] }>{ filters[key] }</option>
              );
            })
          }
        </select>
      </div>
      <input type="submit" className={ css('admin__submit', 'btn--success') } value="Agregar"/>
    </form>
  );
}

export default AddProduct;
