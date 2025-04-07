import React, { useCallback, useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

interface Props {
  todo: Todo;
  handleUpdateCompleted: (data: Todo, bool?: boolean) => Promise<Todo>;
  loading: boolean;
  selectedTodo: Todo | null;
  deleteTodo: (todoId: number) => Promise<void>;
  handleUpdateTitle: (data: Todo) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

export const TodoComponent: React.FC<Props> = React.memo(
  ({
    todo,
    handleUpdateCompleted,
    handleUpdateTitle,
    loading,
    selectedTodo,
    deleteTodo,
    inputRef,
  }) => {
    const [editActive, setEditActive] = useState(false);
    const [editTitle, setEditTitle] = useState(todo.title);
    const [localLoading, setLocalLoading] = useState(false);

    const isActive =
      loading && (selectedTodo?.id === todo.id || selectedTodo === null);

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, [inputRef, editActive]);

    const handleEdit = useCallback((data: Todo) => {
      setEditActive(true);
      setEditTitle(data.title);
    }, []);

    const handleSubmit = useCallback(
      (e: React.FormEvent | null = null) => {
        e?.preventDefault();
        handleUpdateTitle({
          ...todo,
          title: editTitle,
        });
        setEditActive(false);
      },
      [editTitle, handleUpdateTitle, todo],
    );

    const handleDelete = useCallback(async () => {
      setLocalLoading(true);
      await deleteTodo(todo.id);
      setLocalLoading(false);
    }, [deleteTodo, todo.id]);

    const handleUpdate = useCallback(
      async (data: Todo) => {
        setLocalLoading(true);
        await handleUpdateCompleted(data);
        setLocalLoading(false);
      },
      [handleUpdateCompleted],
    );

    return (
      <div data-cy="Todo" className={cn('todo', { completed: todo.completed })}>
        <label className="todo__status-label" aria-label="Toggle todo status">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
            checked={todo.completed}
            onChange={() => handleUpdate(todo)}
            disabled={loading}
          />
        </label>

        {!editActive ? (
          <>
            <span
              data-cy="TodoTitle"
              className="todo__title hidden"
              onDoubleClick={() => handleEdit(todo)}
            >
              {todo.title}
            </span>

            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
              onClick={() => handleDelete()}
            >
              ×
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              data-cy="TodoTitleField"
              type="text"
              className="todo__title-field"
              placeholder="Empty todo will be deleted"
              value={editTitle}
              onChange={e => setEditTitle(e.target.value)}
              onBlur={() => handleSubmit()}
              ref={inputRef}
            />
          </form>
        )}

        <div
          data-cy="TodoLoader"
          className={cn('modal overlay', {
            'is-active': isActive || localLoading,
          })}
        >
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      </div>
    );
  },
);

TodoComponent.displayName = 'TodoComponent';
