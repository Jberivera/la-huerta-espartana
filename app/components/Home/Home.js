import React from 'react';
import style from './Home.scss';
import classNames from 'classnames/bind';

const css = classNames.bind(style);

import Hero from '../Hero/Hero';
import StoryTelling from './StoryTelling';

const Home = () => {

  return (
    <div className={ css('home') }>
      <Hero backgroundUrl="url(http://i.imgur.com/BxLwxuf.jpg)" />
      <h1 className={ css('h1', 'home__h1') }>¿Cómo Funciona?</h1>
      <div className={ css('section-wrapper', 'home__main-wrapper') }>
        <StoryTelling
          title="Compras desde tu casa"
          imgUrl="http://i.imgur.com/ipCp7ez.jpg" />
        <StoryTelling
          title="Pagas cuándo recibes tus compras"
          imgUrl="http://i.imgur.com/q5FvfPm.jpg" />
        <StoryTelling
          title="Crea una cuenta, es fácil y seguro"
          boxColor="#588c73"
          imgUrl="http://i.imgur.com/iDsPQL5.jpg" />
      </div>
    </div>
  );
};

export default Home;
