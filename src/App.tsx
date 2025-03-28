import { useEffect } from "react";
import { useStore } from "./store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import Home from "./pages/Home";

function App() {
  const { isDarkMode, isUser } = useStore();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  console.log(isUser);

  return (
    <Router>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
