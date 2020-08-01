import React from 'react';

import FilterList from 'components/FilterList';
import ContactCard from 'components/ContactCard';

import StyledContactList, { Contacts } from './style';

interface ContactListProps {
  children?: React.ReactNode;
}

function ContactList({ children, ...rest }: ContactListProps) {
  return (
    <StyledContactList {...rest}>
      <FilterList options={['新添加优先', '按姓名排序']} actionLabel="添加好友">
        <Contacts>
          {new Array(10).fill(0).map((_, i) => (
            <ContactCard key={i} />
          ))}
        </Contacts>
      </FilterList>
    </StyledContactList>
  );
}

export default ContactList;
