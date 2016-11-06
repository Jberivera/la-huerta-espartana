import React, { Component } from 'react';
import style from './Admin.scss';
import classNames from 'classnames/bind';

const css = classNames.bind(style);

function FindAndEdit ({ search, filters }) {
  return (
    <div className={ css('find-and-edit') }>
      <div className={ css('admin__search-wrapper') }>
        <input type="text"
          ref={ (c) => this._inputSearch = c }
          placeholder="Nombre del producto"
          className={ css('admin__search-input') } />
        <i className={ css('material-icons', 'admin__search-icon') } onClick={ this.searchProductHandler }>search</i>
      </div>
      <form id="update-product" noValidate onSubmit={ this.updateProductHandler }>
        <h2 className={ css('admin__form-header') }>Editar producto</h2>
        <div className={ css('admin__input-container') }>
          <input id="update-product__name"
            autoComplete="off"
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
            autoComplete="off"
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
            autoComplete="off"
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
            autoComplete="off"
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
                  <option key={ `update-${key}` } selected={ search && search.type === filters[key] && 'selected' } value={ filters[key] }>{ filters[key] }</option>
                );
              })
            }
          </select>
        </div>
        <div className={ css('admin__submit-wrapper', search && 'admin--show') }>
          <input type="submit" className={ css('admin__submit', 'btn--primary') } value="Actualizar"/>
          <input type="submit" className={ css('admin__submit', 'btn--danger') } value="Borrar" onClick={ this.deleteHandler }/>
        </div>
      </form>
    </div>
  );
}

export default FindAndEdit;
