import { Outlet } from 'react-router';

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
        <Outlet />
      </div>
    </>
  );
}

export default App;
