import { Check, X } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from './../Redux/Slices/TodoSlices'

function TodoForm() {
  const [text, setText] = useState("")
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim() === "") return
    dispatch(addTodo(text.trim()))
    setText("") // reset input
  }

  const handleReset = () => {
    setText("")
  }

  return (
    <form onSubmit={handleSubmit} className='flex items-center gap-3'>
      <div className="flex-1">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a new task..."
          className='w-full px-4 py-3 border border-gray-400 rounded-lg focus:outline-none
          focus:ring-2 focus:ring-gray-800 focus:border-transparent transition-all duration-200 
          bg-white/90 backdrop-blur-sm text-gray-800 placeholder-gray-600 '
          maxLength={500}
        />
      </div>
      <div className="flex items-center gap-2">
        {/* Save button */}
        <button
          type='submit'
          disabled={!text.trim()}
          className='flex items-center justify-center w-10 h-10
          bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed
          text-white rounded-lg transition-colors duration-200'
          title='Save todo'
        >
          <Check size={18} />
        </button>
        {/* Reset button */}
        <button
          type='button'
          onClick={handleReset}
          disabled={!text}
          className='flex items-center justify-center w-10 h-10
          bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed
          text-white rounded-lg transition-colors duration-200'
          title='Clear input'
        >
          <X size={18} />
        </button>
      </div>
    </form>
  )
}

export default TodoForm
