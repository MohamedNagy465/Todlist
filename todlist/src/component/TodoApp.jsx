import { CheckCircle2, Circle, Filter, Plus, Trash2 } from 'lucide-react'  
import React, { useState } from 'react'
import TodoFilters from './TodoFilters'
import TodoForm from './TodoForm'
import TodoItem from './TodoItem'
import { useSelector, useDispatch } from 'react-redux'
import { 
  SelectFilteredTodo, 
  selectTodoStats,
  clearCompleted,
  markAllCompleted,
} from './../Redux/Slices/TodoSlices';
import { motion, AnimatePresence } from 'framer-motion'

function TodoApp() {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);

  // todos filtered حسب الفلتر
  const todos = useSelector(SelectFilteredTodo);
  // احصائيات
  const { total, active, completed, completionPercetange } = useSelector(selectTodoStats);

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 py-8 px-4'>
      <div className="container mx-auto">
        {/* header */}
        <div className="text-center mb-8">
          <h1 className='text-4xl font-bold text-gray-800 mb-2'>TodoFlow</h1>
          <p>organize your life, one task at a time</p>
        </div>

        {/* STAT card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-gray-300 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className='text-gray-800 font-semibold text-lg'>Progress Overview</h2>
            <div className="text-2xl font-bold text-green-600">
              {completionPercetange}%
            </div>
          </div>
          <div className="mb-4 h-3 w-full bg-gray-300 rounded-full">
            <div
              className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${completionPercetange}%` }}
            ></div>
          </div>
          {/* stat */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-800">{total}</div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">{active}</div>
              <div className="text-sm text-gray-600">Active</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">{completed}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
          </div>
        </div>

        {/* container */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-gray-300 shadow-lg overflow-hidden">
          {/* aCtion Bar */}
          <div className="p-6 border-b border-gray-300">
            <div className="mb-4 flex items-center justify-between">
              {/* Add Todo */}
              <button 
                onClick={() => setShowForm(!showForm)}
                className='flex items-center gap-4 bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 font-medium cursor-pointer'
              >
                <Plus size={20} /> {showForm ? "Close" : "Add Todo"}
              </button>

              {/* clear and delete */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => dispatch(clearCompleted())}
                  className='flex items-center gap-3 text-red-600 hover:text-red-700 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors duration-200 text-sm'
                >
                  <Trash2 size={16}/>
                  Clear Completed
                </button>
                <button 
                  onClick={() => dispatch(markAllCompleted())}
                  className='flex items-center gap-3 text-green-600 hover:text-green-700 px-3 py-2 rounded-lg hover:bg-green-50 transition-colors duration-200 text-sm'
                >
                  <CheckCircle2 size={16}/>
                  Mark All Completed
                </button>
              </div>
            </div>
            {/* TodoFilter */}
            <TodoFilters />
          </div>

          {/* todoForm مع انيميشن */}
          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden"
              >
                <div className="border border-b border-gray-300 p-4 rounded-lg mt-2 bg-gray-100">
                  <TodoForm />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* todoItem */}
          <div className="max-h-96 overflow-y-auto">
            {total === 0 ? (
              <div className="p-12 text-center text-gray-600">
                <Circle size={48} className='mx-auto mb-4 opacity-50'/>
                <p className='text-gray-800 font-medium text-lg mb-2 '>No Todos Yet</p>
                <p>Add your first todo to get started!</p>
              </div>
            ) : todos.length === 0 ? (
              <div className="p-12 text-center text-gray-600">
                <Filter size={48} className='mx-auto mb-4 opacity-50'/>
                <p className='text-gray-800 font-medium text-lg mb-2 '>No Filter Todos</p>
              </div>
            ) : (
              todos.map((t) => <TodoItem key={t.id} todo={t} />)
            )}
          </div>
        </div>
        {/* fOOter */}
        <div className="text-center text-sm bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-300 shadow-lg">
          Footer
        </div>
      </div>
    </div>
  )
}

export default TodoApp
