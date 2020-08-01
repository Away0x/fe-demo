import React from 'react';
import {
  faCommentDots,
  faFolder,
  faStickyNote,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ReactComponent as SmileIcon } from 'assets/icons/smile.svg';
import {
  faWeibo,
  faGithub,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';

import Icon from '.';
import Emoji from './Emoji';

export default {
  title: 'UI 组件/Icon',
  component: Icon,
};

export const Default = () => {
  return <Icon icon={SmileIcon} />;
};
export const CustomColor = () => {
  return <Icon icon={SmileIcon} color="#cccccc" />;
};

export const CustomSize = () => {
  return <Icon icon={SmileIcon} width={48} height={48} color="#cccccc" />;
};

export const FontAwesome = () => {
  return <FontAwesomeIcon icon={faCommentDots} />;
};

export const FontAwesomeColor = () => {
  return <FontAwesomeIcon icon={faCommentDots} style={{ color: '#cccccc' }} />;
};

export const FontAwesomeSizes = () => {
  return (
    <div className="row-elements">
      <FontAwesomeIcon icon={faFolder} style={{ fontSize: '24px' }} />
      <FontAwesomeIcon icon={faStickyNote} style={{ fontSize: '36px' }} />
      <FontAwesomeIcon icon={faCommentDots} style={{ fontSize: '48px' }} />
    </div>
  );
};

export const SocialIcons = () => {
  return (
    <div className="row-elements">
      <Icon.Social
        icon={faWeibo}
        bgColor="#F06767"
        href="http://www.weibo.com"
      />
      <Icon.Social icon={faGithub} bgColor="black" />
      <Icon.Social icon={faLinkedin} bgColor="#2483C0" />
    </div>
  );
};

/* eslint-disable jsx-a11y/accessible-emoji */
export const EmojiIcons = () => (
  <div className="row-elements">
    <Emoji label="smile">😄</Emoji>
    <Emoji label="todo">✅</Emoji>
    <Emoji label="clock">🕔</Emoji>
  </div>
);
