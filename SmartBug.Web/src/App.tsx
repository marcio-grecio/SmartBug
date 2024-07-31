import MainRouter from './Routes/MainRouter';
import { AuthProvider } from './Contexts/UserContext';
import { ThemeProvider } from './Contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>

    <AuthProvider>
      <MainRouter />
    </AuthProvider>
    </ThemeProvider>
  )
}

export default App
