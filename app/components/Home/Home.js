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
      <div className={ css('section-wrapper', 'home__main-wrapper') }>
        <StoryTelling
          title="¿Cómo Funciona?"
          boxColor="#308694"
          img={{
            url: "http://imgur.com/IpgmMUi.gif"
          }} />
        <StoryTelling
          title="Compras desde tu casa"
          boxColor="#36B1C5"
          img={{
            url: "http://i.imgur.com/RMM1TxG.gif",
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
            url: "http://i.imgur.com/q5FvfPm.jpg"
          }} />
        <StoryTelling
          title="Crea una cuenta, es fácil y seguro"
          boxColor="#588c73"
          video={{
            url: "https://video.feoh1-1.fna.fbcdn.net/v/t43.1792-2/15010213_1787156664906518_3173772457110667264_n.mp4?efg=eyJybHIiOjE1MDAsInJsYSI6MTAyNCwidmVuY29kZV90YWciOiJzdmVfaGQifQ%3D%3D&rl=1500&vabr=209&oh=1f8f67936ba3e2f17e3b1b6ad4062e46&oe=581F274B"
          }} />
      </div>
    </div>
  );
};

export default Home;
