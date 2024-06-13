const errorHandler = (err, req, res, next) => {
  if (err.name.includes("MongoServerError") && err.message.includes("duplicate key"))   {
    res.status(400).json({error: "expected `username` to be unique"});
    return;
  } else if (err.name.includes("ValidationError") && err.message.includes("expected `username` length to be at least 3 chars")) {
    res.status(400).json({error: "expected `username` length to be at least 3 chars"});
    return;
  } else if (err.name.includes("ValidationError") && err.message.includes("expected `username` length to be lower than 16 chars")) {
    res.status(400).json({error: "expected `username` length to be lower than 16 chars"});
    return;
  }

  next(err);
};

module.exports = {errorHandler};