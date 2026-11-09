import { BrowserRouter } from 'react-router-dom'
import { MainRoutes } from './Routes/MainRoutes'

export default function App() {
  return (
    <BrowserRouter>
      <MainRoutes />
    </BrowserRouter>
  )
}
