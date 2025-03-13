import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import "./App.css";
import { RtkQueryProvider } from "./lib/rtkQueryProvider";

function App() {
  return (
    <RtkQueryProvider>
      <BrowserRouter>
        <Routes>
          {/* Define your routes */}
          <Route path="/" element={<Home />} />
          {/* 404 route - always keep this last */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </RtkQueryProvider>
  );
}

export default App;
