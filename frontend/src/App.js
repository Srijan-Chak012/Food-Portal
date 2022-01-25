import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

import UsersList from "./components/users/UsersList";
import Home from "./components/common/Home";
import Signup from "./components/common/Signup";
import Login from "./components/common/Login";
import Navbar from "./components/templates/Navbar";
import Profile from "./components/users/Profile";
import AddItems from "./components/common/AddItems";
import EditItems from "./components/common/EditItems";
import BuyItems from "./components/common/BuyItems";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="users" element={<UsersList />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
          <Route path="additems" element={<AddItems />} />
          <Route path="edititems" element={<EditItems />} />
          <Route path="buyitems" element={<BuyItems />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
