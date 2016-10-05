import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import style from './DatePick.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router';

import {
  changeDate
} from '../../actions/action-creators';

const css = classNames.bind(style);

class MonthTable extends Component {
  constructor (props) {
    super(props);
    this.arrowHandler = this.arrowHandler.bind(this);
    this.dateDayHandler = this.dateDayHandler.bind(this);
  }

  arrowHandler (e) {
    let { target } = e,
      { year, month, day, changeDate } = this.props,
      right = target.classList.contains('right-arrow');

    if (right) {
      month = month < 11 ? month + 2 : (year = year + 1, 1);
    } else {
      month = month > 0 ? month : (year = year - 1, 12);
    }

    changeDate(`${year}/${month}/${day + 1}`);
  }

  dateDayHandler (e) {
    const { target } = e,
      { year, month, changeDate } = this.props;

    if (target.classList.contains('day')) {
      let dateDay = Number(target.textContent);

      changeDate(`${year}/${month + 1}/${dateDay}`);
    }
  }

  render () {
    const { year, day, monthDays, firstDayOfWeek, monthString } = this.props;

    return (
      <div className={ css('date__month-table') }>
        <div className={ css('date__header') }>
          <div className={ css('date__right-arrow', 'right-arrow') } onClick={ this.arrowHandler }></div>
          { `${monthString} ${year}` }
          <div className={ css('date__left-arrow', 'left-arrow') } onClick={ this.arrowHandler }></div>
        </div>
        <ul className={ css('date__day-container') } onClick={ this.dateDayHandler }>
          <li className={ css('date__day-name', 'date--col') }>L</li>
          <li className={ css('date__day-name', 'date--col') }>M</li>
          <li className={ css('date__day-name', 'date--col') }>W</li>
          <li className={ css('date__day-name', 'date--col') }>J</li>
          <li className={ css('date__day-name', 'date--col') }>V</li>
          <li className={ css('date__day-name', 'date--col') }>S</li>
          <li className={ css('date__day-name', 'date--col') }>D</li>
          {
            Array.apply(null, { length: firstDayOfWeek - 1 }).map((_, i) => {
              return (
                <li key={`empty${i}`} className={ css('date--col') }></li>
              );
            })
          }
          {
            Array.apply(null, { length: monthDays }).map((_, i) => {
              return (
                <li key={i} className={ css('date__day', 'day', 'date--col', i === day && 'date--active') }>{ i + 1 }</li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
  changeDate
}, dispatch);

export default connect(null, mapDispatchToProps)(MonthTable);
