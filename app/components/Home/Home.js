import React from 'react';
import style from './Home.scss';
import classNames from 'classnames/bind';

const css = classNames.bind(style);

import Hero from '../Hero/Hero';

const Home = () => {

  return (
    <div className={ css('home') }>
      <Hero backgroundUrl="url(http://artelista.s3.amazonaws.com/obras/big/0/9/7/5913365016626755.jpg)" />
    </div>
  );
};

export default Home;
