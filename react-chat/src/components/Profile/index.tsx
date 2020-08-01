import React from 'react';

import Avatar from 'components/Avatar';
import Paragraph from 'components/Paragraph';
import Emoji from 'components/Emoji';
import Icon from 'components/Icon';
import Seperator from 'components/Seperator';
import Text from 'components/Text';

import face from 'assets/images/face-male-3.jpg';
import {
  faWeibo,
  faGithub,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';
import photo1 from 'assets/images/photo1.jpg';
import photo2 from 'assets/images/photo2.jpg';
import photo3 from 'assets/images/photo3.jpg';
import { ReactComponent as Cross } from 'assets/icons/cross.svg';

import StyledProfile, {
  SocialLinks,
  ContactSection,
  Album,
  Photo,
  AlbumSection,
  AlbumTitle,
  CloseIcon,
} from './style';

interface ProfileProps {
  children?: React.ReactNode;
}

/* eslint-disable jsx-a11y/accessible-emoji */
function Profile({ children, ...rest }: ProfileProps) {
  return (
    <StyledProfile {...rest}>
      <CloseIcon icon={Cross} />
      <Avatar
        style={{ margin: '26px 0' }}
        src={face}
        size="160px"
        status="online"
        statusIconSize="25px"
      />
      <Paragraph size="xlarge" style={{ marginBottom: '12px' }}>
        慕容天宇
      </Paragraph>
      <Paragraph
        size="medium"
        type="secondary"
        style={{ marginBottom: '18px' }}>
        北京市 朝阳区
      </Paragraph>
      <Paragraph style={{ marginBottom: '26px' }}>
        帮助客户构建网站，并协助在社交网站上进行推广{' '}
        <Emoji label="fire">🔥</Emoji>
      </Paragraph>
      <SocialLinks>
        <Icon.Social
          icon={faWeibo}
          bgColor="#F06767"
          href="http://www.weibo.com"
        />
        <Icon.Social icon={faGithub} bgColor="black" />
        <Icon.Social icon={faLinkedin} bgColor="#2483C0" />
      </SocialLinks>
      <Seperator style={{ margin: '30px 0' }} />
      <ContactSection>
        <Description label="联系电话">+86 18688888888</Description>
        <Description label="电子邮件">admin@fh.com</Description>
        <Description label="个人网站">https://www.baidu.com</Description>
      </ContactSection>
      <Seperator style={{ margin: '30px 0' }} />
      <AlbumSection>
        <AlbumTitle>
          <Text type="secondary">相册（31）</Text>
          <a href="#/">查看全部</a>
        </AlbumTitle>
        <Album>
          <Photo src={photo1} alt="" />
          <Photo src={photo2} alt="" />
          <Photo src={photo3} alt="" />
        </Album>
      </AlbumSection>
    </StyledProfile>
  );
}

interface DescriptionProps {
  label: string;
  children?: React.ReactNode;
}

function Description({ label, children }: DescriptionProps) {
  return (
    <Paragraph>
      <Text type="secondary">{label}：</Text>
      <Text>{children}</Text>
    </Paragraph>
  );
}

export default Profile;
