import { Calendar, Check, Edit3, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toggleTodo, deleteTodo, editTodo } from './../Redux/Slices/TodoSlices'

function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const handleEdit = () => {
    if (newText.trim() !== "") {
      dispatch(editTodo({ id: todo.id, newText }));
      setIsEditing(false);
    }
  };

  return (
    <div
      className={`group p-4 hover:bg-gray-100 transition-all duration-200 ${
        todo.completed ? "opacity-70" : ""
      }`}
    >
      <div className="flex items-start gap-3">
        {/* toggle */}
        <button
          onClick={() => dispatch(toggleTodo(todo.id))}
          className={`flex items-center justify-center flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-200 mt-0.5
            ${todo.completed ? "bg-green-500 border-green-500 text-white" : "border-gray-400"}
          `}
        >
          {todo.completed && <Check size={14} />}
        </button>

        {/* content */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <input
              type="text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              onBlur={handleEdit} // يحفظ لما يخرج من الـ input
              onKeyDown={(e) => e.key === "Enter" && handleEdit()} // يحفظ لما يضغط Enter
              className="w-full px-2 py-1 border rounded"
              autoFocus
            />
          ) : (
            <div
              className={`leading-relaxed text-gray-800 ${
                todo.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {todo.text}
            </div>
          )}

          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Calendar size={12} />
              <span>Created at {new Date(todo.id).toLocaleTimeString()}</span>
            </div>
            {todo.completed && <span className="text-green-600">Completed</span>}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-200 transition-all duration-200 rounded-lg"
          >
            <Edit3 size={16} />
          </button>
          <button
            onClick={() => dispatch(deleteTodo(todo.id))}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-gray-200 transition-all duration-200 rounded-lg"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default TodoItem
