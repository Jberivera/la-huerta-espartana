import React, {
  Component
} from 'react';

import style from './Login.scss';
import classNames from 'classnames/bind';

const css = classNames.bind(style);

const UserInfo = ({ userName, onFacebookOut }) => {
  return (
    <div>
      <div className={ css('user-name') } >{ userName }</div>
      <div className={ css('fb-logout') } onClick={ onFacebookOut }>Logout</div>
    </div>
  );
};

export default UserInfo;
