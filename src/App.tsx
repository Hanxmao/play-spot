import { Outlet } from 'react-router';
import { NearbySportsProvider } from './context/NearbySportsContext';
import NavBar from './components/NavBar';
import IosInstallPrompt from './components/IosInstallPrompt';
import ServiceWorkerWrapper from './components/ServiceWorkerWrapper';

function App() {
  return (
    <>
      <div>
        <IosInstallPrompt />
        <ServiceWorkerWrapper />
        <NearbySportsProvider >
          <main>
            <NavBar />
            <Outlet />
          </main>
        </NearbySportsProvider>
      </div>
    </>
  );
}

export default App;
