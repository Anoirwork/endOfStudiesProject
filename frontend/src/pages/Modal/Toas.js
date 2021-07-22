import React from "react";
import { Toast } from "react-bootstrap";
import { Icon } from "semantic-ui-react";

function Toas(props) {
  const [show, setShow] = React.useState(true);

  return (
    <Toast
      onClose={() => setShow(false)}
      show={props.show}
      delay={3000}
      autohide
    >
      <Toast.Header>
        <Icon name={props.icon} />
        <strong className="mr-auto">Notification</strong>
        <small>Just now</small>
      </Toast.Header>
      <Toast.Body>{props.message}</Toast.Body>
    </Toast>
  );
}
export default Toas;
