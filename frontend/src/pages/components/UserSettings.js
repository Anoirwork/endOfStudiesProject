import React from "react";
import { Segment, Button } from "semantic-ui-react";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "../HelperFunctions/Spinner";
import moment from "moment";
class UserSettings extends React.Component {
  constructor(props) {
    super(props);
    if (!localStorage.getItem("token") || !localStorage.getItem("userId")) {
      localStorage.clear();
      props.history.push("/login");
    }
    this.pw1 = React.createRef();
    this.pw2 = React.createRef();
    this.oldpass = React.createRef();
    this.state = {
      user: {},
      loading: false
    };

    if (localStorage.getItem("token")) {
      let reqBody = {
        query: `{
          user(userId: "${localStorage.getItem("userId")}"){
            fname
            lname
            email
            number
            createdAt
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
              console.log("Unauthorized");
              localStorage.clear();
              this.props.history.push("/login");
            }
            throw new Error("Failed!");
          }
          return res.json();
        })
        .then(resData => {
          this.setState({ user: resData.data.user });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      localStorage.clear();
      this.props.history.push("/login");
    }
  }
  updateUser = e => {
    e.preventDefault();
    this.setState({ loading: true });
    const pw2 = this.pw1.current.value;
    const pw1 = this.pw2.current.value;
    const oldpass = this.oldpass.current.value;
    if (pw1 === pw2 && pw1 !== "" && pw2 !== "" && oldpass !== "") {
      let updateRequestBody = {
        query: `mutation{updateUser(userId: "${localStorage.getItem(
          "userId"
        )}", oldPass:"${oldpass}", newPass: "${pw1}"){token}}`
      };
      fetch("http://localhost:4000/api", {
        method: "POST",
        body: JSON.stringify(updateRequestBody),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Barer ${localStorage.getItem("token")}`
        }
      })
        .then(res => {
          if (res.status !== 200 && res.status !== 201) {
          }
        })
        .then(resData => {
          console.log(resData);
        })
        .catch(err => {
          return err;
        });
      this.setState({ loading: false });
    } else if (pw1 !== pw2) {
      toast.error("Password confirmation doesn't match!");
      this.setState({ loading: false });
    } else {
      toast.error("All fields are required");
      this.setState({ loading: false });
    }
  };
  render() {
    return (
      <React.Fragment>
        {this.state.loading && <Spinner message="Finlizing the update..." />}
        <ToastContainer autoClose={5000} />
        <Segment>
          <div className="container">
            <div className="row">
              <div className="col-lg-4 pb-5">
                <h1> User settings</h1>
              </div>
            </div>
            <div className="col">
              <form className="row" onSubmit={this.updateUser}>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="account-fn">First Name</label>
                    <input
                      className="form-control"
                      type="text"
                      id="account-fn"
                      defaultValue={this.state.user.fname}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="account-ln">Last Name</label>
                    <input
                      className="form-control"
                      type="text"
                      id="account-ln"
                      defaultValue={this.state.user.lname}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="account-email">E-mail Address</label>
                    <input
                      className="form-control"
                      type="text"
                      id="account-email"
                      defaultValue={this.state.user.email}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="account-phone">Phone Number</label>
                    <input
                      className="form-control"
                      type="number"
                      id="account-phone"
                      defaultValue={this.state.user.number}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="account-phone">Joining data</label>
                    <input
                      className="form-control"
                      type="text"
                      defaultValue={moment(this.state.user.createdAt).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="account-pass">New Password</label>
                    <input
                      className="form-control"
                      type=""
                      id="account-pass"
                      autoComplete=""
                      ref={this.pw1}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="account-confirm-pass">
                      Confirm Password
                    </label>
                    <input
                      className="form-control"
                      type=""
                      id="account-confirm-pass"
                      autoComplete=""
                      ref={this.pw2}
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="account-pass">Old Password</label>
                    <input
                      className="form-control"
                      type=""
                      id="account-pass"
                      autoComplete=""
                      ref={this.oldpass}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <hr className="mb-3" />
                  <div className="d-flex flex-wrap justify-content-between float-right">
                    <Button negative>No</Button>
                    <Button
                      positive
                      icon="checkmark"
                      type="submit"
                      labelPosition="right"
                      content="Yes"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Segment>
      </React.Fragment>
    );
  }
}

export default UserSettings;
