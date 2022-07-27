import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Main from "./Main";
import About from "./About";
import Contact from "./Contact";
import Comments from "./Comments";
import AdminLogIn from "./AdminLogIn";
import Admin from "./Admin";
import Error from "./Error";
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
          <Route path="comments" element={<Comments />} />
          <Route path="adminLogIn" element={<AdminLogIn />} />
          <Route path="*" element={<Error />} />
        </Route>
        <Route path="admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
