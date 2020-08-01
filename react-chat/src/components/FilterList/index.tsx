import React from 'react';

import Input from 'components/Form/Input';
import Filter from 'components/Filter';
import Select from 'components/Form/Select';
import Option from 'components/Form/Option';
import Button from 'components/Button';
import Icon from 'components/Icon';
import { ReactComponent as Plus } from 'assets/icons/plus.svg';

import StyledFilterList from './style';

interface FilterListProps {
  options?: any[];
  filterLabel?: string;
  actionLabel?: string;
  children?: React.ReactNode;
}

function FilterList({
  options,
  filterLabel = '列表排序',
  actionLabel,
  children,
  ...rest
}: FilterListProps) {
  return (
    <StyledFilterList {...rest}>
      <Input.Search />
      <Filter style={{ padding: '20px 0' }}>
        {options && (
          <Filter.Filters label={filterLabel}>
            <Select>
              {options.map((option, index) => (
                <Option key={index}>{option}</Option>
              ))}
            </Select>
          </Filter.Filters>
        )}

        {actionLabel && (
          <Filter.Action label={actionLabel}>
            <Button>
              <Icon icon={Plus} width={12} height={12} />
            </Button>
          </Filter.Action>
        )}
      </Filter>
      {children}
    </StyledFilterList>
  );
}

export default FilterList;
