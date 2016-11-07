import React from 'react';
import style from './Hero.scss';
import classNames from 'classnames/bind';

const css = classNames.bind(style);

const Hero = ({ backgroundUrl, title }) => {

  return (
    <div className={ css('hero', 'hero-g') } style={ { backgroundImage: backgroundUrl } }>
      <h2 className={ css('hero__title') }>{ title }</h2>
    </div>
  );
};

export default Hero;
