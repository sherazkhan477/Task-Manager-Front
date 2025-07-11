import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Home, Plus, List } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Sidebar, FlexContainer, NeonButton } from '../styles/StyledComponents';

interface NavigationProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ collapsed, onToggle }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

 const fullMenu = [
  { path: '/dashboard', icon: Home, label: 'Dashboard', roles: ['admin'] },
  { path: '/create-task', icon: Plus, label: 'Create Task', roles: ['admin'] },
  { path: '/view-tasks', icon: List, label: 'View Tasks', roles: ['admin', 'user'] },
];

const menuItems = fullMenu.filter(item => item.roles.includes(user?.role || ''));


  return (
    <Sidebar collapsed={collapsed}>
      <div className="p-4">
        <FlexContainer>
          <motion.button
            onClick={onToggle}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 transition-colors"
          >
            {collapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
          </motion.button>
          {!collapsed && (
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
            >
              TaskSpace
            </motion.h2>
          )}
        </FlexContainer>

        <nav className="mt-8">
          {menuItems.map((item) => (
            <motion.div
              key={item.path}
              whileHover={{ x: 5 }}
              className={`flex items-center p-3 rounded-lg mb-2 cursor-pointer transition-all ${
                location.pathname === item.path
                  ? 'bg-cyan-500/20 border-l-2 border-cyan-400'
                  : 'hover:bg-white/10'
              }`}
              onClick={() => navigate(item.path)}
            >
              <item.icon className="w-5 h-5 mr-3 text-cyan-400" />
              {!collapsed && (
                <span className="text-white font-medium">{item.label}</span>
              )}
            </motion.div>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          {!collapsed && (
            <div className="bg-white/10 rounded-lg p-3 mb-4">
              <p className="text-sm text-gray-300">Welcome back,</p>
              <p className="font-semibold text-cyan-400">{user?.username}</p>
              <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
            </div>
          )}
          <NeonButton
            onClick={logout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full"
          >
            Logout
          </NeonButton>
        </div>
      </div>
    </Sidebar>
  );
};

export default Navigation;