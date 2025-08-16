"use client";

import React, { useState } from 'react';
import TaskList from './TaskList'; // Ensure TaskList.tsx has `export default TaskList`
import TaskForm from './TaskForm'; // Ensure TaskForm.tsx has `export default TaskForm`
// import Appbar from "./_components/Appbar";


interface Task {
  id: number;
  title: string;
  description: string;
}

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  const handleTaskCreated = (newTask: Task): void => {
    setTasks([...tasks, newTask]);
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="font-sans items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      {/* <Appbar /> */}
      <TaskForm onTaskCreated={handleTaskCreated} />
      <TaskList refreshTrigger={refreshTrigger} />
    </div>
  );
};

export default Home;