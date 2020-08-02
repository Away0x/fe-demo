import React from 'react';

import contactsData from 'data/contacts';

import ContactCard from '.';

export default {
  title: 'UI 组件/ContactCard',
  component: ContactCard,
};

export const Default = () => <ContactCard {...(contactsData[0] as any)} />;
