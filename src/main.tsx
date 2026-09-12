import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';
import Router from './Router.tsx';

const root = document.getElementById('root')!;
const app = (
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);

if (root.hasChildNodes()) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
