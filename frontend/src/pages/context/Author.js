const Author = props => {
  let reqBody = {
    query: `{
          user(userId: "${localStorage.getItem("userId")}"){
            name    
          }
        }
        `
  };
  fetch("http://localhost:4000/api", {
    method: "POST",
    body: JSON.stringify(reqBody),
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token")
    }
  })
    .then(res => {
      if (res.status === 401) {
        localStorage.clear();
        props.push("/login");
      }
    })
    .catch(err => {
      console.log(err);
    });
};

export default Author;
