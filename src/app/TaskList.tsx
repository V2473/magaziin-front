import React, { useEffect, useState } from 'react';

interface Task {
  id: number;
  title: string;
  description: string;
}

interface TaskListProps {
  refreshTrigger: number;
}

const TaskList: React.FC<TaskListProps> = ({ refreshTrigger }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = () => {
    fetch('http://localhost:3000/tasks')
      .then(response => response.json())
      .then((data: Task[]) => setTasks(data))
      .catch(error => console.error('Error fetching tasks:', error));
  };

  useEffect(() => {
    fetchTasks();
  }, [refreshTrigger]);

  const deleteTask = (id: number) => {
    fetch(`http://localhost:3000/tasks/${id}`, {
      method: 'DELETE'
    })
      .then(() => setTasks(tasks.filter(task => task.id !== id)))
      .catch(error => console.error('Error deleting task:', error));
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Task List</h1>
      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center">No tasks available.</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map(task => (
            <li
              key={task.id}
              className="bg-white p-4 rounded-lg shadow-md flex justify-between items-start hover:shadow-lg transition-shadow duration-200"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
                <p className="text-gray-600">{task.description}</p>
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors duration-200"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;