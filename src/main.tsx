import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { queryClient } from './services/react-query/index.ts';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import './styles/globals.scss';
import { ModalProvider } from './context/modal/index.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <ModalProvider>
      <App />
    </ModalProvider>
    <Toaster />
  </QueryClientProvider>,
);
