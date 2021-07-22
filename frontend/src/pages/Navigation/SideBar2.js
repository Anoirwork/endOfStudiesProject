import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Icon } from "semantic-ui-react";

class SideBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: localStorage.getItem("userId"),
      userName: ""
    };
  }
  componentDidMount() {
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
  }

  render() {
    return (
      <React.Fragment>
        <div className="vertical-nav bg-white" id="sidebar">
          <div className="py-4 px-3 mb-4 bg-light">
            <div className="media d-flex align-items-center">
              <img
                src="https://i.pravatar.cc/70"
                alt="Avatar"
                width="65"
                className="mr-3 rounded-circle img-thumbnail shadow-sm"
              />
              <div className="media-body">
                <h4 className="m-0">
                  Welcom, <br />
                  {this.state.userName}
                </h4>
              </div>
            </div>
          </div>
          <p className="text-gray font-weight-bold text-uppercase px-3 small pb-4 mb-0">
            Manage
          </p>
          <ul className="nav flex-column bg-white mb-0">
            <li className="nav-item">
              <NavLink
                to="/dashboard"
                className="nav-link text-dark font-italic bg-light"
              >
                <Icon name="clone" color="blue" size="large" />
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/add"
                className="nav-link text-dark font-italic bg-light"
              >
                <Icon name="plus" color="blue" size="large" />
                Add a kid
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/show-kids"
                className="nav-link text-dark font-italic bg-light"
              >
                <Icon name="edit" color="blue" size="large" />
                Manage kids
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/user-settings"
                className="nav-link text-dark font-italic bg-light"
              >
                <Icon name="cogs" color="blue" size="large" />
                User Settings
              </NavLink>
            </li>
          </ul>
        </div>
      </React.Fragment>
    );
  }
}
export default withRouter(SideBar);
