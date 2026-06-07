import { createRoot } from 'react-dom/client';
import App from './App.tsx';

import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './contexts/themeContext';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </BrowserRouter>
);
