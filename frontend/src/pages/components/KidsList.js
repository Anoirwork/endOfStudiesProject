import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Spinner from "../HelperFunctions/Spinner";

import { ToastContainer, toast } from "react-toastify";
import { Segment, Button, Icon, Table } from "semantic-ui-react";

import EditKid from "../Modal/EditKid";
import { ButtonToolbar } from "react-bootstrap";
import "./KidsList.css";

const KidsList = props => {
  if (!localStorage.getItem("token")) {
    props.history.push("/login");
  }
  const [state, setState] = useState({
    uid: localStorage.getItem("userId"),
    token: localStorage.getItem("token"),
    kids: [],
    selectedKid: {},
    loading: false
  });
  useEffect(() => {
    setState({ ...state, loading: true });
    let reqBody = {
      query: `
        query{
            kidsRelated(userId:"${state.uid}"){
              _id
              name
              number
              email
              birthDay
            }
          }`
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
            props.history.push("/login");
          }
          setState({ ...state, generalErr: true });
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => {
        console.log(resData.data.kidsRelated);
        setState({ ...state, kids: resData.data.kidsRelated });
      })
      .catch(err => {
        throw err;
      });
  }, []);
  const delKid = id => {
    let reqBody = {
      query: `
        mutation{
            delKid(userId: "${state.uid}",kidId:"${id}")
          }`
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
          toast.error("Something went wrong!");
        }
        return res.json();
      })
      .then(json => {
        console.log(JSON.stringify(json));
        const kidsAfterDelete = state.kids.filter(kid => {
          return kid._id !== id;
        });
        console.log(kidsAfterDelete);
        setState({ ...state, kids: kidsAfterDelete });
        toast.success("Kid record have been deleted with success!");
      })

      .catch(err => {
        throw err;
      });
  };

  function setSelectedKid(id, index) {
    const found = new Array(state.kids.find(element => element._id === id));
    found.push(index);
    setState({ ...state, selectedKid: found });
  }
  const [modalShow, setModalShow] = useState(false);

  return (
    <React.Fragment>
      {state.loading && (
        <Spinner message="Retriving records from database..." />
      )}

      <ToastContainer autoClose={5000} />
      <Segment className="klseg">
        <h1 style={{ marginLeft: "40px", color: "green" }}>Kids Table</h1>

        <Segment raised>
          <Table celled fixed singleLine color="blue">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>#</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Birth Date</Table.HeaderCell>
                <Table.HeaderCell>E-mail address</Table.HeaderCell>
                <Table.HeaderCell>Number</Table.HeaderCell>
                <Table.HeaderCell>Edit</Table.HeaderCell>
                <Table.HeaderCell>Delete</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {state.kids.length === 0 && (
                <Table.Row>
                  <Table.Cell
                    textAlign="center"
                    verticalAlign="middle"
                    colSpan={7}
                    warning
                  >
                    <h1>
                      You have no kids in our records.
                      <br /> Try to add kids with the button below.
                    </h1>
                  </Table.Cell>
                </Table.Row>
              )}
              {state.kids.map((kid, index) => {
                return (
                  <Table.Row key={index}>
                    <Table.Cell collapsing>{index + 1}</Table.Cell>
                    <Table.Cell>{kid.name}</Table.Cell>
                    <Table.Cell>{kid.number}</Table.Cell>
                    <Table.Cell>{kid.birthDay}</Table.Cell>
                    <Table.Cell>{kid.email}</Table.Cell>
                    <Table.Cell>
                      <ButtonToolbar
                        onClick={() => setSelectedKid(kid._id, index)}
                      >
                        <Button
                          type="a"
                          floated="right"
                          icon
                          labelPosition="left"
                          primary
                          size="small"
                          onClick={() => setModalShow(true)}
                        >
                          <Icon name="check" /> Edit
                        </Button>
                      </ButtonToolbar>
                    </Table.Cell>
                    <Table.Cell>
                      <Button
                        type="reset"
                        floated="left"
                        icon
                        labelPosition="left"
                        negative
                        size="small"
                        onClick={() => delKid(kid._id)}
                      >
                        <Icon name="times" /> Delete
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
            <Table.Footer fullWidth>
              <Table.Row>
                <Table.HeaderCell colSpan="7">
                  <NavLink to="/add">
                    <Button
                      floated="right"
                      icon
                      labelPosition="right"
                      primary
                      size="small"
                    >
                      <Icon name="user" /> Add Kid
                    </Button>
                  </NavLink>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </Segment>
      </Segment>
      {/* <div
        className="card mb-4"
        style={{ marginLeft: 300 + "px", top: 40 + "px" }}
      >
        <div className="card-body">
          <div className="row">
            <div className="col-md-12">
              <h2 className="py-3 text-center font-bold font-up success-text">
                Kids Table
              </h2>
            </div>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Kid name</th>
                <th>Kid Number</th>
                <th>Birth Day</th>
                <th>Email</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {state.kids.map((kid, index) => {
                return (
                  <tr key={kid._id} className="table-success">
                    <th scope="row">{index + 1}</th>
                    <td>{kid.name}</td>
                    <td>{kid.number}</td>
                    <td>{kid.birthDay}</td>
                    <td>{kid.email}</td>
                    <td>
                      <ButtonToolbar>
                        <Button
                          variant="primary"
                          onClick={() => setModalShow(true)}
                        >
                          Edit
                        </Button>
                      </ButtonToolbar>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger btn-xs"
                        onClick={() => delKid(kid._id)}
                      >
                        <i className="fas fa-user-edit"></i> Del
                      </button>
                    </td>
                  </tr>
                );
                <EditKid
                  kid={index + 1}
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />;
              })}
            </tbody>
          </table>
        </div>
      </div>
      {/*</div>*/}
      {modalShow && (
        <EditKid
          show={modalShow}
          kid={state.selectedKid}
          onHide={() => setModalShow(false)}
        />
      )}
    </React.Fragment>
  );
};

export default KidsList;

/*<tr className="table-success">
        <th scope="row"></th>
        <td>{kid.name}</td>
        <td>{kid.number}</td>
      </tr>;*/
/*Table smaya7 yanja7 for late use maybe
<div class="table-wrapper">
            <div class="table-title">
                <div class="row">
                    <div class="col-sm-8"><h2>Employee <b>Details</b></h2></div>
                    <div class="col-sm-4">
                        <button type="button" class="btn btn-info add-new"><i class="fa fa-plus"></i> Add New</button>
                    </div>
                </div>
            </div>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>John Doe</td>
                        <td>Administration</td>
                        <td>(171) 555-2222</td>
                        <td>
							<a class="add" title="" data-toggle="tooltip" data-original-title="Add"><i class="material-icons"></i></a>
                            <a class="edit" title="" data-toggle="tooltip" data-original-title="Edit"><i class="material-icons"></i></a>
                            <a class="delete" title="" data-toggle="tooltip" data-original-title="Delete"><i class="material-icons"></i></a>
                        </td>
                    </tr>
                    <tr>
                        <td>Peter Parker</td>
                        <td>Customer Service</td>
                        <td>(313) 555-5735</td>
                        <td>
							<a class="add" title="" data-toggle="tooltip" data-original-title="Add"><i class="material-icons"></i></a>
                            <a class="edit" title="" data-toggle="tooltip" data-original-title="Edit"><i class="material-icons"></i></a>
                            <a class="delete" title="" data-toggle="tooltip" data-original-title="Delete"><i class="material-icons"></i></a>
                        </td>
                    </tr>
                    <tr>
                        <td>Fran Wilson</td>
                        <td>Human Resources</td>
                        <td>(503) 555-9931</td>
                        <td>
							<a class="add" title="" data-toggle="tooltip" data-original-title="Add"><i class="material-icons"></i></a>
                            <a class="edit" title="" data-toggle="tooltip" data-original-title="Edit"><i class="material-icons"></i></a>
                            <a class="delete" title="" data-toggle="tooltip" data-original-title="Delete"><i class="material-icons"></i></a>
                        </td>
                    </tr>      
                </tbody>
            </table>
        </div>*/
