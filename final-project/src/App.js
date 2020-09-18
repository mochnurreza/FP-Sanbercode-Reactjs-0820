import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { toast } from "react-toastify";
import Routes from "./Routes/Routes";
import { NavProvider } from "./Context/Navcontext";
import { AuthProvider } from "./Context/Authcontext";


class App extends React.Component {
  render() {
    toast.configure();
    return (
      <Router>
        <AuthProvider>
          <NavProvider>
            <Routes />
          </NavProvider>
        </AuthProvider>
      </Router>
    );
  }
}

export default App;
