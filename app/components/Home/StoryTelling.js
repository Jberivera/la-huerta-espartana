import React from 'react';
import style from './Home.scss';
import classNames from 'classnames/bind';

const css = classNames.bind(style);

import Hero from '../Hero/Hero';

const StoryTelling = ({ title, imgUrl, boxColor }) => {

  return (
    <div className={ css('story-telling') }>
      <div className={ css('story-telling__title-container') }>
        <h2 className={ css('story-telling__title') }>
          <div className={ css('story-telling__title-box') } style={{ background: boxColor }}></div>
          { title }
        </h2>
      </div>
      <div className={ css('story-telling__img-container') }>
        <img className={ css('story-telling__img') } src={ imgUrl } />
      </div>
    </div>
  );
};

export default StoryTelling;
