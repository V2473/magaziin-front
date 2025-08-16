import React, { useState } from 'react';

interface Task {
  id: number;
  title: string;
  description: string;
}

interface TaskFormProps {
  onTaskCreated: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskCreated }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fetch('http://localhost:3001/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description }),
    })
      .then(response => response.json())
      .then((data: Task) => {
        onTaskCreated(data);
        setTitle('');
        setDescription('');
      })
      .catch(error => console.error('Error creating task:', error));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Create Task</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
          rows={4}
          required
        ></textarea>
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default TaskForm;