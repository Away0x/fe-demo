import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import {
  faWeibo,
  faGithub,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';

import Profile from 'components/Profile';
import Avatar from 'components/Avatar';
import Button from 'components/Button';
import InputText from 'components/Form/InputText';
import Radio from 'components/Form/Radio';
import LabelContainer from 'components/Form/LabelContainer';
import Select from 'components/Form/Select';
import Option from 'components/Form/Option';
import Icon from 'components/Icon';

import face from 'assets/images/face-male-1.jpg';

import StyledEditProfile, {
  GroupTitle,
  GenderAndRegion,
  SelectGroup,
  StyledIconInput,
} from './style';

interface EditProfileProps {
  children?: React.ReactNode;
}

function EditProfile({ children, ...rest }: EditProfileProps) {
  const [showEdit, setShowEdit] = useState(false);

  if (!showEdit) {
    return (
      <Profile
        onEdit={() => setShowEdit(true)}
        showEditBtn
        showCloseIcon={false}
      />
    );
  }

  return (
    <StyledEditProfile {...rest}>
      <Avatar
        src={face}
        size="160px"
        style={{
          gridArea: '1 / 1 / 2 / 2',
          justifySelf: 'center',
          marginBottom: '12px',
        }}
      />
      <Button
        size="52px"
        style={{
          gridArea: '1 / 1 / 3 / 2',
          zIndex: 10,
          alignSelf: 'end',
          justifySelf: 'end',
        }}>
        <FontAwesomeIcon icon={faCheck} onClick={() => setShowEdit(false)} />
      </Button>
      <GroupTitle>基本信息</GroupTitle>
      <InputText label="昵称" />
      <GenderAndRegion>
        <Radio.Group label="性别">
          <Radio name="gender">男</Radio>
          <Radio name="gender">女</Radio>
        </Radio.Group>
        <LabelContainer label="地区">
          <SelectGroup>
            <Select type="form">
              <Option>省份</Option>
            </Select>
            <Select type="form">
              <Option>城市</Option>
            </Select>
            <Select type="form">
              <Option>区县</Option>
            </Select>
          </SelectGroup>
        </LabelContainer>
      </GenderAndRegion>
      <InputText label="个性签名" />

      <GroupTitle>联系信息</GroupTitle>
      <InputText label="联系电话" />
      <InputText label="电子邮箱" />
      <InputText label="个人网站" />

      <GroupTitle>社交信息</GroupTitle>
      <IconInput icon={faWeibo} bgColor="#F06767" />
      <IconInput icon={faGithub} bgColor="black" />
      <IconInput icon={faLinkedin} bgColor="#2483C0" />
    </StyledEditProfile>
  );
}

interface IconInputProps {
  icon: any;
  bgColor?: string;
}

function IconInput({ icon, bgColor, ...rest }: IconInputProps) {
  return (
    <StyledIconInput>
      <Icon.Social icon={icon} bgColor={bgColor} />
      <InputText {...rest} />
    </StyledIconInput>
  );
}

export default EditProfile;
