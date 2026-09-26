import { useState } from 'react'

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setTitle('')
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        className="task-form__input"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="新しいタスクを入力"
        aria-label="新しいタスク"
      />
      <button className="task-form__button" type="submit" disabled={!title.trim()}>
        追加
      </button>
    </form>
  )
}

export default TaskForm
