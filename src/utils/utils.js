module.exports.getErrorMessageFromModel = (err) => {
    if (err.errors) {
      for (let errName in err.errors) {
        if (err.errors[errName].message) return err.errors[errName].message;
      }
    }
  
    console.log(err);
    return 'Unknown server error';
};