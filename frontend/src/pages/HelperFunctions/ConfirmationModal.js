import React from "react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";

const ModalBasicExample = props => (
  <Modal open={props.show} basic size="small" closeIcon>
    <Header icon={props.icon} content="Validation" />
    <Modal.Content>
      <p>{props.message}</p>
    </Modal.Content>
    <Modal.Actions>
      <Button basic color="red" inverted>
        <Icon name="remove" /> No
      </Button>
      <Button color="green" inverted>
        <Icon name="checkmark" /> Yes
      </Button>
    </Modal.Actions>
  </Modal>
);

export default ModalBasicExample;
