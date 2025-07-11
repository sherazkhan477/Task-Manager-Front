import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, User, List, Trash2, Pencil } from 'lucide-react';
import { Task } from '../types';
import { TaskCard, FlexContainer } from '../styles/StyledComponents';
import { useAuth } from '../context/AuthContext';

const ViewTasks: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch('https://task-api-w4t2.onrender.com/api/tasks');
      const data = await res.json();

      const normalized = data.map((task: any) => ({
        id: task._id,
        title: task.TaskTitle,
        description: task.TaskDescription,
        status: task.status || 'pending',
        priority: task.priority || 'medium',
        createdAt: task.createdAt,
        assignedTo: task.assignedTo || '',
      }));

      setTasks(normalized);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      const res = await fetch(`https://task-api-w4t2.onrender.com/api/tasks/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setTasks(tasks.filter((task) => task.id !== id));
      } else {
        console.error('Failed to delete');
      }
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const filteredTasks = filter === 'all' ? tasks : tasks.filter(task => task.status === filter);

  const toggleTaskStatus = async (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const updatedStatus = task.status === 'completed' ? 'pending' : 'completed';

    try {
      const res = await fetch(`https://task-api-w4t2.onrender.com/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          TaskTitle: task.title,
          TaskDescription: task.description,
          TaskDuedate: new Date(task.createdAt).toISOString(),
          status: updatedStatus,
          priority: task.priority,
        })
      });

      if (res.ok) {
        setTasks(tasks.map(t => t.id === id ? { ...t, status: updatedStatus } : t));
      } else {
        console.error('Failed to update');
      }
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-400 bg-red-400/10';
      case 'medium': return 'border-yellow-400 bg-yellow-400/10';
      case 'low': return 'border-green-400 bg-green-400/10';
      default: return 'border-gray-400 bg-gray-400/10';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400';
      case 'in-progress': return 'text-purple-400';
      case 'pending': return 'text-orange-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div>
      <FlexContainer>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            View Tasks
          </h1>
          <p className="text-gray-400 mt-2">Manage your task list</p>
        </div>
        <div className="flex space-x-2">
          {['all', 'pending', 'in-progress', 'completed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status as any)}
              className={`px-4 py-2 rounded-lg capitalize transition-all ${
                filter === status
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/50'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {status.replace('-', ' ')}
            </button>
          ))}
        </div>
      </FlexContainer>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: 1.02 }}
              className={`relative ${getPriorityColor(task.priority)} border-l-4`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-1">{task.title}</h3>
                  <p className="text-sm text-gray-400 mb-2">{task.description}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleTaskStatus(task.id)}
                  className={`ml-2 p-1 rounded-full transition-colors ${
                    task.status === 'completed' ? 'text-green-400' : 'text-gray-400 hover:text-cyan-400'
                  }`}
                >
                  <CheckCircle className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs capitalize ${getStatusColor(task.status)}`}>
                    {task.status.replace('-', ' ')}
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-400 capitalize">{task.priority}</span>
                </div>
                {task.assignedTo && (
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400">{task.assignedTo}</span>
                  </div>
                )}
              </div>

              <div className="mt-3 pt-3 border-t border-white/10 flex justify-between items-center">
                <p className="text-xs text-gray-500">
                  Created: {new Date(task.createdAt).toLocaleDateString()}
                </p>

                {isAdmin && (
                  <div className="flex space-x-2">
                    <button onClick={() => handleDelete(task.id)} className="text-red-500 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => alert('Edit feature coming soon')} className="text-blue-400 hover:text-blue-600">
                      <Pencil className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </TaskCard>
          ))}
        </AnimatePresence>
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
            <List className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No tasks found</h3>
          <p className="text-gray-500">
            {filter === 'all' ? 'No tasks available' : `No ${filter.replace('-', ' ')} tasks`}
          </p>
        </div>
      )}
    </div>
  );
};

export default ViewTasks;