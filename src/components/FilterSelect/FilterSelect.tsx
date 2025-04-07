import React from 'react';
import { FilterSelectType } from '../../types/FilterSelectType';

interface Props {
  filterIndex: number;
  index: number;
  handleSelectFilter: (index: number) => void;
  filterSelect: FilterSelectType[];
  option: FilterSelectType;
}

export const FilterSelect: React.FC<Props> = React.memo(
  ({ filterIndex, handleSelectFilter, filterSelect, index, option }) => {
    return (
      <a
        href={`#/${index ? filterSelect[index] : ''}`}
        className={`filter__link ${index === filterIndex ? 'selected' : ''}`}
        data-cy={`FilterLink${option}`}
        onClick={() => handleSelectFilter(index)}
      >
        {option}
      </a>
    );
  },
);

FilterSelect.displayName = 'FilterSelect';
