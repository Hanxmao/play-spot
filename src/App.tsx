import { Outlet } from 'react-router';
import { NearbySportsProvider } from './context/NearbySportsContext';
import NavBar from './components/NavBar';
import IosInstallPrompt from './components/IosInstallPrompt';
import ServiceWorkerWrapper from './components/ServiceWorkerWrapper';

function App() {
  return (
    <>
      {/* TODO: Navbar place holder */}
      <div>
        <IosInstallPrompt />
        <ServiceWorkerWrapper />
        <NearbySportsProvider >
        <NavBar />
        <Outlet />
        </NearbySportsProvider>
      </div>
    </>
  );
}

export default App;
