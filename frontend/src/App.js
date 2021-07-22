import React, { Component } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";

import AuthPage from "./pages/components/Auth";
import RegisterPage from "./pages/components/Register";
import DashBoardPage from "./pages/components/Dashboad";
import AddKid from "./pages/components/AddKid";
import KidsList from "./pages/components/KidsList";
import SideBar from "./pages/Navigation/SideBar";
import UserSettings from "./pages/components/UserSettings";
import About from "./pages/Navigation/About";
import Home from "./pages/Modal/Home";
class App extends Component {
  state = {
    sidebarShown: false,
    darkMode : false
  };
  toggleSidebar = () => {
    this.setState({ sidebarShown: !this.state.sidebarShown });
  };
  darkModeEnabler = () => {
    this.setState({
      darkMode: !this.state.darkMode
    })
  }
  render() {
    return (
      <BrowserRouter>
        <SideBar
          sidebar={this.toggleSidebar}
          isActive={this.state.sidebarShown}
          darkMode={this.darkModeEnabler}
        />
        <main
          className={
            this.state.sidebarShown
              ? "page-content-with-sidebar"
              : "page-content-without-sidebar"             
          }
          style={{ padding: "3rem" }}
        >
          <Switch>
            <Route path="/add" component={AddKid} />
            <Route path="/" exact component={Home} />
            <Route path="/login" component={AuthPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/dashboard" component={DashBoardPage} />
            <Route path="/show-kids" component={KidsList} />
            <Route path="/user-settings" component={UserSettings} />
            <Route path="/about" component={About} />
          </Switch>
        </main>
      </BrowserRouter>
    );
  }
}

export default App;
