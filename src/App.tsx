import './App.css';
import RoutesComponent from './RoutesComponent';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <RoutesComponent />
    </AuthProvider>
  );
}

export default App;
