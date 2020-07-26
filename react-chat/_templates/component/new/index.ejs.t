---
to: src/components/<%= name %>/index.tsx
---

import React from 'react';

import Styled<%= name %> from './style';

interface <%= name %>Props {

}

function <%= name %>({
}: <%= name %>Props) {
  return (
    <Styled<%= name %>>
      component <%= name %>
    </Styled<%= name %>>
  );
}

export default <%= name %>;
