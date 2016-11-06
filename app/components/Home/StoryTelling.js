import React from 'react';
import style from './Home.scss';
import classNames from 'classnames/bind';

const css = classNames.bind(style);

import Hero from '../Hero/Hero';

const StoryTelling = ({ title, boxColor, img, video }) => {

  return (
    <div className={ css('story-telling') } style={{ background: boxColor }}>
      <div className={ css('story-telling__title-container') }>
        <h2 className={ css('story-telling__title') }>
          { title }
        </h2>
      </div>
      <div className={ css('story-telling__img-container') }>
        {
          img && <img className={ css('story-telling__img') } style={ img.style } src={ img.url } />
        }
        {
          video
          &&
          <div className={ css('story-telling__video-wrapper') }>
            <video
              className={ css('story-telling__video') }
              loop="loop"
              autoPlay="autoplay"
              src={ video.url }>
            </video>
          </div>
        }
      </div>
    </div>
  );
};

export default StoryTelling;
