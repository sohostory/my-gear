import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navigation from "./routes/navigation/navigation.component";
import Dashboard from "./routes/dashboard/dashboard.component";
import Authentication from "./routes/authentication/authentication.component";
import SideMenu from "./components/side-menu/side-menu.component";
import AddEquipmentForm from "./components/add-equipment-form/add-equipment-form.compnent";

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
      <Route path="/" element={<Navigation user={user} setUser={setUser} />}>
        <Route
          path="/"
          element={<Authentication user={user} setUser={setUser} />}
        />

        {/* DASHBOARD */}

        <Route path="/dashboard" element={<SideMenu />}>
          <Route path="/dashboard/main" element={<Dashboard user={user} />} />
          <Route
            path="/dashboard/add-equipment"
            element={<AddEquipmentForm user={user} />}
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
