import LoginPage from "./login_page";
import Home from "./home";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
function App() {
  return (
    
        <Routes>
          <Route  path="/" element={<LoginPage/>} /> 
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/home" element={<Home/>} />
        </Routes>
    
  );
}

export default App;
