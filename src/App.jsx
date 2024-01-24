import { Admin, Resource } from "react-admin";

import dataProvider from "./dataProvider";

// Module List
import user from "./modules/user/index";
import Dashboard from "./modules/dashboard";

import './App.css'

function App() {

  return (
    <Admin
      dashboard={Dashboard}
      // authProvider={authProvider}
      dataProvider={dataProvider}
    >
      <Resource
        name='users'
        options={{ label: "Users" }}
        {...user}
      />
    </Admin>
  )
}

export default App
