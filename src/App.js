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
import AuthProvider from "./context/auth";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    // we wrap all the Routes to the AuthProvider component so we can pass the user state to every component
    //and this way we check if there is an admin logged in
    <AuthProvider>
      {/* setting up the Routes */}
      <BrowserRouter>
        <Routes>
          {/* We wrap these Routes to the SharedLayout so they share the header and the navbar */}
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route path="main" element={<Main />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="comments" element={<Comments />} />
            <Route path="adminLogIn" element={<AdminLogIn />} />
            {/* If the user tries to reach a non existing page we redirect him/her to an error page */}
            <Route path="*" element={<Error />} />
          </Route>
          {/* We put that in the PrivateRoute component so that it is not accessible when the admin is not logged in */}
          {/* It's outside the SharedLayout because we don't want the navbar and the header included here  */}
          <Route element={<PrivateRoute />}>
            <Route path="admin" element={<Admin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
