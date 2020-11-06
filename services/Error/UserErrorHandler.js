const errorHandler = (err) => {
  console.log(err.message);

  let errors = { name: '', email: '', password: ''};

  //incorrect email
  if(err.message === 'incorrect email') {
    errors.email = '*There is no account with this email';
  }
  //incorrect password
  if(err.message === 'incorrect password') {
    errors.password = '*Entered password is incorrect';
  }

  //duplicate error code
  if (err.code == 11000 || err.code == 'E11000') {
    errors.email = '*This email is already registered'
  }

  //validation errors
  if (err.message.includes('User validation failed')) {
    Object.values(err.errors).forEach( ({properties}) => {
      //console.log(properties);
      errors[properties.path] = properties.message;
    })
  }

  if (err.message.includes('Validation failed')) {
    Object.values(err.errors).forEach( ({properties}) => {
      //console.log(properties);
      errors[properties.path] = properties.message;
    })
  }
  return errors;
}

module.exports = errorHandler;