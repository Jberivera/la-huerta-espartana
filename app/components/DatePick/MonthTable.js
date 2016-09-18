import React from 'react';
import { connect } from 'react-redux';

import style from './DatePick.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router';

const css = classNames.bind(style);

function MonthTable ({ month, year, day, monthDays, startOfWeek }) {

  return (
    <div className={ css('date__month-table') }>
      <div className={ css('date__header') }>
        <div className={ css('date__right-arrow') }></div>
        { `${month} ${year}` }
        <div className={ css('date__left-arrow') }></div>
      </div>
      <ul className={ css('date__day-container') }>
        <li className={ css('date__day-name', 'date--col') }>L</li>
        <li className={ css('date__day-name', 'date--col') }>M</li>
        <li className={ css('date__day-name', 'date--col') }>W</li>
        <li className={ css('date__day-name', 'date--col') }>J</li>
        <li className={ css('date__day-name', 'date--col') }>V</li>
        <li className={ css('date__day-name', 'date--col') }>S</li>
        <li className={ css('date__day-name', 'date--col') }>D</li>
        {
          Array.apply(null, { length: startOfWeek - 1 }).map((_, i) => {
            return (
              <li key={`empty${i}`} className={ css('date--col') }></li>
            );
          })
        }
        {
          Array.apply(null, { length: monthDays }).map((_, i) => {
            return (
              <li key={i} className={ css('date__day', 'date--col', i === day && 'date--active') }>{ i + 1 }</li>
            );
          })
        }
      </ul>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    cartNumber: state.cart.length
  };
};

export default connect(null, null)(MonthTable);
