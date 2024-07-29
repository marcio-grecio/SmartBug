// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css';
import MainRouter from './Routes/MainRouter';
import { AuthProvider } from './Contexts/UserContext';
import { ThemeProvider } from './Contexts/ThemeContext';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <ThemeProvider>

    <AuthProvider>
      <MainRouter />
    </AuthProvider>
    </ThemeProvider>
  )
}

export default App
