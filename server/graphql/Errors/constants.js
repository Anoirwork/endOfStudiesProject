exports.errorName = {
  UNAUTHORIZED: "UNAUTHORIZED", // Unauthorized client
  LSCHNAGED: "LSCHNAGED", // Localstorage has been changed probably userID
  RELATEKID: "RELATEKID", // Maybe kid has not been created ?
  KIDISSUE: "KIDISSUE", // Maybe kid didn't successfuly saved in the db
  KIDDBISSUE: "KIDDBISSUE", // Maybe thehre was a network error or db is down ?
  KIDNOTFOUND: "KIDNOTFOUND", // The requested kid has not been found
  DELKID: "DELKID", // Problem with the mutation delete of the kid
  DELETERELATION: "DELETERELATION", // Problem while deleting that relation
  UPDATEKIDISSUE: "UPDATEKIDISSUE", // Problem while deleting that relation
  USEREXIST: "USEREXIST", // User existe number or email or both
  UNEXPECTEDERROR: "UNEXPECTEDERROR", // Unknown
  WRONGCRED: "WRONGCRED" // Wrong Credentials
};

exports.errorType = {
  UNAUTHORIZED: {
    message: "Authentication is needed to get requested response.",
    statusCode: 401,
    forceLogOut: true
  },
  LSCHNAGED: {
    message: "Forbidden has been made by the client.",
    statusCode: 401,
    forceLogOut: true
  },
  RELATEKID: {
    message: "Problem realting the kid to the user.",
    statusCode: 702
  },
  KIDISSUE: {
    message: "Problem in the request to the database.",
    statusCode: 700
  },
  KIDDBISSUE: {
    message: "Problem with the database while saving the kid.",
    statusCode: 701
  },
  KIDDNOTFOUND: {
    message: "Kid is not foud",
    statusCode: 704
  },
  DELKID: {
    message: "Can't delete that kid",
    statusCode: 705
  },
  DELETERELATION: {
    message: "Can't delete that relation",
    statusCode: 706
  },
  UPDATEKIDISSUE: {
    message: "Can't update this kid",
    statusCode: 707
  },
  USEREXIST: {
    message: "User existe",
    statusCode: 101
  },
  UNEXPECTEDERROR: {
    message: "Unexpected error acquired",
    statusCode: 777
  },
  WRONGCRED: {
    message: "Wrong Credientials",
    statusCode: 710
  }
};
