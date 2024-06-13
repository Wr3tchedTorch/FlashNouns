const errorHandler = (err, req, res, next) => {
  if (err.name.includes("MongoServerError") && err.message.includes("duplicate key"))   {    
    return res.status(400).json({error: "expected `username` to be unique"});    

  } else if (err.name.includes("ValidationError") && err.message.includes("expected `username` length to be at least 3 chars")) {
    return res.status(400).json({error: "expected `username` length to be at least 3 chars"});    

  } else if (err.name.includes("ValidationError") && err.message.includes("expected `username` length to be lower than 16 chars")) {
    return res.status(400).json({error: "expected `username` length to be lower than 16 chars"});    

  } else if (err.name.includes("JsonWebTokenError") && err.message.includes("invalid token")) {
    return res.status(400).json({error: "token invalid."});

  } else if (err.name.includes("Error") && err.message.includes("score must be higher or equal do zero.")) {
    return res.status(400).json({error: "score must be higher or equal to zero."});
  }
  console.log(err.message);

  next(err);
};

module.exports = {errorHandler};