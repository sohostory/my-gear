import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navigation from "./routes/navigation/navigation.component";
import Dashboard from "./routes/dashboard/dashboard.component";
import Authentication from "./routes/authentication/authentication.component";
import MyAccount from "./routes/my-account/my-account.component";
import SideMenu from "./components/side-menu/side-menu.component";
import Table from "./components/table/table.component";
import AddEquipmentForm from "./components/add-equipment-form/add-equipment-form.compnent";
import EditEquipmentForm from "./components/edit-equipment-form/edit-equipment-form.component";
import ManageList from "./components/manage-list/manage-list.component";

import "./App.css";

const defaultUser = {
  id: "",
  first_name: "",
  email: "",
};

function App() {
  const [user, setUser] = useState(defaultUser);

  return (
    <Routes>
      <Route path="/" element={<Navigation user={user} setUser={setUser} />}>
        <Route
          path="/authentication"
          element={<Authentication user={user} setUser={setUser} />}
        />
        <Route
          path="/account"
          element={<MyAccount user={user} setUser={setUser} />}
        />

        {/* DASHBOARD */}

        <Route path="/dashboard" element={<SideMenu />}>
          <Route path="/dashboard/" element={<Dashboard />}>
            <Route path="/dashboard/main" element={<Table user={user} />} />
            <Route
              index
              path="/dashboard/add-equipment"
              element={<AddEquipmentForm user={user} />}
            />
            <Route
              path="/dashboard/edit-equipment/:serial"
              element={<EditEquipmentForm user={user} />}
            />
            <Route
              path="/dashboard/list/:table"
              element={<ManageList user={user} />}
            />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
