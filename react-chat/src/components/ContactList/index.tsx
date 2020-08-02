import React from 'react';
import { animated } from 'react-spring';

import FilterList from 'components/FilterList';
import ContactCard from 'components/ContactCard';
import useStaggeredList from 'tools/hooks/useStaggeredList';

import contactsData from 'data/contacts';

import StyledContactList, { Contacts } from './style';

interface ContactListProps {
  children?: React.ReactNode;
}

function ContactList({ children, ...rest }: ContactListProps) {
  const trailAnimes = useStaggeredList(contactsData.length);

  return (
    <StyledContactList {...rest}>
      <FilterList options={['新添加优先', '按姓名排序']} actionLabel="添加好友">
        <Contacts>
          {contactsData.map((contact: any, i) => (
            <animated.div key={contact.id} style={trailAnimes[i]}>
              <ContactCard
                status={contact.status}
                avatar={contact.avatar}
                intro={contact.intro}
                name={contact.name}
              />
            </animated.div>
          ))}
        </Contacts>
      </FilterList>
    </StyledContactList>
  );
}

export default ContactList;
