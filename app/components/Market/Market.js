import React from 'react';
import style from './Market.scss';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';

const css = classNames.bind(style);

import Hero from '../Hero/Hero';

const Market = ({ count, onClick }) => {
  return (
    <div className={ css('market') }>
      <Hero backgroundUrl="url(http://artelista.s3.amazonaws.com/obras/big/0/9/7/5913365016626755.jpg)" />
      <h1 className={css('counter')} onClick={(e) =>{
        onClick();
      }}>
        Ready for start to apply react, redux using webpack { count }
      </h1>
    </div>

  );
}

const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, state.myApp);
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch({ type: 'INCREMENT' });
    }
  };
};

export { Market };
export default connect(mapStateToProps, mapDispatchToProps)(Market);
