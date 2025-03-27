import Login from "./pages/login";
import Index from "./pages/Index"
import Register from "./pages/Register";
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
            </Routes>
          </Router>
      );
}
export default App
