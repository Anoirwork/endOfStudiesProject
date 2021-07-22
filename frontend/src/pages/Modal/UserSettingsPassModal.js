import React, { Component } from "react";
import { Button, Modal, Segment } from "semantic-ui-react";

class UserSettingsPassModal extends Component {
  state = { open: false, size: "mini" };

  show = () => () => this.setState({ size: "mini", open: true });
  close = () => this.setState({ open: false });

  render() {
    return (
      <Segment style={{ padding: "40rem" }}>
        <Modal
          size={this.state.size}
          open={this.props.show}
          onClose={this.close}
          closeIcon
        >
          <Modal.Header>Delete Your Account</Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to delete your account</p>
          </Modal.Content>
          <Modal.Actions>
            <Button negative>No</Button>
            <Button
              positive
              icon="checkmark"
              labelPosition="right"
              content="Yes"
            />
          </Modal.Actions>
        </Modal>
      </Segment>
    );
  }
}

export default UserSettingsPassModal;
