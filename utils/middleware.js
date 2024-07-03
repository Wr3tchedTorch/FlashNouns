const errorHandler = (err, req, res, next) => {
  if (err.name.includes("MongoServerError") || err.name.includes("ValidationError")) {
    if (err.name.includes("MongoServerError") && err.message.includes("duplicate key"))   {    
      return res.status(400).json({error: "expected `username` to be unique"});    
    }

    if (err.message.includes("Noun validation failed: group")) {
      return res.status(400).json({error: "Noun Validation Failed: the value is not a valid noun group"});
    }

    if (err.message.includes("Noun validation failed: gender")) {
      return res.status(400).json({error: "Noun Validation Failed: the value is not a valid noun gender"});
    }
    
    return res.status(400).json({error: err.message});
  } 

  if (err.name.includes("JsonWebTokenError") && (err.message.includes("invalid token") || err.message.includes("jwt malformed"))) {
    return res.status(400).json({message: "error: token invalid."});
  } 

  if (err.name.includes("Error") && err.message.includes("score must be higher or equal do zero.")) {
    return res.status(400).json({error: "score must be higher or equal to zero."});
  }  

  next(err);
};

module.exports = {errorHandler};