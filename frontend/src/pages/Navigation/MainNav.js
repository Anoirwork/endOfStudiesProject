import React, { Component } from "react";
import { Menu, Icon } from "semantic-ui-react";

import { NavLink, Redirect } from "react-router-dom";
export default class MenuExamplePointing extends Component {
  constructor(props){
    super(props);
    this.state = {
      isSideBarShown: this.props.sideBar,
      loggedOut: false
  };
  
}
UNSAFE_componentWillReceiveProps(nextProps){
  this.setState({
    isSideBarShown: !this.props.sideBar
  })
}
  handleItemClicke = () => {
    this.setState({ isSideBarShown: !this.state.isSideBarShown });
    
  };
  render() {
    let margin = this.state.isSideBarShown ? "215px" : "59px";
    const logout = e => {
      e.preventDefault();
      localStorage.clear();
      this.setState({ loggedOut: true });
      // this.props.history.push("/login");
    };
    return (
      <React.Fragment>
        {this.state.loggedOut && <Redirect to="/login" />}
        <div style={{ position: "relative", zIndex: "100", boxShadow: "rgba(0, 0, 0, 0.25) 20px 1px 28px", backgroundColor: "white" , marginLeft : margin , transition: "margin 0.8s" }}>
          <Menu pointing secondary className="navBar">
            {/*<Menu.Item
              name="sidebar"
              active={!this.state.sidebar}
              onClick={this.handleItemClicke}
            >
              {this.state.isSideBarShown ? (
                <Icon name="times" className="navBar" />
              ) : (
                <Icon name="th" className="navBar" />
              )}
            </Menu.Item>*/}

              {/*<Menu.Item
                
              >
                <Icon name="bars" className="navBar" style={{ fontSize: "2rem"}}/>
              </Menu.Item>*/}

            
            <Menu.Menu position="right">
              <NavLink to="/login">
                {!localStorage.getItem("token") ? (
                  <Menu.Item
                    name="Login"
                  >
                    <Icon name="sign-in" size="large" className="navBar" /> Log
                    In
                  </Menu.Item>
                ) : (
                  <Menu.Item
                    name="Login"
                    onClick={logout}
                  >
                    <Icon name="sign-in" size="large" className="navBar" /> Log Out
                  </Menu.Item>
                )}
              </NavLink>
              <NavLink to="/register">
                <Menu.Item
                  name="Register"
                >
                  <Icon name="user plus" size="large" className="navBar" />{" "}
                  Register
                </Menu.Item>
              </NavLink>
            </Menu.Menu>
          </Menu>
        </div>
      </React.Fragment>
    );
  }
}
/*<li className="nav-item"></li>;
{
  !localStorage.getItem("token") && (
    <div>
      <li className="nav-item">
        <NavLink
          to="/login"
          className="nav-link text-dark font-italic bg-light"
        >
          <Icon name="sign-in" size="large" /> Log In
        </NavLink>
      </li>
      <li className="nav-item"></li>
    </div>
  );
}
<li className="nav-item">
  <div className="nav-link text-dark font-italic bg-light">
    <button className="buttonMoghot" onClick="">
      <Icon name="sign out" size="large" /> Log out
    </button>
  </div>
</li>;*/
