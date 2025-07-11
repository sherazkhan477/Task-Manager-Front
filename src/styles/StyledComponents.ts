import styled from 'styled-components';
import { motion } from 'framer-motion';

export const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0A1929 0%, #1e3a8a 50%, #312e81 100%);
  color: white;
  font-family: 'Space Grotesk', 'Inter', sans-serif;
  overflow-x: hidden;
`;

export const GlassPanel = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    0 0 20px rgba(0, 255, 255, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
`;

export const NeonButton = styled(motion.button)`
  background: linear-gradient(45deg, #00FFFF, #0080FF);
  border: none;
  border-radius: 12px;
  color: #0A1929;
  font-weight: 600;
  padding: 12px 24px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  box-shadow: 
    0 0 20px rgba(0, 255, 255, 0.3),
    0 4px 15px rgba(0, 0, 0, 0.2);
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s;
  }
  
  &:hover:before {
    left: 100%;
  }
`;

export const NeonInput = styled.input`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 8px;
  color: white;
  padding: 12px 16px;
  font-size: 16px;
  width: 100%;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #00FFFF;
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

export const StatCard = styled(GlassPanel)`
  padding: 24px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 
      0 12px 40px rgba(0, 0, 0, 0.4),
      0 0 30px rgba(0, 255, 255, 0.2);
  }
`;

export const TaskCard = styled(GlassPanel)`
  padding: 20px;
  margin-bottom: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateX(5px);
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, 0.4),
      0 0 25px rgba(255, 0, 255, 0.15);
  }
`;

export const Sidebar = styled(motion.div)<{ collapsed: boolean }>`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: ${props => props.collapsed ? '80px' : '280px'};
  background: rgba(10, 25, 41, 0.9);
  backdrop-filter: blur(15px);
  border-right: 1px solid rgba(0, 255, 255, 0.2);
  z-index: 1000;
  transition: width 0.3s ease;
  box-shadow: 5px 0 20px rgba(0, 0, 0, 0.3);
`;

export const MainContent = styled.div<{ sidebarCollapsed: boolean }>`
  margin-left: ${props => props.sidebarCollapsed ? '80px' : '280px'};
  padding: 20px;
  transition: margin-left 0.3s ease;
  
  @media (max-width: 768px) {
    margin-left: 0;
    padding: 10px;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;