import React from 'react';
import style from './Nav.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router';

const css = classNames.bind(style);

function Hamburger() {

  return (
    <button className={ css('hamburger') }>
      <span className={ css('hamburger__lines') }></span>
    </button>
  );
}

export default Hamburger;
