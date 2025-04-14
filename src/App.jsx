import Login from "./pages/login";
import Index from "./pages/Index"
import Register from "./pages/Register";
import User from "./pages/User";
import Settings from "./pages/Setting";
import { 
  BrowserRouter as Router,
  Routes,
  Route,
 } from "react-router-dom";
function App() {
      return (
          <Router>
            <Routes>
              <Route path="/" element={<Index/>} />
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/user" element={<User/>}/>
              <Route path="/user/settings" element={<Settings/>}/>
            </Routes>
          </Router>
      );
}
export default App
