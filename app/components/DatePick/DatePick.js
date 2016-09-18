import React, { Component } from 'react';
import style from './DatePick.scss';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const css = classNames.bind(style);

import { getNumberOfDays, getMonthString, getFirstDayOfWeek } from '../../js/view/datepicker';
import MonthTable from './MonthTable';

class DatePick extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    const { date } = this.props,
      year = date.getFullYear(),
      month = date.getMonth(),
      day = date.getDate() - 1;

    return (
      <div className={ css('date') }>
        <MonthTable
          month={ month }
          year={ year }
          day={ day }
          monthString={ getMonthString(date) }
          monthDays={ getNumberOfDays(year, month) }
          startOfWeek={ getFirstDayOfWeek(year, month) } />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({

}, dispatch);

export default connect(null, mapDispatchToProps)(DatePick);
