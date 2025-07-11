import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { List, CheckCircle, Activity, Clock, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Task } from '../types';
import { GlassPanel, StatCard, Grid, FlexContainer } from '../styles/StyledComponents';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [tasks] = useState<Task[]>([
    { id: 1, title: 'Complete Project Alpha', description: 'Finish the main features', status: 'in-progress', priority: 'high', createdAt: new Date(), assignedTo: 'John' },
    { id: 2, title: 'Review Code', description: 'Code review for new features', status: 'pending', priority: 'medium', createdAt: new Date(), assignedTo: 'Sarah' },
    { id: 3, title: 'Update Documentation', description: 'Update API documentation', status: 'completed', priority: 'low', createdAt: new Date(), assignedTo: 'Mike' },
  ]);

  const stats = {
    totalTasks: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    pending: tasks.filter(t => t.status === 'pending').length,
  };

  const doughnutData = {
    labels: ['Completed', 'In Progress', 'Pending'],
    datasets: [
      {
        data: [stats.completed, stats.inProgress, stats.pending],
        backgroundColor: ['#00FFFF', '#FF00FF', '#0080FF'],
        borderColor: ['#00FFFF', '#FF00FF', '#0080FF'],
        borderWidth: 2,
      },
    ],
  };

  const barData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Tasks Completed',
        data: [12, 19, 3, 5, 2, 3, 9],
        backgroundColor: 'rgba(0, 255, 255, 0.3)',
        borderColor: '#00FFFF',
        borderWidth: 2,
      },
    ],
  };

  return (
    <div>
      <FlexContainer>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-gray-400 mt-2">Welcome back, {user?.username}!</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-400">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </FlexContainer>

      <Grid>
        <StatCard
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-cyan-500/20 rounded-full">
              <List className="w-6 h-6 text-cyan-400" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-cyan-400">{stats.totalTasks}</p>
              <p className="text-sm text-gray-400">Total Tasks</p>
            </div>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: '75%' }}
            />
          </div>
        </StatCard>

        <StatCard
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-500/20 rounded-full">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-green-400">{stats.completed}</p>
              <p className="text-sm text-gray-400">Completed</p>
            </div>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${(stats.completed / stats.totalTasks) * 100}%` }}
            />
          </div>
        </StatCard>

        <StatCard
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-500/20 rounded-full">
              <Activity className="w-6 h-6 text-purple-400" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-purple-400">{stats.inProgress}</p>
              <p className="text-sm text-gray-400">In Progress</p>
            </div>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-400 to-pink-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${(stats.inProgress / stats.totalTasks) * 100}%` }}
            />
          </div>
        </StatCard>

        <StatCard
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-500/20 rounded-full">
              <Clock className="w-6 h-6 text-orange-400" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-orange-400">{stats.pending}</p>
              <p className="text-sm text-gray-400">Pending</p>
            </div>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-orange-400 to-red-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${(stats.pending / stats.totalTasks) * 100}%` }}
            />
          </div>
        </StatCard>
      </Grid>

      <Grid>
        <GlassPanel className="p-6">
          <h3 className="text-xl font-semibold mb-4 text-cyan-400">Task Distribution</h3>
          <div className="h-64">
            <Doughnut data={doughnutData} options={{ maintainAspectRatio: false }} />
          </div>
        </GlassPanel>

        <GlassPanel className="p-6">
          <h3 className="text-xl font-semibold mb-4 text-cyan-400">Weekly Progress</h3>
          <div className="h-64">
            <Bar data={barData} options={{ maintainAspectRatio: false }} />
          </div>
        </GlassPanel>
      </Grid>

      <GlassPanel className="p-6">
        <h3 className="text-xl font-semibold mb-4 text-cyan-400">Recent Tasks</h3>
        <div className="space-y-4">
          {tasks.slice(0, 3).map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${
                  task.status === 'completed' ? 'bg-green-400' :
                  task.status === 'in-progress' ? 'bg-purple-400' : 'bg-orange-400'
                }`} />
                <div>
                  <p className="font-medium">{task.title}</p>
                  <p className="text-sm text-gray-400">{task.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium capitalize">{task.status}</p>
                <p className="text-xs text-gray-400">{task.priority} priority</p>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassPanel>
    </div>
  );
};

export default Dashboard;