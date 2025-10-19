// ✅ Selectors
export const SelectTodo = (state) => state.todo.items;
export const SelectFilter = (state) => state.todo.filter;

export const SelectFilteredTodo = (state) => {
  const todos = state.todo.items;
  const filter = state.todo.filter;

  switch (filter) {
    case "active":
      return todos.filter((t) => !t.completed);
    case "completed":
      return todos.filter((t) => t.completed);
    default:
      return todos;
  }
};

export const selectTodoStats = (state) => {
  const todos = state.todo.items;
  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const active = total - completed;
  const completionPercetange =
    total > 0 ? Math.round((completed / total) * 100) : 0;

  return { todos, active, total, completed, completionPercetange };
};
