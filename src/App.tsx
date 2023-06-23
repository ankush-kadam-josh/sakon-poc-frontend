import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { API_ROUTES } from "./routes/routes-constants";

import "./App.css";

import LayoutComponent from "./shared/Navbar";
import LoginContainer from "./pages/LoginSignup";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path={API_ROUTES.HOME} element={<LoginContainer />} />

          <Route element={<LayoutComponent />}>
            <Route path={API_ROUTES.HOME} element={<LoginContainer />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
