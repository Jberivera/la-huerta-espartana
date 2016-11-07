import React from 'react';
import style from './Home.scss';
import classNames from 'classnames/bind';

const css = classNames.bind(style);

import Hero from '../Hero/Hero';
import StoryTelling from './StoryTelling';

const Home = () => {

  return (
    <div className={ css('home') }>
      <Hero
        backgroundUrl="url(https://i.imgur.com/BxLwxuf.jpg)"
        title="Productos Organicos" />
      <div className={ css('section-wrapper', 'home__main-wrapper') }>
        <StoryTelling
          title="¿Cómo Funciona?"
          boxColor="#308694"
          img={{
            url: "https://imgur.com/IpgmMUi.gif"
          }} />
        <StoryTelling
          title="Compras desde tu casa"
          boxColor="#36B1C5"
          img={{
            url: "https://i.imgur.com/RMM1TxG.gif",
            style: {
              maxWidth: "500px",
              height: "100vh",
              maxHeight: "500px",
              borderRadius: "50%"
            }
          }} />
        <StoryTelling
          title="Pagas cuándo recibas tus compras"
          boxColor="#66CAC9"
          img={{
            url: "https://i.imgur.com/q5FvfPm.jpg"
          }} />
        <StoryTelling
          title="Crea una cuenta, es fácil y seguro"
          boxColor="#588c73"
          video={{
            url: "/assets/video/huerta_signup.mp4"
          }} />
      </div>
    </div>
  );
};

export default Home;
