import { createSlice } from "@reduxjs/toolkit"; 

const initialState = {
  items: [],        // كل الـ todos
  filter: "all",    // all | active | completed
  isAddingTodo: false,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.items.push({
        id: Date.now(),
        text: action.payload,
        completed: false,
      });
    },
    toggleTodo: (state, action) => {
      const todo = state.items.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action) => {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },
    clearCompleted: (state) => {
      state.items = state.items.filter((t) => !t.completed);
    },
    markAllCompleted: (state) => {
      state.items.forEach((t) => (t.completed = true));
    },
    setFilter: (state, action) => {
      state.filter = action.payload; // all | active | completed
    },

    // ✨ الجديد: Edit Todo
    editTodo: (state, action) => {
      const { id, newText } = action.payload;
      const todo = state.items.find((t) => t.id === id);
      if (todo) {
        todo.text = newText;
      }
    },
  },
});

export const {
  addTodo,
  toggleTodo,
  deleteTodo,
  clearCompleted,
  markAllCompleted,
  setFilter,
  editTodo, // 👈 لازم نصدرها
} = todoSlice.actions;

export default todoSlice.reducer;

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
