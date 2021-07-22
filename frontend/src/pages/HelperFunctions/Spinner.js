import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

const Spinner = props => (
  <div>
    <Dimmer active style={{ height: "100vh" }}>
      <Loader size="massive">{props.message}</Loader>
    </Dimmer>
  </div>
);
Spinner.defaultProps = {
  message: "Loading..."
};
export default Spinner;
