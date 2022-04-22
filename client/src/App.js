import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
// import Message from "./pages/message/Message";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="messenger"
          element={!user ? <Navigate to="/" /> : <Messenger />}
        />
        <Route path="profile/:username" element={<Profile />} />
        {/* <Route path="/message" element={<Message />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
