import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NearbySportsFinder from './components/NearbySportsFinder';
import PlaceDetail from './components/PlaceDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NearbySportsFinder />} />
        <Route path="/place/:id" element={<PlaceDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
