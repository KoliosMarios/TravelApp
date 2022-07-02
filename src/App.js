import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Main from "./Main";
import About from "./About";
import Contact from "./Contact";
import SharedLayout from "./SharedLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="main" element={<Main />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
