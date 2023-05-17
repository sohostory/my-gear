import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navigation from "./routes/navigation/navigation.component";
import SignIn from "./routes/sign-in/sign-in.component";
import Register from "./routes/register/register.component";
import Dashboard from "./routes/dashboard/dashboard.component";
import Authentication from "./routes/authentication/authentication.component";

import "./App.css";

const defaultUser = {
  id: "",
  first_name: "",
  email: "",
};

function App() {
  const [user, setUser] = useState(defaultUser);
  const { id, first_name, email } = user;

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route
          path="/"
          element={<Authentication user={user} setUser={setUser} />}
        />
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/dashboard" element={<Dashboard user={user} />} />
      </Route>
    </Routes>
  );
}

export default App;
