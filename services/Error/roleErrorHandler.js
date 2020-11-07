const roleErrorHandler = (err) => {

  let errors = { role: '' }

  if (err.code === 11000) {
    errors.role = "Entered role already exists";
  } else {
    console.log(err);
  }

  return errors;
}

module.exports = roleErrorHandler;