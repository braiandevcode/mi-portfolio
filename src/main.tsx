import './styles.css';
import { StrictMode } from 'react';
import { createRoot, Root } from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router';


const nodeApp: HTMLElement | null = document.getElementById('app');
const root:Root = createRoot(nodeApp!);

root.render(
   <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);












