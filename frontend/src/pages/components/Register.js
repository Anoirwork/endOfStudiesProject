import React from "react";
import { Segment, Button, Icon, Form } from "semantic-ui-react";
import Spinner from "../HelperFunctions/Spinner";
import { toast, ToastContainer } from "react-toastify";
import "../../../node_modules/react-toastify/dist/ReactToastify.css";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.fnameEl = React.createRef();
    this.lnameEl = React.createRef();
    this.genderEl = React.createRef();
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
    this.nameEl = React.createRef();
    this.numberEl = React.createRef();
    this.state = {
      loading: false,
      termsAccepted: false
    };
  }
  submitHandler = e => {
    if (!this.state.termsAccepted) {
      toast.error("You should accept the terms to proceed the singing in!");
    }
    e.preventDefault();
    const email = this.emailEl.current.value;
    const lname = this.lnameEl.current.value;
    const fname = this.fnameEl.current.value;
    const gender = this.genderEl.current.value;
    const password = this.passwordEl.current.value;
    const number = this.numberEl.current.value;
    if (
      email.trim() === "" ||
      password.trim() === "" ||
      lname.trim() === "" ||
      fname.trim() === "" ||
      gender.trim() === "" ||
      number.trim() === ""
    ) {
      toast.error("All fields must be filled out !!");
    } else {
      if (password.length <= 8) {
        toast.error("Password must be 8 chars!");
      } else {
        this.setState({ loading: true });
        let requestBody = {
          query: `
          mutation{
            createUser(userInput: {email: "${email}", password: "${password}", lname: "${lname}", fname: "${fname}", gender: "${gender}" ,number: "${number}"}){
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
              throw new Error("Damn");
            }
            return res.json();
          })
          .then(resData => {
            console.log(resData);
            localStorage.setItem("token", resData.data.createUser.token);
            localStorage.setItem("userId", resData.data.createUser.userId);
            this.props.history.push("/dashboard");
          })
          .catch(err => {
            console.log(err);
          })
          .finally(() => {
            this.setState({ loading: false });
          });
      }
    }
  };

  componentDidMount() {
    if (localStorage.getItem("token")) {
      return this.props.history.push("/login");
    }
  }
  componentWillUnmount() {
    this.setState({ loggingIn: !this.state.loggingIn });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.loading && (
          <Spinner message="Saving your account informations..." />
        )}
        <ToastContainer delay={4000} />
        <Segment className="register">
          <Form onSubmit={this.submitHandler}>
            <Form.Group widths="equal">
              <Form.Field>
                <label>First name</label>
                <input
                  name="fname"
                  placeholder="First name"
                  ref={this.fnameEl}
                />
              </Form.Field>
              <Form.Field>
                <label>Last name</label>
                <input
                  name="lname"
                  placeholder="Last name"
                  ref={this.lnameEl}
                />
              </Form.Field>
            </Form.Group>
            <Form.Field>
              <label>Gender</label>
              <select
                name="gender"
                ref={this.genderEl}
                placeholder="Gender"
                defaultValue="Select your option"
              >
                <option defaultValue="" disabled>
                  Select your option
                </option>
                <option defaultValue="Male">Male</option>
                <option defaultValue="Female">Female</option>
              </select>
            </Form.Field>
            <Form.Field>
              <label>Email</label>
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
                ref={this.passwordEl}
                autoComplete="Password"
                placeholder="***********"
              />
            </Form.Field>
            <Form.Field>
              <label>Number</label>
              <input
                name="number"
                placeholder="+216 XX XXX XXX"
                ref={this.numberEl}
              />
            </Form.Field>

            <Form.Checkbox
              label="I agree to the Terms and Conditions"
              onChange={() =>
                this.setState({ termsAccepted: !this.state.termsAccepted })
              }
            />
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
              labelPosition="left"
              negative
              size="small"
            >
              <Icon name="times" /> Reset
            </Button>
          </Form>
        </Segment>
      </React.Fragment>
    );
  }
}

export default Register;
