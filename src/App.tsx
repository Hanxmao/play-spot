import { Outlet } from "react-router";
import "./App.css";

function App() {
  return (
    <>
      {/* TODO: Navbar place holder */}
      <div className="p-6">
        <Outlet />
      </div>
    </>
  );
}

export default App;
