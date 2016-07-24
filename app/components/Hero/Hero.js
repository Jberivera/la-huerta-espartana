import React from 'react';
import style from './Hero.scss';
import classNames from 'classnames/bind';

const css = classNames.bind(style);

const Hero = ({ backgroundUrl }) => {

  return (
    <div className={ css('hero', 'hero-g') } style={ { backgroundImage: backgroundUrl || '' } }>

    </div>
  );
};

export default Hero;
