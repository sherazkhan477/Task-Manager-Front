import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { GlassPanel, FlexContainer, NeonButton, NeonInput } from '../styles/StyledComponents';

const CreateTask: React.FC = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setMessage('');

  if (!dueDate || isNaN(new Date(dueDate).getTime())) {
    setMessage('❌ Invalid due date.');
    setLoading(false);
    return;
  }

  const payload = {
    TaskTitle: title,
    TaskDescription: description,
    TaskDuedate: new Date(dueDate).toISOString(),
  };

  console.log('🚀 Sending payload:', payload);

  try {
    const res = await fetch('https://task-api-w4t2.onrender.com/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log('✅ Response:', data);

    if (!res.ok) {
      console.error('❌ Backend error:', data);
      throw new Error(`Server error: ${res.status}`);
    }

    setMessage('✅ Task created successfully!');
    setTitle('');
    setDescription('');
    setDueDate('');
  } catch (err: any) {
    console.error('❌ Submit error:', err.message || err);
    setMessage('❌ Failed to create task.');
  } finally {
    setLoading(false);
  }
};


  return (
    <div>
      <FlexContainer>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Create Task
          </h1>
          <p className="text-gray-400 mt-2">Add a new task to your workspace</p>
        </div>
      </FlexContainer>

      <GlassPanel
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto p-8"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Task Title</label>
            <NeonInput
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
              rows={4}
              className="w-full p-3 bg-white/5 border border-cyan-400/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Due Date</label>
            <NeonInput
              type="datetime-local"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>

          {message && (
            <p className="text-sm text-center text-white bg-black/20 rounded-lg py-2">
              {message}
            </p>
          )}

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              onClick={() => {
                setTitle('');
                setDescription('');
                setDueDate('');
                setMessage('');
              }}
            >
              Cancel
            </button>
            <NeonButton
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {loading ? 'Creating...' : 'Create Task'}
            </NeonButton>
          </div>
        </form>
      </GlassPanel>
    </div>
  );
};

export default CreateTask;
