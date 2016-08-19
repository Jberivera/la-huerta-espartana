import React from 'react';
import style from './Nav.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router';

const css = classNames.bind(style);

function Hamburger() {

  return (
    <label className={ css('hamburger') } htmlFor="hamburger">
      <span className={ css('hamburger__lines') }></span>
    </label>
  );
}

export default Hamburger;
