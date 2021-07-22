import React, { Component } from "react";
import { Segment, Button, Form, Icon } from "semantic-ui-react";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "../HelperFunctions/Spinner";

class Auth extends Component {
  constructor(props) {
    super(props);
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
  }

  state = {
    fieldRequired: false,
    token: localStorage.getItem("token"),
    loading: false
  };

  componentDidMount() {
    this.setState({ loading: false });
    if (localStorage.getItem("token")) {
      this.props.history.push("/dashboard");
    } else {
      return this.props.history.push("/login");
    }
  }

  submitHandler = e => {
    this.setState({ loading: true });
    e.preventDefault();
    const email = this.emailEl.current.value;
    const password = this.passwordEl.current.value;
    if (email.trim() === "" || password.trim() === "") {
      this.setState({ fieldRequired: true });
    } else {
      this.setState({ fieldRequired: false });
    }

    let requestBody = {
      query: `
      query{
        login(email: "${email}",password: "${password}"){
          userId
          token
        }
      }`
    };
    fetch("http://localhost:4000/api", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          if (res.status === 401) {
            localStorage.clear();
            this.props.history.push("/login");
          }
          toast.error("Wrong Credientals");
        }
        return res.json();
      })

      .then(resData => {
        this.setState({ loading: false });
        localStorage.setItem("token", resData.data.login.token);
        localStorage.setItem("userId", resData.data.login.userId);
        this.props.history.push("/dashboard");
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      <React.Fragment>
        <ToastContainer autoClose={5000} />
        {this.state.loading && <Spinner message="Logging you in!" />}
        <Segment style={{ marginTop: "4rem", padding: 4 + "rem" }}>
          <h1 style={{ marginBottom: "2rem", alignItem: "center" }}>
            <center>Login Form</center>
          </h1>

          {this.state.fieldRequired && (
            <div className="alert alert-danger" role="alert">
              All fields are required!
            </div>
          )}

          <Form onSubmit={this.submitHandler}>
            <Form.Field>
              <label>Username or Email</label>
              <input
                name="email"
                placeholder="Username or Email"
                ref={this.emailEl}
              />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                autoComplete=""
                ref={this.passwordEl}
              />
            </Form.Field>
            <Button
              type="submit"
              floated="right"
              icon
              labelPosition="left"
              primary
              size="small"
            >
              <Icon name="log out" /> Submit
            </Button>
            <Button
              type="reset"
              floated="right"
              icon
              color="red"
              labelPosition="left"
              primary
              size="small"
            >
              <Icon name="log out" /> Reset
            </Button>
          </Form>
        </Segment>
      </React.Fragment>
    );
  }
}

export default Auth;
