import { Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import BootScreen from './components/BootScreen';
import TerminalMode from './components/TerminalMode';
import DesktopMode from './components/DesktopMode';

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<BootScreen />} />
        <Route path="/terminal" element={<TerminalMode />} />
        <Route path="/gui" element={<DesktopMode />} />
      </Routes>
    </AppProvider>
  );
}

export default App;