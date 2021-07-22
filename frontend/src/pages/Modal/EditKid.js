import React from "react";
import { Modal } from "react-bootstrap";
import { Segment, Form, Button, Icon } from "semantic-ui-react";

import { ToastContainer, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.css";
import Spinner from "../HelperFunctions/Spinner";

class EditKid extends React.Component {
  constructor(props) {
    super(props);

    this.fnEl = React.createRef();
    this.phoneEl = React.createRef();
    this.bdEl = React.createRef();
    this.emailEl = React.createRef();
    this.state = {
      kid: this.props.kid[0],
      index: this.props.kid[1],
      fieldRequired: false,
      loading: false
    };
  }
  componentDidMount() {
    console.log(this.state.kid);
  }
  onClickSubmit = e => {
    this.setState({ loading: true });
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
      toast.error("All fields are required!!");
    }

    let reqBody = {
      query: `
    mutation{
        updateKid(kidId: "${this.state.kid._id}", kidInput: {name:"${fn}", number: ${phone}, birthDay: "${bd}", email:"${email}"}){
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
        if (res.status !== 200 && res.status !== 201) {
          if (res.status === 401) {
            localStorage.clear();
            this.props.history.push("/login");
          }
          this.setState({ generalErr: true });

          toast.error("Something went wrong !");
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData.data);

        toast.success("Record have been updated with success!");
      })
      .catch(err => {
        console.log(err);

        toast.error("Something went wrong !");
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };
  render() {
    return (
      <React.Fragment>
        <ToastContainer autoClose={5000} />
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          {this.state.loading && (
            <Spinner message="Updating your the information..." />
          )}
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Edit kid # {this.state.index + 1}
            </Modal.Title>
          </Modal.Header>

          <Form onSubmit={this.onClickSubmit}>
            <Modal.Body>
              <Segment raised>
                <Form.Field>
                  <label>Full name</label>
                  <input
                    name="fn"
                    defaultValue={this.state.kid.name}
                    ref={this.fnEl}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Phone</label>
                  <input
                    name="phone"
                    type="number"
                    defaultValue={this.state.kid.number}
                    ref={this.phoneEl}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Birth Date</label>
                  <input
                    name="bd"
                    type="date"
                    defaultValue={this.state.kid.birthDay}
                    ref={this.bdEl}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Email</label>
                  <input
                    name="email"
                    defaultValue={this.state.kid.email}
                    ref={this.emailEl}
                  />
                </Form.Field>
              </Segment>
            </Modal.Body>
            <Modal.Footer>
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
            </Modal.Footer>
          </Form>
        </Modal>
      </React.Fragment>
    );
  }
}

export default EditKid;
