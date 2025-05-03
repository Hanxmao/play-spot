import { Outlet } from 'react-router';
import { NearbySportsProvider } from './context/NearbySportsContext';
import NavBar from './components/Navbar';

function App() {
  return (
    <>
      {/* TODO: Navbar place holder */}
      <div>
        <NearbySportsProvider >
        <NavBar />
        <Outlet />
        </NearbySportsProvider>
      </div>
    </>
  );
}

export default App;
