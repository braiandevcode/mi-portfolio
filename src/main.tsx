import './styles.css';
import { StrictMode } from 'react';
import { createRoot, Root } from 'react-dom/client';
import App from './App';

const nodeApp: HTMLElement | null = document.getElementById('app');
const root:Root = createRoot(nodeApp!);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);












