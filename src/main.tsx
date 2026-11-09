import './style.css'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './Redux'
import App from './App'
import { ThemeProvider, GlobalStyle } from './Shared/theme'
import { LanguageProvider } from './Dictionary/LanguageProvider'

const root = createRoot(document.getElementById('root')!)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <GlobalStyle />
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
)
