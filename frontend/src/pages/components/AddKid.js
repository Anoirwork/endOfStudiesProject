import React, { Component } from "react";
import Spinner from "../HelperFunctions/Spinner";
import { ToastContainer, toast } from "react-toastify";
import { Segment, Form, Button, Icon } from "semantic-ui-react";
import "./AddKid.css";

class AddKid extends Component {
  componentWillMount() {
    if (!localStorage.getItem("token")) {
      this.props.history.push("/login");
    }
  }
  constructor(props) {
    super(props);
    if (!localStorage.getItem("token") || !localStorage.getItem("userId")) {
      localStorage.clear();
      props.history.push("/login");
    }
    this.fnEl = React.createRef();
    this.phoneEl = React.createRef();
    this.bdEl = React.createRef();
    this.emailEl = React.createRef();
    this.state = {
      fieldRequired: false,
      generalErr: false,
      realteErr: false,
      token: localStorage.getItem("token"),
      loading: false
    };
  }
  submitHandler = e => {
    e.preventDefault();
    const fn = this.fnEl.current.value;
    const phone = this.phoneEl.current.value;
    const bd = this.bdEl.current.value;
    const email = this.emailEl.current.value;
    if (
      fn.trim() === "" ||
      phone.trim() === "" ||
      bd.trim() === "" ||
      email.trim() === ""
    ) {
      toast.error("All fields are required!");
    } else {
      this.setState({ loading: true });
      let reqBody = {
        query: `
    mutation{
        createKid(kidInput: {name:"${fn}", number:${phone}, birthDay: "${bd}", email:"${email}"}, userId: "${localStorage.getItem(
          "userId"
        )}"){
          _id
        }
      }`
      };
      console.log(reqBody);
      fetch("http://localhost:4000/api", {
        method: "POST",
        body: JSON.stringify(reqBody),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Barer " + localStorage.getItem("token")
        }
      })
        .then(res => {
          console.log(res);
          if (res.status !== 200 && res.status !== 201) {
            this.setState({ generalErr: true });
            if (res.status === 401) {
              localStorage.clear();
              this.props.history.push("/login");
            }
          }
          return res.json();
        })
        .then(resData => {
          console.log(resData.data);
          /*-------------------------------------------------------------!RELATE KID REQ!---------------------------------------------------------------------------*/
          const relateKid = {
            query: `mutation{relateKid(kidId:"${
              resData.data.createKid._id
            }", userId:"${localStorage.getItem("userId")}"){_id}}`
          };
          console.log(relateKid);
          fetch("http://localhost:4000/api", {
            method: "POST",
            body: JSON.stringify(relateKid),
            headers: {
              "Content-Type": "application/json",
              Authorization: "Barer " + localStorage.getItem("token")
            }
          })
            .then(res => {
              if (res.status !== 200 && res.status !== 201) {
                this.setState({ generalErr: true });
                throw new Error(res.data);
              }
              console.log(res);
              return res;
            })
            .then(resData => {
              toast.success("Kid Have been added with success");
              this.setState({ loading: false });
            })
            .catch(err => {
              console.log(err);

              toast.error("Problem relating the kid ");
              this.setState({ loading: false });
            });
          /*----------------!END OF COMMENT WARPPER---------------*/
        })
        .catch(err => {
          console.log(err);

          this.setState({ loading: false });
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    }
  };
  render() {
    return (
      <React.Fragment>
        <ToastContainer autoClose={5000} />
        {this.state.loading && <Spinner message="Adding kid to database" />}
        <Segment className="addSeg">
          <h1>
            <center>Add a kid</center>
          </h1>
          <Form onSubmit={this.submitHandler}>
            <Form.Field>
              <label>Full name</label>
              <input
                name="fn"
                placeholder="Username or Email"
                ref={this.fnEl}
              />
            </Form.Field>
            <Form.Field>
              <label>Phone</label>
              <input
                name="phone"
                type="number"
                placeholder="+216 22 123 123"
                ref={this.phoneEl}
              />
            </Form.Field>
            <Form.Field>
              <label>Birth Date</label>
              <input
                name="bd"
                type="date"
                placeholder=""
                ref={this.bdEl}
              />
            </Form.Field>
            <Form.Field>
              <label>Email</label>
              <input
                name="email"
                placeholder="Exemple@Exemple.com"
                ref={this.emailEl}
              />
            </Form.Field>

            <Button
              type="submit"
              floated="right"
              icon
              labelPosition="left"
              color="green"
              size="small"
            >
              <Icon name="log out" /> Validate
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

export default AddKid;
/*<Card>
          <form onSubmit={this.submitHandler}>
            {this.state.fieldRequired && (
              <div className="alert alert-danger" role="alert">
                All fields are required!
                <button
                  type="button"
                  class="close"
                  data-dismiss="alert"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            )}
            {this.state.generalErr && (
              <div className="alert alert-danger" role="alert">
                General error!
                <button
                  type="button"
                  class="close"
                  data-dismiss="alert"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            )}
            {this.state.realteErr && (
              <div className="alert alert-danger" role="alert">
                Error accured while relating the kid !!
                <button
                  type="button"
                  class="close"
                  data-dismiss="alert"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            )}
            {this.state.succAdd && (
              <div className="alert alert-success" role="alert">
                Kid and have been added with success!
                <button
                  type="button"
                  class="close"
                  data-dismiss="alert"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            )}
            <div className="fn">
              <p>Full name</p>
              <input name="name" ref={this.fnEl} />
            </div>
            <div className="phone">
              <p>Phone</p>
              <input name="phone" ref={this.phoneEl} />
            </div>
            <div className="phone">
              <p>birthDay</p>
              <input name="birthDay" type="date" ref={this.bdEl} />
            </div>
            <div className="phone">
              <p>Email</p>
              <input name="email" type="email" ref={this.emailEl} />
            </div>

            <center>
              <button className="w-75">Validate</button>
            </center>
          </form>
        </Card>*/
