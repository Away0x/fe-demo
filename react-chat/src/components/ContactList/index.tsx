import React from 'react';
import { animated } from 'react-spring';

import FilterList from 'components/FilterList';
import ContactCard from 'components/ContactCard';
import useStaggeredList from 'tools/hooks/useStaggeredList';

import StyledContactList, { Contacts } from './style';

interface ContactListProps {
  children?: React.ReactNode;
}

function ContactList({ children, ...rest }: ContactListProps) {
  const trailAnimes = useStaggeredList(7);

  return (
    <StyledContactList {...rest}>
      <FilterList options={['新添加优先', '按姓名排序']} actionLabel="添加好友">
        <Contacts>
          {new Array(7).fill(0).map((_, i) => (
            <animated.div key={i} style={trailAnimes[i]}>
              <ContactCard />
            </animated.div>
          ))}
        </Contacts>
      </FilterList>
    </StyledContactList>
  );
}

export default ContactList;
