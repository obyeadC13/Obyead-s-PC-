import { Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { AppProvider } from './context/AppContext';
import BootScreen from './components/BootScreen';
import TerminalMode from './components/TerminalMode';
import DesktopMode from './components/DesktopMode';
import MobileMode from './components/MobileMode';
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
        <Route path="/mobile" element={<MobileMode />} />
        <Route path="/gui" element={<DesktopMode />} />
      </Routes>
      <Analytics />
    </AppProvider>
  );
}

export default App;