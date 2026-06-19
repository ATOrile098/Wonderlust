
module.exports = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    }
}



/* 
  .catch(next)  Or
  .catch((err) => next(err))

both are same.
Used to automatically forward async errors
to Express Error Handling Middleware. */