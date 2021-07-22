import SideNav, {  NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import React from "react";
import MainNav from "./MainNav";
import { NavLink, withRouter } from "react-router-dom";
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

    

class SideBar extends React.Component {
    constructor(props) {
    super(props);

    this.state = {
      userId: localStorage.getItem("userId"),
      userName: "",
      isSideBarShown: this.props.isActive,
      loggedOut: false
      
    };
  }
  UNSAFE_componentWillMount() {
    if (localStorage.getItem("token")) {
      let reqBody = {
        query: `{
        user(userId: "${localStorage.getItem("userId")}"){
          lname    
        }
      }
      `
      };
      fetch("http://localhost:4000/api", {
        method: "POST",
        body: JSON.stringify(reqBody),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Barer " + localStorage.getItem("token")
        }
      })
        .then(res => {
          if (res.status !== 200 && res.status !== 201) {
            if (res.status === 401) {
              localStorage.clear();
              this.props.history.push("/login");
            }
            throw new Error("Failed!");
          }
          return res.json();
        })
        .then(resData => {
          this.setState({ userName: resData.data.user.lname });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.setState({ userName: "Guest" });
    }
  };
  
  handleItemClicke = () => {
      this.setState({
        isSideBarShown: !this.state.isSideBarShown 
      });
  }
  render() {
    /*const logout = e => {
    e.preventDefault();
    localStorage.clear();
    console.log(this.props);
    this.setState({ loggedOut: true });
    // this.props.history.push("/login");
  };*/
    return (
        <React.Fragment>
        
        <MainNav sideBar={this.state.isSideBarShown} darkMode={this.props.darkMode} />
        <SideNav
                onToggle={()=> {
                      this.setState({
                        ...this.State,
                        isSideBarShown : !this.state.isSideBarShown 
                      })
                      this.props.sidebar()
                }}
                className="vertical-nav"
            >
            
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected="home" >
            <hr style={{ marginTop: "-5px", borderTop: "2px solid rgba(0, 0, 0, .1)" }}/>
                <NavItem eventKey="home">
                    <NavIcon>
                    <NavLink to="/" >  
                      <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em', color: "black" }} />
                    </NavLink>
                    </NavIcon>
                    <NavText>
                     <NavLink to="/" >   Home </NavLink>
                    </NavText>
                </NavItem>
                {/****************** */}
                <NavItem eventKey="dashboard">
                    <NavIcon>
                        <NavLink to="/dashboard">
                          <i className="fa fa-fw fa-map-marker" style={{ fontSize: '1.75em', color: "black" }} />
                        </NavLink>                    
                    </NavIcon>
                    <NavText>
                    <NavLink to="/dashboard" >  Dashboard </NavLink>
                    </NavText>
                </NavItem>
                {/****************** */}
                <NavItem eventKey="add">
                    <NavIcon>
                        <NavLink to="/add">
                          <i className="fa fa-fw fa-plus" style={{ fontSize: '1.75em', color: "black" }} />
                        </NavLink>                    
                    </NavIcon>
                    <NavText>
                      <NavLink to="/add">
                        Add Kids
                      </NavLink>
                    </NavText>
                </NavItem>
                {/****************** */}
                <NavItem eventKey="showKids">
                    <NavIcon>
                        <NavLink to="/show-kids">
                          <i className="fa fa-fw fa-users" style={{ fontSize: '1.75em', color: "black" }} />
                        </NavLink>                    
                    </NavIcon>
                    <NavText>
                      <NavLink to="/show-kids">
                        Show kids
                      </NavLink>
                    </NavText>
                </NavItem>
                {/****************** */}
                <NavItem eventKey="userSettings">
                    <NavIcon>
                        <NavLink to="/user-settings">
                          <i className="fa fa-fw fa-cogs" style={{ fontSize: '1.75em', color: "black" }} />
                        </NavLink>                    
                    </NavIcon>
                    <NavText>
                      <NavLink to="/user-settings">
                        User settings
                      </NavLink>
                    </NavText>
                </NavItem>
                {/****************** */}
            </SideNav.Nav>
        </SideNav>
        </React.Fragment>
    );
  }
}
export default withRouter(SideBar);