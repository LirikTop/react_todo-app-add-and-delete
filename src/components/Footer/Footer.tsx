import React, { useCallback } from 'react';
import { FilterSelectType } from '../../types/FilterSelectType';
import { FilterSelect } from '../FilterSelect';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  allTodos: React.MutableRefObject<number>;
  filterSelect: FilterSelectType[];
  filterIndex: number;
  handleSelectFilter: (index: number) => void;
  handleClearCompleted: () => void;
  checkTodoCompleted: () => number;
}

export const Footer: React.FC<Props> = React.memo(
  ({
    todos,
    allTodos,
    filterSelect,
    filterIndex,
    handleSelectFilter,
    handleClearCompleted,
    checkTodoCompleted,
  }) => {
    const itemsLeft = useCallback(() => {
      const activeTodos = todos.filter(todo => !todo.completed);

      if (filterIndex === 1) {
        return activeTodos.length === 0 && checkTodoCompleted() === 0
          ? 0
          : activeTodos.length;
      }

      return allTodos.current - checkTodoCompleted();
    }, [todos, filterIndex, allTodos, checkTodoCompleted]);

    return (
      <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="TodosCounter">
          {itemsLeft()} items left
        </span>

        <nav className="filter" data-cy="Filter">
          {filterSelect.map((option, index) => (
            <FilterSelect
              key={option}
              option={option}
              index={index}
              filterIndex={filterIndex}
              filterSelect={filterSelect}
              handleSelectFilter={handleSelectFilter}
            />
          ))}
        </nav>

        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
          onClick={handleClearCompleted}
          disabled={!checkTodoCompleted()}
        >
          Clear completed
        </button>
      </footer>
    );
  },
);

Footer.displayName = 'Footer';
