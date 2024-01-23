const validateInput = (value, minLength, setErrorCallback) => {
  if (value.length < minLength) {
    setErrorCallback(`Minimum length is ${minLength}`);
    return false;
  } else {
    setErrorCallback('');
    return true;
  }
};

export default validateInput;
