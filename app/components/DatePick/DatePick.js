import React, { Component } from 'react';
import style from './DatePick.scss';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const css = classNames.bind(style);

import MonthTable from './MonthTable';

class DatePick extends Component {
  constructor (props) {
    super(props);
  }

  render () {

    return (
      <div className={ css('date') }>
        <MonthTable />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({

}, dispatch);

export default connect(null, mapDispatchToProps)(DatePick);
