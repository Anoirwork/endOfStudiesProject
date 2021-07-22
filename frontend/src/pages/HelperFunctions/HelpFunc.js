const HelpFunc = async (reqBody, props) => {
  await fetch("http://localhost:4000/api", {
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
        return "Status error : " + res.status;
      }
    })
    .then(async resData => {
      console.log(resData);
      return await resData;
    })
    .catch(err => {
      return err;
    });
};
/*const verifAuth = () => {
  fetch("http://localhost:4000/api", {
    method: "POST",
    body: JSON.stringify(),
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
        return false;
      } else return true;
    })
    .catch(err => {
      return false;
    });
};*/
export { HelpFunc };
