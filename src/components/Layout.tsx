import React, { useState } from 'react';
import Navigation from './Navigation';
import { MainContent } from '../styles/StyledComponents';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex">
      <Navigation collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <MainContent sidebarCollapsed={sidebarCollapsed}>
        {children}
      </MainContent>
    </div>
  );
};

export default Layout;