import React, { Component } from 'react';
import style from './Admin.scss';
import classNames from 'classnames/bind';

const css = classNames.bind(style);

function AdminFilters ({ filters, saveFilters }) {
  return (
    <div className={ css('admin-filter') }>
      <h2 className={ css('admin__form-header') }>Categorias de los productos (filtros)</h2>
      <textarea className={ css('admin-filter__textarea', 'js-textarea') }
        rows="10"
        cols="50"
        defaultValue={ getFilterText(filters) }></textarea>
      <div className={ css('admin__btn', 'btn--primary') } onClick={ saveFilters }>Guardar</div>
    </div>
  );
}

function getFilterText (filters) {
  return Object.keys(filters).slice(1).reduce((a, key) => {
    return `${a}${filters[key]}\n`;
  }, '');
}

export default AdminFilters;
