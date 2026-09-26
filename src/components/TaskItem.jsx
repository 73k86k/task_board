function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={`task-item${task.completed ? ' task-item--completed' : ''}`}>
      <label className="task-item__label">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <span className="task-item__title">{task.title}</span>
      </label>
      <button
        className="task-item__delete"
        type="button"
        onClick={() => onDelete(task.id)}
        aria-label={`「${task.title}」を削除`}
      >
        削除
      </button>
    </li>
  )
}

export default TaskItem
