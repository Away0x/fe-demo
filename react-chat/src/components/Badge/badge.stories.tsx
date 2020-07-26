import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";

import Badge from '.';

export default {
  title: 'UI 组件/Badge',
  component: Badge
};

export const Default = () => {
  return <Badge count={5} />;
};

export const DotVariant = () => {
  return (
    <Badge show>
      <FontAwesomeIcon icon={faCommentDots} style={{ fontSize: "24px" }} />
    </Badge>
  );
};
