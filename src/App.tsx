import { Outlet } from 'react-router';
import { NearbySportsProvider } from './context/NearbySportsContext';

function App() {
  return (
    //TODO: remove after fix
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<NearbySportsFinder />} />
    //     <Route path="/place/:id" element={<PlaceDetail />} />
    //   </Routes>
    // </BrowserRouter>
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
