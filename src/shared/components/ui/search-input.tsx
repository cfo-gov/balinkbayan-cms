import React from 'react';
import { Group, Input } from '../form';

const SearchInput = () => {
  return (
    <>
      <Group className="max-w-sm">
        <Input name="search" placeholder="Search..." />
      </Group>
    </>
  );
};

export default SearchInput;
