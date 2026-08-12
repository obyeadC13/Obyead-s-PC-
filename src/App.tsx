import { Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import BootScreen from './components/BootScreen';
import TerminalMode from './components/TerminalMode';
import DesktopMode from './components/DesktopMode';
import TerminalBoot from './components/TerminalBoot';
import GuiBoot from './components/GuiBoot';

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<BootScreen />} />
        <Route path="/boot/terminal" element={<TerminalBoot />} />
        <Route path="/boot/gui" element={<GuiBoot />} />
        <Route path="/terminal" element={<TerminalMode />} />
        <Route path="/gui" element={<DesktopMode />} />
      </Routes>
    </AppProvider>
  );
}

export default App;