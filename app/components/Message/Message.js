import React, { Component } from 'react';
import style from './Message.scss';
import classNames from 'classnames/bind';

const css = classNames.bind(style);

function FindAndEdit ({ message, messageHandler  }) {
  if (!message) return (<div></div>);

  return (
    <span className={ css('message') }>
      <span className={ css('message__text', message.type) } onClick={ messageHandler }>
        { message.text }<i className={ css('material-icons', 'message__close') }>backspace</i>
      </span>
    </span>
  );
}

export default FindAndEdit;
