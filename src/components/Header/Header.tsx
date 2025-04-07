import React from 'react';
import cn from 'classnames';

interface Props {
  checkTodoCompleted: () => number;
  handleToggleActivate: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  setNewTodoTitle: (value: React.SetStateAction<string>) => void;
  allTodos: React.MutableRefObject<number>;
  newTodoTitle: string;
  inputRef: React.RefObject<HTMLInputElement>;
  isSubmiting: boolean;
}

export const Header: React.FC<Props> = React.memo(
  ({
    checkTodoCompleted,
    handleToggleActivate,
    handleSubmit,
    setNewTodoTitle,
    allTodos,
    newTodoTitle,
    inputRef,
    isSubmiting,
  }) => {
    return (
      <header className="todoapp__header">
        {Boolean(allTodos.current) && (
          <button
            type="button"
            className={cn('todoapp__toggle-all', {
              active: checkTodoCompleted(),
            })}
            data-cy="ToggleAllButton"
            onClick={handleToggleActivate}
          />
        )}

        <form onSubmit={e => handleSubmit(e)}>
          <input
            data-cy="NewTodoField"
            type="text"
            className="todoapp__new-todo"
            placeholder="What needs to be done?"
            value={newTodoTitle}
            onChange={e => setNewTodoTitle(e.target.value)}
            ref={inputRef}
            disabled={isSubmiting}
          />
        </form>
      </header>
    );
  },
);

Header.displayName = 'Header';
