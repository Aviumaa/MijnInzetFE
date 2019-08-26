const jwt_decode = require("jwt-decode");

// Get subID from the access token
exports.getUserIDFromToken = req => {
  // retrieve bearer token and decode it
  let tokenArray = req
    .header("Authorization")
    .split(" ")
    .pop();
  let token = jwt_decode(tokenArray);

  // extract userID from the subject property
  return (userId = token.sub.split("|").pop());
};
