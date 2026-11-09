import './style.css'
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { ThemeProvider, GlobalStyle } from './Shared/theme'

const root = createRoot(document.getElementById('root')!)
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
