import { Outlet } from 'react-router';
import { NearbySportsProvider } from './context/NearbySportsContext';

function App() {
  return (
    <>
      {/* TODO: Navbar place holder */}
      <div>
        <NearbySportsProvider >

        <Outlet />
        </NearbySportsProvider>
      </div>
    </>
  );
}

export default App;
